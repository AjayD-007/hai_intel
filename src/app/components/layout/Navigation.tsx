/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Array<{ id: string; label: string; icon: any }>;
}

export default function Navigation({ activeTab, setActiveTab, tabs }: NavigationProps) {
  return (
    <nav className="hidden md:flex items-center gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-intelligence-blue text-intelligence-blue-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden lg:inline">{tab.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
}