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
        tl.set(`.${styles.panelLeft}`, { xPercent: 0 });
        tl.set(`.${styles.panelRight}`, { xPercent: 0 });

        // Phase 1: Controlled Counter (0s - 2.5s)
        // Forced duration of 2.5s to ensure "lasting roughly 2 seconds"
        const counterObj = { value: 0 };
        tl.to(counterObj, {
            value: 100,
            duration: 2.5,
            ease: "power1.inOut",
            onUpdate: () => {
                setCounter(Math.floor(counterObj.value));
            }
        }, 0);

        // Name Reveal Staggered
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
            duration: 2.5,
            ease: "power2.inOut"
        }, 0);

        // Phase 2: Cinematic Shutter (Starts after 2.5s)
        tl.addLabel("exit", 2.5);

        // 1. Content Fade Out
        tl.to(`.${styles.content}`, {
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
            duration: 0.6,
            ease: "power2.inOut"
        }, "exit");

        // 2. Twin Shutter Split
        tl.to(`.${styles.panelLeft}`, {
            xPercent: -100,
            duration: 1.8,
            ease: "expo.inOut"
        }, "exit+=0.2");

        tl.to(`.${styles.panelRight}`, {
            xPercent: 100,
            duration: 1.8,
            ease: "expo.inOut"
        }, "exit+=0.2");

        // 3. Reveal Home Page
        tl.call(() => {
            onComplete();
        }, [], "exit+=1.0");

        // Cleanup
        tl.set(container.current, { display: "none" }, "exit+=3.0");

    }, { scope: container });

    return (
        <div className={styles.container} ref={container}>
            <div className={`${styles.panel} ${styles.panelLeft}`} />
            <div className={`${styles.panel} ${styles.panelRight}`} />

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
