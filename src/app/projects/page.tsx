import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PROJECTS } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div>
      <Nav current="projects" />

      <header className="container" style={{ padding: "60px 40px 30px" }}>
        <h1 className="pixel" style={{ fontSize: 20, margin: "0 0 14px" }}>
          PROJECTS
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 20, maxWidth: "60ch", margin: 0 }}>
          A mix of production platforms, internal tooling, and side projects — in the order I&apos;d walk you
          through them.
        </p>
      </header>

      <section className="container" style={{ padding: "20px 40px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
          {PROJECTS.map((p, i) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="card" style={{ gap: 14, padding: 20 }}>
              <div
                style={{
                  height: 120,
                  position: "relative",
                  overflow: "hidden",
                  background:
                    "repeating-linear-gradient(45deg, var(--stripe-a) 0px, var(--stripe-a) 8px, var(--stripe-b) 8px, var(--stripe-b) 16px)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    bottom: 6,
                    left: 6,
                    fontSize: 14,
                    background: "var(--bg)",
                    padding: "2px 6px",
                    color: "var(--accent)",
                  }}
                >
                  IMG_{i}.PNG // {p.name}
                </span>
              </div>
              <div>
                <div className="card-category" style={{ marginBottom: 8 }}>
                  {p.category}
                </div>
                <div className="card-title" style={{ marginBottom: 6 }}>
                  {p.name}
                </div>
                <p className="card-blurb" style={{ marginBottom: 12 }}>
                  {p.blurb}
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="card-cta">&gt; view case study</div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
