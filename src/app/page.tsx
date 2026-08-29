import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import ProjectCard from "@/components/ProjectCard";
import PhotoFrame from "@/components/PhotoFrame";
import { PROJECTS } from "@/lib/projects";

export default function Home() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <div id="top">
      <Nav current="home" />

      <header
        className="container"
        style={{
          padding: "80px 40px 70px",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 50,
          alignItems: "center",
        }}
      >
        <div>
          <div
            className="pixel"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 10,
              color: "var(--accent)",
              background: "var(--surface)",
              border: "2px solid var(--accent)",
              padding: "8px 12px",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                background: "var(--accent)",
                animation: "jc-pulse 1.6s infinite",
              }}
            />
            FULL-STACK DEV
          </div>
          <h1
            style={{
              fontWeight: 400,
              fontSize: 56,
              lineHeight: 1.05,
              margin: "0 0 20px",
            }}
          >
            I build apps that streamline solutions.
          </h1>
          <p
            style={{
              fontSize: 22,
              lineHeight: 1.5,
              color: "var(--muted)",
              maxWidth: "52ch",
              margin: "0 0 32px",
            }}
          >
            Full-stack developer specializing in web applications — from
            enterprise platforms to practical side projects.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <Link href="/projects" className="btn btn-primary">
              ./see_the_work
            </Link>
            <a href="#contact" className="btn btn-secondary">
              ./get_in_touch
            </a>
          </div>
        </div>
        <Terminal />
      </header>

      <section className="section divider-top">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <h2 className="heading-lg">FEATURED WORK</h2>
          <Link
            href="/projects"
            style={{
              fontSize: 18,
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            view all {PROJECTS.length} &gt;
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 18,
            marginTop: 24,
          }}
        >
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section
        className="section divider-top"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.6fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        <div>
          <h2 className="heading-lg" style={{ marginBottom: 18 }}>
            ABOUT
          </h2>
          <p
            style={{
              fontSize: 21,
              lineHeight: 1.6,
              color: "var(--muted)",
              margin: "0 0 16px",
            }}
          >
            Full-stack developer usually working with web technologies — plus a
            love for photography, wanna be my subject? ^_^)/
          </p>
          <Link
            href="/about"
            style={{
              fontSize: 18,
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            more about me &gt;
          </Link>
        </div>
        <div style={{ justifySelf: "end" }}>
          <PhotoFrame width={180} height={220} />
        </div>
      </section>

      <section
        id="contact"
        className="section divider-top"
        style={{ padding: "60px 40px" }}
      >
        <h2 className="heading-lg" style={{ marginBottom: 16 }}>
          CONTACT
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 20,
            margin: "0 0 28px",
            maxWidth: "56ch",
          }}
        >
          Open to full-stack roles and interesting freelance work. Reach out —
          Let's build awsome stuff ;)
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          <a
            href="mailto:johnmishaelparcal@gmail.com"
            className="btn btn-primary"
          >
            [MAIL] johnmishaelparcal@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/john-mishael-calimoso-148abb257/"
            target="_blank"
            rel="noopener"
            className="btn btn-secondary"
          >
            [LINKEDIN]
          </a>
          <a
            href="https://github.com/JuanMishael"
            target="_blank"
            rel="noopener"
            className="btn btn-secondary"
          >
            [GITHUB]
          </a>
          <a
            href="https://unsplash.com/@juan_ito"
            target="_blank"
            rel="noopener"
            className="btn btn-secondary"
          >
            [UNSPLASH]
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
