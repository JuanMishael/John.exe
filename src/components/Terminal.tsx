"use client";

import { useEffect, useState } from "react";

const LINES = [
  "$ whoami",
  "john_calimoso — full-stack dev",
  "$ ./ship.sh --stack dotnet,react",
  "build ok · 0 errors · deployed",
];

export default function Terminal() {
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

  return (
    <div className="term">
      <div className="term-bar">
        <span style={{ width: 11, height: 11, background: "#ff5f57" }} />
        <span style={{ width: 11, height: 11, background: "#febc2e" }} />
        <span style={{ width: 11, height: 11, background: "#28c840" }} />
        <span style={{ marginLeft: "auto", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          terminal — zsh
        </span>
      </div>
      <div
        style={{
          padding: "28px 24px",
          fontSize: 22,
          color: "var(--term-fg)",
          minHeight: 190,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
        }}
      >
        {typed}
        <span className="blink">█</span>
      </div>
    </div>
  );
}
