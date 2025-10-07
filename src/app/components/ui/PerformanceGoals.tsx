'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ChevronRight } from 'lucide-react';

interface PerformanceGoalProps {
  currentScore: number;
  targetScore: number;
}

export default function PerformanceGoal({ currentScore, targetScore }: PerformanceGoalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-intelligence-blue/10 to-electric-cyan/10 border border-intelligence-blue/30 rounded-xl p-4 sm:p-6 mb-8"
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-intelligence-blue" />
        Performance Goal
      </h3>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Current Performance Score</p>
          <p className="text-2xl sm:text-3xl font-bold text-warm-amber">
            {currentScore}
          </p>
        </div>
        <ChevronRight className="w-8 h-8 text-muted-foreground hidden sm:block" />
        <div>
          <p className="text-sm text-muted-foreground mb-2">Target Performance Score</p>
          <p className="text-2xl sm:text-3xl font-bold text-electric-green">
            {targetScore}
          </p>
        </div>
      </div>
    </motion.div>
  );
}