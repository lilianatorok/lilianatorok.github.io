import type { Project } from "@/lib/projects";

// The same three facts under every project's title, in the same order.
export default function ProjectFacts({ project }: { project: Project }) {
  const facts = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Team", value: project.team },
  ].filter((fact) => fact.value);

  return (
    <dl className="facts">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
