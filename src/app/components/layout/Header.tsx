/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Array<{ id: string; label: string; icon: any }>;
}

export default function Header({ activeTab, setActiveTab, tabs }: HeaderProps) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-intelligence-blue to-electric-cyan flex items-center justify-center">
              <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-intelligence-blue to-electric-cyan bg-clip-text text-transparent">
                HaiIntel
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">UI Audit Dashboard</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <Navigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            tabs={tabs} 
          />

          {/* Mobile Menu */}
          <MobileMenu 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            tabs={tabs} 
          />
        </div>
      </div>
    </motion.header>
  );
}