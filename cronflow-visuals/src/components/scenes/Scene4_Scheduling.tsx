import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, MoreHorizontal } from 'lucide-react';

const Scene4_Scheduling = () => {
    // Mock Schedule Data
    const jobs = [
        { name: "Backup Database", cron: "0 0 * * *", status: "success", lastRun: "2h ago" },
        { name: "Sync User Data", cron: "*/15 * * * *", status: "success", lastRun: "12m ago" },
        { name: "Cleanup Temp", cron: "0 3 * * 0", status: "pending", lastRun: "1d ago" },
    ];

    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-background px-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >

            {/* UI Mockup - Job List */}
            <div className="w-full max-w-4xl bg-surface rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-2">
                        <Calendar className="text-white/60" size={18} />
                        <span className="font-mono text-sm font-medium">Scheduled Jobs</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-status-error/50" />
                        <div className="w-3 h-3 rounded-full bg-status-success/50" />
                    </div>
                </div>

                {/* Job Rows */}
                <div className="divide-y divide-white/5">
                    {jobs.map((job, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center justify-between p-4 bg-transparent hover:bg-white/5 transition-colors"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (index * 0.2) }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded bg-white/5 ${index === 1 ? 'border border-primary-glow/50' : ''}`}>
                                    <Clock size={16} className={index === 1 ? 'text-primary-glow' : 'text-white/40'} />
                                </div>
                                <div>
                                    <div className="font-medium text-sm">{job.name}</div>
                                    <div className="font-mono text-xs text-white/40 mt-1">{job.cron}</div>
                                </div>
                            </div>

                            {/* Timeline / Status */}
                            <div className="flex items-center gap-8">
                                {/* Timeline Visual */}
                                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden relative">
                                    {/* Animated progress bar representing schedule */}
                                    <motion.div
                                        className="absolute top-0 bottom-0 bg-white/20 w-1"
                                        animate={{ left: ["0%", "100%"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 1.2 }}
                                    />
                                    {/* Run markers */}
                                    {[20, 50, 80].map(p => (
                                        <div key={p} className="absolute top-0 bottom-0 w-[2px] bg-white/10" style={{ left: `${p}%` }} />
                                    ))}
                                </div>

                                <div className={`flex items-center gap-2 text-xs uppercase font-mono px-2 py-1 rounded ${job.status === 'success' ? 'bg-status-success/10 text-status-success' : 'bg-white/5 text-white/40'
                                    }`}>
                                    {job.status === 'success' && <CheckCircle size={10} />}
                                    {job.status}
                                </div>
                                <MoreHorizontal size={16} className="text-white/20" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Floating Highlight on Generic Cron Editor */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[200px] border-y border-primary-glow/30 bg-primary-glow/5 backdrop-blur-sm pointer-events-none"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
            />

            {/* Main Text */}
            <div className="mt-12 text-center relative z-20 bg-background/80 p-4 rounded-xl backdrop-blur-md border border-white/5">
                <motion.h2
                    className="text-4xl font-display font-medium mb-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                >
                    Powerful scheduling. <br />
                    <span className="text-primary-accent">Total visibility.</span>
                </motion.h2>
            </div>

        </motion.div>
    );
};

export default Scene4_Scheduling;
