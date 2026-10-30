import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { alsoMe, portrait, services } from "@/lib/projects";

export const metadata: Metadata = { title: "About — Liliána Török" };

export default function AboutPage() {
  return (
    <>
      <main className="about">
        <h1 className="display">
          Liliána
          <br />
          Török
        </h1>

        <div className="about-intro">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portrait} alt="Liliána standing in the street" />
          <div>
            <p className="about-quote">
              Designing things is easy. Designing the right thing is <em>the fun part</em> — for me.
            </p>
            <p>
              I work as a product designer, collaborating closely with developers and stakeholders
              to turn complex problems into simple, usable digital products — and yes, I actually
              enjoy the process.
            </p>
            <p>
              I’ve had the chance to work on genuinely good projects with great people — and that’s
              what keeps me excited about what I do. I’ve done many roles, and I bring that
              perspective into my design work. I’m easy to work with, ask a lot of questions, and
              care about the end result.
            </p>
          </div>
        </div>

        <section className="services">
          <h2>Services</h2>
          <ul>
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </section>

        <section className="also-me">
          <h2 className="display">
            This is <em>also</em> me
          </h2>
          <div className="also-me-grid">
            {alsoMe.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={`${src}?scale-down-to=512`} alt="" />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
