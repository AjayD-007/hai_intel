'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Smartphone, Monitor, Zap } from 'lucide-react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AuditSection from './components/sections/AuditSection';
import SuggestionsSection from './components/sections/SuggestionSection';
import { auditData as sharedAuditData, suggestions as sharedSuggestions } from './data/reportData';
import ChatWidget from './components/chat_widget';


export default function AuditDashboard() {
  const [activeTab, setActiveTab] = useState('mobile');

  const tabs = [
    { id: 'suggestions', label: 'My Suggestions', icon: Zap },
    { id: 'desktop', label: 'Desktop Audit', icon: Monitor },
    { id: 'mobile', label: 'Mobile Audit', icon: Smartphone }
  ];

  const suggestions = sharedSuggestions;
  const auditData = sharedAuditData;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'suggestions' && (
            <SuggestionsSection key="suggestions" suggestions={suggestions} />
          )}
          {activeTab === 'desktop' && (
            <AuditSection key="desktop" type="desktop" data={auditData.desktop} />
          )}
          {activeTab === 'mobile' && (
            <AuditSection key="mobile" type="mobile" data={auditData.mobile} />
          )}
        </AnimatePresence>
      </main>
<ChatWidget />
      <Footer />
    </div>
  );
}