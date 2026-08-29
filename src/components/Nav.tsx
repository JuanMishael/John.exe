import Link from "next/link";
import Settings from "./Settings";

const TABS = [
  { key: "home", href: "/", label: "HOME" },
  { key: "projects", href: "/projects", label: "PROJECTS" },
  { key: "about", href: "/about", label: "ABOUT" },
  { key: "contact", href: "/#contact", label: "CONTACT" },
];

export default function Nav({
  current,
}: {
  current: "home" | "about" | "projects" | "detail";
}) {
  // a case study is a child of /projects — keep that tab lit
  const active = current === "detail" ? "projects" : current;

  return (
    <header className="topbar">
      <div className="win-bar topbar-bar">
        <span className="win-title">JOHN.EXE</span>

        <nav className="tabs">
          {TABS.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className="tab"
              aria-current={t.key === active ? "page" : undefined}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <Settings />
      </div>
    </header>
  );
}
