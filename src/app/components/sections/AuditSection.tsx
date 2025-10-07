'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone } from 'lucide-react';
import ScoreCard from '../ui/Scorecard';
import PerformanceGoal from '../ui/PerformanceGoals';
import PDFViewer from '../ui/PDFViewer';

interface AuditData {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  targetPerformance: number;
  pdfUrl: string;
}

interface AuditSectionProps {
  type: 'desktop' | 'mobile';
  data: AuditData;
}

export default function AuditSection({ type, data }: AuditSectionProps) {
  const Icon = type === 'desktop' ? Monitor : Smartphone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 flex items-center gap-3">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-intelligence-blue" />
          <span className="bg-gradient-to-r from-intelligence-blue to-electric-cyan bg-clip-text text-transparent">
            {type === 'desktop' ? 'Desktop' : 'Mobile'} Audit Report
          </span>
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Lighthouse performance metrics and detailed analysis
        </p>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ScoreCard label="Performance" score={data.performance} />
        <ScoreCard label="Accessibility" score={data.accessibility} />
        <ScoreCard label="Best Practices" score={data.bestPractices} />
        <ScoreCard label="SEO" score={data.seo} />
      </div>

      {/* Performance Goal */}
      <PerformanceGoal 
        currentScore={data.performance} 
        targetScore={data.targetPerformance} 
      />

      {/* PDF Viewer */}
      <PDFViewer pdfUrl={data.pdfUrl} type={type} />
    </motion.div>
  );
}