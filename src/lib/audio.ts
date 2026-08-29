// 8-bit audio, entirely synthesised — the pixel kit's square-wave UI blip plus a
// looping chiptune. No audio files, so nothing to download and nothing to host.
let ac: AudioContext | undefined;
let sfxVolume = 0.5;
let musicVolume = 0.3;
let musicOut: GainNode | undefined;
let timer: ReturnType<typeof setTimeout> | undefined;
let step = 0;
let nextAt = 0;

function context() {
  if (ac) return ac;
  const AC =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return AC ? (ac = new AC()) : undefined;
}

// resume() is async — scheduling before it settles silently drops the note.
function ready(c: AudioContext, then: () => void) {
  if (c.state === "suspended") c.resume().then(then);
  else then();
}

function tone(
  c: AudioContext,
  dest: AudioNode,
  freq: number,
  at: number,
  dur: number,
  type: OscillatorType,
  peak: number,
) {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, at);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.linearRampToValueAtTime(peak, at + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g);
  g.connect(dest);
  o.start(at);
  o.stop(at + dur + 0.02);
}

/* ---- UI blips ---------------------------------------------------------- */

export function setVolume(v: number) {
  sfxVolume = v;
}

export function blip(freq = 440, dur = 0.07) {
  if (sfxVolume <= 0) return;
  const c = context();
  if (!c) return;
  ready(c, () => {
    // Lookahead, not currentTime: a note scheduled at exactly currentTime lands
    // in a render quantum the context has already passed, and gets dropped.
    const t = c.currentTime + 0.02;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(freq, t);
    o.frequency.setValueAtTime(freq * 1.5, t + dur / 2); // the little upward chirp
    g.gain.setValueAtTime(0.12 * sfxVolume, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(c.destination);
    o.start(t);
    o.stop(t + dur);
  });
}

/* ---- background music -------------------------------------------------- */

const STEP = 0.13; // seconds per sixteenth
// A-minor pentatonic wander over Am–F–C–G. 0 = rest.
const LEAD = [
  440, 0, 523, 587, 659, 0, 587, 0,
  523, 0, 440, 0, 392, 0, 440, 0,
  523, 0, 659, 587, 523, 0, 440, 0,
  392, 0, 440, 523, 440, 0, 0, 0,
];
const BASS = [110, 87.31, 130.81, 98];

export function isMusicPlaying() {
  return timer !== undefined;
}

export function setMusicVolume(v: number) {
  musicVolume = v;
  if (musicOut && ac) musicOut.gain.setTargetAtTime(v, ac.currentTime, 0.02);
}

// ponytail: lookahead scheduler. setTimeout alone drifts audibly — it queues the
// next ~250ms of notes on the audio clock and only uses the timer to top up.
function tick(c: AudioContext, out: GainNode) {
  while (nextAt < c.currentTime + 0.25) {
    const lead = LEAD[step % LEAD.length];
    if (lead) tone(c, out, lead, nextAt, STEP * 1.6, "square", 0.2);
    if (step % 8 === 0) {
      tone(c, out, BASS[(step / 8) % BASS.length], nextAt, STEP * 7, "triangle", 0.35);
    }
    nextAt += STEP;
    step += 1;
  }
  timer = setTimeout(() => tick(c, out), 80);
}

export function startMusic() {
  if (timer !== undefined) return;
  const c = context();
  if (!c) return;
  ready(c, () => {
    if (!musicOut) {
      musicOut = c.createGain();
      musicOut.connect(c.destination);
    }
    musicOut.gain.value = musicVolume;
    step = 0;
    nextAt = c.currentTime + 0.1;
    tick(c, musicOut);
  });
}

export function stopMusic() {
  if (timer !== undefined) {
    clearTimeout(timer);
    timer = undefined;
  }
  // fade rather than cut — notes already on the audio clock can't be unscheduled
  if (musicOut && ac) musicOut.gain.setTargetAtTime(0, ac.currentTime, 0.05);
}
