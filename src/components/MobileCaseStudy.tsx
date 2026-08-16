"use client";

import Footer from "@/components/Footer";
import styles from "./MobileCaseStudy.module.css";

type MobileCaseStudySection = {
  eyebrow: string;
  title: string;
  body?: string;
  image?: {
    src: string;
    alt: string;
  };
};

type MobileCaseStudyProps = {
  eyebrow?: string;
  title: string;
  description: string;
  hero: {
    src: string;
    alt: string;
  };
  sections: MobileCaseStudySection[];
};

export default function MobileCaseStudy({
  eyebrow,
  title,
  description,
  hero,
  sections,
}: MobileCaseStudyProps) {
  return (
    <article className={styles.mobileCaseStudy}>
      <header className={styles.nav}>
        <a className={styles.brand} href="/" aria-label="Go to Work">
          D[I]
        </a>
        <nav className={styles.links} aria-label="Primary navigation">
          <a href="/">Work</a>
          <a href="/about">About</a>
          <a href="/Damian-Izaguirre-Resume.pdf">Resume</a>
        </nav>
      </header>

      <a className={styles.backLink} href="/">
        Back
      </a>

      <section className={styles.hero}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p>{description}</p>
        <img src={hero.src} alt={hero.alt} />
      </section>

      <div className={styles.sections}>
        {sections.map((section) => (
          <section className={styles.section} key={`${section.eyebrow}-${section.title}`}>
            <p className={styles.sectionEyebrow}>{section.eyebrow}</p>
            <h2>{section.title}</h2>
            {section.body ? <p>{section.body}</p> : null}
            {section.image ? <img src={section.image.src} alt={section.image.alt} /> : null}
          </section>
        ))}
      </div>

      <Footer className={styles.footer} />
    </article>
  );
}
