import type { Metadata } from "next";
import Link from "next/link";
import AboutTitle from "@/components/AboutTitle";
import AlsoMe from "@/components/AlsoMe";
import BitePicture from "@/components/BitePicture";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import RollText from "@/components/RollText";
import { portrait, services } from "@/lib/projects";

export const metadata: Metadata = { title: "About — Liliána Török" };

export default function AboutPage() {
  return (
    <>
      <main className="about">
        <AboutTitle />

        <BitePicture className="about-picture" src={`${portrait}?scale-down-to=2048`} alt="Liliána standing in the street" />

        <section className="about-block about-intro">
          <h2 className="about-block-title">About me</h2>
          <div className="about-intro-body">
            <p className="about-quote">
              Designing things is easy. Designing the right thing is <em>the fun part</em> — for me.
            </p>
            <div className="about-text">
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
            <Link className="about-cv" href="/Liliana_Torok_CV.pdf" download prefetch={false}>
              <span className="about-cv-label">
                <RollText text="Download CV" />
              </span>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 1.5v9M4 6.5l4 4 4-4M2 14.5h12" />
              </svg>
            </Link>
          </div>
        </section>

        <section className="about-block services">
          <h2 className="about-block-title">Services</h2>
          <ul>
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </section>

        <AlsoMe />

        <Faq />
      </main>
      <Footer />
    </>
  );
}
