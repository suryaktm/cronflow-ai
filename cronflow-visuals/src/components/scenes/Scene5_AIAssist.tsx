import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle, Check } from 'lucide-react';

const Scene5_AIAssist = () => {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-background px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Editor Mockup */}
            <div className="w-full max-w-3xl bg-surface/50 rounded-lg border border-white/10 overflow-hidden font-mono text-sm relative">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                        <span className="ml-2 text-white/40">cleanup_script.sh</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary-glow/80 text-xs">
                        <Sparkles size={12} /> AI Active
                    </div>
                </div>

                {/* Code Content */}
                <div className="p-6 text-white/80 space-y-1">
                    <div className="flex gap-4">
                        <span className="text-white/20 select-none">1</span>
                        <span>#!/bin/bash</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-white/20 select-none">2</span>
                        <span># Cleanup temporary files</span>
                    </div>

                    {/* Problematic Line */}
                    <div className="relative">
                        <motion.div
                            className="absolute inset-0 bg-status-error/10 border-l-2 border-status-error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                        <div className="flex gap-4 relative z-10">
                            <span className="text-white/20 select-none">3</span>
                            <span>rm -rf $TEMP_DIR/*</span>
                        </div>
                        {/* AI Warning Popover */}
                        <motion.div
                            className="absolute left-1/2 top-full mt-2 bg-surface border border-status-error/50 rounded p-3 shadow-xl z-20 flex items-start gap-2 w-64"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <AlertCircle size={16} className="text-status-error shrink-0 mt-0.5" />
                            <div>
                                <div className="text-status-error text-xs font-bold mb-1">Unsafe Variable Usage</div>
                                <div className="text-white/60 text-[10px] leading-tight">
                                    $TEMP_DIR might be empty, causing root deletion.
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex gap-4">
                        <span className="text-white/20 select-none">4</span>
                        <span>echo "Cleanup complete"</span>
                    </div>
                </div>

                {/* AI Generator Overlay */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 bg-surface border-t border-primary-glow/20 p-4"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 2.5, type: "spring" }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Sparkles size={16} className="text-primary-glow" />
                        <span className="text-xs text-primary-glow font-bold uppercase tracking-wider">Natural Language to Cron</span>
                    </div>
                    <div className="flex items-center justify-between bg-black/20 p-3 rounded border border-white/5">
                        <span className="text-white/60 italic">"Run every Monday at 3 AM"</span>
                        <motion.div
                            className="flex items-center gap-2 font-mono text-primary-glow bg-primary-glow/10 px-3 py-1 rounded"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 3.5 }}
                        >
                            0 3 * * 1 <Check size={14} />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Floating Text */}
            <div className="mt-12 text-center">
                <motion.h2
                    className="text-4xl font-display font-medium mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    AI that assists — <span className="text-white/40 decoration-line-through decoration-status-error">not replaces</span>.
                </motion.h2>
                <motion.div
                    className="flex gap-8 justify-center mt-4 text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <span className="flex items-center gap-2"><Check size={16} className="text-primary-glow" /> Validate Scripts</span>
                    <span className="flex items-center gap-2"><Check size={16} className="text-primary-glow" /> Generate CRON</span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Scene5_AIAssist;
