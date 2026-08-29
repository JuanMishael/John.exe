"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import { blip } from "@/lib/audio";

const LINES = [
  "$ whoami",
  "john_calimoso — full-stack dev",
  "$ ./ship.sh --stack dotnet,react",
  "build ok · 0 errors · deployed",
];

const HELP = [
  "available commands:",
  "  whoami       who is this guy",
  "  about        the short version",
  "  projects     list the work",
  "  open <slug>  open a case study",
  "  skills       what i build with",
  "  contact      how to reach me",
  "  clear        clear the screen",
  "  exit         back to the animation",
];

const BANNER = [
  "john.exe — interactive shell",
  "type `help` for commands, `exit` to leave.",
  "",
];

// Static replies. Anything that needs the router or the history lives in run().
const REPLIES: Record<string, string[]> = {
  whoami: ["john_calimoso — full-stack dev", "based in the philippines · .NET + React"],
  about: [
    "several years between .NET backends and React front ends —",
    "enterprise telco platforms down to scrappy internal tools.",
    "off the clock: a camera. → unsplash.com/@juan_ito",
  ],
  skills: [
    "frontend   react · typescript · javascript · html/css",
    "backend    .net · c# · asp.net core · node.js",
    "mobile     react native · electron",
    "tools      git · docker · playwright · appium",
    "ml         tensorflow lite · python · opencv",
  ],
  contact: [
    "mail       johnmishaelparcal@gmail.com",
    "linkedin   /in/john-mishael-calimoso-148abb257",
    "github     @JuanMishael",
    "unsplash   @juan_ito",
  ],
  sudo: ["nice try."],
};

export default function Terminal() {
  const [live, setLive] = useState(false);
  const [max, setMax] = useState(false);

  // Esc restores, matching what the settings dialog's native <dialog> already does.
  useEffect(() => {
    if (!max) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMax(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [max]);

  return (
    <>
      {max && <div className="term-backdrop" onClick={() => setMax(false)} />}
      {/* ponytail: maximising fixes the frame out of the hero grid. The column is
          sized in fr so nothing beside it shifts, and the backdrop covers the rest. */}
      <div className={max ? "term term-max" : "term"}>
        <div className="term-bar">
          <span className="term-dot" style={{ background: "#ff5f57" }} />
          <button
            type="button"
            className="term-dot"
            style={{ background: "#febc2e" }}
            onClick={() => setMax(false)}
            title="Restore"
            aria-label="Restore terminal"
          />
          <button
            type="button"
            className="term-dot"
            style={{ background: "#28c840" }}
            onClick={() => setMax(true)}
            title="Maximise"
            aria-label="Maximise terminal"
          />
          <span className="term-name">terminal — {live ? "john.exe" : "zsh"}</span>
        </div>

        {/* Remounting on exit resets the animation's internal timers cleanly, and
            client-side nav away from the page unmounts it anyway. */}
        {live ? <Shell onExit={() => setLive(false)} /> : <Demo onStart={() => setLive(true)} />}

        <button
          type="button"
          className="term-hint"
          onClick={() => setLive(!live)}
        >
          {live ? (
            <>
              [ type <span style={{ color: "var(--term-fg)" }}>exit</span> to stop the ride ]
            </>
          ) : (
            <>
              [ press <span style={{ color: "var(--term-fg)" }}>ENTER</span> to take the wheel ]
            </>
          )}
        </button>
      </div>
    </>
  );
}

/* ---- idle animation ---------------------------------------------------- */

function Demo({ onStart }: { onStart: () => void }) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let phase: "typing" | "pausing" | "deleting" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const line = LINES[lineIdx];
      let delay = 40;
      if (phase === "typing") {
        if (charIdx < line.length) {
          charIdx += 1;
          setTyped(line.slice(0, charIdx));
        } else {
          phase = "pausing";
          delay = 1200;
        }
      } else if (phase === "pausing") {
        phase = "deleting";
        delay = 300;
      } else {
        if (charIdx > 0) {
          charIdx -= 1;
          setTyped(line.slice(0, charIdx));
          delay = 18;
        } else {
          phase = "typing";
          lineIdx = (lineIdx + 1) % LINES.length;
        }
      }
      timer = setTimeout(tick, delay);
    }

    tick();
    return () => clearTimeout(timer);
  }, []);

  // Enter from anywhere on the page — but not while the visitor is tabbed onto
  // something Enter already means something for.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Enter") return;
      if ((e.target as Element | null)?.closest("a, button, input, dialog")) return;
      onStart();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onStart]);

  return (
    <div className="term-screen">
      {typed}
      <span className="blink">█</span>
    </div>
  );
}

/* ---- interactive shell ------------------------------------------------- */

function Shell({ onExit }: { onExit: () => void }) {
  const router = useRouter();
  const [history, setHistory] = useState<string[]>(BANNER);
  const [value, setValue] = useState("");
  const screen = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  useEffect(() => {
    if (screen.current) screen.current.scrollTop = screen.current.scrollHeight;
  }, [history]);

  function run(raw: string) {
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    const echo = `$ ${raw}`;
    const out = (lines: string[]) => setHistory((h) => [...h, echo, ...lines, ""]);

    if (!cmd) return setHistory((h) => [...h, echo]);
    blip(520);

    switch (cmd) {
      case "help":
        return out(HELP);
      case "clear":
        return setHistory([]);
      case "exit":
        return onExit();
      case "ls":
      case "projects":
        return out([
          `${PROJECTS.length} projects — \`open <slug>\` to read one:`,
          ...PROJECTS.map((p) => `  ${p.slug.padEnd(21)}${p.name}`),
        ]);
      case "open": {
        const slug = rest[0];
        const project = PROJECTS.find((p) => p.slug === slug);
        if (!project) {
          return out([slug ? `no project called \`${slug}\`` : "usage: open <slug>", "try `projects`"]);
        }
        out([`opening ${project.name}…`]);
        return router.push(`/projects/${project.slug}`);
      }
      default:
        return out(REPLIES[cmd] ?? [`command not found: ${cmd} — try \`help\``]);
    }
  }

  return (
    <div className="term-screen" ref={screen} onClick={() => input.current?.focus()}>
      {history.map((line, i) => (
        <div key={i}>{line || " "}</div>
      ))}
      <div style={{ display: "flex" }}>
        <span style={{ paddingRight: "0.5ch" }}>$</span>
        <input
          ref={input}
          className="term-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            run(value);
            setValue("");
          }}
          aria-label="terminal input"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
