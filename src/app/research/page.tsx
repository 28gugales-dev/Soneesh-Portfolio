"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";

export default function Research() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".header-char",
            { opacity: 0 },
            { opacity: 1, stagger: 0.02, duration: 0.6, ease: "power2.out" }
        )
            .fromTo(".header-intro",
                { opacity: 0 },
                { opacity: 1, duration: 0.6, ease: "power2.out" },
                "<"
            )
            .fromTo(".card",
                { opacity: 0 },
                { opacity: 1, stagger: 0.05, duration: 0.8, ease: "power2.out" },
                "<"
            );
    }, { scope: container });

    const projects = [
        {
            title: "Regeneron STS Scholar",
            subtitle: "Electrochemical Biosensor",
            description: "Developed a novel electrochemical biosensor for early detection with high sensitivity and specificity.",
            year: "2023"
        },
        {
            title: "Massachusetts General Hospital",
            subtitle: "Research Internship",
            description: "Conducted clinical data analysis and supported ongoing longitudinal studies in advanced patient care.",
            year: "2022"
        },
        {
            title: "Emory University",
            subtitle: "MARS Surgical Labs",
            description: "Collaborated on surgical robotics and AI-assisted intervention technologies.",
            year: "2021"
        }
    ];

    return (
        <main className={styles.main} ref={container}>
            <header className={styles.header}>
                <div className={styles.lineOverflow}>
                    <h1 className="serif flex flex-wrap gap-x-4">
                        {"Academic Research".split(" ").map((word, wi) => (
                            <span key={wi} className="inline-flex">
                                {word.split("").map((char, ci) => (
                                    <span key={ci} className="header-char inline-block" style={{ opacity: 0 }}>{char}</span>
                                ))}
                            </span>
                        ))}
                    </h1>
                </div>
                <p className={`${styles.intro} header-intro`} style={{ opacity: 0 }}>Rigorous methodology applied to modern medical challenges.</p>
            </header>

            <div className={styles.grid}>
                {projects.map((project, i) => (
                    <div key={i} className={`card ${styles.card} ${i % 2 === 0 ? styles.offsetDown : styles.offsetUp}`} style={{ opacity: 0 }}>
                        <div className={styles.cardHeader}>
                            <span className={styles.year}>{project.year}</span>
                            <h2 className="serif">{project.title}</h2>
                        </div>
                        <h3 className={styles.subtitle}>{project.subtitle}</h3>
                        <p className={styles.description}>{project.description}</p>
                        <div className={styles.cardFooter}>
                            <button className={styles.readMore}>View Paper</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
