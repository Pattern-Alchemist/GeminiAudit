import type { KarmaForm, KarmaOutput, KarmicDebt } from "@shared/schema";

// Utility functions
function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function sumDigits(n: number): number {
  return n > 9
    ? sumDigits(
        String(n)
          .split("")
          .reduce((a, c) => a + parseInt(c, 10), 0)
      )
    : n;
}

// Compute Karma DNA deterministic output
export function computeKarmaDNA(form: KarmaForm): KarmaOutput {
  const seed = (form.name + form.date)
    .split("")
    .reduce((a, c) => a + c.charCodeAt(0), 0);
  const pct = (n: number) => clamp(n % 100, 30, 95);
  const integrity = pct((seed * 31) % 100);
  const reciprocity = pct((seed * 17) % 100);
  const value = pct((seed * 23) % 100);

  const coreList = [
    "Boundaries before rescue",
    "Own your ask, early",
    "Slow down to decide",
    "Choose truth over harmony",
  ];
  const boundaryList = [
    "If it costs sleep, say no",
    "No rescue without request",
    "One ask per day, clean",
    "Reply within 24h, or decline",
  ];
  const shadowList = [
    "People-pleasing",
    "Avoidant asks",
    "Over-control",
    "Delay loops",
  ];
  const idx = seed % 4;

  return {
    scores: { integrity, reciprocity, value },
    core: coreList[idx],
    shadow: shadowList[idx],
    boundary: boundaryList[idx],
    window: { start: "2025-11-22", end: "2025-12-02" },
  };
}

// Chaldean numerology map
const chaldeanMap: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
  s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7,
};

// Scan for karmic debts using Chaldean numerology
export function scanKarmicDebts(name: string, dob: string): KarmicDebt[] {
  const clean = name.toLowerCase().replace(/[^a-z]/g, "");
  const total = clean
    .split("")
    .reduce((a, c) => a + (chaldeanMap[c] || 0), 0);
  const nameNum = sumDigits(total);
  const mod = dob
    ? sumDigits(
        dob
          .replace(/[^0-9]/g, "")
          .split("")
          .reduce((a, c) => a + parseInt(c, 10), 0)
      )
    : 0;
  const codes: KarmicDebt["code"][] = [13, 14, 16, 19];
  const pick = codes[(nameNum + mod) % codes.length];
  const dict: Record<
    KarmicDebt["code"],
    Omit<KarmicDebt, "code">
  > = {
    13: {
      label: "Work ethic karma",
      why: "Avoid shortcuts; finish what you start.",
      action: "Ship one small task before noon.",
    },
    14: {
      label: "Freedom discipline",
      why: "Scattered energy dilutes power.",
      action: "Define a 2-hour focus block; phone outside room.",
    },
    16: {
      label: "Humility/Ego reset",
      why: "Image over substance backfires.",
      action: "Ask for feedback from one trusted friend.",
    },
    19: {
      label: "Authority/Independence",
      why: "Delegation avoidance limits scale.",
      action: "Document and hand off one task today.",
    },
  };
  const d = dict[pick];
  return [{ code: pick, ...d }];
}
