'use client';

import { useState, useCallback } from 'react';
import { RotateCcw, Copy, Check } from 'lucide-react';

interface EditableCodeProps {
  code: string;
  language?: string;
  title?: string;
}

export default function EditableCode({ code, language = 'text', title }: EditableCodeProps) {
  const [editableCode, setEditableCode] = useState(code);
  const [copied, setCopied] = useState(false);

  const resetCode = useCallback(() => {
    setEditableCode(code);
  }, [code]);

  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [editableCode]);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 my-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {language && (
            <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">{language}</span>
          )}
          {title && (
            <span className="text-xs text-gray-500 dark:text-gray-500">— {title}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-500 dark:text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={resetCode}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title="Reset to original"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editable Code Area */}
      <div className="p-4">
        <textarea
          value={editableCode}
          onChange={(e) => setEditableCode(e.target.value)}
          className="w-full bg-transparent text-gray-800 dark:text-gray-100 font-mono text-sm resize-none outline-none"
          rows={editableCode.split('\n').length}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
