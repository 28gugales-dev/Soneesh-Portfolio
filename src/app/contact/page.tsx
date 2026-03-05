"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";

export default function Contact() {
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
            .fromTo(".contact-animate",
                { opacity: 0 },
                { opacity: 1, stagger: 0.05, duration: 0.8, ease: "power2.out" },
                "<"
            );
    }, { scope: container });

    return (
        <main className={styles.main} ref={container}>
            <header className={styles.header}>
                <div className={styles.lineOverflow}>
                    <h1 className="serif flex flex-wrap gap-x-4">
                        {"Get in Touch".split(" ").map((word, wi) => (
                            <span key={wi} className="inline-flex">
                                {word.split("").map((char, ci) => (
                                    <span key={ci} className="header-char inline-block" style={{ opacity: 0 }}>{char}</span>
                                ))}
                            </span>
                        ))}
                    </h1>
                </div>
                <p className={`${styles.intro} header-intro`} style={{ opacity: 0 }}>Available for academic collaborations, speaking engagements, and consulting.</p>
            </header>

            <div className={styles.content}>
                <div className={`contact-animate ${styles.formContainer}`} style={{ opacity: 0 }}>
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="John Doe" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="john@example.com" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows={6} placeholder="How can we collaborate?"></textarea>
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            Send Message
                        </button>
                    </form>
                </div>

                <div className={`contact-animate ${styles.infoContainer}`} style={{ opacity: 0 }}>
                    <div className={styles.infoBlock}>
                        <h3>Direct Inquiry</h3>
                        <p>hello@soneeshk.com</p>
                    </div>

                    <div className={styles.infoBlock}>
                        <h3>Social</h3>
                        <div className={styles.socialLinks}>
                            <a href="#">LinkedIn</a>
                            <a href="#">Twitter</a>
                            <a href="#">ResearchGate</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
