"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import Image from 'next/image';

const testimonials = [
    {
        tempId: 0,
        testimonial: "Soneesh’s research into oncology sets a rare benchmark for someone his age. The depth of analysis and clarity of purpose are simply exceptional. He is redefining what young innovators can achieve in clinical research.",
        by: "Dr. Elena Vance",
        title: "Lead Oncologist, MGH",
        imgSrc: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=256&auto=format&fit=crop"
    },
    {
        tempId: 1,
        testimonial: "Fasten Your Seatbelt isn’t just a book; it’s a movement. Soneesh has managed to concisely chart a path for Gen Z to take actionable, meaningful leadership roles in health policy. A must-read.",
        by: "Marcus Chen",
        title: "Director of Youth Advocacy, Global Health Org",
        imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop"
    },
    {
        tempId: 2,
        testimonial: "Through Change A Vision, Soneesh has demonstrated profound empathy and operational excellence. Connecting incarcerated individuals with educational resources is a massive step toward true restorative justice.",
        by: "Sarah Jenkins",
        title: "Board Member, Educational Equity Foundation",
        imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop"
    }
];

export const StaggerTestimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate the text in on mount and when index changes
        if (containerRef.current) {
            gsap.fromTo(
                ".testimonial-char",
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, stagger: 0.015, duration: 0.5, ease: "power2.out" }
            );
            gsap.fromTo(
                ".testimonial-author",
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: "expo.out" }
            );
        }
    }, [currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const current = testimonials[currentIndex];

    // Split testimonial into words then chars for precise staggering
    const words = current.testimonial.split(" ");

    return (
        <div className="relative w-full max-w-4xl mx-auto p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-sky-500/20 shadow-2xl" ref={containerRef}>
            <Quote className="absolute top-8 left-8 w-12 h-12 text-sky-500/20" />

            <div className="min-h-[200px] flex flex-col justify-center mt-8 pl-4 lg:pl-12">
                <p className="text-xl md:text-2xl lg:text-3xl font-serif text-white/90 leading-relaxed mb-8 flex flex-wrap gap-[0.25em]">
                    {words.map((word, wordIdx) => (
                        <span key={wordIdx} className="inline-block">
                            {word.split("").map((char, charIdx) => (
                                <span key={`${wordIdx}-${charIdx}`} className="testimonial-char inline-block">
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </p>

                <div className="testimonial-author flex items-center gap-4 mt-auto">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-sky-500/50">
                        <Image
                            src={current.imgSrc}
                            alt={current.by}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div>
                        <h4 className="text-white font-semibold text-lg">{current.by}</h4>
                        <p className="text-sky-400 text-sm">{current.title}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
                <button
                    onClick={handlePrev}
                    className="p-3 rounded-full bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/50 transition-all group"
                >
                    <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-sky-400" />
                </button>
                <button
                    onClick={handleNext}
                    className="p-3 rounded-full bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/50 transition-all group"
                >
                    <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-sky-400" />
                </button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {testimonials.map((_, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-500",
                            idx === currentIndex ? "w-8 bg-sky-400" : "w-2 bg-white/20"
                        )}
                    />
                ))}
            </div>
        </div>
    );
};
