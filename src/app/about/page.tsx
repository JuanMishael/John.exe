import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PhotoFrame from "@/components/PhotoFrame";

const SKILLS = [
  { label: "FRONTEND", items: ["React", "TypeScript", "JavaScript", "HTML/CSS"] },
  { label: "BACKEND", items: [".NET", "C#", "ASP.NET Core", "Node.js"] },
  { label: "MOBILE", items: ["React Native", "Electron"] },
  { label: "TOOLS", items: ["Git", "Docker", "Playwright", "Appium"] },
  { label: "ML", items: ["TensorFlow Lite", "Python", "OpenCV"] },
];

const PHOTOS = ["street, manila", "golden hour", "portrait study", "night market"];

export default function AboutPage() {
  return (
    <div>
      <Nav current="about" />

      <section className="container" style={{ padding: "60px 40px", display: "grid", gridTemplateColumns: "0.62fr 0.38fr", gap: 50 }}>
        <div>
          <h1 className="pixel" style={{ fontSize: 20, margin: "0 0 22px" }}>
            ABOUT
          </h1>
          <p style={{ fontSize: 21, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 16px" }}>
            I&apos;m a full-stack developer who&apos;s spent the last several years moving between .NET backends and
            React front ends — building everything from enterprise telco platforms to scrappy internal tools that
            save a team an afternoon a week.
          </p>
          <p style={{ fontSize: 21, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 16px" }}>
            I like the layer where messy real-world data becomes something legible — a dashboard, a live tracker, a
            test suite that catches the thing before a user does. React Native and Electron let me carry that across
            mobile and desktop too.
          </p>
          <p style={{ fontSize: 21, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>
            Off the clock, I&apos;m usually out with a camera — you can find that work on{" "}
            <a href="https://unsplash.com/@juan_ito" target="_blank" rel="noopener" style={{ color: "var(--accent)" }}>
              Unsplash
            </a>
            .
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <PhotoFrame width={260} height={320} />
        </div>
      </section>

      <section className="container divider-top" style={{ padding: "20px 40px 60px" }}>
        <h2 className="heading-lg" style={{ margin: "36px 0 30px" }}>
          SKILLS
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16 }}>
          {SKILLS.map((g) => (
            <div key={g.label} className="panel" style={{ padding: 18 }}>
              <div className="pixel" style={{ fontSize: 9, color: "var(--accent2)", marginBottom: 14 }}>
                {g.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {g.items.map((s) => (
                  <div key={s} style={{ fontSize: 18, color: "var(--muted)" }}>
                    ▸ {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container divider-top" style={{ padding: "20px 40px 70px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "36px 0 26px" }}>
          <h2 className="heading-lg">BEHIND THE LENS</h2>
          <a
            href="https://unsplash.com/@juan_ito"
            target="_blank"
            rel="noopener"
            style={{ fontSize: 18, color: "var(--accent)", textDecoration: "none" }}
          >
            more on unsplash &gt;
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {PHOTOS.map((ph) => (
            <div
              key={ph}
              style={{
                background: "#fff",
                padding: "8px 8px 26px",
                transform: "rotate(-1.5deg)",
                margin: "var(--px)",
                boxShadow: "var(--edge), 5px 5px 0 var(--shadow)",
              }}
            >
              <div
                style={{
                  height: 140,
                  position: "relative",
                  overflow: "hidden",
                  background:
                    "repeating-linear-gradient(135deg, var(--stripe-a) 0px, var(--stripe-a) 8px, var(--stripe-b) 8px, var(--stripe-b) 16px)",
                }}
              />
              <span style={{ display: "block", textAlign: "center", fontSize: 15, color: "#2b2b3d", marginTop: 6 }}>
                {ph}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
