import React, { useState, useRef } from "react";
import {
  FileText, BarChart3, Target, Lightbulb, Users, Bot, CheckCircle2, Upload,
  ChevronDown, Mail, Phone, MapPin, ArrowRight, Star, Menu, X, Sparkles,
  TrendingUp, Award, Zap, Trash2, ShieldCheck, Rocket, Brain, Layers, Bell, Download, AlertTriangle,
  Quote, Check, ArrowLeft
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from "recharts";

/* ---------------------------------------------------------------
   GLOBAL STYLES
---------------------------------------------------------------- */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

    .ra-root {
      --bg: #FFFFFF;
      --bg-soft: #F6F7FB;
      --bg-elevated: #FFFFFF;
      --primary: #6C3BFF;
      --primary-light: #8B5CF6; 
      --secondary: #FF6B6B;
      --accent: #00A9C4;
      --text: #000000;
      --text-muted: #64748B;
      --border: rgba(15,23,42,0.10);
      --glass: rgba(15,23,42,0.03);
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      width: 100%;
      position: relative;
      overflow-x: hidden;
    }
    .ra-root * { box-sizing: border-box; }
    .ra-display { font-family: 'Poppins', sans-serif; }
    .ra-grad-text {
      background: linear-gradient(90deg, var(--accent), var(--primary-light) 55%, var(--secondary));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .ra-glass {
      background: var(--glass);
      border: 1px solid var(--border);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    .ra-btn-primary {
      background: linear-gradient(90deg, var(--primary), #B24BFF);
      color: white;
      border: none;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      cursor: pointer;
      transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
      box-shadow: 0 8px 24px -8px rgba(108,59,255,.6);
    }
    .ra-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.08); box-shadow: 0 12px 30px -8px rgba(108,59,255,.75); }
    .ra-btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: var(--text);
      border: 1px solid var(--border);
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      cursor: pointer;
      transition: all .18s ease;
    }
    .ra-btn-secondary:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.25); }
    .ra-card {
      background: var(--glass);
      border: 1px solid var(--border);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      transition: transform .25s ease, border-color .25s ease, background .25s ease;
    }
    .ra-card:hover { transform: translateY(-4px); border-color: rgba(108,59,255,.35); background: rgba(15,23,42,0.02); }
    .ra-fade-up { animation: raFadeUp .7s ease both; }
    @keyframes raFadeUp { from { opacity:0; transform: translateY(18px);} to {opacity:1; transform:translateY(0);} }
    .ra-float { animation: raFloat 5s ease-in-out infinite; }
    @keyframes raFloat { 0%,100%{transform: translateY(0px);} 50%{transform: translateY(-12px);} }
    .ra-scanline {
      position: absolute; left: 6%; right: 6%; height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
      box-shadow: 0 0 12px 2px var(--accent);
      animation: raScan 2.6s ease-in-out infinite;
    }
    @keyframes raScan { 0% { top: 8%; opacity:0; } 10%{opacity:1;} 90%{opacity:1;} 100% { top: 92%; opacity:0; } }
    .ra-pulse { animation: raPulse 2.4s ease-in-out infinite; }
    @keyframes raPulse { 0%,100%{ opacity:.55; } 50%{ opacity:1; } }
    .ra-orb {
      position: absolute; border-radius: 50%; filter: blur(80px); opacity: .35; pointer-events:none;
    }
      .ra-hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  pointer-events: none;
}
    .ra-link { color: var(--text-muted); text-decoration:none; cursor:pointer; transition: color .15s ease; }
    .ra-link:hover { color: var(--text); }
    .ra-nav-item { color: var(--text-muted); background:none; border:none; cursor:pointer; font-family:'Inter'; font-weight:500; font-size:14.5px; transition: color .15s ease; padding: 8px 4px; }
    .ra-nav-item.active { color: var(--text); }
    .ra-input {
      background: rgba(15,23,42,0.03);
      border: 1px solid var(--border);
      color: var(--text);
      outline: none;
      transition: border-color .15s ease, background .15s ease;
      font-family: 'Inter';
    }
    .ra-input:focus { border-color: var(--primary-light); background: rgba(255,255,255,0.07); }
    .ra-input::placeholder { color: #64748B; }
    .ra-chip { border: 1px solid var(--border); background: rgba(255,255,255,0.05); border-radius: 999px; padding: 5px 12px; font-size: 12.5px; color: var(--text-muted); }
    ::selection { background: var(--primary); color: white; }
    .ra-scroll::-webkit-scrollbar { width: 8px; }
    .ra-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.15); border-radius: 8px; }
    @media (max-width: 860px) {
      .ra-hide-mobile { display: none !important; }
    }
  `}</style>
);

/* ---------------------------------------------------------------
   SHARED UI PIECES
---------------------------------------------------------------- */
const Section = ({ children, style = {}, className = "" }) => (
  <section style={{ padding: "88px 7vw", position: "relative", ...style }} className={className}>
    {children}
  </section>
);

const Eyebrow = ({ children }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px",
    borderRadius: 999, border: "1px solid var(--border)", background: "rgba(108,59,255,0.1)",
    fontSize: 13, fontWeight: 600, color: "var(--accent)", marginBottom: 18, letterSpacing: .3
  }}>
    <Sparkles size={14} /> {children}
  </div>
);
const NOTIFICATIONS = [
  { icon: CheckCircle2, title: "Resume Completed", desc: "Ananya_Rao_Resume.pdf analysis finished — Rank #1", time: "2 min ago", color: "var(--accent)" },
  { icon: Download, title: "Download Ready", desc: "Your candidate ranking report is ready to download", time: "10 min ago", color: "var(--primary-light)" },
  { icon: AlertTriangle, title: "Subscription Expiring", desc: "Your Pro plan expires in 3 days — renew to avoid interruption", time: "1 hour ago", color: "var(--secondary)" },
];
function Navbar({ page, navigate, mobileOpen, setMobileOpen }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const items = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "subscription", label: "Pricing" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid var(--border)", backdropFilter: "blur(18px)",
      background: "rgba(255,255,255,0.85)"
    }}>
      <div onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <div style={{
          width: 38, height: 38, borderRadius: 11, background: "linear-gradient(135deg, var(--primary), var(--accent))",
          display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px -6px rgba(108,59,255,.8)"
        }}>
          <Brain size={20} color="#fff" />
        </div>
        <div className="ra-display" style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.1 }}>
          Resume<span className="ra-grad-text">AI</span>
          <div style={{ fontSize: 10, fontWeight: 500, color: "var(--text-muted)", letterSpacing: 1.5, fontFamily: "Inter" }}>ANALYSER</div>
        </div>
      </div>

      <div className="ra-hide-mobile" style={{ display: "flex", gap: 30, alignItems: "center" }}>
        {items.map(it => (
          <button key={it.id} className={`ra-nav-item ${page === it.id ? "active" : ""}`} onClick={() => navigate(it.id)}>
            {it.label}
          </button>
        ))}
      </div>

     <div className="ra-hide-mobile" style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <button onClick={() => setNotifOpen(!notifOpen)} style={{
            background: "none", border: "1px solid var(--border)", borderRadius: 9, width: 38, height: 38,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text)", position: "relative"
          }}>
            <Bell size={17} />
            <span style={{ position: "absolute", top: 6, right: 7, width: 7, height: 7, borderRadius: "50%", background: "var(--secondary)" }} />
          </button>
          {notifOpen && (
            <div className="ra-card" style={{
              position: "absolute", top: "115%", right: 0, width: 320, borderRadius: 14, padding: 10, zIndex: 60
            }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, padding: "8px 10px", color: "var(--text-muted)" }}>NOTIFICATIONS</div>
              {NOTIFICATIONS.map((n, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "10px", borderRadius: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(108,59,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <n.icon size={15} color={n.color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{n.title}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, marginTop: 2 }}>{n.desc}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="ra-btn-secondary" style={{ padding: "9px 18px", borderRadius: 9, fontSize: 14 }} onClick={() => navigate("login")}>Login</button>
        <button className="ra-btn-primary" style={{ padding: "9px 18px", borderRadius: 9, fontSize: 14 }} onClick={() => navigate("register")}>Register</button>
      </div>

      <button className="ra-hide-mobile-inv" onClick={() => setMobileOpen(!mobileOpen)}
        style={{ display: "none", background: "none", border: "none", color: "white" }}>
        {mobileOpen ? <X /> : <Menu />}
      </button>

      <style>{`
        @media (max-width: 860px) {
          .ra-hide-mobile-inv { display: flex !important; }
        }
      `}</style>

      {mobileOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, background: "var(--bg-elevated)",
          borderBottom: "1px solid var(--border)", padding: "18px 7vw", display: "flex", flexDirection: "column", gap: 14
        }}>
          {items.map(it => (
            <button key={it.id} className="ra-nav-item" style={{ textAlign: "left" }} onClick={() => { navigate(it.id); setMobileOpen(false); }}>
              {it.label}
            </button>
          ))}
          <button className="ra-btn-secondary" style={{ padding: "10px", borderRadius: 9 }} onClick={() => { navigate("login"); setMobileOpen(false); }}>Login</button>
          <button className="ra-btn-primary" style={{ padding: "10px", borderRadius: 9 }} onClick={() => { navigate("register"); setMobileOpen(false); }}>Register</button>
        </div>
      )}
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "56px 7vw 28px", background: "var(--bg-soft)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between" }}>
        <div style={{ maxWidth: 300 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, var(--primary), var(--accent))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Brain size={16} color="#fff" />
            </div>
            <span className="ra-display" style={{ fontWeight: 700 }}>Resume AI Analyser</span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>
            AI that reads resumes the way a senior recruiter does — every skill, every project, every line — then ranks your candidates in minutes, not days.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            {[Mail, Star, Users].map((Icon, i) => (
              <div key={i} className="ra-glass" style={{ width: 36, height: 36, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: 14, fontFamily: "Poppins" }}>Product</div>
          {["services", "subscription", "home"].map(p => (
            <div key={p} className="ra-link" style={{ marginBottom: 10, fontSize: 14, textTransform: "capitalize" }} onClick={() => navigate(p)}>{p === "subscription" ? "Pricing" : p}</div>
          ))}
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 14, fontFamily: "Poppins" }}>Company</div>
          {[{ id: "about", l: "About Us" }, { id: "contact", l: "Contact" }].map(p => (
            <div key={p.id} className="ra-link" style={{ marginBottom: 10, fontSize: 14 }} onClick={() => navigate(p.id)}>{p.l}</div>
          ))}
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 14, fontFamily: "Poppins" }}>Legal</div>
          <div className="ra-link" style={{ marginBottom: 10, fontSize: 14 }} onClick={() => navigate("terms")}>Terms of Service</div>
          <div className="ra-link" style={{ marginBottom: 10, fontSize: 14 }} onClick={() => navigate("privacy")}>Privacy Policy</div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--border)", marginTop: 40, paddingTop: 20, color: "var(--text-muted)", fontSize: 13, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <span>© 2026 Resume AI Analyser. All rights reserved.</span>
        <span>Built for recruiters who don't have time to read 200 resumes.</span>
      </div>
    </footer>
  );
}

const PageHeader = ({ eyebrow, title, sub }) => (
  <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }} className="ra-fade-up">
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h1 className="ra-display" style={{ fontSize: "clamp(30px,4.2vw,46px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>{title}</h1>
    {sub && <p style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.7 }}>{sub}</p>}
  </div>
);

/* ---------------------------------------------------------------
   HOME PAGE
---------------------------------------------------------------- */
const FEATURES = [
  { icon: Target, title: "ATS Analysis", desc: "Every resume is scored against real Applicant Tracking System standards — formatting, structure, and keyword compatibility included." },
  { icon: BarChart3, title: "Resume Ranking", desc: "AI ranks every candidate by skills, experience depth, and project relevance — not by how many keywords they crammed in." },
  { icon: TrendingUp, title: "Skill Gap Analysis", desc: "Instantly see which skills a candidate is missing for the role, benchmarked against your job description." },
  { icon: Lightbulb, title: "Keyword Suggestions", desc: "Get precise keyword recommendations recruiters and ATS bots are actually scanning for in this role." },
  { icon: Users, title: "Candidate Comparison", desc: "Put any two resumes side-by-side across skills, projects, education, and ATS score with a clear winner." },
  { icon: Bot, title: "AI Hiring Assistant", desc: "Ask natural questions like 'Who has the strongest backend experience?' and get instant, sourced answers." },
];

const STATS = [
  { value: "10,000+", label: "Resumes Analysed" },
  { value: "98%", label: "Ranking Accuracy" },
  { value: "5,000+", label: "Recruiters Onboard" },
  { value: "50+", label: "Companies Hiring" },
];

const TESTIMONIALS = [
  { name: "Ananya Rao", role: "Talent Lead, Finlytics", quote: "We cut our first-round screening time from four days to about ninety minutes. The ranking logic actually matches what our senior recruiters would conclude." },
  { name: "Karthik Subramaniam", role: "Founder, Loopstack", quote: "The skill-gap breakdown is what sold me — it doesn't just say 'not a match', it tells us exactly which three skills would make a candidate a strong yes." },
  { name: "Priya Menon", role: "HR Manager, Verve Retail", quote: "Candidate comparison mode is now part of every panel review here. Nobody argues with a side-by-side score sheet." },
];

const FAQS = [
  { q: "How does the AI actually rank resumes?", a: "It reads full sections — skills, projects, experience, education, and certifications — then compares that content against your job description and industry benchmarks, not just keyword frequency." },
  { q: "Which file formats are supported?", a: "You can upload resumes in PDF or DOCX format, up to five resumes per analysis on the Free and Pro plans." },
  { q: "Can I compare candidates against each other, not just the job description?", a: "Yes. Every analysis automatically generates head-to-head comparisons between all uploaded resumes, with a category-by-category winner." },
  { q: "Is my data secure?", a: "All uploads are encrypted in transit and at rest, and resumes are never used to train external models. You can delete any analysis permanently at any time." },
  { q: "Do you support Indian recruitment workflows?", a: "Yes — pricing, support, and payments (via Razorpay) are built for Indian teams, alongside global hiring standards and ATS formats." },
];

function HomePage({ navigate }) {
  const [scoreAnim, setScoreAnim] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);

  React.useEffect(() => {
    let n = 0;
    const t = setInterval(() => { n += 2; setScoreAnim(Math.min(n, 94)); if (n >= 94) clearInterval(t); }, 20);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* HERO */}
      <Section style={{ paddingTop: 96, overflow: "hidden", background: "radial-gradient(circle at 20% 0%, rgba(108,59,255,0.12), transparent 55%), radial-gradient(circle at 85% 15%, rgba(0,212,255,0.08), transparent 50%), var(--bg)" }}>
        <div className="ra-orb" style={{ width: 480, height: 480, background: "var(--primary)", top: -180, left: -160, opacity: 0.18 }} />
        <div className="ra-orb" style={{ width: 420, height: 420, background: "var(--accent)", top: 20, right: -180, opacity: 0.14 }} />
        <div style={{ display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap", position: "relative" }}>
          <div style={{ flex: "1 1 480px" }} className="ra-fade-up">
            <Eyebrow>AI-Powered Hiring Platform</Eyebrow>
            <h1 className="ra-display" style={{ fontSize: "clamp(34px,5vw,58px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 22 }}>
              AI Powered <span className="ra-grad-text">Resume Ranking</span> Platform
            </h1>
            <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 32, maxWidth: 520 }}>
              Upload multiple resumes and let AI identify the strongest candidate for the role — by reading every sentence, not just matching keywords.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="ra-btn-primary" style={{ padding: "15px 28px", borderRadius: 12, fontSize: 15.5, display: "flex", alignItems: "center", gap: 8 }} onClick={() => navigate("analyze")}>
                Start Analysis <ArrowRight size={17} />
              </button>
              <button className="ra-btn-secondary" style={{ padding: "15px 28px", borderRadius: 12, fontSize: 15.5 }} onClick={() => navigate("services")}>
                Watch Demo
              </button>
            </div>
            <div style={{ display: "flex", gap: 34, marginTop: 44, flexWrap: "wrap" }}>
              {STATS.slice(0, 3).map((s, i) => (
                <div key={i}>
                  <div className="ra-display" style={{ fontSize: 26, fontWeight: 700 }}>{s.value}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 13 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SIGNATURE VISUAL: live resume scan */}
          <div style={{ flex: "1 1 380px", position: "relative", minHeight: 420 }} className="ra-fade-up">
            <div className="ra-card ra-float" style={{ borderRadius: 20, padding: 26, position: "relative", overflow: "hidden", maxWidth: 400, margin: "0 auto" }}>
              <div className="ra-scanline" />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FileText size={18} color="var(--accent)" />
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Ananya_Rao_Resume.pdf</span>
                </div>
                <span className="ra-chip">Scanning…</span>
              </div>
              {["Skills matched", "Experience relevance", "Project depth", "ATS formatting"].map((l, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "var(--text-muted)", marginBottom: 6 }}>
                    <span>{l}</span><CheckCircle2 size={14} color="var(--accent)" />
                  </div>
                  <div style={{ height: 6, borderRadius: 4, background: "rgba(255,255,255,.08)" }}>
                    <div style={{ height: "100%", width: `${60 + i * 10}%`, borderRadius: 4, background: "linear-gradient(90deg, var(--primary), var(--accent))" }} />
                  </div>
                </div>
              ))}
              <div style={{ textAlign: "center", marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginBottom: 4 }}>Overall ATS Score</div>
                <div className="ra-display ra-grad-text" style={{ fontSize: 44, fontWeight: 800 }}>{scoreAnim}<span style={{ fontSize: 20 }}>/100</span></div>
              </div>
            </div>
            <div className="ra-glass ra-pulse" style={{ position: "absolute", top: -20, right: -10, padding: "10px 16px", borderRadius: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <Award size={16} color="var(--secondary)" /> <span style={{ fontSize: 13, fontWeight: 600 }}>Rank #1 Candidate</span>
            </div>
          </div>
        </div>
      </Section>

      {/* FEATURES */}
      <Section>
        <PageHeader eyebrow="What it does" title="Everything a hiring panel needs, automated" sub="From first upload to final ranking, Resume AI Analyser handles the reading so your team can focus on the interviewing." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 22 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="ra-card ra-fade-up" style={{ borderRadius: 16, padding: 28, animationDelay: `${i * 0.05}s` }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg, var(--primary), var(--accent))", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <f.icon size={22} color="#fff" />
              </div>
              <div className="ra-display" style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{f.title}</div>
              <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* STATS BAND */}
      <Section style={{ background: "var(--bg-soft)", padding: "60px 7vw" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 24, textAlign: "center" }}>
          {STATS.map((s, i) => (
            <div key={i} className="ra-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="ra-display ra-grad-text" style={{ fontSize: 36, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <PageHeader eyebrow="Trusted by recruiters" title="What hiring teams say" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 22 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="ra-card" style={{ borderRadius: 16, padding: 28 }}>
              <Quote size={22} color="var(--accent)" style={{ marginBottom: 14 }} />
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--text)", marginBottom: 20 }}>{t.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12.5 }}>{t.role}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 2, marginTop: 14 }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="var(--secondary)" color="var(--secondary)" />)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section style={{ background: "var(--bg-soft)" }}>
        <PageHeader eyebrow="Questions" title="Frequently asked questions" />
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {FAQS.map((f, i) => (
            <div key={i} className="ra-glass" style={{ borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
              <button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} style={{
                width: "100%", background: "none", border: "none", color: "var(--text)", padding: "18px 22px",
                display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: 15, fontWeight: 600, fontFamily: "Poppins", textAlign: "left"
              }}>
                {f.q}
                <ChevronDown size={18} style={{ transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0, marginLeft: 12 }} />
              </button>
              {faqOpen === i && <div style={{ padding: "0 22px 20px", color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section style={{ textAlign: "center" }}>
        <div className="ra-card" style={{ borderRadius: 24, padding: "60px 30px", background: "linear-gradient(135deg, rgba(108,59,255,.18), rgba(0,212,255,.1))" }}>
          <h2 className="ra-display" style={{ fontSize: "clamp(24px,3.4vw,34px)", fontWeight: 700, marginBottom: 14 }}>Ready to rank your candidates in minutes?</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>Start free — no card required for your first 5 resumes.</p>
          <button className="ra-btn-primary" style={{ padding: "15px 30px", borderRadius: 12, fontSize: 15.5 }} onClick={() => navigate("register")}>Create Free Account</button>
        </div>
      </Section>
    </div>
  );
}

/* ---------------------------------------------------------------
   SERVICES PAGE
---------------------------------------------------------------- */
function ServicesPage({ navigate }) {
  const [faqOpen, setFaqOpen] = useState(0);

  const SERVICES_DETAIL = [
    {
      icon: Target,
      title: "ATS Analysis",
      tag: "Compatibility",
      desc: "We simulate exactly how ATS systems parse resumes to ensure candidates pass filtering.",
      points: [
        "Section & formatting compatibility check",
        "Contact field parsing detection",
        "Keyword density analysis",
        "ATS compliance report"
      ]
    },
    {
      icon: BarChart3,
      title: "Resume Ranking",
      tag: "Prioritisation",
      desc: "AI ranks resumes based on skills, experience, and job relevance.",
      points: [
        "Multi-factor scoring model",
        "Role-based ranking",
        "Candidate ranking list",
        "Dynamic re-ranking"
      ]
    },
    {
      icon: Users,
      title: "Resume Comparison",
      tag: "Head-to-head",
      desc: "Compare candidates side by side with clear scoring.",
      points: [
        "Pairwise comparison",
        "Category winner tagging",
        "Shareable results",
        "Bulk comparison support"
      ]
    },
    {
      icon: TrendingUp,
      title: "Skill Analysis",
      tag: "Depth analysis",
      desc: "Evaluates real skill usage depth, not just keywords.",
      points: [
        "Skill depth scoring",
        "Tool extraction",
        "Skill matrix view",
        "Certification weighting"
      ]
    },
    {
      icon: Lightbulb,
      title: "Keyword Suggestions",
      tag: "Optimization",
      desc: "Suggests missing keywords to improve resume match score.",
      points: [
        "Missing keyword detection",
        "Industry benchmarks",
        "Priority suggestions",
        "One-click copy support"
      ]
    },
    {
      icon: Bot,
      title: "AI Insights",
      tag: "Smart assistant",
      desc: "Ask questions about candidates and get AI answers.",
      points: [
        "Natural language Q&A",
        "Evidence-based insights",
        "Candidate comparison AI",
        "Cross-resume analysis"
      ]
    }
  ];

  const FAQS = [
    {
      q: "How does ATS analysis work?",
      a: "We simulate real ATS systems to check formatting, keywords, and parsing accuracy."
    },
    {
      q: "Is resume ranking AI-based?",
      a: "Yes, ranking is based on skills, experience, and job relevance — not keywords alone."
    },
    {
      q: "Can I compare multiple candidates?",
      a: "Yes, you can compare all uploaded resumes side by side."
    },
    {
      q: "Do I need setup before using services?",
      a: "No setup required. Everything works automatically after upload."
    },
    {
      q: "Is this suitable for companies?",
      a: "Yes, it is built for startups, HR teams, and enterprises."
    }
  ];

  return (
    <Section style={{ paddingTop: 70 }}>
      <PageHeader
        eyebrow="Services"
        title="One platform, six ways to hire smarter"
        sub="Everything runs automatically when resumes are uploaded."
      />

      {/* SERVICES */}
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {SERVICES_DETAIL.map((s, i) => (
          <div
            key={i}
            className="ra-card"
            style={{
              borderRadius: 18,
              padding: 32,
              display: "flex",
              gap: 26,
              flexWrap: "wrap"
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, var(--primary), var(--accent))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <s.icon size={26} color="#fff" />
            </div>

            <div style={{ flex: "1 1 340px" }}>
              <span className="ra-chip">{s.tag}</span>

              <h3 style={{ marginTop: 10 }}>{s.title}</h3>

              <p style={{ color: "var(--text-muted)" }}>{s.desc}</p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                  gap: 10
                }}
              >
                {s.points.map((p, j) => (
                  <div key={j} style={{ display: "flex", gap: 8 }}>
                    <Check size={15} color="var(--accent)" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <button
          className="ra-btn-primary"
          onClick={() => navigate("analyze")}
        >
          Try It Now <ArrowRight size={16} />
        </button>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 60 }}>
        <PageHeader title="Frequently Asked Questions" />

        <div style={{ marginTop: 25 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="ra-card"
              style={{ marginBottom: 15, padding: 20 }}
            >
              <div
                onClick={() =>
                  setFaqOpen(faqOpen === i ? -1 : i)
                }
                style={{
                  cursor: "pointer",
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                {faq.q}
              </div>

              {faqOpen === i && (
                <p style={{ marginTop: 12, color: "var(--text-muted)" }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------
   PRICING PAGE
---------------------------------------------------------------- */

function SubscriptionPage({ navigate }) {
  const [faqOpen, setFaqOpen] = useState(0);

  const PLANS = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      features: [
        "5 resume uploads / month",
        "Basic ATS analysis",
        "Single role comparison",
        "Email support"
      ],
      cta: "Start Free",
      highlight: false
    },
    {
      name: "Pro",
      price: "₹499",
      period: "/month",
      features: [
        "100 resume uploads / month",
        "Full AI ranking engine",
        "Keyword suggestions",
        "Candidate comparison dashboard",
        "Priority email support"
      ],
      cta: "Upgrade to Pro",
      highlight: true
    },
    {
      name: "Premium",
      price: "₹999",
      period: "/month",
      features: [
        "Unlimited resume uploads",
        "Advanced AI analysis suite",
        "Team access (up to 10 seats)",
        "AI hiring assistant",
        "Dedicated support"
      ],
      cta: "Go Premium",
      highlight: false
    }
  ];

  const FAQS = [
    {
      q: "How does AI rank resumes?",
      a: "AI reads skills, experience, projects and compares with job description."
    },
    {
      q: "Is my data secure?",
      a: "Yes, all uploads are encrypted and never shared."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, you can upgrade or cancel anytime."
    }
  ];

  return (
    <Section style={{ paddingTop: 70 }}>
      <PageHeader
        eyebrow="Pricing"
        title="Simple pricing for teams of every size"
        sub="Indian pricing, billed in rupees. Upgrade anytime."
      />

      {/* PLANS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 24,
          maxWidth: 1000,
          margin: "0 auto"
        }}
      >
        {PLANS.map((p, i) => (
          <div
            key={i}
            className="ra-card"
            style={{
              borderRadius: 20,
              padding: 32,
              position: "relative",
              border: p.highlight
                ? "1.5px solid var(--primary)"
                : "1px solid var(--border)",
              transform: p.highlight ? "scale(1.03)" : "none"
            }}
          >
            {p.highlight && (
              <div
                style={{
                  position: "absolute",
                  top: -13,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background:
                    "linear-gradient(90deg,var(--primary),var(--secondary))",
                  padding: "5px 16px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff"
                }}
              >
                MOST POPULAR
              </div>
            )}

            <div
              className="ra-display"
              style={{ fontWeight: 700, fontSize: 20 }}
            >
              {p.name}
            </div>

            <div style={{ margin: "16px 0" }}>
              <span
                className="ra-display"
                style={{ fontSize: 38, fontWeight: 800 }}
              >
                {p.price}
              </span>
              <span style={{ color: "var(--text-muted)" }}>
                {" "}
                {p.period}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {p.features.map((f, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    gap: 8,
                    fontSize: 14
                  }}
                >
                  <CheckCircle2 size={16} color="var(--accent)" />
                  {f}
                </div>
              ))}
            </div>

            <button
              className={p.highlight ? "ra-btn-primary" : "ra-btn-secondary"}
              style={{
                width: "100%",
                marginTop: 20,
                padding: "12px",
                borderRadius: 10
              }}
              onClick={() => navigate("register")}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 60 }}>
        <PageHeader title="Frequently Asked Questions" />

        <div style={{ marginTop: 20 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="ra-card"
              style={{ marginBottom: 15, padding: 20 }}
            >
              <div
                onClick={() =>
                  setFaqOpen(faqOpen === i ? -1 : i)
                }
                style={{
                  cursor: "pointer",
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                {faq.q}
              </div>

              {faqOpen === i && (
                <p
                  style={{
                    marginTop: 12,
                    color: "var(--text-muted)"
                  }}
                >
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}


/* ---------------------------------------------------------------
   ABOUT PAGE
---------------------------------------------------------------- */
const TEAM = [
  {
    name: "Rohan Iyer",
    role: "Founder & CEO",
    image: "/images/rohan.jpg",
  },
  {
    name: "Sneha Kapoor",
    role: "Head of AI",
    image: "/images/sneha.jpg",
  },
  {
    name: "Aditya Nair",
    role: "Head of Product",
    image: "/images/aditya.jpg",
  },
  {
    name: "Meera Pillai",
    role: "Lead Engineer",
    image: "/images/meera.jpg",
  },
];

function AboutPage({ navigate }) {
  return (
    <div>
      <Section style={{ paddingTop: 70 }}>
        <PageHeader
          eyebrow="About Us"
          title="We built the resume screening we wished we had"
          sub="Resume AI Analyser started with a simple frustration: recruiters spend more time reading resumes than talking to people."
        />

        {/* Mission Vision Technology */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 22,
            marginBottom: 60,
          }}
        >
          {[
            {
              image: "/images/mission.png",
              title: "Our Mission",
              desc: "Give every hiring team, from a two-person startup to a 500-person company, recruiter-grade resume analysis in minutes instead of days.",
            },
            {
              image: "/images/vision.png",
              title: "Our Vision",
              desc: "A hiring process where the right candidate is never missed because of screening fatigue, and where feedback to applicants is fast and specific.",
            },
            {
              image: "/images/technology.png",
              title: "Our Technology",
              desc: "A layered AI pipeline — parsing, semantic extraction, and comparative scoring — built to read resumes the way an experienced recruiter would, section by section.",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="ra-card"
              style={{
                borderRadius: 16,
                padding: 28,
                textAlign: "center",
              }}
            >
              <img
                src={c.image}
                alt={c.title}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  marginBottom: "20px",
                }}
              />

              <div
                className="ra-display"
                style={{
                  fontWeight: 600,
                  fontSize: 17,
                  marginBottom: 8,
                }}
              >
                {c.title}
              </div>

              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14.5,
                  lineHeight: 1.7,
                }}
              >
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <PageHeader title="The team behind it" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 20,
          }}
        >
          {TEAM.map((t, i) => (
            <div
              key={i}
              className="ra-card"
              style={{
                borderRadius: 16,
                padding: 24,
                textAlign: "center",
              }}
            >
              <img
                src={t.image}
                alt={t.name}
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 auto 14px",
                }}
              />

              <div style={{ fontWeight: 600 }}>{t.name}</div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: 13,
                }}
              >
                {t.role}
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <button
            className="ra-btn-primary"
            style={{
              padding: "15px 30px",
              borderRadius: 12,
              fontSize: 15.5,
            }}
            onClick={() => navigate("contact")}
          >
            Get In Touch
            <ArrowRight
              size={16}
              style={{
                display: "inline",
                marginLeft: 6,
                verticalAlign: -3,
              }}
            />
          </button>
        </div>
      </Section>
    </div>
  );
}

/* ---------------------------------------------------------------
   CONTACT PAGE
---------------------------------------------------------------- */
function ContactPage() {
  const [faqOpen, setFaqOpen] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [sent, setSent] = useState(false);

  const set = (k, v) => setForm({ ...form, [k]: v });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  const FAQS = [
    {
      q: "How fast will I get a reply?",
      a: "We usually respond within 24 hours on working days."
    },
    {
      q: "Can I request a demo?",
      a: "Yes, you can mention 'demo request' in the subject line."
    },
    {
      q: "Do you support partnerships?",
      a: "Yes, we work with colleges, startups, and companies."
    },
    {
      q: "Where is your team located?",
      a: "Our team is based in Bengaluru, India."
    },
    {
      q: "Is support free?",
      a: "Yes, basic support is free for all users."
    }
  ];

  return (
    <Section style={{ paddingTop: 70 }}>
      <PageHeader
        eyebrow="Contact"
        title="We'd love to hear from you"
        sub="Questions about a plan, a bug, or a partnership — the team reads every message."
      />

      <div
        style={{
          display: "flex",
          gap: 40,
          flexWrap: "wrap",
          maxWidth: 1000,
          margin: "0 auto"
        }}
      >
        {/* FORM */}
        <div
          className="ra-card"
          style={{ flex: "1 1 320px", borderRadius: 18, padding: 30 }}
        >
          {sent ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <CheckCircle2
                size={40}
                color="var(--accent)"
                style={{ marginBottom: 14 }}
              />
              <div
                className="ra-display"
                style={{ fontWeight: 700, fontSize: 19, marginBottom: 8 }}
              >
                Message sent
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14
                }}
              >
                Saved to our team's inbox — expect a reply within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16
              }}
            >
              <input
                className="ra-input"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />

              <input
                className="ra-input"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />

              <input
                className="ra-input"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => set("subject", e.target.value)}
              />

              <textarea
                className="ra-input"
                rows={5}
                placeholder="Message"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
              />

              <button
                className="ra-btn-primary"
                type="submit"
                style={{
                  padding: "13px",
                  borderRadius: 10
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* CONTACT INFO */}
        <div
          style={{
            flex: "1 1 280px",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >
          {[
            {
              icon: Mail,
              label: "Email",
              val: "hello@resumeai-analyser.com"
            },
            {
              icon: Phone,
              label: "Phone",
              val: "+91 98765 43210"
            },
            {
              icon: MapPin,
              label: "Office",
              val: "Bengaluru, India"
            }
          ].map((c, i) => (
            <div
              key={i}
              className="ra-card"
              style={{
                borderRadius: 14,
                padding: 20,
                display: "flex",
                gap: 14
              }}
            >
              <c.icon
                size={20}
                color="var(--accent)"
                style={{ marginTop: 2 }}
              />
              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)"
                  }}
                >
                  {c.label}
                </div>
                <div style={{ fontSize: 14.5 }}>{c.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ SECTION */}
      <div style={{ marginTop: 60 }}>
        <PageHeader title="Frequently Asked Questions" />

        <div style={{ marginTop: 25 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="ra-card"
              style={{
                marginBottom: 15,
                padding: 20
              }}
            >
              <div
                onClick={() =>
                  setFaqOpen(faqOpen === i ? -1 : i)
                }
                style={{
                  cursor: "pointer",
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                {faq.q}
              </div>

              {faqOpen === i && (
                <p
                  style={{
                    marginTop: 12,
                    color: "var(--text-muted)",
                    lineHeight: 1.6
                  }}
                >
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
/* ---------------------------------------------------------------
   LOGIN / REGISTER
---------------------------------------------------------------- */
function AuthPage({ mode, navigate }) {
  const isLogin = mode === "login";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm({ ...form, [k]: v });

  return (
    <Section style={{ paddingTop: 70, display: "flex", justifyContent: "center" }}>
      <div className="ra-orb" style={{ width: 400, height: 400, background: "var(--primary)", top: 40, left: "20%" }} />
      <div className="ra-card ra-fade-up" style={{ borderRadius: 22, padding: 40, width: "100%", maxWidth: 420, position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, background: "linear-gradient(135deg, var(--primary), var(--accent))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Brain size={24} color="#fff" />
          </div>
          <div className="ra-display" style={{ fontWeight: 700, fontSize: 22 }}>{isLogin ? "Welcome back" : "Create your account"}</div>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 6 }}>{isLogin ? "Log in to your recruiter dashboard" : "Start ranking resumes in under 2 minutes"}</p>
        </div>

        {done ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <CheckCircle2 size={38} color="var(--accent)" style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{isLogin ? "Logged in successfully" : "Account created"}</div>
            <p style={{ color: "var(--text-muted)", fontSize: 13.5, marginBottom: 20 }}>{isLogin ? "Redirecting you to your dashboard." : "A verification email has been sent to your inbox."}</p>
            <button className="ra-btn-primary" style={{ padding: "12px 24px", borderRadius: 10, width: "100%" }} onClick={() => navigate("analyze")}>Go to Dashboard</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {!isLogin && (
              <div>
                <label style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Full Name</label>
                <input className="ra-input" style={{ width: "100%", padding: "12px 14px", borderRadius: 9, fontSize: 14.5 }} placeholder="Jane Recruiter" value={form.name} onChange={e => set("name", e.target.value)} />
              </div>
            )}
            <div>
              <label style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Email</label>
              <input className="ra-input" style={{ width: "100%", padding: "12px 14px", borderRadius: 9, fontSize: 14.5 }} placeholder="you@company.com" value={form.email} onChange={e => set("email", e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Password</label>
              <input type="password" className="ra-input" style={{ width: "100%", padding: "12px 14px", borderRadius: 9, fontSize: 14.5 }} placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} />
            </div>
            {isLogin && <div style={{ textAlign: "right", fontSize: 13, color: "var(--accent)", cursor: "pointer" }}>Forgot password?</div>}
            <button className="ra-btn-primary" type="submit" style={{ padding: "13px", borderRadius: 10, fontSize: 14.5, marginTop: 6 }}>{isLogin ? "Log In" : "Create Account"}</button>
          </form>
        )}

        {!done && (
          <div style={{ textAlign: "center", marginTop: 22, fontSize: 13.5, color: "var(--text-muted)" }}>
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <span style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }} onClick={() => navigate(isLogin ? "register" : "login")}>
              {isLogin ? "Create an account" : "Log in"}
            </span>
          </div>
        )}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------
   ANALYZE PAGE (upload + role + JD -> results dashboard)
---------------------------------------------------------------- */
const ROLES = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "Business Analyst", "Project Manager", "Data Analyst", "DevOps Engineer", "Software Engineer"];

function hashScore(seed, base, spread) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 1000;
  return Math.round(base + (h % spread));
}

function AnalyzePage({ navigate }) {
  const [files, setFiles] = useState([]);
  const [role, setRole] = useState(ROLES[0]);
  const [jd, setJd] = useState("");
  const [results, setResults] = useState(null);
  const inputRef = useRef();

  const addFiles = (list) => {
    const arr = Array.from(list).slice(0, 5 - files.length);
    setFiles([...files, ...arr.map(f => ({ name: f.name, size: (f.size / 1024).toFixed(0) + " KB" }))]);
  };

  const removeFile = (i) => setFiles(files.filter((_, idx) => idx !== i));

  const runAnalysis = () => {
    if (files.length === 0) return;
    const data = files.map((f, i) => {
      const skills = hashScore(f.name + "s", 55, 40);
      const exp = hashScore(f.name + "e", 50, 45);
      const proj = hashScore(f.name + "p", 50, 45);
      const edu = hashScore(f.name + "d", 60, 35);
      const ats = hashScore(f.name + "a", 55, 40);
      const overall = Math.round((skills + exp + proj + edu + ats) / 5);
      return {
        name: f.name, overall,
        radar: [
          { subject: "Skills", value: skills },
          { subject: "Experience", value: exp },
          { subject: "Projects", value: proj },
          { subject: "Education", value: edu },
          { subject: "ATS", value: ats },
        ],
        missingSkills: ["Docker", "AWS", "React Query", "CI/CD", "Kubernetes"].filter((_, idx) => (i + idx) % 3 === 0),
        missingKeywords: ["REST APIs", "Microservices", "Agile", "System Design"].filter((_, idx) => (i + idx) % 2 === 0),
      };
    }).sort((a, b) => b.overall - a.overall);
    setResults(data);
  };

  const reset = () => { setFiles([]); setResults(null); setJd(""); };

  if (results) {
    return (
      <Section style={{ paddingTop: 70 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, flexWrap: "wrap", gap: 14 }}>
          <div>
            <Eyebrow>Analysis Complete</Eyebrow>
            <h1 className="ra-display" style={{ fontSize: 28, fontWeight: 700 }}>Results for {role}</h1>
          </div>
          <button className="ra-btn-secondary" style={{ padding: "10px 18px", borderRadius: 9, display: "flex", alignItems: "center", gap: 6 }} onClick={reset}>
            <ArrowLeft size={15} /> New Analysis
          </button>
        </div>

        {/* Ranking bar */}
        <div className="ra-card" style={{ borderRadius: 18, padding: 26, marginBottom: 24 }}>
          <div className="ra-display" style={{ fontWeight: 600, fontSize: 16, marginBottom: 18 }}>AI Ranking Overview</div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={results} margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                <XAxis dataKey="name" tick={{ fill: "#93A1B8", fontSize: 11 }} interval={0} angle={-12} textAnchor="end" height={60} />
                <YAxis tick={{ fill: "#93A1B8", fontSize: 11 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "#17203A", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="overall" radius={[8, 8, 0, 0]}>
                  {results.map((_, i) => <Cell key={i} fill={i === 0 ? "#00D4FF" : "#6C3BFF"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
          {results.map((r, i) => (
            <div key={i} className="ra-card" style={{ borderRadius: 18, padding: 24, position: "relative" }}>
              {i === 0 && <div style={{ position: "absolute", top: -12, left: 20, background: "linear-gradient(90deg,var(--primary),var(--secondary))", padding: "4px 12px", borderRadius: 999, fontSize: 11.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}><Award size={12} /> RANK 1</div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 14.5, display: "flex", alignItems: "center", gap: 8 }}><FileText size={15} color="var(--accent)" /> {r.name}</div>
                <div style={{ textAlign: "right" }}>
                  <div className="ra-display ra-grad-text" style={{ fontSize: 22, fontWeight: 800 }}>{r.overall}</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>/ 100</div>
                </div>
              </div>
              <div style={{ width: "100%", height: 190 }}>
                <ResponsiveContainer>
                  <RadarChart data={r.radar} outerRadius={65}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#93A1B8", fontSize: 10.5 }} />
                    <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                    <Radar dataKey="value" stroke="#00D4FF" fill="#6C3BFF" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              {r.missingSkills.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginBottom: 6 }}>Missing skills</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {r.missingSkills.map((s, j) => <span key={j} className="ra-chip" style={{ borderColor: "rgba(255,107,107,.3)", color: "var(--secondary)" }}>{s}</span>)}
                  </div>
                </div>
              )}
              {r.missingKeywords.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginBottom: 6 }}>Suggested keywords</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {r.missingKeywords.map((s, j) => <span key={j} className="ra-chip">{s}</span>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section style={{ paddingTop: 70 }}>
      <PageHeader eyebrow="AI Analysis Engine" title="Upload resumes to begin" sub="Add up to 5 resumes, choose the target role, and optionally paste a job description for precision matching." />
      <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 22 }}>

        <div className="ra-card" style={{
          borderRadius: 18, padding: 34, textAlign: "center", border: "2px dashed var(--border)", cursor: "pointer"
        }}
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        >
          <input ref={inputRef} type="file" multiple accept=".pdf,.docx" style={{ display: "none" }} onChange={(e) => addFiles(e.target.files)} />
          <Upload size={30} color="var(--accent)" style={{ marginBottom: 12 }} />
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Drag & drop resumes here, or click to browse</div>
          <div style={{ color: "var(--text-muted)", fontSize: 13 }}>PDF or DOCX · up to 5 resumes</div>
        </div>

        {files.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {files.map((f, i) => (
              <div key={i} className="ra-glass" style={{ borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}><FileText size={16} color="var(--accent)" /> {f.name} <span style={{ color: "var(--text-muted)", fontSize: 12 }}>({f.size})</span></div>
                <Trash2 size={16} color="var(--secondary)" style={{ cursor: "pointer" }} onClick={() => removeFile(i)} />
              </div>
            ))}
          </div>
        )}

        <div>
          <label style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8, display: "block" }}>Target Role</label>
          <select className="ra-input" style={{ width: "100%", padding: "12px 14px", borderRadius: 9, fontSize: 14.5 }} value={role} onChange={(e) => setRole(e.target.value)}>
            {ROLES.map(r => <option key={r} value={r} style={{ background: "#ffffff" }}>{r}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8, display: "block" }}>Job Description (optional, improves match precision)</label>
          <textarea className="ra-input" rows={6} style={{ width: "100%", padding: "12px 14px", borderRadius: 9, fontSize: 14.5, resize: "vertical" }} placeholder="Paste the job description here..." value={jd} onChange={(e) => setJd(e.target.value)} />
        </div>

        <button className="ra-btn-primary" style={{ padding: "16px", borderRadius: 12, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: files.length ? 1 : 0.55, cursor: files.length ? "pointer" : "not-allowed" }} onClick={runAnalysis} disabled={!files.length}>
          <Zap size={18} /> Analyse Resumes
        </button>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------
   TERMS / PRIVACY (minimal informative pages)
---------------------------------------------------------------- */
function LegalPage({ title, sections }) {
  return (
    <Section style={{ paddingTop: 70 }}>
      <PageHeader title={title} />
      <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
        {sections.map((s, i) => (
          <div key={i}>
            <div className="ra-display" style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{s.h}</div>
            <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.75 }}>{s.p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const TERMS_SECTIONS = [
  { h: "1. Using the platform", p: "Resume AI Analyser is provided for legitimate recruitment and hiring purposes only. You agree not to upload resumes you do not have permission to process." },
  { h: "2. Subscriptions & billing", p: "Pro and Premium plans renew monthly via Razorpay. You can cancel anytime and retain access until the end of the billing period." },
  { h: "3. AI-generated output", p: "Rankings and scores are decision-support tools, not final hiring decisions. Always apply human judgement alongside AI analysis." },
  { h: "4. Account termination", p: "We may suspend accounts that violate these terms, including uploading harmful content or attempting to reverse-engineer the analysis engine." },
];

const PRIVACY_SECTIONS = [
  { h: "Data we collect", p: "Account details (name, email), uploaded resume files, job descriptions, and usage analytics needed to operate the platform." },
  { h: "How resumes are used", p: "Uploaded resumes are processed solely to generate your analysis and are never used to train third-party AI models." },
  { h: "Data retention", p: "You can permanently delete any analysis or resume from your dashboard at any time; deleted files are purged within 30 days." },
  { h: "Security", p: "All data is encrypted in transit (TLS) and at rest. Access is role-restricted and logged." },
];

/* ---------------------------------------------------------------
   ROOT APP
---------------------------------------------------------------- */
export default function ResumeAIAnalyser() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (p) => { setPage(p); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  let content;
  if (page === "home") content = <HomePage navigate={navigate} />;
  else if (page === "services") content = <ServicesPage navigate={navigate} />;
  else if (page === "subscription") content = <SubscriptionPage navigate={navigate} />;
  else if (page === "about") content = <AboutPage navigate={navigate} />;
  else if (page === "contact") content = <ContactPage />;
  else if (page === "login") content = <AuthPage mode="login" navigate={navigate} />;
  else if (page === "register") content = <AuthPage mode="register" navigate={navigate} />;
  else if (page === "analyze") content = <AnalyzePage navigate={navigate} />;
  else if (page === "terms") content = <LegalPage title="Terms of Service" sections={TERMS_SECTIONS} />;
  else if (page === "privacy") content = <LegalPage title="Privacy Policy" sections={PRIVACY_SECTIONS} />;
  else content = <HomePage navigate={navigate} />;

  return (
  <div className="ra-root" style={{ paddingTop: page === "login" || page === "register" ? "0px" : "90px" }}>
    <GlobalStyle />

    {page !== "login" && page !== "register" && (
      <Navbar
        page={page}
        navigate={navigate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
    )}

    {content}

    {page !== "login" && page !== "register" && (
      <Footer navigate={navigate} />
    )}
  </div>
);
}