'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, FileText, TrendingUp } from 'lucide-react';

interface ScoreCardProps {
  label: string;
  score: number;
}

const getIcon = (label: string) => {
  switch(label) {
    case 'Performance': return Zap;
    case 'Accessibility': return Eye;
    case 'Best Practices': return FileText;
    case 'SEO': return TrendingUp;
    default: return Zap;
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-electric-green';
  if (score >= 50) return 'text-warm-amber';
  return 'text-destructive';
};

const getProgressColor = (score: number) => {
  if (score >= 90) return 'bg-electric-green';
  if (score >= 50) return 'bg-warm-amber';
  return 'bg-destructive';
};

export default function ScoreCard({ label, score }: ScoreCardProps) {
  const Icon = getIcon(label);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:border-intelligence-blue/50 transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-intelligence-blue" />
        <span className="text-xs sm:text-sm text-muted-foreground">{label}</span>
      </div>
      <div className={`text-3xl sm:text-4xl font-bold ${getScoreColor(score)}`}>
        {score}
      </div>
      <div className="mt-2 w-full bg-muted rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-2 rounded-full ${getProgressColor(score)}`}
        />
      </div>
    </motion.div>
  );
}
