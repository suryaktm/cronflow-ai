import React from 'react';
import { motion } from 'framer-motion';
import { Box, Lock, WifiOff } from 'lucide-react';

const Scene3_Secure = () => {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >

            {/* Container Visualization */}
            <div className="relative h-[400px] w-full flex items-center justify-center">
                {/* Main Isolated Container */}
                <motion.div
                    className="relative w-64 h-64 border-2 border-primary-glow/50 bg-primary-glow/5 backdrop-blur-md rounded-xl flex flex-col items-center justify-center overflow-hidden"
                    initial={{ scale: 0.8, rotateY: 15 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                >
                    {/* Inner Content - Script Running */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <Box size={48} className="text-primary-glow mb-2" />
                        <div className="text-xs font-mono text-primary-glow">Container ID: 8f3a21</div>
                        <div className="mt-2 w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary-glow"
                                animate={{ width: ["0%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
                            <WifiOff size={12} /> No Network Access
                        </div>
                    </motion.div>

                    {/* Locking Animation Overlay */}
                    <motion.div
                        className="absolute inset-0 border-4 border-primary-glow rounded-xl flex items-center justify-center bg-black/10"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: [0, 1, 0] }}
                        transition={{ delay: 1, duration: 1.5 }}
                    >
                        <Lock size={64} className="text-primary-glow" />
                    </motion.div>
                </motion.div>

                {/* Floating background cubes */}
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-16 h-16 border border-white/10 rounded-lg bg-surface/30 backdrop-blur-sm"
                        style={{
                            top: `${20 + Math.random() * 60}%`,
                            left: `${10 + Math.random() * 80}%`,
                            zIndex: -1
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 90, 0],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 3,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    />
                ))}
            </div>

            {/* Text Content */}
            <div className="relative z-10 flex flex-col items-center mt-8 text-center">
                <motion.h2
                    className="text-3xl font-display font-medium text-white mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Every job runs in an <span className="text-primary-glow">isolated container</span>.
                </motion.h2>
                <motion.p
                    className="text-xl text-white/60"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    No shared state. No surprises.
                </motion.p>
            </div>

        </motion.div>
    );
};

export default Scene3_Secure;
