'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Maximize2, X } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  type: 'desktop' | 'mobile';
}

export default function PDFViewer({ pdfUrl, type }: PDFViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-intelligence-blue/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-intelligence-blue" />
            </div>
            <div>
              <p className="font-semibold text-sm sm:text-base">
                {type === 'desktop' ? 'Desktop' : 'Mobile'} Lighthouse Report
              </p>
              <p className="text-xs text-muted-foreground">Full analysis PDF</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFullscreen(true)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="View fullscreen"
            >
              <Maximize2 className="w-5 h-5 text-intelligence-blue" />
            </motion.button>
            <motion.a
              href={pdfUrl}
              download
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="Download PDF"
            >
              <Download className="w-5 h-5 text-intelligence-blue" />
            </motion.a>
          </div>
        </div>

        {/* PDF Preview */}
        <div className="relative w-full bg-muted/10" style={{ height: '600px' }}>
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title={`${type} Lighthouse Report`}
          />
        </div>
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
          >
            <div className="h-full flex flex-col">
              {/* Fullscreen Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-intelligence-blue" />
                  <h3 className="font-semibold text-lg">
                    {type === 'desktop' ? 'Desktop' : 'Mobile'} Lighthouse Report
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Fullscreen PDF */}
              <div className="flex-1 overflow-hidden">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-0"
                  title={`${type} Lighthouse Report Fullscreen`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}