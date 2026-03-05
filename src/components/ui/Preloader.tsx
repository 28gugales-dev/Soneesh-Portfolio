"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Preloader.module.css";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const container = useRef<HTMLDivElement>(null);
    const [counter, setCounter] = useState(0);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Set initial states
        tl.set(".preloader-char-main", { y: 50, opacity: 0 });
        tl.set(".preloader-char-sub", { y: 50, opacity: 0 });
        tl.set(`.${styles.counterWrapper}`, { opacity: 0 });
        tl.set(container.current, { "--mask-size": "0%" });

        // Phase 1: Managed Counter (0s - 2.0s)
        const counterObj = { value: 0 };
        tl.to(counterObj, {
            value: 100,
            duration: 2.0,
            ease: "none",
            onUpdate: () => {
                setCounter(Math.floor(counterObj.value));
            }
        }, 0);

        // Name Reveal Stagger
        tl.to(".preloader-char-main", {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 1.0,
            ease: "expo.out",
        }, 0.5);

        tl.to(".preloader-char-sub", {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 1.0,
            ease: "expo.out",
        }, 1.0);

        tl.to(`.${styles.counterWrapper}`, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, 0.8);

        tl.to(`.${styles.line}`, {
            width: "140px",
            duration: 2.0,
            ease: "power2.inOut"
        }, 0);

        // Phase 2: Outward Circular Reveal (Starts at 2.0s)
        tl.addLabel("exit", 2.0);

        // 1. Content Shrink and Fade back
        tl.to(`.${styles.content}`, {
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
            duration: 0.8,
            ease: "power3.inOut"
        }, "exit");

        // 2. Animate the mask-size to reveal outward
        tl.to(container.current, {
            "--mask-size": "150%", // Larger than 100% to ensure coverage
            duration: 1.5,
            ease: "expo.inOut",
            onStart: () => {
                // Trigger home page reveal mid-animation
                gsap.delayedCall(0.5, onComplete);
            }
        }, "exit+=0.2");

        // Cleanup
        tl.set(container.current, { display: "none" }, "exit+=2.0");

    }, { scope: container });

    return (
        <div className={styles.container} ref={container}>
            <div className={styles.content}>
                <div className={styles.titleContainer}>
                    <h1 className={`serif ${styles.titleMain}`}>
                        {"SONEESH".split("").map((char, index) => (
                            <span key={`pm-${index}`} className="preloader-char-main inline-block">{char === " " ? "\u00A0" : char}</span>
                        ))}
                    </h1>
                    <h1 className={`serif ${styles.titleSub}`}>
                        {"KOTHAGUNDLA".split("").map((char, index) => (
                            <span key={`ps-${index}`} className="preloader-char-sub inline-block">{char === " " ? "\u00A0" : char}</span>
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
