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

        // Background and initial state
        tl.set(`.${styles.name}`, { y: "110%", opacity: 0 });
        tl.set(`.${styles.counterWrapper}`, { opacity: 0 });

        // Counter logic
        const counterObj = { value: 0 };
        tl.to(counterObj, {
            value: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => {
                setCounter(Math.floor(counterObj.value));
            }
        }, 0);

        // Name Reveal - Character reveal or mask reveal
        tl.to(`.${styles.name}`, {
            y: "0%",
            opacity: 1,
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.1,
        }, 0.5);

        // Show counter and line
        tl.to(`.${styles.counterWrapper}`, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, 0.2);

        tl.to(`.${styles.line}`, {
            width: "150px",
            duration: 2,
            ease: "power2.inOut"
        }, 0);

        // Final Out Animation - A sophisticated fade/scale
        tl.to(`.${styles.content}`, {
            scale: 1.05,
            opacity: 0,
            duration: 1,
            ease: "power4.inOut",
            delay: 0.3
        });

        tl.to(container.current, {
            y: "-100%",
            duration: 1.2,
            ease: "expo.inOut"
        }, "-=0.8");

    }, { scope: container });

    return (
        <div className={styles.container} ref={container}>
            <div className={styles.content}>
                <div className={styles.nameWrapper}>
                    <h1 className={`serif ${styles.name}`}>
                        SONEESH <span className={styles.nameHighlight}>KOTHAGUNDLA</span>
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
