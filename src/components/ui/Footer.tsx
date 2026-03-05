import Link from "next/link";
import styles from "./Footer.module.css";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <h2 className="serif text-3xl text-white mb-2">SONEESH K.</h2>
                        <p className={styles.tagline}>Global Health & Policy Advocate</p>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.linkGroup}>
                            <h3 className={styles.groupTitle}>Connect</h3>
                            <a href="mailto:contact@soneesh.com" className={styles.link}>
                                Email <ArrowUpRight className={styles.icon} />
                            </a>
                            <a href="https://linkedin.com/in/soneesh" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                LinkedIn <ArrowUpRight className={styles.icon} />
                            </a>
                            <a href="https://github.com/soneesh" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                GitHub <ArrowUpRight className={styles.icon} />
                            </a>
                        </div>

                        <div className={styles.linkGroup}>
                            <h3 className={styles.groupTitle}>Directory</h3>
                            <Link href="/research" className={styles.link}>Research</Link>
                            <Link href="/leadership" className={styles.link}>Leadership</Link>
                            <Link href="/achievements" className={styles.link}>Achievements</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {currentYear} Soneesh Kothagundla. All rights reserved.
                    </p>
                    <div className={styles.legal}>
                        <Link href="/" className={styles.legalLink}>Privacy</Link>
                        <Link href="/" className={styles.legalLink}>Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
