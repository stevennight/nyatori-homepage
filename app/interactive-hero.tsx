'use client';

import { type PointerEvent, useEffect, useRef, useState } from 'react';
import { QUIPS } from './lines';
import { pickPageTitle } from './page-titles';
import { type RequestedQuip, TypingLines } from './typing-lines';

const MAX_AVATAR_SHIFT = 4;
const LAST_PAGE_TITLE_KEY = 'nyatori:last-page-title';

export function InteractiveHero() {
  const requestId = useRef(0);
  const lastQuipIndex = useRef<number | null>(null);
  const [requestedQuip, setRequestedQuip] = useState<RequestedQuip>(null);

  useEffect(() => {
    let previousTitle: string | null = null;

    try {
      previousTitle = window.sessionStorage.getItem(LAST_PAGE_TITLE_KEY);
    } catch {
      // The title can still be randomized when storage is unavailable.
    }

    const nextTitle = pickPageTitle(previousTitle);
    document.title = `Nyatori | ${nextTitle}`;

    try {
      window.sessionStorage.setItem(LAST_PAGE_TITLE_KEY, nextTitle);
    } catch {
      // Ignore private browsing or storage restrictions.
    }
  }, []);

  function requestRandomQuip() {
    let nextIndex = Math.floor(Math.random() * QUIPS.length);

    if (lastQuipIndex.current === nextIndex) {
      nextIndex = (nextIndex + 1) % QUIPS.length;
    }

    lastQuipIndex.current = nextIndex;
    requestId.current += 1;
    setRequestedQuip({ id: requestId.current, text: QUIPS[nextIndex] });
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== 'mouse') return;

    const frame = event.currentTarget;
    const bounds = frame.getBoundingClientRect();
    const horizontal = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const vertical = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    frame.style.setProperty('--avatar-x', `${horizontal * MAX_AVATAR_SHIFT}px`);
    frame.style.setProperty('--avatar-y', `${vertical * MAX_AVATAR_SHIFT}px`);
  }

  function resetAvatarPosition(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.style.setProperty('--avatar-x', '0px');
    event.currentTarget.style.setProperty('--avatar-y', '0px');
  }

  return (
    <main id="top" className="hero">
      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">
          <span aria-hidden="true">01</span>
          PERSONAL INDEX
        </p>
        <h1 id="page-title">Nyatori</h1>
        <div className="role-row">
          <span className="prompt" aria-hidden="true">
            &gt;
          </span>
          <TypingLines
            key={requestedQuip?.id ?? 0}
            requestedQuip={requestedQuip}
          />
        </div>
      </section>

      <aside className="portrait" aria-label="Nyatori 像素头像">
        <button
          type="button"
          className="portrait-frame"
          aria-label="让 Nyatori 随机说一句"
          onClick={requestRandomQuip}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetAvatarPosition}
        >
          <span className="corner-label corner-label-top" aria-hidden="true">
            AVATAR_01
          </span>
          <span className="portrait-art" aria-hidden="true">
            {/* oxlint-disable-next-line next/no-img-element */}
            <img
              src="/nyatori-avatar.png"
              alt=""
              width="1024"
              height="1024"
              draggable={false}
            />
            <span className="portrait-highlight" />
          </span>
          <span className="corner-label corner-label-bottom" aria-hidden="true">
            CLICK / TALK
          </span>
        </button>
      </aside>

      <div className="system-line" aria-hidden="true">
        <span>HELLO, WORLD.</span>
        <span className="system-rule" />
        <span>NYATORI.COM</span>
      </div>
    </main>
  );
}
