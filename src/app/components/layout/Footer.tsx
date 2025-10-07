'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="border-t border-border bg-card/50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-intelligence-blue to-electric-cyan flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">HaiIntel</p>
              <p className="text-xs text-muted-foreground">Part of Vibrant Capital</p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm text-muted-foreground">
              UI Developer Challenge - Option B
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with Next.js, Tailwind CSS & Framer Motion
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>© 2025 HaiIntel. Human-centered AI experiences.</p>
        </div>
      </div>
    </motion.footer>
  );
}