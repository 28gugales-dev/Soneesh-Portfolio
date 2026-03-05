"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Preloader.module.css";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onComplete();
            }
        });

        // Intro stagger for SONEESH
        tl.fromTo(".preloader-char-main",
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 1.2,
                ease: "expo.out",
                delay: 0.2
            }
        )
            // Intro stagger for KOTHAGUNDLA
            .fromTo(".preloader-char-sub",
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 1.2,
                    ease: "expo.out"
                }, "-=0.8")
            // Entrance of the loading text
            .fromTo(`.${styles.text}`, {
                opacity: 0,
                y: 10
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=0.5")
            // Progress bar animation
            .to(`.${styles.progressFill}`, {
                scaleX: 1,
                duration: 3,
                ease: "power2.inOut"
            }, 0)
            // Final "Unmasking" - scale up the asset and fade out the container
            .to(`.${styles.asset}`, {
                scale: 1.1,
                opacity: 0,
                duration: 1,
                ease: "power4.inOut",
                delay: 0.2
            })
            .to(`.${styles.container}`, {
                clipPath: "inset(0 0 100% 0)",
                duration: 1.2,
                ease: "expo.inOut"
            }, "-=0.8");
    }, { scope: container });

    return (
        <div className={styles.container} ref={container}>
            <div className={styles.content}>
                <div className={styles.asset}>
                    <div className={styles.titleContainer}>
                        <h1 className={`serif ${styles.titleMain}`}>
                            {"SONEESH".split("").map((char, index) => (
                                <span key={`pm-${index}`} className="preloader-char-main inline-block">{char}</span>
                            ))}
                        </h1>
                        <h1 className={`serif ${styles.titleSub}`}>
                            {"KOTHAGUNDLA".split("").map((char, index) => (
                                <span key={`ps-${index}`} className="preloader-char-sub inline-block">{char}</span>
                            ))}
                        </h1>
                    </div>
                </div>
                <div className={styles.textContainer}>
                    <p className={`serif ${styles.text}`}>Initializing Portfolio</p>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
