"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Achievements() {
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
            .fromTo(".achievement-card",
                { opacity: 0 },
                { opacity: 1, stagger: 0.05, duration: 0.8, ease: "power2.out" },
                "<"
            );

        // Add a blue flash to titles on load
        gsap.fromTo(".title",
            { color: "var(--sterile-white)" },
            { color: "var(--sky-blue)", duration: 2, ease: "expo.out", delay: 0.5 });

    }, { scope: container });

    return (
        <main className={styles.main} ref={container}>
            <header className={styles.header}>
                <div className={styles.lineOverflow}>
                    <h1 className="serif flex flex-wrap gap-x-4">
                        {"Impact & Recognition".split(" ").map((word, wi) => (
                            <span key={wi} className="inline-flex">
                                {word.split("").map((char, ci) => (
                                    <span key={ci} className="header-char inline-block" style={{ opacity: 0 }}>{char}</span>
                                ))}
                            </span>
                        ))}
                    </h1>
                </div>
                <p className={`${styles.intro} header-intro`} style={{ opacity: 0 }}>
                    A chronological overview of my awards, publications, and pivotal roles driving equity in healthcare and policy.
                </p>
            </header>

            <div className={styles.accordionContainer}>
                {/* 2026 Regeneron STS Featured Card */}
                <div className={`achievement-card ${styles.accordionItem}`} style={{ opacity: 0 }}>
                    <Image
                        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop"
                        alt="Microscopic cell research"
                        fill
                        className={styles.bgImage}
                        unoptimized
                    />
                    <div className={styles.overlay}>
                        <div className={styles.content}>
                            <div className={styles.cardHeader}>
                                <span className={styles.badge}>Award</span>
                                <span className={styles.year}>2026</span>
                            </div>
                            <h2 className={`serif title ${styles.title}`}>Regeneron Science Talent Search Scholar</h2>
                            <p className={styles.description}>
                                Named a top 300 scholar nationally for my groundbreaking research regarding the "Effect of Tamoxifen and 17-β-Estradiol on Lung Adenocarcinoma", exploring the differential modulation of proliferation and migration in male vs. female cells.
                            </p>
                        </div>
                    </div>
                    <div className={styles.closedTitleContainer}>
                        <span className={styles.closedTitle}>01 // S.T.S Scholar</span>
                    </div>
                </div>

                {/* Fasten Your Seatbelt Book */}
                <div className={`achievement-card ${styles.accordionItem}`} style={{ opacity: 0 }}>
                    <Image
                        src="/images/book_cover.jpg"
                        alt="Book Cover"
                        fill
                        className={styles.bgImage}
                        unoptimized
                    />
                    <div className={styles.overlay}>
                        <div className={styles.content}>
                            <div className={styles.cardHeader}>
                                <span className={styles.badge}>Publication</span>
                                <span className={styles.year}>Author</span>
                            </div>
                            <h3 className={`serif title ${styles.title}`}>Fasten Your Seatbelt</h3>
                            <p className={styles.description}>
                                My bestselling book serving as "The Youth Leader's Guide to Changing the World", empowering Gen Z to tackle global health and social justice issues.
                            </p>
                        </div>
                    </div>
                    <div className={styles.closedTitleContainer}>
                        <span className={styles.closedTitle}>02 // Bestselling Book</span>
                    </div>
                </div>

                {/* Change A Vision Nonprofit */}
                <div className={`achievement-card ${styles.accordionItem}`} style={{ opacity: 0 }}>
                    <Image
                        src="/images/plane_call.jpg"
                        alt="Change A Vision"
                        fill
                        className={styles.bgImage}
                        unoptimized
                    />
                    <div className={styles.overlay}>
                        <div className={styles.content}>
                            <div className={styles.cardHeader}>
                                <span className={styles.badge}>Leadership</span>
                                <span className={styles.year}>Founder & Exec. Director</span>
                            </div>
                            <h3 className={`serif title ${styles.title}`}>Change A Vision</h3>
                            <p className={styles.description}>
                                A nonprofit organization I founded, focused on donating books to incarcerated populations to foster mentorship, second chances, and equitable growth.
                            </p>
                        </div>
                    </div>
                    <div className={styles.closedTitleContainer}>
                        <span className={styles.closedTitle}>03 // Change A Vision</span>
                    </div>
                </div>

                {/* Georgia HOSA */}
                <div className={`achievement-card ${styles.accordionItem}`} style={{ opacity: 0 }}>
                    <Image
                        src="/images/hosa_portrait.png"
                        alt="Medical conference"
                        fill
                        className={styles.bgImage}
                        style={{ objectPosition: 'top' }}
                        unoptimized
                    />
                    <div className={styles.overlay}>
                        <div className={styles.content}>
                            <div className={styles.cardHeader}>
                                <span className={styles.badge}>Leadership</span>
                                <span className={styles.year}>2025–2026</span>
                            </div>
                            <h3 className={`serif title ${styles.title}`}>Georgia HOSA State VP</h3>
                            <p className={styles.description}>
                                Serving as the State Vice President of Membership for Health Occupations Students of America, leading initiatives for future medical professionals.
                            </p>
                        </div>
                    </div>
                    <div className={styles.closedTitleContainer}>
                        <span className={styles.closedTitle}>04 // Georgia HOSA</span>
                    </div>
                </div>

                {/* Additional Awards */}
                <div className={`achievement-card ${styles.accordionItem}`} style={{ opacity: 0 }}>
                    <Image
                        src="https://images.unsplash.com/photo-1507676184212-d0330a15673c?q=80&w=800&auto=format&fit=crop"
                        alt="Innovation and awards"
                        fill
                        className={styles.bgImage}
                        unoptimized
                    />
                    <div className={styles.overlay}>
                        <div className={styles.content}>
                            <div className={styles.cardHeader}>
                                <span className={styles.badge}>Honor</span>
                                <span className={styles.year}>Global Top 100</span>
                            </div>
                            <h3 className={`serif title ${styles.title}`}>Emerging Innovator Award</h3>
                            <p className={styles.description}>
                                Recognized globally as one of the top 100 high school innovators for my work bridging clinical research and actionable health policy.
                            </p>
                        </div>
                    </div>
                    <div className={styles.closedTitleContainer}>
                        <span className={styles.closedTitle}>05 // Innovator Award</span>
                    </div>
                </div>

                {/* Journal */}
                <div className={`achievement-card ${styles.accordionItem}`} style={{ opacity: 0 }}>
                    <Image
                        src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop"
                        alt="Journal writing"
                        fill
                        className={styles.bgImage}
                        unoptimized
                    />
                    <div className={styles.overlay}>
                        <div className={styles.content}>
                            <div className={styles.cardHeader}>
                                <span className={styles.badge}>Publication</span>
                                <span className={styles.year}>Author</span>
                            </div>
                            <h3 className={`serif title ${styles.title}`}>A Journal to Change Your Vision</h3>
                            <p className={styles.description}>
                                A published journal I deliberately designed for growth, self-reflection, and building robust disciplinary habits for young leaders.
                            </p>
                        </div>
                    </div>
                    <div className={styles.closedTitleContainer}>
                        <span className={styles.closedTitle}>06 // Published Journal</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
