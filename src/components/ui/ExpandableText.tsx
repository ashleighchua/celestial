'use client';

import { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  color?: string;
}

export function ExpandableText({ text, maxLength = 150, color = '#6366F1' }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = text.length > maxLength;

  return (
    <div>
      <p className="text-sm text-gray-700 leading-relaxed">
        {expanded || !needsTruncation ? text : `${text.slice(0, maxLength)}...`}
      </p>
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium mt-1"
          style={{ color }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
