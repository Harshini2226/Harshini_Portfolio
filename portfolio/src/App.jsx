import { useEffect, useState } from "react";
import {
  profile, typingLines, stats, why, facts, aboutCode,
  education, skills, coding, projects, experience,
} from "./data";

const NAV = [
  ["about", "About"], ["skills", "Skills"], ["coding", "Coding"],
  ["projects", "Projects"], ["experience", "Experience"], ["contact", "Contact"],
];

function useTyping(lines) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(lines[2]);
      return;
    }
    let i = 0, j = 0, del = false, t;
    const tick = () => {
      const s = lines[i];
      setText(s.slice(0, j));
      if (!del && j === s.length) { del = true; t = setTimeout(tick, 1400); return; }
      if (del && j === 0) { del = false; i = (i + 1) % lines.length; }
      j += del ? -1 : 1;
      t = setTimeout(tick, del ? 25 : 55);
    };
    tick();
    return () => clearTimeout(t);
  }, [lines]);
  return text;
}

function useScrollSpy(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function useProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setPct((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return pct;
}

function useTheme() {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
  }, [theme]);
  const toggle = () => {
    const dark = theme
      ? theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(dark ? "light" : "dark");
  };
  return toggle;
}

const Chips = ({ items }) => (
  <div className="chips">{items.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
);

const Timeline = ({ items }) => (
  <ul className="tl">
    {items.map(([title, note]) => (
      <li key={title}>{title}<small>{note}</small></li>
    ))}
  </ul>
);

const Section = ({ id, eyebrow, title, lead, children }) => (
  <section id={id}>
    <div className="wrap">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  </section>
);

export default function App() {
  const typed = useTyping(typingLines);
  const active = useScrollSpy(NAV.map(([id]) => id));
  const progress = useProgress();
  const toggleTheme = useTheme();

  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <div className="progress" style={{ width: `${progress}%` }} />

      <header>
        <div className="wrap">
          <nav>
            <a className="logo" href="#home"><b>H</b> {profile.short}</a>
            <div className="links">
              {NAV.map(([id, label]) => (
                <a key={id} href={`#${id}`} className={active === id ? "on" : ""}>{label}</a>
              ))}
            </div>
            <button className="tgl" onClick={toggleTheme} aria-label="Toggle light or dark theme">◐</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="wrap">
            <div className="hero-layout">
              <div className="hero-copy">
                <span className="tag"><i /> Open to Software Engineer roles &amp; AI/ML roles</span>
                <h1>Hi, I’m <span>{profile.short}</span></h1>
                <p className="sub">Computer Science student building full-stack and AI/ML projects</p>
                <p className="pitch">
                  I build applications that solve real problems, from civic engagement platforms to
                  healthcare access in low-network areas.
                </p>
                <div className="type" aria-hidden="true">{typed}</div>
                <div className="btns left">
                  <a className="btn p" href="#projects">View projects <span aria-hidden="true">↗</span></a>
                  <a className="btn" href={`mailto:${profile.email}`}>Get in touch</a>
                </div>
                <div className="hero-social">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
                </div>
              </div>
              <aside className="profile-window" aria-label="Profile snapshot">
                <div className="window-bar" aria-hidden="true">
                  <span className="window-dots"><i /><i /><i /></span>
                  <span className="window-address">harshini · portfolio</span>
                </div>
                <div className="window-content">
                  <div className="profile-heading">
                    <b>H</b>
                    <div><strong>{profile.name}</strong><small>Software Engineer · AI/ML</small></div>
                  </div>
                  <div className="profile-rows">
                    <div><span>Education</span><strong>B.Tech CSE · 2027</strong></div>
                    <div><span>College</span><strong>Malla Reddy Engineering College for Women</strong></div>
                    <div><span>Focus</span><strong>Full-stack · Applied AI/ML</strong></div>
                    <div><span>Based in</span><strong>{profile.location}</strong></div>
                  </div>
                  <div className="profile-status"><i /> Building and learning</div>
                </div>
              </aside>
            </div>
            <div className="stats">
              {stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}
            </div>
            <div className="hero-stack">
              <span className="stack-label">TECH I WORK WITH</span>
              <div className="stack-items">
                {["Java", "Python", "JavaScript", "React", "Node.js", "MongoDB", "SQL", "AWS"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="why">
          <div className="wrap grid g3">
            {why.map(([h, p]) => (
              <div className="card" key={h}><b>{h}</b><p>{p}</p></div>
            ))}
          </div>
        </section>

        <Section id="about" eyebrow="01 — About" title="Learning by building"
          lead="I’m Thirunahari Harshini, a Computer Science undergraduate with strong fundamentals in Java, Python and JavaScript, hands-on experience building full-stack applications and basic AI/ML models, and a drive to build technology that serves millions of people.">
          <div className="grid g2">
            <div className="card">
              <ul className="facts">
                {facts.map(([i, k, v]) => (
                  <li key={k}>{i} <span><b>{k}:</b> {v}</span></li>
                ))}
              </ul>
            </div>
            <pre>{aboutCode}</pre>
          </div>
          <h3 className="sub-h">Education</h3>
          <Timeline items={education} />
          <p className="quote">I believe in learning by building, solving problems through logical thinking, and growing through consistency.</p>
        </Section>

        <Section id="skills" eyebrow="02 — Skills" title="The tools I reach for"
          lead="Languages, frameworks and platforms I use to turn ideas into working software.">
          <div className="grid g3">
            {skills.map(([cat, items]) => (
              <div className="card" key={cat}><p className="cat">{cat}</p><Chips items={items} /></div>
            ))}
          </div>
        </Section>

        <Section id="coding" eyebrow="03 — Coding" title="Problem-solving profiles"
          lead="Practising data structures and algorithms consistently, and growing through live contests.">
          <div className="grid g3">
            {coding.map((c) => (
              <div className="card plat" key={c.name}>
                <div className="top"><span className="big">{c.name}</span>{c.badge && <span className="chip">{c.badge}</span>}</div>
                <p>{c.text}</p>
                {c.href && <a href={c.href} target="_blank" rel="noopener noreferrer">Visit {c.name} →</a>}
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="04 — Projects" title="Things I’m building"
          lead="Practical projects that combine creativity, technology and problem-solving.">
          <div className="grid g2">
            {projects.map((p) => (
              <div className="card" key={p.title}>
                <div className="ico">{p.icon}</div>
                <h3>{p.title}</h3>
                <p className="when">{p.meta}</p>
                <ul className="pts">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                <Chips items={p.stack} />
                {p.links.length > 0 && (
                  <div className="btns left">
                    {p.links.map((l) => (
                      <a className="btn" key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="center">
            <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">More on GitHub →</a>
          </p>
        </Section>

        <Section id="experience" eyebrow="05 — Experience" title="Experience & certifications"
          lead="Experience and recognition that back up the learning.">
          <Timeline items={experience} />
        </Section>

        <section id="contact" className="contact">
          <div className="wrap">
            <div className="card">
              <div className="eyebrow">06 — Contact</div>
              <h2>Let’s build something together</h2>
              <p className="lead mx">Open to Software Engineer roles where I can build technology that serves millions of users. Based in {profile.location}.</p>
              <div className="btns">
                <a className="btn p" href={`mailto:${profile.email}`}>{profile.email}</a>
                <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
            <p className="quote grad">Work in silence. Let your progress speak.</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">© {new Date().getFullYear()} {profile.name} · <a href="#home">Back to top ↑</a></div>
      </footer>
    </>
  );
}
