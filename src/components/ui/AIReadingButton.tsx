'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAIReading } from '@/lib/ai/readings';

interface AIReadingButtonProps {
  module: string;
  data: Record<string, unknown>;
  userName: string;
}

function getStorageKey(module: string, userName: string): string {
  return `ai-reading-${module}-${userName}`;
}

export function AIReadingButton({ module, data, userName }: AIReadingButtonProps) {
  const [reading, setReading] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Load cached reading from localStorage
  useEffect(() => {
    try {
      const key = getStorageKey(module, userName);
      const cached = localStorage.getItem(key);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.reading && parsed.timestamp) {
          setReading(parsed.reading);
          setExpanded(true);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [module, userName]);

  const handleGetReading = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAIReading({ module, data, userName });
      setReading(response.reading);
      setExpanded(true);

      // Cache in localStorage
      try {
        const key = getStorageKey(module, userName);
        localStorage.setItem(key, JSON.stringify({
          reading: response.reading,
          timestamp: response.timestamp,
        }));
      } catch {
        // Ignore localStorage errors
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to get reading';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [module, data, userName]);

  return (
    <div className="space-y-3">
      {/* Button */}
      <button
        onClick={reading ? () => setExpanded(!expanded) : handleGetReading}
        disabled={loading}
        className="w-full relative overflow-hidden rounded-2xl px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{
          background: loading
            ? 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #3B82F6 100%)'
            : 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)',
        }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Generating your reading...</span>
            </>
          ) : reading ? (
            <>
              <span>{'\u2728'}</span>
              <span>{expanded ? 'Hide AI Reading' : 'Show AI Reading'}</span>
            </>
          ) : (
            <>
              <span>{'\u2728'}</span>
              <span>Get AI Reading</span>
            </>
          )}
        </span>

        {/* Shimmer effect */}
        {!loading && (
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            }}
          />
        )}
      </button>

      {/* Error message */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={handleGetReading}
            className="text-sm font-medium text-red-700 underline mt-1"
          >
            Try again
          </button>
        </div>
      )}

      {/* Reading card */}
      {reading && expanded && (
        <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-100 overflow-hidden animate-scale-in">
          {/* AI indicator bar */}
          <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 border-b border-indigo-100">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                }}
              />
              <span className="text-xs font-medium text-indigo-600">
                AI-Generated Reading
              </span>
              <span className="text-xs text-indigo-400 ml-auto">
                Powered by Claude
              </span>
            </div>
          </div>

          {/* Reading content */}
          <div className="p-5">
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {reading}
            </div>
          </div>

          {/* Regenerate button */}
          <div className="px-5 pb-4">
            <button
              onClick={handleGetReading}
              disabled={loading}
              className="text-xs font-medium text-indigo-500 hover:text-indigo-700 transition-colors disabled:opacity-50"
            >
              {'\u21BB'} Regenerate reading
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
