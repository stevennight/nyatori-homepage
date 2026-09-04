'use client';

import { useEffect, useState } from 'react';

const lines = [
  '程序员',
  '把想法编译成现实',
  '偶尔写诗，通常写 Bug',
  '代码会说话，我负责翻译',
];

export function TypingLines() {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState(lines[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
      setLineIndex(0);
      setText(lines[0]);
      setDeleting(false);
      return;
    }

    const currentLine = lines[lineIndex];
    let delay = deleting ? 42 : 88;

    if (!deleting && text === currentLine) {
      delay = 1500;
    } else if (deleting && text === '') {
      delay = 280;
    }

    const timer = window.setTimeout(() => {
      if (!deleting && text === currentLine) {
        setDeleting(true);
        return;
      }

      if (deleting && text === '') {
        setDeleting(false);
        setLineIndex((index) => (index + 1) % lines.length);
        return;
      }

      setText(
        deleting
          ? currentLine.slice(0, text.length - 1)
          : currentLine.slice(0, text.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, lineIndex, text]);

  return (
    <>
      <p className="screen-reader-text">{lines.join('。')}</p>
      <p className="typewriter" aria-hidden="true">
        <span>{text}</span>
        <span className="cursor" />
      </p>
    </>
  );
}
