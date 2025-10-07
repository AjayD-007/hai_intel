'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Suggestion {
  category: string;
  priority: string;
  items: string[];
}

interface SuggestionsSectionProps {
  suggestions: Suggestion[];
}

const getPriorityColor = (priority: string) => {
  switch(priority.toLowerCase()) {
    case 'critical': return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'high': return 'bg-warm-amber/20 text-warm-amber border-warm-amber/30';
    case 'medium': return 'bg-intelligence-blue/20 text-intelligence-blue border-intelligence-blue/30';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

export default function SuggestionsSection({ suggestions }: SuggestionsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-intelligence-blue via-electric-cyan to-neon-purple bg-clip-text text-transparent">
          Optimization Suggestions
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Prioritized recommendations to improve HaiIntel.com performance and user experience
        </p>
      </div>

      <div className="grid gap-6">
        {suggestions.map((section, idx) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:border-intelligence-blue/50 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">{section.category}</h3>
              <span className={`text-xs px-3 py-1 rounded-full border font-medium w-fit ${getPriorityColor(section.priority)}`}>
                {section.priority} Priority
              </span>
            </div>
            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <motion.li
                  key={itemIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 + itemIdx * 0.05 }}
                  className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground"
                >
                  <ChevronRight className="w-5 h-5 text-intelligence-blue flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}