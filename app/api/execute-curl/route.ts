import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

// Allowed curl options (whitelist approach)
const ALLOWED_OPTIONS = new Set([
  // Request methods
  '-X', '--request',
  // Headers
  '-H', '--header',
  // Data
  '-d', '--data', '--data-raw', '--data-binary', '--data-urlencode',
  // Auth
  '-u', '--user',
  // URL handling
  '-L', '--location',
  // Verbose/silent
  '-v', '--verbose', '-s', '--silent', '-S', '--show-error',
  // Timeout
  '--connect-timeout', '-m', '--max-time',
  // SSL
  '-k', '--insecure',
  // Content type shortcuts
  '--json',
  // Include headers in output
  '-i', '--include',
]);

// Options that write to files (blocked)
const BLOCKED_OPTIONS = new Set([
  '-o', '--output',
  '-O', '--remote-name',
  '-T', '--upload-file',
  '--create-dirs',
  '-K', '--config',
  '--trace', '--trace-ascii',
  '-D', '--dump-header',
  '-c', '--cookie-jar',
  '-b', '--cookie',
]);

// Parse curl command into arguments array safely
function parseCurlCommand(command: string): string[] | null {
  const args: string[] = [];
  let current = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let escaped = false;

  // Remove 'curl' prefix and trim
  const trimmed = command.trim();
  if (!trimmed.toLowerCase().startsWith('curl ')) {
    return null;
  }
  const argsString = trimmed.slice(5).trim();

  for (let i = 0; i < argsString.length; i++) {
    const char = argsString[i];

    if (escaped) {
      // Handle escaped characters
      if (char === 'n') current += '\n';
      else if (char === 't') current += '\t';
      else if (char === 'r') current += '\r';
      else current += char;
      escaped = false;
      continue;
    }

    if (char === '\\' && !inSingleQuote) {
      // Check if it's a line continuation (backslash followed by newline or at end)
      if (i + 1 < argsString.length && (argsString[i + 1] === '\n' || argsString[i + 1] === '\r')) {
        i++; // Skip the newline
        if (argsString[i] === '\r' && argsString[i + 1] === '\n') i++; // Handle CRLF
        continue;
      }
      escaped = true;
      continue;
    }

    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      continue;
    }

    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    if ((char === ' ' || char === '\n' || char === '\t') && !inSingleQuote && !inDoubleQuote) {
      if (current) {
        args.push(current);
        current = '';
      }
      continue;
    }

    current += char;
  }

  if (current) {
    args.push(current);
  }

  // Check for unclosed quotes
  if (inSingleQuote || inDoubleQuote) {
    return null;
  }

  return args;
}

// Validate parsed arguments
function validateArgs(args: string[]): { valid: boolean; error?: string } {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    // Check for shell injection attempts in any argument
    if (/[;&|`$()]/.test(arg) && !arg.startsWith('http')) {
      // Allow these chars in URLs and JSON data
      const isUrl = arg.startsWith('http://') || arg.startsWith('https://');
      const isData = i > 0 && ['-d', '--data', '--data-raw', '--data-binary', '--json'].includes(args[i - 1]);
      if (!isUrl && !isData) {
        return { valid: false, error: 'Invalid characters in argument' };
      }
    }

    // Check options
    if (arg.startsWith('-')) {
      // Handle combined short options like -sSL
      if (arg.startsWith('-') && !arg.startsWith('--') && arg.length > 2) {
        // Split combined options
        for (let j = 1; j < arg.length; j++) {
          const opt = `-${arg[j]}`;
          if (BLOCKED_OPTIONS.has(opt)) {
            return { valid: false, error: `Option ${opt} is not allowed` };
          }
        }
      } else {
        if (BLOCKED_OPTIONS.has(arg)) {
          return { valid: false, error: `Option ${arg} is not allowed` };
        }
      }
    }

    // Block file:// and other dangerous protocols
    if (arg.match(/^(file|ftp|sftp|scp|dict|gopher|ldap|telnet):\/\//i)) {
      return { valid: false, error: 'Only http and https protocols are allowed' };
    }

    // Block localhost metadata endpoints (cloud provider metadata)
    if (arg.includes('169.254.169.254') || arg.includes('metadata.google')) {
      return { valid: false, error: 'Access to metadata endpoints is not allowed' };
    }
  }

  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json();

    if (!command || typeof command !== 'string') {
      return NextResponse.json(
        { error: 'Command is required' },
        { status: 400 }
      );
    }

    // Parse the curl command into arguments
    const args = parseCurlCommand(command);
    if (!args) {
      return NextResponse.json(
        { error: 'Invalid curl command syntax' },
        { status: 400 }
      );
    }

    // Validate arguments
    const validation = validateArgs(args);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Execute curl with parsed arguments (no shell interpretation)
    const { stdout, stderr } = await execFileAsync('curl', args, {
      timeout: 30000, // 30 second timeout
      maxBuffer: 1024 * 1024, // 1MB max output
    });

    return NextResponse.json({
      success: true,
      output: stdout || stderr,
    });
  } catch (error: any) {
    console.error('Curl execution error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Command execution failed',
      output: error.stderr || error.stdout || '',
    });
  }
}
