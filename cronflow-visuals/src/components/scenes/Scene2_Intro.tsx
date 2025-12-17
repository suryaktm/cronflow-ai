import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Shield, Cpu } from 'lucide-react';

const Scene2_Intro = () => {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }} // Smooth dissolve
        >
            {/* Background Grid - Futuristic */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, #1F2937 1px, transparent 1px), linear-gradient(to bottom, #1F2937 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Radial Gradient Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-primary-glow/10 to-transparent opacity-50" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="flex items-center justify-center w-24 h-24 mb-6 rounded-2xl bg-gradient-to-tr from-primary-accent to-primary-glow shadow-neon relative"
                >
                    <Layers className="text-black w-12 h-12" />
                    <motion.div
                        className="absolute inset-0 bg-white opacity-0 rounded-2xl"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>

                {/* Text Reveal */}
                <div className="text-center">
                    <motion.p
                        className="text-primary-glow font-mono mb-2 tracking-widest uppercase text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Start Automating
                    </motion.p>
                    <motion.h1
                        className="text-6xl font-display font-bold text-white mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        Meet CronFlow AI
                    </motion.h1>
                </div>

                {/* Feature Pills */}
                <motion.div
                    className="flex gap-4 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, staggerChildren: 0.2 }}
                >
                    {[
                        { icon: Shield, text: "Secure" },
                        { icon: Layers, text: "Isolated" },
                        { icon: Cpu, text: "Intelligent" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.2 + (i * 0.2) }}
                        >
                            <item.icon size={16} className="text-primary-glow" />
                            <span className="font-medium text-white/90">{item.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Scene2_Intro;
