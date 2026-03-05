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

        // Slower Counter logic (4 seconds total for the whole experience)
        const counterObj = { value: 0 };
        tl.to(counterObj, {
            value: 100,
            duration: 3.5,
            ease: "power2.inOut",
            onUpdate: () => {
                setCounter(Math.floor(counterObj.value));
            }
        }, 0);

        // Name Reveal - Staggered characters for a premium feel
        tl.to(".preloader-char-main", {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 1.2,
            ease: "expo.out",
        }, 0.3);

        tl.to(".preloader-char-sub", {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 1.2,
            ease: "expo.out",
        }, 0.8);

        // Show counter and line
        tl.to(`.${styles.counterWrapper}`, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, 0.5);

        tl.to(`.${styles.line}`, {
            width: "120px",
            duration: 2.5,
            ease: "power2.inOut"
        }, 0.5);

        // Final Out Animation - Slower and more deliberate
        tl.to(`.${styles.content}`, {
            y: -20,
            opacity: 0,
            duration: 1,
            ease: "power4.inOut",
            delay: 0.5
        });

        tl.to(container.current, {
            y: "-100%",
            duration: 1.5,
            ease: "expo.inOut"
        }, "-=0.7");

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
