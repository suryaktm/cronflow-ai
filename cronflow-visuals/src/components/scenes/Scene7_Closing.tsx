import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const Scene7_Closing = () => {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Final fade to black handled by App container or just cut
        >

            {/* Background Pulse */}
            <motion.div
                className="absolute inset-0 bg-radial-gradient from-primary-accent/20 to-transparent"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo */}
                <motion.div
                    className="mb-8"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                >
                    <div className="flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-primary-glow to-primary-accent shadow-neon">
                        <Layers className="text-black w-16 h-16" />
                    </div>
                </motion.div>

                {/* Brand Name */}
                <motion.h1
                    className="text-7xl font-display font-bold text-white mb-4 tracking-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    CronFlow AI
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    className="text-2xl text-primary-glow font-light tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Automation you can trust.
                </motion.p>

                {/* CTA Button Mock */}
                <motion.div
                    className="mt-12 px-8 py-3 bg-white text-black font-bold rounded-full text-sm uppercase tracking-wider"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                >
                    Get Early Access
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Scene7_Closing;
