"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";

export default function Leadership() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline();

        tl.fromTo(".header-char",
            { opacity: 0 },
            { opacity: 1, stagger: 0.02, duration: 0.6, ease: "power2.out" }
        )
            .fromTo(".header-intro",
                { opacity: 0 },
                { opacity: 1, duration: 0.6, ease: "power2.out" },
                "<"
            );

        // Parallax and reveal animations on scroll
        const items = gsap.utils.toArray(".leadership-item") as HTMLElement[];

        items.forEach((item) => {
            const text = item.querySelector(".leadership-text");
            const imageMask = item.querySelector(".leadership-image-mask");

            gsap.fromTo(
                imageMask,
                { clipPath: "inset(10% 10% 10% 10%)", scale: 0.9, opacity: 0 },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            gsap.fromTo(
                text,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, { scope: container });

    const roles = [
        {
            title: "Georgia HOSA",
            role: "State Vice President",
            description: "Led state-level initiatives representing thousands of future health professionals, driving educational and competitive excellence.",
            imagePlaceholder: "Placeholder: Speaking at Conference"
        },
        {
            title: "#FlightPSAMovement",
            role: "Founder / Director",
            description: "Directed a statewide public service announcement campaign effectively engaging communities on critical health awareness.",
            imagePlaceholder: "Placeholder: Campaign Launch"
        },
        {
            title: "Change A Vision",
            role: "Nonprofit Leadership",
            description: "Spearheaded efforts in bringing visual healthcare resources to underserved communities.",
            imagePlaceholder: "Placeholder: Community Outreach"
        }
    ];

    return (
        <main className={styles.main} ref={container}>
            <header className={styles.header}>
                <div className={styles.lineOverflow}>
                    <h1 className="serif flex flex-wrap gap-x-4">
                        {"Leadership & Impact".split(" ").map((word, wi) => (
                            <span key={wi} className="inline-flex">
                                {word.split("").map((char, ci) => (
                                    <span key={ci} className="header-char inline-block" style={{ opacity: 0 }}>{char}</span>
                                ))}
                            </span>
                        ))}
                    </h1>
                </div>
                <p className={`${styles.intro} header-intro`} style={{ opacity: 0 }}>Guiding communities toward a healthier, more informed future.</p>
            </header>

            <div className={styles.masonry}>
                {roles.map((item, index) => (
                    <div key={index} className={`leadership-item ${styles.item} ${index % 2 !== 0 ? styles.itemReversed : ''}`}>
                        <div className={`leadership-image-mask ${styles.imageContainer}`} style={{ opacity: 0 }}>
                            <div className={styles.imagePlaceholderText}>
                                {item.imagePlaceholder}
                            </div>
                        </div>
                        <div className={`leadership-text ${styles.textContainer}`} style={{ opacity: 0 }}>
                            <h2>{item.title}</h2>
                            <h3>{item.role}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
