// index.tsx — Single‑file Legacy MVP (fixed stray bracket after Header + added self‑tests)
// Purpose: Run inside a single code file without external tooling. No JSON blocks in TS.
// Includes: Home, Dashboard, Karma (DNA/Debts/Impacts/Radar/Bond), Consultations,
//           Billing (UPI/PayPal placeholders), Radio (Zeno FM), ScoreRing component,
//           deterministic demo engines, and minimal self‑tests.

import React, { useEffect, useMemo, useState } from "react";

// ──────────────────────────────────────────────────────────────────────────────
// THEME (cosmic dark)
// ──────────────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700..900&family=Inter:wght@400;500;600;700;800&display=swap');
  :root{
    /* Brand Tokens */
    --bg:#0B0F14;           /* Cosmic Ink */
    --surface:#121821;      /* Nebula Gray */
    --text:#EAF0F8;         /* Aether White */
    --primary:#00C9A7;      /* Ritual Teal (success/primary) */
    --accent:#FFD700;       /* Starlight Gold (badges/accents) */
    --danger:#FF4F81;       /* Warning Rose (errors) */
    --success:#00C9A7;      /* alias for score ring */
    --warning:#FFD700;      /* alias for score ring */
    --muted:#A8B3C7;
    --border:rgba(255,255,255,0.08);
    --grad:linear-gradient(135deg,#00F0FF 0%,#FF00C8 100%); /* Aurora */
    /* Radii */
    --r-card:16px; --r-hero:24px; --r-input:8px;
  }
  html,body,#root{height:100%}
  body{margin:0;background:var(--bg);color:var(--text);font:15px/1.6 Inter,system-ui,Segoe UI,Roboto,Arial}
  h1,h2,h3,.brand{font-family:"Playfair Display",serif;letter-spacing:.2px}
  .container{max-width:1240px;margin:0 auto;padding:24px}
  .card{background:var(--surface);backdrop-filter:blur(12px);border:1px solid var(--border);border-radius:var(--r-card);box-shadow:0 10px 30px rgba(0,0,0,.35)}
  .btn{display:inline-flex;align-items:center;gap:8px;border-radius:12px;padding:10px 14px;border:1px solid var(--border);background:transparent;color:var(--text);cursor:pointer;transition:transform .25s ease, box-shadow .25s ease, background-color .25s ease}
  .btn:hover{background:rgba(255,255,255,.05);transform:translateY(-1px);box-shadow:0 8px 18px rgba(0,0,0,.35)}
  .btn-primary{background:rgba(0,201,167,.15);color:var(--primary);border-color:rgba(0,201,167,.45)}
  .btn-primary:hover{background:rgba(0,201,167,.25)}
  .badge{display:inline-block;padding:4px 8px;border-radius:999px;background:rgba(255,215,0,.12);color:var(--accent);border:1px solid rgba(255,215,0,.35);font-size:12px}
  .muted{color:var(--muted)}
  .row{display:grid;gap:16px}
  @media(min-width:900px){.row-2{grid-template-columns:1fr 1fr}.row-3{grid-template-columns:1fr 1fr 1fr}.row-4{grid-template-columns:1fr 1fr 1fr 1fr}}
  input,select{width:100%;padding:10px 12px;border-radius:var(--r-input);border:1px solid var(--border);background:rgba(0,0,0,.25);color:var(--text)}
  .nav{position:sticky;top:0;z-index:10;background:rgba(11,24,33,.7);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}
  .nav strong{font-family:"Playfair Display",serif;font-weight:800;letter-spacing:.5px}
  .tabs{display:flex;gap:16px}
  .grad{background:var(--grad)}
  .gradient-text{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
  a{color:inherit;text-decoration:none}
  /* Starfield */
  .starfield{position:relative;overflow:hidden;border-radius:var(--r-hero)}
  .starfield::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 20% 30%, rgba(255,255,255,.15), transparent 40%),radial-gradient(ellipse at 80% 70%, rgba(255,255,255,.12), transparent 45%)}
  .starfield::after{content:"";position:absolute;inset:-200% -200% 0 -200%;background:repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,.08) 0 1px, transparent 1px 2px);animation: drift 60s linear infinite}
  @keyframes drift{to{transform:translate3d(25%,25%,0)}}
  /* Modal */
  .modal{position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:50}
  .modal .panel{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-card);padding:16px;max-width:540px;width:92%}
  /* Gradient border helper */
  .border-grad{background:var(--grad);padding:1px;border-radius:var(--r-card)}
  .border-grad .inner{background:var(--surface);border-radius:var(--r-card);height:100%;}
  /* Toast */
  .toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:12px 16px;box-shadow:0 10px 30px rgba(0,0,0,.35);z-index:60}
`;

// Inject CSS once
const Style: React.FC = () => <style dangerouslySetInnerHTML={{ __html: css }} />;

// Tiny toast system (event-driven)
const Toast: React.FC = () => {
  const [msg,setMsg]=useState("");
  useEffect(()=>{
    const h = (e: any) => { setMsg(e?.detail?.message || ""); setTimeout(()=>setMsg(""), 2600); };
    window.addEventListener('ak:toast', h as any);
    return ()=> window.removeEventListener('ak:toast', h as any);
  },[]);
  if(!msg) return null;
  return <div className="toast">{msg}</div>;
};

// ──────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ──────────────────────────────────────────────────────────────────────────────
function clamp(n: number, lo: number, hi: number): number { return Math.max(lo, Math.min(hi, n)); }
function sumDigits(n: number): number { return n > 9 ? sumDigits(String(n).split("").reduce((a, c) => a + parseInt(c, 10), 0)) : n; }

// ──────────────────────────────────────────────────────────────────────────────
// DETERMINISTIC DEMO ENGINES (swap with real astro/numerology later)
// ──────────────────────────────────────────────────────────────────────────────
export type KarmaForm = { name: string; date: string; time: string; place: string };
export type KarmaOutput = {
  scores: { integrity: number; reciprocity: number; value: number };
  core: string; shadow: string; boundary: string; window: { start: string; end: string };
};

export function computeKarmaDNA(form: KarmaForm): KarmaOutput {
  const seed = (form.name + form.date).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const pct = (n: number) => clamp(n % 100, 30, 95);
  const integrity = pct((seed * 31) % 100);
  const reciprocity = pct((seed * 17) % 100);
  const value = pct((seed * 23) % 100);
  const coreList = [
    "Boundaries before rescue",
    "Own your ask, early",
    "Slow down to decide",
    "Choose truth over harmony"
  ];
  const boundaryList = [
    "If it costs sleep, say no",
    "No rescue without request",
    "One ask per day, clean",
    "Reply within 24h, or decline"
  ];
  const shadowList = ["People‑pleasing", "Avoidant asks", "Over‑control", "Delay loops"];
  const idx = seed % 4;
  return {
    scores: { integrity, reciprocity, value },
    core: coreList[idx],
    shadow: shadowList[idx],
    boundary: boundaryList[idx],
    window: { start: "2025‑11‑22", end: "2025‑12‑02" }
  };
}

const chaldeanMap: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1, j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2, s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7
};
export type Debt = { code: 13 | 14 | 16 | 19; label: string; why: string; action: string };
export function scanKarmicDebts(name: string, dob: string): Debt[] {
  const clean = name.toLowerCase().replace(/[^a-z]/g, "");
  const total = clean.split("").reduce((a, c) => a + (chaldeanMap[c] || 0), 0);
  const nameNum = sumDigits(total);
  const mod = dob ? sumDigits(dob.replace(/[^0-9]/g, "").split("").reduce((a, c) => a + parseInt(c, 10), 0)) : 0;
  const codes: Debt["code"][] = [13, 14, 16, 19];
  const pick = codes[(nameNum + mod) % codes.length];
  const dict: Record<Debt["code"], Omit<Debt, "code">> = {
    13: { label: "Work ethic karma", why: "Avoid shortcuts; finish what you start.", action: "Ship one small task before noon." },
    14: { label: "Freedom discipline", why: "Scattered energy dilutes power.", action: "Define a 2‑hour focus block; phone outside room." },
    16: { label: "Humility/Ego reset", why: "Image over substance backfires.", action: "Ask for feedback from one trusted friend." },
    19: { label: "Authority/Independence", why: "Delegation avoidance limits scale.", action: "Document and hand off one task today." }
  };
  const d = dict[pick];
  return [{ code: pick, ...d }];
}

// ──────────────────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ──────────────────────────────────────────────────────────────────────────────
const Header: React.FC<{ route: string; onNav: (r: string) => void; plan?: 'free'|'pro' }> = ({ route, onNav, plan }) => {
  return (
    <div className="nav">
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <strong className="brand">AstroKalki</strong>
          {plan === 'pro' && <span className="badge">PRO</span>}
        </div>
        <div className="tabs">
          {[
            { href: "home", label: "Home" },
            { href: "dashboard", label: "Dashboard" },
            { href: "karma", label: "Karma" },
            { href: "plans", label: "Plans" },
            { href: "consultations", label: "Consultations" },
            { href: "billing", label: "Billing" },
            { href: "radio", label: "Radio" },
            { href: "agent", label: "Concierge" }
          ].map((t) => (
            <a
              key={t.href}
              href={`#${t.href}`}
              onClick={(e) => { e.preventDefault(); onNav(t.href); }}
              style={{ color: route === t.href ? "var(--primary)" : "var(--text)", opacity: route === t.href ? 1 : 0.8 }}
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScoreRing: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const r = 26; const c = 2 * Math.PI * r; const o = c - (value / 100) * c;
  const stroke = value >= 70 ? "var(--success)" : value >= 40 ? "var(--warning)" : "var(--danger)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={72} height={72} viewBox="0 0 72 72">
        <circle cx={36} cy={36} r={r} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth={8} />
        <circle cx={36} cy={36} r={r} fill="none" stroke={stroke} strokeWidth={8} strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" />
        <text x={36} y={40} textAnchor="middle" fontSize={12} fill="currentColor">{value}</text>
      </svg>
      <div style={{ opacity: .8, fontSize: 12, marginTop: 4 }}>{label}</div>
    </div>
  );
};

const RadioWidget: React.FC<{ src?: string; height?: number }> = ({ src, height = 300 }) => {
  const url = src || "https://zeno.fm/player/astrokalki-live";
  return (
    <div className="card" style={{ padding: 8, maxWidth: 720 }}>
      <iframe title="ASTROKALKI LIVE – Zeno.FM" src={url} style={{ width: "100%", height }} frameBorder={0} scrolling="no" loading="lazy"></iframe>
      <a href="https://zeno.fm/" target="_blank" rel="noreferrer" style={{ display: "block", marginTop: 6, fontSize: 13, opacity: .7, textDecoration: "underline" }}>A Zeno.FM Station</a>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// VIEWS
// ──────────────────────────────────────────────────────────────────────────────
const Home: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <section className="container">
    <div className="row row-2" style={{ alignItems: "stretch" }}>
      <div className="starfield" style={{ padding: 24 }}>
        <div className="grad" style={{ position:'absolute', inset:0, opacity:.12, borderRadius:'var(--r-hero)' }} />
        <div style={{ position:'relative' }}>
          <span className="badge">New • Real Karma Tools</span>
          <h1 style={{ fontSize: 44, fontWeight: 800, marginTop: 8 }}>
            <span className="gradient-text">Decode your Karma.</span><br/>Heal your path.
          </h1>
          <p className="muted" style={{ maxWidth: 640, marginTop: 8 }}>
            Not tarot. Not vague horoscopes. Pattern‑grade, birth‑data based readings crafted for action: do one true thing today, track it, and grow.
          </p>
          <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
            <button className="btn btn-primary" onClick={onStart}>Start Karma DNA</button>
            <a className="btn" href="#plans">See Plans</a>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <h3>Choose an outcome</h3>
        <div className="row row-2" style={{ marginTop: 8 }}>
          {[
            { t: 'Career', d:'Fix leaks • ask clean', go:'#karma' },
            { t: 'Love', d:'Boundaries • Bond map', go:'#karma' },
            { t: 'Money', d:'Value • Debts • windows', go:'#karma' },
            { t: 'Health', d:'Slow down • truth pace', go:'#karma' }
          ].map((c,i)=> (
            <a key={i} href={c.go} className="card" style={{ padding:16 }}>
              <div style={{ fontWeight:700 }}>{c.t}</div>
              <div className="muted">{c.d}</div>
            </a>
          ))}
        </div>
        <div className="row row-3" style={{ marginTop: 16 }}>
          {[{t:'Karma Pulse',d:'DO/DON\'T/Mantra today'},{t:'Compatibility Snapshot',d:'Mind/Heart/Will %'},{t:'Destiny Window',d:'Next 90‑day map'}].map((x,i)=>(
            <div key={i} className="card" style={{ padding:16 }}>
              <div style={{ fontWeight:700 }}>{x.t}</div>
              <div className="muted">{x.d}</div>
              <a className="btn btn-primary" href="#karma" style={{ marginTop:8 }}>Try now</a>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:16, marginTop:16 }}>
          <h3>Why we\'re not scams</h3>
          <ul className="muted">
            <li>Actionable, testable guidance (no vague fortune lines)</li>
            <li>Privacy-first • We don\'t sell data</li>
            <li>Transparent ethics • Refund notes for paid plans</li>
          </ul>
          <div style={{ marginTop:8 }}><span className="badge">Privacy Compliant</span></div>
        </div>
        <div className="card" style={{ padding:16, marginTop:16, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div><strong>Ready for more?</strong><div className="muted">See plans from ₹100 • Book a session</div></div>
          <a className="btn btn-primary" href="#plans">Book a Session</a>
        </div>
        {/* Payment options card */}
        <div className="card" style={{ padding:16, marginTop:16 }}>
          <h3>Payment options</h3>
          <div className="muted">Quick support & direct checkout</div>
          <div style={{ display:'flex', gap:8, alignItems:'center', marginTop:8, flexWrap:'wrap' }}>
            <div><strong>UPI:</strong> 9211271977@hdfcbank</div>
            <button className="btn" onClick={()=>{ navigator.clipboard?.writeText('9211271977@hdfcbank'); window.dispatchEvent(new CustomEvent('ak:toast',{detail:{message:'UPI copied'}})); }}>Copy</button>
            <a className="btn" href="upi://pay?pa=9211271977%40hdfcbank&pn=AstroKalki&cu=INR">Open UPI</a>
            <a className="btn" href="https://paypal.me/kaus777" target="_blank" rel="noreferrer">PayPal</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Dashboard: React.FC = () => (
  <section className="container">
    <div className="row row-3">
      <div className="card" style={{ padding: 16 }}>
        <h3>Today’s Pulse</h3>
        <div style={{ marginTop: 8 }}>
          <div><strong>DO</strong>: Send one clean ask to a warm lead.</div>
          <div><strong>AVOID</strong>: Delaying uncomfortable replies.</div>
          <div><strong>CONNECT</strong>: Voice note to the person you’ve been avoiding.</div>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button className="btn btn-primary">Done</button>
          <button className="btn">Log truth</button>
        </div>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <h3>Scores</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 12 }}>
          <ScoreRing label="Integrity" value={72} />
          <ScoreRing label="Reciprocity" value={64} />
          <ScoreRing label="Value" value={78} />
        </div>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <h3>Next Impact Window</h3>
        <div style={{ marginTop: 8, fontSize: 14 }}>Break Pattern · 22 Nov → 02 Dec</div>
        <a className="btn" style={{ marginTop: 12 }} href="#karma-impacts">Open timeline</a>
      </div>
    </div>
    <div className="card" style={{ padding: 16, marginTop: 16 }}>
      <h3>Recent Reads</h3>
      <ul style={{ marginTop: 8 }}>
        <li>DNA · Core Lesson: Boundaries before rescue</li>
        <li>Debts · 14: Freedom requires structure</li>
        <li>Bond · Why you met: Saturn mutual lesson</li>
      </ul>
    </div>
  </section>
);

const KarmaHub: React.FC<{ onOpen: (slug: string) => void }> = ({ onOpen }) => {
  const tools = [
    { slug: "dna", title: "Karma DNA", desc: "Moon nakshatra, Saturn, Nodes → Core Lesson + Activation Window" },
    { slug: "debts", title: "Karmic Debts", desc: "Name + DOB → 13/14/16/19 flags with micro‑actions" },
    { slug: "impacts", title: "Impact Windows", desc: "Next 90 days: Break Pattern / Integrity Test / Opportunity Gate" },
    { slug: "radar", title: "House Radar", desc: "SAV‑lite heat‑map → leak fixes" },
    { slug: "bond", title: "Bond Karma", desc: "Saturn + Nodes synastry → why/where/how" }
  ];
  return (
    <section className="container">
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Karma Engine</h1>
      <div className="row row-3" style={{ marginTop: 16 }}>
        {tools.map((t) => (
          <div key={t.slug} className="card" style={{ padding: 16 }}>
            <h3>{t.title}</h3>
            <p className="muted" style={{ marginTop: 4 }}>{t.desc}</p>
            <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => onOpen(t.slug)}>Open</button>
          </div>
        ))}
      </div>
    </section>
  );
};

const KarmaDNA: React.FC = () => {
  const [form, setForm] = useState<KarmaForm>({ name: "", date: "", time: "", place: "" });
  const output = useMemo(() => (form.name && form.date ? computeKarmaDNA(form) : null), [form]);
  return (
    <section className="container">
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>Karma DNA</h1>
      <div className="row row-2" style={{ marginTop: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div style={{ height: 12 }} />
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <div style={{ height: 12 }} />
          <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          <div style={{ height: 12 }} />
          <input placeholder="Birth place (city, country)" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} />
          <div style={{ height: 12 }} />
          <button className="btn btn-primary" onClick={() => setForm({ ...form })}>Generate</button>
        </div>
        <div className="card" style={{ padding: 16 }}>
          {!output ? (
            <p className="muted">Fill your birth details to see your Core Lesson, Shadow Trigger, Boundary Rule and Activation Window.</p>
          ) : (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                <ScoreRing label="Integrity" value={output.scores.integrity} />
                <ScoreRing label="Reciprocity" value={output.scores.reciprocity} />
                <ScoreRing label="Value" value={output.scores.value} />
              </div>
              <div style={{ marginTop: 12, fontSize: 14 }}>
                <div><strong>Core Lesson:</strong> {output.core}</div>
                <div><strong>Shadow Trigger:</strong> {output.shadow}</div>
                <div><strong>Boundary Rule:</strong> {output.boundary}</div>
                <div><strong>Activation Window:</strong> {output.window.start} → {output.window.end}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const KarmaDebts: React.FC = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const debts = useMemo(() => (name ? scanKarmicDebts(name, dob) : []), [name, dob]);
  return (
    <section className="container">
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>Karmic Debts</h1>
      <div className="row row-2" style={{ marginTop: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <div style={{ height: 12 }} />
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div className="card" style={{ padding: 16 }}>
          {debts.length === 0 ? (
            <p className="muted">Enter your name + date of birth to see potential Karmic Debt flags and micro‑actions.</p>
          ) : (
            <ul>
              {debts.map((d, i) => (
                <li key={i} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 12, marginTop: 8 }}>
                  <div style={{ fontWeight: 600 }}>Debt {d.code} — {d.label}</div>
                  <div className="muted" style={{ marginTop: 4 }}>{d.why}</div>
                  <div style={{ marginTop: 4 }}><strong>Micro‑action:</strong> {d.action}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

const KarmaImpacts: React.FC = () => (
  <section className="container">
    <h1 style={{ fontSize: 24, fontWeight: 800 }}>Impact Windows (Next 90 days)</h1>
    <div className="card" style={{ padding: 16, marginTop: 16 }}>
      {[{ t: "Break Pattern", d: "22 Nov → 02 Dec", c: "Undo a repeating loop by making the uncomfortable call." }, { t: "Test of Integrity", d: "10 Dec → 16 Dec", c: "Say no once where you usually rescue." }, { t: "Opportunity Gate", d: "28 Dec → 06 Jan", c: "Send 3 clean asks with a crisp offer." }].map((w, i) => (
        <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 12, marginTop: 8 }}>
          <div style={{ fontSize: 14 }}>{w.t} • {w.d}</div>
          <div className="muted" style={{ fontSize: 14 }}>{w.c}</div>
        </div>
      ))}
    </div>
  </section>
);

const KarmaRadar: React.FC = () => (
  <section className="container">
    <h1 style={{ fontSize: 24, fontWeight: 800 }}>House Weak‑Spot Radar</h1>
    <div className="card" style={{ padding: 16, marginTop: 16 }}>
      <p className="muted">SAV‑lite heat‑map coming soon. For MVP, we surface 2 leaks with boundary actions.</p>
      <ul>
        <li style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 12, marginTop: 8 }}><strong>House 7 (Relationships):</strong> Over‑giving. Action: delay yes by 24h; propose a fair split.</li>
        <li style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 12, marginTop: 8 }}><strong>House 2 (Resources):</strong> Leaky asks. Action: write & send one clean ask with deadline.</li>
      </ul>
    </div>
  </section>
);

const KarmaBond: React.FC = () => (
  <section className="container">
    <h1 style={{ fontSize: 24, fontWeight: 800 }}>Bond Karma</h1>
    <div className="card" style={{ padding: 16, marginTop: 16, fontSize: 14 }}>
      <div><strong>Why you met:</strong> Saturn mutual lesson on boundaries.</div>
      <div><strong>Where it hurts:</strong> Cycles of rescue → resentment.</div>
      <div><strong>How it heals:</strong> State needs clearly; accept no’s; share load.</div>
      <div style={{ marginTop: 8 }}><strong>Boundary Script:</strong> “I want to support you, and I need us to plan a split that works for both. Here’s what I can do this week…”</div>
    </div>
  </section>
);

const Consultations: React.FC = () => (
  <section className="container">
    <h1 style={{ fontSize: 24, fontWeight: 800 }}>Consultations</h1>
    <div className="row row-3" style={{ marginTop: 16 }}>
      {[
        { t: "1:1 Karma Decode", p: "₹2,999", d: "Personal reading + action plan" },
        { t: "Bond Karma Session", p: "₹3,999", d: "Relationship map + scripts" },
        { t: "Career Nadi", p: "₹2,499", d: "Strengths, tracks, next 2 moves" }
      ].map((c, i) => (
        <div key={i} className="card" style={{ padding: 16 }}>
          <h3>{c.t}</h3>
          <div className="muted">{c.d}</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{c.p}</div>
          <button className="btn btn-primary" style={{ marginTop: 12 }}>Book</button>
        </div>
      ))}
    </div>
  </section>
);

const Billing: React.FC<{ plan: 'free'|'pro'; setPlan: (p:'free'|'pro')=>void }> = ({ plan, setPlan }) => {
  const [showUPI,setShowUPI]=useState(false);
  const [upiId,setUpiId]=useState<string>(()=>{ try{return localStorage.getItem('ak.upi')||'9211271977@hdfcbank';}catch{return '9211271977@hdfcbank';} });
  const [utr,setUtr]=useState("");
  const [proofUrl,setProofUrl]=useState("");
  useEffect(()=>{ try{ if(!localStorage.getItem('ak.upi')) localStorage.setItem('ak.upi','9211271977@hdfcbank'); }catch{} },[]);
  function copy(text:string){ navigator.clipboard?.writeText(text).then(()=> window.dispatchEvent(new CustomEvent('ak:toast',{detail:{message:'Copied!'}}))); }
  function saveUpi(){ try{ localStorage.setItem('ak.upi', upiId); window.dispatchEvent(new CustomEvent('ak:toast',{detail:{message:'UPI ID saved locally'}})); }catch{} }
  function markPro(){ if(!utr){ alert('Enter UTR/Txn ID'); return; } setPlan('pro'); setShowUPI(false); window.dispatchEvent(new CustomEvent('ak:toast',{detail:{message:'✅ Pro unlocked — enjoy Deep Tools!'}})); }
  const upiDeepLink = upiId ? `upi://pay?pa=${encodeURIComponent(upiId)}&pn=AstroKalki&cu=INR` : '';
  return (
    <section className="container">
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>Billing</h1>
      <div className="muted">Current plan: <strong>{plan.toUpperCase()}</strong></div>
      <div className="row row-2" style={{ marginTop: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <h3>Free</h3>
          <ul className="muted">
            <li>All 5 Karma tools (lite)</li>
            <li>Daily Pulse & streaks</li>
            <li>Radio access</li>
          </ul>
        </div>
        <div className="border-grad">
          <div className="inner card" style={{ padding: 16 }}>
            <h3>Pro</h3>
            $1
            <div className="muted" style={{ marginTop:8, fontSize:13 }}>UPI: <code>9211271977@hdfcbank</code></div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn btn-primary" onClick={()=>setShowUPI(true)}>Pay via UPI (proof)</button>
              <button className="btn" onClick={()=>{ window.open('https://paypal.me/kaus777','_blank'); window.dispatchEvent(new CustomEvent('ak:toast',{detail:{message:'Opening PayPal…'}})); }}>PayPal</button>
            </div>
          </div>
        </div>
      </div>
      {showUPI && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="panel">
            <h3>Submit UPI Proof</h3>
            <div className="card" style={{ padding:12, marginTop:8 }}>
              <strong>Step 1 — Send UPI</strong>
              <div style={{ display:'grid', gap:8, marginTop:6 }}>
                <div style={{ display:'flex', gap:8 }}>
                  <input value={upiId} onChange={(e)=>setUpiId(e.target.value)} placeholder="your-upi-id@bank" />
                  <button className="btn" onClick={()=>copy(upiId||'your-upi-id@bank')}>Copy</button>
                  <button className="btn" onClick={saveUpi}>Save</button>
                </div>
                {upiDeepLink && <a className="btn" href={upiDeepLink}>Open UPI app</a>}
                <div className="muted" style={{ fontSize:13 }}>After payment, your app shows a <strong>UTR / Transaction ID</strong>. Paste it below.</div>
              </div>
            </div>
            <div className="card" style={{ padding:12, marginTop:8 }}>
              <strong>Step 2 — Unlock Pro</strong>
              <div style={{ display:'grid', gap:8, marginTop:6 }}>
                <input placeholder="UTR / Transaction ID" value={utr} onChange={(e)=>setUtr(e.target.value)} />
                <input placeholder="Proof image URL (optional)" value={proofUrl} onChange={(e)=>setProofUrl(e.target.value)} />
                <div style={{ display:'flex', gap:8 }}>
                  <button className="btn btn-primary" onClick={markPro}>Mark Paid & Unlock Pro</button>
                  <button className="btn" onClick={()=>setShowUPI(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// RADIO with tabs: Live / Episodes
const Radio: React.FC = () => {
  const [tab, setTab] = useState<'live'|'episodes'>('live');
  const episodes = [
    { title: 'Welcome to AstroKalki', note:'What this is, and how to use it'},
    { title: 'Boundaries before rescue', note:'Why boundaries are the first medicine'},
    { title: 'Ask early, ask clean', note:'The power of clear asking'}
  ];
  return (
    <section className="container">
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>ASTROKALKI RADIO</h1>
      <div style={{ display:'flex', gap:8, marginTop:8 }}>
        <span className={`btn ${tab==='live'?'btn-primary':''}`} onClick={()=>setTab('live')}>Live</span>
        <span className={`btn ${tab==='episodes'?'btn-primary':''}`} onClick={()=>setTab('episodes')}>Episodes</span>
      </div>
      {tab==='live' ? (
        <div style={{ marginTop: 16 }}>
          <RadioWidget />
          <p style={{ marginTop: 8, fontSize: 12, opacity: .7 }}>
            Trouble loading?
            <a href="https://zeno.fm/player/astrokalki-live" target="_blank" rel="noreferrer" style={{ textDecoration: "underline", marginLeft: 6 }}>Open in a new tab</a>.
          </p>
        </div>
      ) : (
        <div className="card" style={{ padding:16, marginTop:16 }}>
          <p className="muted">On‑demand catalog coming soon. For now, here’s the starter lineup:</p>
          <ul style={{ marginTop:8 }}>
            {episodes.map((e,i)=> (
              <li key={i} style={{ border:'1px solid var(--border)', borderRadius:12, padding:12, marginTop:8 }}>
                <div style={{ fontWeight:600 }}>{e.title}</div>
                <div className="muted" style={{ fontSize:13 }}>{e.note}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

// Plans page
const Plans: React.FC = () => (
  <section className="container">
    <h1 style={{ fontSize: 28, fontWeight: 800 }}>Plans</h1>
    <p className="muted">Simple, transparent pricing in INR.</p>
    <div className="row row-3" style={{ marginTop: 16 }}>
      {[ 
        {t:'Flash K – Quick Insight',p:'₹100',b:['1 question','5–10 min voice mail','1 simple remedy','Email delivery']},
        {t:'KARMA Level – Most Popular',p:'₹1,500',b:['3 deep questions','Remedy outline','25–30 min audio + 7-day chat','PDF']},
        {t:'Cosmic Code – Astrology',p:'₹777',b:['Life path + future events','20-min audio call','Complete PDF report']},
      ].map((x,i)=> (
        i===1 ? (
          <div key={i} className="border-grad">
            <div className="inner card" style={{ padding:16 }}>
              <div className="badge" style={{ marginBottom:6 }}>Best Value</div>
              <h3>{x.t}</h3>
              <div style={{ fontWeight:700, marginTop:6 }}>{x.p}</div>
              <ul className="muted" style={{ marginTop:8 }}>
                {x.b.map((li,idx)=>(<li key={idx}>{li}</li>))}
              </ul>
              <a className="btn btn-primary" href="#consultations" style={{ marginTop:12 }}>Book</a>
            </div>
          </div>
        ) : (
          <div key={i} className="card" style={{ padding:16 }}>
            <div className="badge" style={{ marginBottom:6 }}>{i===1?'Best Value':'Popular'}</div>
            <h3>{x.t}</h3>
            <div style={{ fontWeight:700, marginTop:6 }}>{x.p}</div>
            <ul className="muted" style={{ marginTop:8 }}>
              {x.b.map((li,idx)=>(<li key={idx}>{li}</li>))}
            </ul>
            <a className="btn btn-primary" href="#consultations" style={{ marginTop:12 }}>Book</a>
          </div>
        )
      ))}
    </div>
    <div className="row row-3" style={{ marginTop: 16 }}>
      {[ 
        {t:'KARMA RELEASE – Intensive',p:'₹4,500',b:['Past‑Present‑Future','Natal snapshot + transits','45–60 min audio/video + 30‑day follow‑up','PDF']},
        {t:'MOKSHA ROADMAP – Premium',p:'₹8,888',b:['12–18 month roadmap','60–75 min video + two follow‑ups','PDF']},
        {t:'WALK for DHARMA – Mentorship',p:'₹33,999',b:['Soul blueprint','Custom sādhanā plan','Priority 1:1 for 3 months','Tools + WhatsApp guidance']},
      ].map((x,i)=> (
        <div key={i} className="card" style={{ padding:16 }}>
          <h3>{x.t}</h3>
          <div style={{ fontWeight:700, marginTop:6 }}>{x.p}</div>
          <ul className="muted" style={{ marginTop:8 }}>
            {x.b.map((li,idx)=>(<li key={idx}>{li}</li>))}
          </ul>
          <a className="btn btn-primary" href="#consultations" style={{ marginTop:12 }}>Book</a>
        </div>
      ))}
    </div>
    <div className="card" style={{ padding:16, marginTop:16, position:'sticky', bottom:12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div><strong>Have questions?</strong> <span className="muted">Talk to our Concierge for plan advice.</span></div>
        <a className="btn btn-primary" href="#agent">Open Concierge</a>
      </div>
    </div>
  </section>
);

// Concierge Agent (stub)
const Agent: React.FC = () => {
  const [msg,setMsg]=useState("");
  const [out,setOut]=useState<string>("");
  function classify(){
    const m = msg.toLowerCase();
    if(m.includes('book')||m.includes('session')) return 'booking';
    if(m.includes('plan')||m.includes('price')) return 'plan_advice';
    if(m.includes('free')||m.includes('try')||m.includes('tool')) return 'free_tool';
    if(m.includes('pay')||m.includes('upi')||m.includes('paypal')) return 'payment';
    return 'support';
  }
  function go(route:string, karma?:string){
    window.dispatchEvent(new CustomEvent('ak:navigate', { detail: { route, karma } }));
  }
  function pickKarmaFromText(){
    const m = msg.toLowerCase();
    if(m.includes('dna')) return 'dna';
    if(m.includes('debt')) return 'debts';
    if(m.includes('radar')) return 'radar';
    if(m.includes('bond')||m.includes('compat')||m.includes('relationship')) return 'bond';
    if(m.includes('destiny')||m.includes('window')||m.includes('timeline')||m.includes('impact')) return 'impacts';
    return 'impacts';
  }
  function handle(){
    const intent = classify();
    let ans = '';
    if(intent==='free_tool') { ans = 'Opening a free tool for you…'; go('karma', pickKarmaFromText()); }
    else if(intent==='booking') { ans = 'Taking you to Consultations to pick a slot.'; go('consultations'); }
    else if(intent==='plan_advice') { ans = 'Let\'s review plans together.'; go('plans'); }
    else if(intent==='payment') { ans = 'Redirecting to Billing for UPI proof / PayPal.'; go('billing'); }
    else ans = 'How can we help? (Guidance only; not medical/financial.)';
    setOut(`[${intent}] ${ans}`);
  }
  return (
    <section className="container">
      <h1 style={{ fontSize:28, fontWeight:800 }}>AstroKalki Concierge</h1>
      <p className="muted">Warm, clear, ethical. We route you to the right place.</p>
      <div className="card" style={{ padding:16, marginTop:12 }}>
        <input placeholder="Ask anything… (e.g., \"Book a session\", \"Open destiny window\")" value={msg} onChange={(e)=>setMsg(e.target.value)} />
        <button className="btn btn-primary" style={{ marginTop:8 }} onClick={handle}>Ask</button>
        {out && <div style={{ marginTop:12 }}>{out}</div>}
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// SELF‑TESTS (non‑blocking, console‑only)
// ──────────────────────────────────────────────────────────────────────────────
function runSelfTests(): void {
  // Test 1: computeKarmaDNA returns bounded scores and deterministic outputs
  const a = computeKarmaDNA({ name: "Test User", date: "1990-10-10", time: "10:10", place: "Pune, IN" });
  const b = computeKarmaDNA({ name: "Test User", date: "1990-10-10", time: "10:10", place: "Pune, IN" });
  console.assert(a.scores.integrity >= 30 && a.scores.integrity <= 95, "Integrity out of bounds");
  console.assert(a.scores.reciprocity >= 30 && a.scores.reciprocity <= 95, "Reciprocity out of bounds");
  console.assert(a.scores.value >= 30 && a.scores.value <= 95, "Value out of bounds");
  console.assert(JSON.stringify(a) === JSON.stringify(b), "computeKarmaDNA should be deterministic for same input");

  // Test 2: scanKarmicDebts returns one of 13/14/16/19
  const d = scanKarmicDebts("Test User", "1990-10-10")[0];
  console.assert([13, 14, 16, 19].includes(d.code), "Debt code should be 13,14,16,19");

  // Test 3: sumDigits reduces correctly
  console.assert(sumDigits(1999) === 1, "sumDigits should reduce 1999 to 1");

  // Test 4: DNA window has both dates
  console.assert(!!a.window.start && !!a.window.end, "DNA window should include start and end dates");
}

// ──────────────────────────────────────────────────────────────────────────────
// APP
// ──────────────────────────────────────────────────────────────────────────────
const AppInner: React.FC = () => {
  const [route, setRoute] = useState<string>("home");
  const [karmaPage, setKarmaPage] = useState<string>(""); // dna|debts|impacts|radar|bond
  const [plan, setPlan] = useState<'free'|'pro'>(() => {
    if (typeof window === 'undefined') return 'free';
    const v = localStorage.getItem('ak.plan');
    return (v === 'pro' ? 'pro' : 'free');
  });
  useEffect(()=>{ try { localStorage.setItem('ak.plan', plan); } catch {} }, [plan]);
  useEffect(()=>{
    const fn = (e: any) => {
      const d = e.detail || {};
      if (d.route) setRoute(d.route);
      if (d.karma) { setRoute('karma'); setKarmaPage(d.karma); }
    };
    window.addEventListener('ak:navigate', fn as any);
    return () => window.removeEventListener('ak:navigate', fn as any);
  }, []);
  useEffect(()=>{ runSelfTests(); }, []);

  return (
    <>
      <Style />
      <Toast />
      <Header route={route} onNav={(r) => { setRoute(r); if (r !== "karma") setKarmaPage(""); }} plan={plan} />
      {route === "home" && <Home onStart={() => { setRoute("karma"); setKarmaPage("dna"); }} />}
      {route === "dashboard" && <Dashboard />}
      {route === "karma" && (
        karmaPage === "dna" ? <KarmaDNA /> :
        karmaPage === "debts" ? <KarmaDebts /> :
        karmaPage === "impacts" ? <KarmaImpacts /> :
        karmaPage === "radar" ? <KarmaRadar /> :
        karmaPage === "bond" ? <KarmaBond /> : <KarmaHub onOpen={setKarmaPage} />
      )}
      {route === "plans" && <Plans />}
      {route === "consultations" && <Consultations />}
      {route === "billing" && <Billing plan={plan} setPlan={setPlan} />}
      {route === "radio" && <Radio />}
      {route === "agent" && <Agent />}
    </>
  );
};

export default function App(): React.ReactElement { return <AppInner />; }
