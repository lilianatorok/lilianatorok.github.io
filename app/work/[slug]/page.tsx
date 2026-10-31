import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import OneSystem from "@/components/OneSystem";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project ? `${project.name} — Liliána Török` : "Liliána Török" };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const facts = [
    { label: "My role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Challenges", value: project.challenges },
  ].filter((fact) => fact.value);

  return (
    <>
      <main className="project">
        {project.slug === "system" ? (
          <OneSystem />
        ) : (
          <>
            <h1 className="display">{project.name}</h1>
            <p className="project-subtitle">{project.subtitle}</p>

            {facts.length > 0 && (
              <dl className="facts">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            {project.sections && <img className="project-cover" src={project.cover} alt="" />}

            {project.sections?.map((section) => (
              <section key={section.title} className="case-section">
                <h2>{section.title}</h2>
                <div>
                  <p>{section.body}</p>
                  {section.points && (
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            <div className={project.sections ? "project-grid" : "project-images"}>
              {project.images.map((image) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={image.src}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  loading="lazy"
                />
              ))}
            </div>
          </>
        )}

        <Link href={`/work/${next.slug}`} className="next-project">
          <span>Next project</span>
          <strong>{next.name}</strong>
        </Link>
      </main>
      <Footer />
    </>
  );
}
