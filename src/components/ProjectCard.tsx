import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="card">
      <div className="card-category">{project.category}</div>
      <div className="card-title">{project.name}</div>
      <p className="card-blurb">{project.blurb}</p>
      <div className="card-cta">&gt; view case study</div>
    </Link>
  );
}
