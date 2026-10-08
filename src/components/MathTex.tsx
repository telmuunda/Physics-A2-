import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTexProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathTex: React.FC<MathTexProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return math;
    }
  }, [math, block]);

  return (
    <span
      className={`inline-block select-text ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
