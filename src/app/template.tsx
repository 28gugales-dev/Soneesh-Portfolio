"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Template({ children }: { children: React.ReactNode }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Simple, elegant fade-up wipe on route entry
        gsap.from(container.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "opacity"
        });
    }, { scope: container });

    return (
        <div ref={container}>
            {children}
        </div>
    );
}
