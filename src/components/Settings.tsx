"use client";

import { useEffect, useRef, useState } from "react";
import { blip, isMusicPlaying, setMusicVolume, setVolume, startMusic, stopMusic } from "@/lib/audio";

// ponytail: native <dialog> — showModal() gives focus trap, Esc-to-close and a
// backdrop for free. No focus-trap library, no keydown handler.
export default function Settings() {
  const ref = useRef<HTMLDialogElement>(null);
  const wantsMusic = useRef(false);
  const [dusk, setDusk] = useState(false);
  const [vol, setVol] = useState(50);
  const [musicVol, setMusicVol] = useState(30);

  useEffect(() => {
    // Sync from the pre-hydration inline script in layout.tsx + stored settings.
    const storedVol = Number(localStorage.getItem("volume") ?? 50);
    const storedMusic = Number(localStorage.getItem("musicVolume") ?? 30);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDusk(document.documentElement.getAttribute("data-theme") === "dusk");
    setVol(storedVol);
    setMusicVol(storedMusic);
    setVolume(storedVol / 100);
    setMusicVolume(storedMusic / 100);
    wantsMusic.current = storedMusic > 0;

    const onClick = (e: MouseEvent) => {
      // Music can't autoplay — browsers need a gesture, so it starts on the
      // first click of the session if the stored level isn't zero.
      if (wantsMusic.current && !isMusicPlaying()) startMusic();
      const el = (e.target as Element | null)?.closest("a, button, .switch, .range");
      if (el && !(el as HTMLButtonElement).disabled) {
        blip(el.classList.contains("nav-btn") ? 500 : 440);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // showModal() focuses the first focusable child — the close button — which lit
  // its focus ring on open. Safari ignores `autofocus` on the dialog itself, so
  // take the focus explicitly. Tab still reaches the controls and rings them.
  function openDialog() {
    ref.current?.showModal();
    ref.current?.focus();
  }

  function changeTheme(next: boolean) {
    setDusk(next);
    if (next) document.documentElement.setAttribute("data-theme", "dusk");
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", next ? "dusk" : "day");
  }

  function changeVolume(next: number) {
    setVol(next);
    setVolume(next / 100);
    localStorage.setItem("volume", String(next));
    blip(660); // hear the level you're setting
  }

  function changeMusicVolume(next: number) {
    setMusicVol(next);
    setMusicVolume(next / 100);
    localStorage.setItem("musicVolume", String(next));
    wantsMusic.current = next > 0;
    if (next > 0) startMusic();
    else stopMusic();
  }

  return (
    <>
      <button className="nav-btn" onClick={openDialog} aria-label="settings">
        <span className="icon icon-gear" />
      </button>

      <dialog
        ref={ref}
        className="win"
        tabIndex={-1}
        onClick={(e) => {
          if (e.target === ref.current) ref.current.close();
        }}
      >
        <div className="win-bar">
          <span>SETTINGS.EXE</span>
          <button className="btn cap" onClick={() => ref.current?.close()} aria-label="close">
            <span className="icon icon-close" />
          </button>
        </div>

        <div className="win-body">
          <div className="win-row">
            <label className="win-label" htmlFor="set-theme">
              NIGHT MODE
            </label>
            <input
              id="set-theme"
              className="switch"
              type="checkbox"
              checked={dusk}
              onChange={(e) => changeTheme(e.target.checked)}
            />
          </div>

          <div className="win-row">
            <label className="win-label" htmlFor="set-music">
              <span className={`icon ${musicVol === 0 ? "icon-pause" : "icon-play"}`} />
              MUSIC {musicVol === 0 ? "OFF" : `${musicVol}%`}
            </label>
            <input
              id="set-music"
              className="range"
              type="range"
              min={0}
              max={100}
              step={10}
              value={musicVol}
              onChange={(e) => changeMusicVolume(Number(e.target.value))}
            />
          </div>

          <div className="win-row">
            <label className="win-label" htmlFor="set-vol">
              <span className={`icon ${vol === 0 ? "icon-mute" : "icon-volume"}`} />
              SOUND {vol === 0 ? "MUTED" : `${vol}%`}
            </label>
            <input
              id="set-vol"
              className="range"
              type="range"
              min={0}
              max={100}
              step={10}
              value={vol}
              onChange={(e) => changeVolume(Number(e.target.value))}
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
