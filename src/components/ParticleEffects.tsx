import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const ParticleEffects: React.FC = () => {
    return (
        <>
            {/* Floating Sparkles */}
            <div className="absolute -inset-8 pointer-events-none overflow-visible">
                {[...Array(8)].map((_, i) => {
                    const randomSize = Math.random() * 12 + 6;
                    const randomScale = Math.random() * 0.5 + 0.5;
                    const randomDuration = Math.random() * 6 + 4;
                    const randomDelay = Math.random() * 2;

                    return (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * 100 - 50,
                                y: 50,
                                opacity: 0.8,
                                scale: randomScale,
                            }}
                            animate={{
                                y: [null, -150],
                                x: [null, (Math.random() - 0.5) * 150],
                                rotate: [0, 360],
                                opacity: [0.8, 0],
                            }}
                            transition={{
                                duration: randomDuration,
                                delay: randomDelay,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                            className="absolute bottom-0 right-0"
                        >
                            <Sparkles
                                className="text-yellow-300"
                                style={{
                                    width: `${randomSize}px`,
                                    height: `${randomSize}px`,
                                    filter: "drop-shadow(0 0 4px currentColor)",
                                }}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Confetti particles */}
            <div className="absolute -inset-8 pointer-events-none overflow-visible">
                {[...Array(12)].map((_, i) => {
                    const colors = ["#FF6B35", "#4CAF50", "#FFD700"];
                    const color = colors[i % 3];
                    const randomDuration = Math.random() * 5 + 3;
                    const randomDelay = Math.random() * 2;

                    return (
                        <motion.div
                            key={`confetti-${i}`}
                            initial={{
                                x: Math.random() * 80 - 40,
                                y: 50,
                                opacity: 0.9,
                            }}
                            animate={{
                                y: [null, -200],
                                x: [null, (Math.random() - 0.5) * 200],
                                rotate: [0, Math.random() * 720],
                                opacity: [0.9, 0],
                            }}
                            transition={{
                                duration: randomDuration,
                                delay: randomDelay,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                            className="absolute w-2 h-4 rounded-full bottom-0 right-0"
                            style={{
                                background: color,
                            }}
                        />
                    );
                })}
            </div>

            {/* Background glowing blobs */}
            <div className="absolute -inset-16 pointer-events-none">
                <motion.div
                    animate={{
                        x: [-20, 30, -20],
                        y: [-20, 30, -20],
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-0 w-24 h-24 bg-orange-500/30 rounded-full blur-2xl"
                />
                <motion.div
                    animate={{
                        x: [-30, 20, -30],
                        y: [20, -30, 20],
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute bottom-1/2 right-0 w-32 h-32 bg-pink-500/30 rounded-full blur-2xl"
                />
            </div>
        </>
    );
};

export default ParticleEffects;
