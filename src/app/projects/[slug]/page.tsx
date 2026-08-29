import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.name} — John Calimoso` : "Project not found" };
}

const DETAIL_FIELDS: { key: "problem" | "role" | "challenge" | "outcome"; label: string }[] = [
  { key: "problem", label: "THE PROBLEM" },
  { key: "role", label: "MY ROLE" },
  { key: "challenge", label: "THE CHALLENGE" },
  { key: "outcome", label: "OUTCOME" },
];

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div>
      <Nav current="detail" />

      <header style={{ maxWidth: 880, margin: "0 auto", padding: "60px 40px 36px" }}>
        <div className="pixel" style={{ fontSize: 9, color: "var(--accent2)", marginBottom: 18 }}>
          {project.category}
        </div>
        <h1 style={{ fontWeight: 400, margin: "0 0 18px", fontSize: 48, lineHeight: 1.1 }}>{project.name}</h1>
        <p style={{ fontSize: 22, color: "var(--muted)", maxWidth: "60ch", margin: "0 0 24px" }}>{project.blurb}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.tags.map((t) => (
            <span key={t} className="tag" style={{ fontSize: 14 }}>
              {t}
            </span>
          ))}
        </div>
      </header>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 40px 40px" }}>
        <div
          style={{
            height: 320,
            position: "relative",
            overflow: "hidden",
            background:
              "repeating-linear-gradient(135deg, var(--stripe-a) 0px, var(--stripe-a) 12px, var(--stripe-b) 12px, var(--stripe-b) 24px)",
            margin: "var(--px)",
            boxShadow: "var(--edge)",
          }}
        >
          <span
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              fontSize: 16,
              background: "var(--bg)",
              padding: "3px 8px",
              color: "var(--accent)",
            }}
          >
            SCREENSHOT.PNG // {project.name}
          </span>
        </div>
      </div>

      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "0 40px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
      >
        {DETAIL_FIELDS.map(({ key, label }) => (
          <div key={key} className="panel" style={{ padding: 24 }}>
            <h3 className="pixel" style={{ fontSize: 10, margin: "0 0 12px", color: "var(--accent2)" }}>
              {label}
            </h3>
            <p style={{ margin: 0, fontSize: 19, color: "var(--muted)", lineHeight: 1.5 }}>{project[key]}</p>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 40px 96px", display: "flex", gap: 14 }}>
        <Link href="/projects" className="btn btn-secondary">
          more projects
        </Link>
        <a href="mailto:johnmishaelparcal@gmail.com" className="btn btn-primary">
          ask me about this
        </a>
      </div>

      <Footer />
    </div>
  );
}
