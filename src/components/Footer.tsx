import styles from "./Footer.module.css";

export default function Footer({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={[styles.siteFooter, className].filter(Boolean).join(" ")}>
      <footer className={styles.footerPages} aria-label="Footer page links">
        <p className={styles.footerHeading}>Pages</p>
        <div className={styles.footerLinkList}>
          <a className={styles.footerLink} href="/">
            Work
          </a>
          <a className={styles.footerLink} href="/about">
            About
          </a>
          <a className={styles.footerLink} href="/Damian-Izaguirre-Resume.pdf">
            Resume
          </a>
        </div>
      </footer>

      <footer className={styles.footerTalk} aria-label="Social links">
        <p className={styles.footerHeading}>Let&rsquo;s talk!</p>
        <div className={styles.footerIconRow}>
          <a
            className={styles.footerSocialLink}
            href="https://x.com/damianizaguirre"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
          >
            <img src="/assets/social-icons/x.jpg" alt="" />
          </a>
          <a
            className={styles.footerSocialLink}
            href="https://linkedin.com/in/damianizaguirre"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <img src="/assets/social-icons/linkedin.jpg" alt="" />
          </a>
          <a
            className={styles.footerSocialLink}
            href="mailto:izaguirredamian20@gmail.com"
            aria-label="Email"
          >
            <img src="/assets/social-icons/mail.jpg" alt="" />
          </a>
        </div>
      </footer>
    </div>
  );
}
