"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { Suspense } from "react";

export default function Scene() {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "none",
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.2} />

                    {/* Subtle ambient 3D element: Floating particles / subtle shapes */}
                    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.2} color="#00E5FF" />
                    </Float>
                </Suspense>
            </Canvas>
        </div>
    );
}
