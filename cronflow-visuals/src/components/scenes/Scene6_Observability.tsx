import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Search, Terminal } from 'lucide-react';

const Scene6_Observability = () => {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-background px-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >

            {/* Dashboard / Logs View */}
            <div className="w-full h-[60%] flex gap-4">
                {/* History List */}
                <motion.div
                    className="w-1/3 bg-surface border border-white/5 rounded-lg overflow-hidden flex flex-col"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="p-3 border-b border-white/5 flex items-center justify-between">
                        <span className="text-xs font-mono uppercase text-white/40">Run History</span>
                        <Activity size={14} className="text-white/20" />
                    </div>
                    <div className="flex-1 overflow-hidden p-2 space-y-2">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`p-3 rounded text-sm flex justify-between items-center ${i === 0 ? 'bg-white/10 border border-white/10' : 'text-white/40'}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                            >
                                <span className="font-mono">#JOB-29{8 - i}</span>
                                <span className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-status-error' : 'bg-status-success'}`} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Log Viewer */}
                <motion.div
                    className="flex-1 bg-black/50 border border-white/10 rounded-lg overflow-hidden flex flex-col font-mono text-xs relative"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {/* Toolbar */}
                    <div className="flex items-center justify-between p-2 bg-white/5 border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500/20" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                        </div>
                        <Search size={12} className="text-white/20" />
                    </div>

                    {/* Logs Content */}
                    <div className="p-4 space-y-1 text-white/70 overflow-hidden relative h-full">
                        <motion.div
                            animate={{ y: -100 }}
                            transition={{ duration: 10, ease: "linear" }}
                        >
                            <div className="text-white/30 mb-2">--- Job started at 2024-10-24 14:00:01 UTC ---</div>
                            <div>[INFO] Initializing environment...</div>
                            <div>[INFO] Pulling container image v2.4.1...</div>
                            <div className="text-status-success">[SUCCESS] Container ready in 1.2s</div>
                            <div>[INFO] Executing task payload...</div>
                            <div>Step 1: Analyzing data integrity...</div>
                            <div>Step 2: Processing batches...</div>
                            <div className="text-white/30">Batch 1/50 complete</div>
                            <div className="text-white/30">Batch 2/50 complete</div>
                            <div className="text-white/30">Batch 3/50 complete</div>
                            <div>...</div>
                            <div className="text-primary-glow">[OUTPUT] Processed 14,203 records.</div>
                            <div className="text-white/30 mt-2">--- Job finished at 2024-10-24 14:00:45 UTC ---</div>
                            <div className="text-status-success">[EXIT] Status Code: 0</div>
                        </motion.div>

                        {/* Gradient fade at bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
                    </div>
                </motion.div>
            </div>

            {/* Text Overlay */}
            <div className="mt-8 text-center z-20">
                <motion.h2
                    className="text-4xl font-display font-medium"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    Know exactly what ran.
                    <br />
                    <span className="text-primary-accent">And why.</span>
                </motion.h2>
            </div>

        </motion.div>
    );
};

export default Scene6_Observability;
