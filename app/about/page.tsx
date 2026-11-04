import type { Metadata } from "next";
import AboutTitle from "@/components/AboutTitle";
import AlsoMe from "@/components/AlsoMe";
import BitePicture from "@/components/BitePicture";
import CvLink from "@/components/CvLink";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { portrait, services } from "@/lib/projects";

export const metadata: Metadata = { title: "About — Liliána Török" };

export default function AboutPage() {
  return (
    <>
      <main className="about">
        <AboutTitle />

        <div className="about-hero">
          <BitePicture className="about-picture" src={`${portrait}?scale-down-to=2048`} alt="Liliána standing in the street" />
          <p className="about-quote">
            Designing things is easy. Designing the right thing is <em>the fun part</em> — for me.
          </p>
        </div>

        <section className="about-block about-intro">
          <h2 className="about-block-title">About me</h2>
          <div className="about-intro-body">
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
            <CvLink />
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
