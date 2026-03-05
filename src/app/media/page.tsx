"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";
import Image from "next/image";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export default function Media() {
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
            .fromTo(".bento-item",
                { opacity: 0 },
                { opacity: 1, stagger: 0.05, duration: 0.8, ease: "power2.out" },
                "<"
            )
            .fromTo(".testimonials-section",
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.out" },
                "<"
            );
    }, { scope: container });

    const handlePlayHover = (enter: boolean) => {
        if (enter) {
            console.log("Trigger Canvas Ripple: Play Button Hover");
        }
    };

    return (
        <main className={styles.main} ref={container}>
            <header className={styles.header}>
                <div className={styles.lineOverflow}>
                    <h1 className="serif flex flex-wrap gap-x-4">
                        {"Media & Publications".split(" ").map((word, wi) => (
                            <span key={wi} className="inline-flex">
                                {word.split("").map((char, ci) => (
                                    <span key={ci} className="header-char inline-block" style={{ opacity: 0 }}>{char}</span>
                                ))}
                            </span>
                        ))}
                    </h1>
                </div>
                <p className={`${styles.intro} header-intro`} style={{ opacity: 0 }}>The Surgeon Soneesh Show & Medical Writings</p>
            </header>

            <div className={styles.bentoGrid}>
                {/* Large Featured Podcast Item */}
                <div className={`bento-item ${styles.bentoItem} ${styles.featuredPodcast}`} style={{ opacity: 0 }}>
                    <div className={styles.featuredContent}>
                        <div className={styles.bentoContent}>
                            <span className={styles.label}>The Surgeon Soneesh Show</span>
                            <h2>The Future of Global Health & Innovation</h2>
                            <p>Conversations with leaders, innovators, and changemakers redefining the medical landscape.</p>
                            <a href="https://open.spotify.com/show/2ZTurW5BZl3i1BnOIiN5lA" target="_blank" rel="noopener noreferrer">
                                <button
                                    className={styles.playButton}
                                    onMouseEnter={() => handlePlayHover(true)}
                                    onMouseLeave={() => handlePlayHover(false)}
                                >
                                    <div className={styles.playIcon}>▶</div>
                                    <span>Listen on Spotify</span>
                                </button>
                            </a>
                        </div>
                        <div className={styles.featuredImageContainer}>
                            <Image
                                src="/images/podcast_show.png"
                                alt="The Surgeon Soneesh Show"
                                fill
                                className={styles.featuredImage}
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Podcast Episode 1 - NMDP */}
                <div className={`bento-item ${styles.bentoItem} ${styles.episodeCard}`} style={{ opacity: 0 }}>
                    <Image
                        src="/images/podcast_nmdp.png"
                        alt="Healthcare Leadership with NMDP CEO"
                        fill
                        className={styles.episodeBg}
                    />
                    <div className={styles.episodeOverlay}>
                        <div className={styles.bentoContent}>
                            <span className={styles.label}>Latest Episode</span>
                            <h3>Healthcare Leadership with NMDP CEO</h3>
                        </div>
                        <a href="https://open.spotify.com/episode/05ilUsjmIibLKtfnaBbQyY" target="_blank" rel="noopener noreferrer" className={styles.playButtonSmall}>
                            ▶
                        </a>
                    </div>
                </div>

                {/* Podcast Episode 2 - MasterYourTalk */}
                <div className={`bento-item ${styles.bentoItem} ${styles.episodeCard}`} style={{ opacity: 0 }}>
                    <Image
                        src="/images/podcast_masteryourtalk.png"
                        alt="Public Speaking Skills with Brenden Kumarasamy"
                        fill
                        className={styles.episodeBg}
                    />
                    <div className={styles.episodeOverlay}>
                        <div className={styles.bentoContent}>
                            <span className={styles.label}>Featured Episode</span>
                            <h3>Public Speaking Skills with Brenden Kumarasamy</h3>
                        </div>
                        <a href="https://open.spotify.com/episode/68pXInhfKRUFoTlCcUVmcM" target="_blank" rel="noopener noreferrer" className={styles.playButtonSmall}>
                            ▶
                        </a>
                    </div>
                </div>

                {/* Publication Block */}
                <div className={`bento-item ${styles.bentoItem} ${styles.publicationBlock}`} style={{ opacity: 0 }}>
                    <div className={styles.bentoContent}>
                        <span className={styles.label}>Publication</span>
                        <h2>Electrochemical Markers in Early Oncology</h2>
                        <p>Published in the Journal of Emerging Medical Investigators.</p>
                        <a href="#" className={styles.readLink}>Read Abstract →</a>
                    </div>
                </div>
            </div>

            {/* Testimonials Section spanning full width under the Bento grid */}
            <section className={`testimonials-section mt-32`} style={{ opacity: 0 }}>
                <h2 className="serif text-4xl text-white mb-8">What Colleagues Say</h2>
                <div className="w-full">
                    <StaggerTestimonials />
                </div>
            </section>
        </main>
    );
}
