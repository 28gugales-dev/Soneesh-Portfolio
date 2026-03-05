"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";
import Image from "next/image";
import Preloader from "@/components/ui/Preloader";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  // Hydration-safe loading state
  const [loading, setLoading] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Aggressive client-side check
    const isShown = localStorage.getItem('preloaderShown');
    const isReset = window.location.search.includes('reset=true');

    if (!isShown || isReset) {
      setLoading(true);
    }

    if (isReset) {
      localStorage.removeItem('preloaderShown');
      window.history.replaceState({}, '', window.location.pathname);
    }

    setHasChecked(true);
  }, []);

  const handlePreloaderComplete = () => {
    localStorage.setItem('preloaderShown', 'true');
    setLoading(false);
  };

  const heroImages = [
    { src: "/images/hero_bg.jpg", context: "Georgia HOSA State Fall Leadership Conference" },
    { src: "/images/hero_bg_2.jpg", context: "Regeneron STS Research at Emory University" },
    { src: "/images/hero_bg_3.png", context: "American Cancer Society National Roundtable" },
    { src: "/images/hero_bg_4.png", context: "Change A Vision Non-Profit Outreach" },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [loading, currentIndex, heroImages.length]);

  useGSAP(() => {
    if (loading) return;

    gsap.registerPlugin(ScrollTrigger);

    // Initial Massive typography reveal animation
    const tl = gsap.timeline();
    tl.fromTo(".hero-title-char-main",
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        color: "var(--sky-blue)",
        stagger: 0.03,
        ease: "expo.out",
        duration: 1.2,
      })
      .fromTo(".hero-title-char-sub",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          color: "var(--sterile-white)", // Force white
          stagger: 0.03,
          ease: "expo.out",
          duration: 1.2,
        }, "-=1.0")
      .fromTo(".hero-subtitle",
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out"
        }, "-=1.0");

    // Scroll-triggered Vision Sections
    const visionItems = gsap.utils.toArray(".vision-section") as HTMLElement[];
    visionItems.forEach((section) => {
      gsap.fromTo(section,
        {
          y: 100,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
          y: 0,
          opacity: 1,
          ease: "expo.out",
        });
    });

    // Elegant Hero Scroll Transition (Parallax + Fade)
    gsap.to(".bg-image-container", {
      scrollTrigger: {
        trigger: `.${styles.hero}`,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: "20%", // Smooth parallax effect dragging the image down slightly 
      ease: "none"
    });

    gsap.to(`.${styles.infoGrid}, .${styles.contextBox}, .${styles.progressContainer}, .${styles.navArrow}`, {
      scrollTrigger: {
        trigger: `.${styles.hero}`,
        start: "top top",
        end: "bottom 50%", // Fades out completely by the time hero is halfway up
        scrub: true,
      },
      y: -100,
      opacity: 0,
      ease: "power1.inOut"
    });

  }, { scope: container, dependencies: [loading] });

  // We are relying on CSS transitions for the background images
  // to avoid conflicts between React rendering and GSAP mutating inline styles.
  if (!hasChecked) return <div style={{ background: 'var(--obsidian)', width: '100vw', height: '100vh' }} />;

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <main className={styles.main} ref={container}>
        {/* Existing Hero Section */}
        <section className={styles.hero}>
          <div className={styles.backgroundWrapper}>
            {heroImages.map((img, index) => (
              <div
                key={img.src}
                className={`absolute inset-0 bg-image-container`}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  opacity: index === currentIndex ? 1 : 0,
                  transition: 'opacity 1.5s cubic-bezier(0.25, 1, 0.5, 1)',
                  zIndex: index === currentIndex ? 0 : -1
                }}
              >
                <Image
                  src={img.src}
                  alt={img.context}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>
          <div className={styles.glassOverlay} />

          {/* Slider Controls */}
          <button className={`${styles.navArrow} ${styles.prevArrow}`} onClick={prevSlide} aria-label="Previous slide">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button className={`${styles.navArrow} ${styles.nextArrow}`} onClick={nextSlide} aria-label="Next slide">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className={styles.progressContainer}>
            {heroImages.map((_, index) => (
              <div
                key={index}
                className={styles.progressBarBg}
                onClick={() => setCurrentIndex(index)}
              >
                {index === currentIndex && (
                  <div className={styles.progressFill} />
                )}
              </div>
            ))}
          </div>

          <div className={styles.contextBox}>
            <div className={styles.contextContent}>
              <span className={styles.contextLabel}>Current View:</span>
              <p className={styles.contextText} key={currentIndex}>
                {heroImages[currentIndex].context}
              </p>
            </div>
          </div>

          <div className={styles.heroTop}>
            {/* Top section now empty or ready for future content */}
          </div>

          <div className={styles.infoGrid}>
            <div className="hero-subtitle flex flex-col justify-end">
              <p className={styles.subtitle}>
                Researcher | Advocate | Innovator
              </p>
              <p className={styles.description}>
                Empowering the next generation to unfasten their seatbelts and take the driver's seat in global health.
              </p>

              <div className={styles.titleContainer}>
                <div className={styles.lineOverflow}>
                  <h1 className={`serif ${styles.titleMain}`}>
                    {"SONEESH".split("").map((char, index) => (
                      <span key={index} className="hero-title-char-main inline-block">{char}</span>
                    ))}
                  </h1>
                </div>
                <div className={styles.lineOverflow}>
                  <h1 className={`serif ${styles.titleSub}`}>
                    {"KOTHAGUNDLA".split("").map((char, index) => (
                      <span key={index} className="hero-title-char-sub inline-block">{char}</span>
                    ))}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expanded Scroll Sections */}
        <section className={styles.visionContainer}>
          <div className={`vision-section ${styles.visionRow} ${styles.glassCard}`}>
            <div className={styles.visionContent}>
              <h2 className="serif text-4xl lg:text-5xl mb-6 text-white leading-tight">
                The Seatbelt Sign Is Off.
              </h2>
              <p className="text-muted-foreground text-lg mb-4">
                As a Regeneron Science Talent Search Scholar, my work explores the boundaries of oncology, allergy, and immunology. My 2026 research into the effect of Tamoxifen and 17-β-Estradiol on Lung Adenocarcinoma showcases my commitment to nuanced, gender-specific approaches in treating leading causes of mortality.
              </p>
            </div>
            <div className={`relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-sky-500/20`}>
              <Image
                src="/images/podcast.png"
                alt="Medical Innovation Podcast"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          <div className={`vision-section ${styles.visionRow} ${styles.visionRowReverse} ${styles.glassCard}`}>
            <div className={styles.visionContent}>
              <h2 className="serif text-4xl lg:text-5xl mb-6 text-white leading-tight">
                Changing The Vision.
              </h2>
              <p className="text-muted-foreground text-lg mb-4">
                Systemic change requires mentorship at the margins. As the Founder and Executive Director of "Change A Vision," I connect incarcerated populations with educational resources and books, proving that restorative equity forms the foundation of a healthier society.
              </p>
            </div>
            <div className={`relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-sky-500/20`}>
              <Image
                src="/images/plane_call.jpg"
                alt="Change A Vision Outreach"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          <div className={`vision-section ${styles.visionRow} ${styles.glassCard}`}>
            <div className={styles.visionContent}>
              <h2 className="serif text-4xl lg:text-5xl mb-6 text-white leading-tight">
                Shaping Gen Z Leadership.
              </h2>
              <p className="text-muted-foreground text-lg mb-4">
                In my bestselling book, "Fasten Your Seatbelt: The Youth Leader's Guide to Changing the World," I advocate for policy reform and actionable engagement. Operating as the Georgia HOSA State VP, my aim is to shape a world where healthcare and justice systems are equitable, innovative, and deeply people-centered.
              </p>
            </div>
            <div className={`relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-sky-500/20`}>
              <Image
                src="/images/book_cover.jpg"
                alt="Fasten Your Seatbelt Book Content"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </section>
      </main >
    </>
  );
}
