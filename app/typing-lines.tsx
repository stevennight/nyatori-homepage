'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { getTimeGreeting, QUIPS } from './lines';

export type RequestedQuip = {
  id: number;
  text: (typeof QUIPS)[number];
} | null;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener('change', callback);

  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function TypingLines({
  requestedQuip,
}: {
  requestedQuip: RequestedQuip;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [greeting] = useState(() => getTimeGreeting(new Date()));
  const [phase, setPhase] = useState<'greeting' | 'requested' | 'rotation'>(
    () => (requestedQuip ? 'requested' : 'greeting'),
  );
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const currentLine =
    phase === 'requested'
      ? (requestedQuip?.text ?? QUIPS[0])
      : phase === 'greeting'
        ? greeting
        : QUIPS[lineIndex];

  useEffect(() => {
    if (reducedMotion) return;

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

        if (phase === 'greeting' || phase === 'requested') {
          setPhase('rotation');
          setLineIndex(0);
        } else {
          setLineIndex((index) => (index + 1) % QUIPS.length);
        }

        return;
      }

      setText(
        deleting
          ? currentLine.slice(0, text.length - 1)
          : currentLine.slice(0, text.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [currentLine, deleting, phase, reducedMotion, text]);

  return (
    <>
      <p className="screen-reader-text" aria-live="polite">
        {currentLine}
      </p>
      <p className="typewriter" aria-hidden="true">
        <span>{reducedMotion ? currentLine : text}</span>
        <span className="cursor" />
      </p>
    </>
  );
}
