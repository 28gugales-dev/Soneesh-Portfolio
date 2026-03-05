"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Preloader.module.css";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const container = useRef<HTMLDivElement>(null);
    const [counter, setCounter] = useState(0);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onComplete();
            }
        });

        // Set initial states
        tl.set(".preloader-char-main", { y: 50, opacity: 0 });
        tl.set(".preloader-char-sub", { y: 50, opacity: 0 });
        tl.set(`.${styles.counterWrapper}`, { opacity: 0 });

        // Total duration for content: ~2 seconds
        const counterObj = { value: 0 };
        tl.to(counterObj, {
            value: 100,
            duration: 1.5, // Faster counter
            ease: "power2.inOut",
            onUpdate: () => {
                setCounter(Math.floor(counterObj.value));
            }
        }, 0);

        // Name Reveal - Snappier
        tl.to(".preloader-char-main", {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.8,
            ease: "expo.out",
        }, 0.2);

        tl.to(".preloader-char-sub", {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.8,
            ease: "expo.out",
        }, 0.5);

        // Show counter and line
        tl.to(`.${styles.counterWrapper}`, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        }, 0.3);

        tl.to(`.${styles.line}`, {
            width: "120px",
            duration: 1.5,
            ease: "power2.inOut"
        }, 0.3);

        // Final Out Animation - Slower exit as requested ("going away to fast")
        tl.to(`.${styles.content}`, {
            y: -30,
            opacity: 0,
            duration: 1.2,
            ease: "power4.inOut",
            delay: 0.2
        });

        tl.to(container.current, {
            y: "-100%",
            duration: 1.8, // Much slower exit
            ease: "expo.inOut"
        }, "-=1.0");

    }, { scope: container });

    return (
        <div className={styles.container} ref={container}>
            <div className={styles.content}>
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

                <div className={styles.counterWrapper}>
                    <div className={styles.line}></div>
                    <div className={styles.counter}>{counter.toString().padStart(3, '0')}%</div>
                    <div className={styles.line}></div>
                </div>

                <p className={styles.loadingText}>Creative Portfolio 2026</p>
            </div>
        </div>
    );
}
