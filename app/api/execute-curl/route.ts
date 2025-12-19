import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json();

    if (!command || typeof command !== 'string') {
      return NextResponse.json(
        { error: 'Command is required' },
        { status: 400 }
      );
    }

    // Security: Only allow curl commands
    const trimmedCommand = command.trim();
    if (!trimmedCommand.startsWith('curl ')) {
      return NextResponse.json(
        { error: 'Only curl commands are allowed' },
        { status: 400 }
      );
    }

    // Security: Block dangerous patterns
    const dangerousPatterns = [
      /[;&|`$()]/,  // Shell operators
      /\.\./,       // Directory traversal
      /\/etc\//,    // System files
      /\/proc\//,   // Process info
      /--output/i,  // File output
      /-o\s/,       // File output shorthand
      />>/,         // Append redirect
      />/,          // Redirect
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(trimmedCommand)) {
        return NextResponse.json(
          { error: 'Command contains disallowed patterns' },
          { status: 400 }
        );
      }
    }

    // Execute with timeout
    const { stdout, stderr } = await execAsync(trimmedCommand, {
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
