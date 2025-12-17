import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, AlertTriangle, XCircle } from 'lucide-react';

const Scene1_TheProblem = () => {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background Glitch Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-primary-accent font-mono text-xs opacity-50 whitespace-nowrap"
                        initial={{ x: -100, y: Math.random() * 100 + '%' }}
                        animate={{ x: '100vw' }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2
                        }}
                    >
                        0 0 * * * /usr/bin/php /var/www/html/cron.php &gt; /dev/null 2&gt;&1
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Floating Terminal Windows */}
                <div className="relative w-[600px] h-[300px]">
                    {/* Terminal 1 - Background */}
                    <motion.div
                        className="absolute top-0 right-0 w-3/4 h-3/4 bg-surface rounded-lg border border-white/10 p-4 shadow-xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.6 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-white/20"></div>
                            <div className="w-2 h-2 rounded-full bg-white/20"></div>
                        </div>
                        <div className="font-mono text-xs text-white/40">
                            <p>$ py scripts/backup_db.py</p>
                            <p>Starting backup...</p>
                            <p>Compressing files...</p>
                        </div>
                    </motion.div>

                    {/* Terminal 2 - Foreground Error */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-surface rounded-lg border border-status-error/50 p-4 shadow-2xl shadow-status-error/10"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                    >
                        <div className="flex gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-status-error"></div>
                            <div className="w-2 h-2 rounded-full bg-white/20"></div>
                        </div>
                        <div className="font-mono text-sm text-status-error">
                            <p className="flex items-center gap-2"><XCircle size={14} /> CONNECTION TIMEOUT</p>
                            <p className="text-white/60 mt-2 text-xs">Error: Database connection failed after 30000ms.</p>
                            <p className="text-white/60 text-xs">at /var/www/jobs/sync.js:45:12</p>
                            <motion.div
                                className="mt-4 p-2 bg-status-error/10 rounded border border-status-error/20"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            >
                                CRITICAL FAILURE
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Text */}
                <motion.h1
                    className="text-4xl font-display font-bold text-white tracking-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    Cron jobs shouldn’t be this <span className="text-status-error">fragile</span>.
                </motion.h1>
            </div>
        </motion.div>
    );
};

export default Scene1_TheProblem;
