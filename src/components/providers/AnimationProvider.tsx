"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AnimationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useLayoutEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });

            // Force Lenis and GSAP to immediately recalculate the real document height
            // after Next.js injects the new page route, preventing scrolling lock/cutoff.
            const fireResize = () => {
                window.dispatchEvent(new Event('resize'));
                ScrollTrigger.refresh();
            };

            fireResize();
            setTimeout(fireResize, 100);
            setTimeout(fireResize, 500);
        }
    }, [pathname]);

    useEffect(() => {
        // Prevent browser from trying to handle scroll restoration alongside Lenis
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual';
        }

        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            lerp: 0.08, // Slow, deliberate smoothing
            duration: 1.5,
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Force scroll to top on initial load/reload
        lenis.scrollTo(0, { immediate: true });

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // GSAP ticker uses seconds, Lenis needs milliseconds
        });

        gsap.ticker.lagSmoothing(0);

        // Set global GSAP defaults for a professional, un-rushed feel
        gsap.defaults({
            ease: "power3.out",
            duration: 1.2,
        });

        // Safeguard: Refresh ScrollTrigger after initial mount/animations
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        // Update Lenis/ScrollTrigger when content size changes
        const resizeObserver = new ResizeObserver(() => {
            if (lenis.resize) lenis.resize();
            ScrollTrigger.refresh();
        });
        resizeObserver.observe(document.body);

        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
            resizeObserver.disconnect();
            clearTimeout(timer);
        };
    }, []);

    return <>{children}</>;
}
