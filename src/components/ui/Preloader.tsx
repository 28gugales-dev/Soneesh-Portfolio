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

        // Phase 1: High-Speed Counter (0s - 1.8s)
        const counterObj = { value: 0 };
        tl.to(counterObj, {
            value: 100,
            duration: 1.8,
            ease: "none",
            onUpdate: () => {
                setCounter(Math.floor(counterObj.value));
            }
        }, 0);

        // Name Reveal
        tl.to(".preloader-char-main", {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 1.0,
            ease: "expo.out",
        }, 0.2);

        tl.to(".preloader-char-sub", {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 1.0,
            ease: "expo.out",
        }, 0.6);

        tl.to(`.${styles.counterWrapper}`, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, 0.4);

        tl.to(`.${styles.line}`, {
            width: "140px",
            duration: 1.8,
            ease: "power2.inOut"
        }, 0);

        // Phase 2: Cinematic Holding (2.0s marker)
        tl.addLabel("exit", 2.0);

        // 1. Content Shrink & Fade
        tl.to(`.${styles.content}`, {
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            ease: "power4.inOut"
        }, "exit");

        // 2. Shutter Panels Reveal (Splitting horizontally)
        tl.to(`.${styles.panelLeft}`, {
            xPercent: -100,
            duration: 1.5,
            ease: "expo.inOut"
        }, "exit+=0.4");

        tl.to(`.${styles.panelRight}`, {
            xPercent: 100,
            duration: 1.5,
            ease: "expo.inOut"
        }, "exit+=0.4");

        // 3. Trigger Home Page Reveal
        tl.call(() => {
            onComplete();
        }, [], "exit+=0.8");

        // Remove container once fully opened
        tl.to(container.current, {
            display: "none",
            duration: 0
        }, "exit+=2.0");

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
