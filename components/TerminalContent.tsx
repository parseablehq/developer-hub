'use client';

import { useState, useCallback } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

interface TerminalContentProps {
  command: string;
}

export default function TerminalContent({ command }: TerminalContentProps) {
  const [editableCommand, setEditableCommand] = useState(command);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCommand = useCallback(async () => {
    if (!editableCommand.trim()) return;

    // Only execute curl commands
    if (!editableCommand.trim().startsWith('curl ')) {
      setError('Only curl commands are allowed');
      setOutput(null);
      return;
    }

    setIsRunning(true);
    setError(null);
    setOutput(null);

    try {
      const response = await fetch('/api/execute-curl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: editableCommand }),
      });

      const data = await response.json();

      if (data.success) {
        setOutput(data.output ? `✓ Success (200)\n\n${data.output}` : '✓ Success (200)');
        setError(null);
      } else {
        setError(data.error || 'Command failed');
        if (data.output) {
          setOutput(data.output);
        }
      }
    } catch (err) {
      setError('Failed to execute command');
    } finally {
      setIsRunning(false);
    }
  }, [editableCommand]);

  const resetCommand = useCallback(() => {
    setEditableCommand(command);
    setOutput(null);
    setError(null);
  }, [command]);

  const copyCommand = useCallback(async () => {
    await navigator.clipboard.writeText(editableCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [editableCommand]);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCommand}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title="Copy command"
          >
            {copied ? <Check className="w-4 h-4 text-green-500 dark:text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={resetCommand}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title="Reset to original"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={runCommand}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 text-xs bg-green-600 hover:bg-green-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded transition-colors"
            title="Run command"
          >
            <Play className="w-3 h-3" />
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      {/* Editable Command Area */}
      <div className="p-4">
        <div className="flex items-start gap-2">
          <span className="text-green-600 dark:text-green-400 font-mono text-sm select-none">$</span>
          <textarea
            value={editableCommand}
            onChange={(e) => setEditableCommand(e.target.value)}
            className="flex-1 bg-transparent text-gray-800 dark:text-gray-100 font-mono text-sm resize-none outline-none min-h-[60px]"
            rows={Math.max(3, editableCommand.split('\n').length)}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Output Area */}
      {(output || error || isRunning) && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {isRunning && (
            <div className="text-yellow-600 dark:text-yellow-400 font-mono text-sm">
              Running command...
            </div>
          )}
          {error && (
            <div className="text-red-600 dark:text-red-400 font-mono text-sm mb-2">
              Error: {error}
            </div>
          )}
          {output && (
            <pre className="text-gray-700 dark:text-gray-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
              {output}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
