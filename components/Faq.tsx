"use client";

import { useState } from "react";
import { faqs } from "@/lib/projects";

export default function Faq() {
  const [openQuestions, setOpenQuestions] = useState([faqs[0].question]);

  const toggle = (question: string) =>
    setOpenQuestions((current) =>
      current.includes(question) ? current.filter((item) => item !== question) : [...current, question],
    );

  return (
    <section className="about-block faq">
      <h2 className="about-block-title">FAQs</h2>
      <ul>
        {faqs.map(({ question, answer }) => (
          <li key={question}>
            <h3>
              <button type="button" aria-expanded={openQuestions.includes(question)} onClick={() => toggle(question)}>
                {question}
                <i aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-answer">
              <p>{answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
