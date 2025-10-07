// Shared audit data and friendly FAQ for the app and chat widget
export const auditData = {
  desktop: {
    performance: 90,
    accessibility: 90,
    bestPractices: 100,
    seo: 100,
    targetPerformance: 95,
    pdfUrl: '/pdfs/hai_desktop_expanded.pdf'
  },
  mobile: {
    performance: 70,
    accessibility: 86,
    bestPractices: 100,
    seo: 100,
    targetPerformance: 85,
    pdfUrl: '/pdfs/hai_mobile_expanded.pdf'
  }
};

export const suggestions = [
  {
    category: 'Performance - Critical Mobile Issues',
    priority: 'Critical',
    items: [
      'Eliminate render-blocking resources (saves 1,300ms on mobile)',
      'Implement code splitting for mobile bundles to reduce Speed Index from 29.3s to <4s',
      'Add responsive images with srcset/sizes attributes',
      'Break up 6 long tasks on mobile (reduce to 2 or fewer)',
      'Defer offscreen images (saves 7 KiB)',
      'Add resource hints (preconnect, dns-prefetch) for faster discovery'
    ]
  },
  {
    category: 'Performance - Desktop Optimization',
    priority: 'High',
    items: [
      'Reduce document request latency from 1,070ms to <500ms',
      'Remove 139 KiB of unused JavaScript',
      'Implement aggressive caching (353 KiB potential savings)',
      'Minify JavaScript files (57 KiB savings)',
      'Consider code splitting to reduce 18.5s main thread work',
      'Optimize render-blocking requests (260ms savings possible)'
    ]
  },
  {
    category: 'Accessibility - Cross-Platform',
    priority: 'Critical',
    items: [
      'Fix color contrast ratios to meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text)',
      'Add accessible button labels on mobile using aria-label or visible text',
      'Name all links with descriptive text or aria-labels',
      'Fix heading hierarchy (proper H1 → H2 → H3 structure)',
      'Ensure touch targets meet minimum size requirements (44x44px)'
    ]
  },
  {
    category: 'Mobile Network & Latency',
    priority: 'High',
    items: [
      'Reduce mobile document latency from 1,510ms to <600ms (440ms worse than desktop)',
      'Implement mobile-specific asset optimization',
      'Add service worker for offline capability and faster repeat visits',
      'Optimize third-party scripts for mobile networks',
      'Enable HTTP/2 server push for critical mobile assets'
    ]
  },
  {
    category: 'Caching & Asset Optimization',
    priority: 'Medium',
    items: [
      'Implement cache-first strategy (225 KiB savings on mobile, 353 KiB on desktop)',
      'Remove 98 KiB of unused JavaScript on mobile',
      'Set appropriate cache headers for static assets',
      'Optimize third-party script loading and caching',
      'Use CDN for faster global asset delivery'
    ]
  },
  {
    category: 'Security & Best Practices',
    priority: 'Low',
    items: [
      'Implement CSP headers for XSS protection',
      'Add HSTS policy for secure connections',
      'Configure COOP (Cross-Origin-Opener-Policy) for origin isolation',
      'Add source maps for production debugging',
      'Maintain 100/100 Best Practices and SEO scores'
    ]
  }
];

// Friendly Q/A and pleasantries to make the chat feel real. Each entry includes
// simple pattern keywords to match the user's query and a canned reply.
// Friendly Q/A and pleasantries to make the chat feel real, helpful, and insightful.
// Each entry includes natural-language pattern keywords and a thoughtful, informative reply.
export const faq = [
  {
    patterns: ['hi', 'hello', 'hey', 'howdy', 'greetings'],
    reply: `Hey there! 👋 I'm your Lighthouse Performance Assistant for **haiintel.com**.  
I’m here to help you understand your site’s performance, accessibility, and SEO scores — and most importantly, *how to improve them*.  
Try asking things like:  
• “What’s wrong with mobile performance?”  
• “How do I fix Core Web Vitals?”  
• “Show me critical suggestions”  
Let’s make your site blazing fast! 🚀`
  },
  {
    patterns: ['thanks', 'thank you', 'thx', 'appreciate it'],
    reply: `You're very welcome! 😊  
Optimizing websites is tough — but you're doing great by digging into the data.  
Feel free to ask for clarification on any suggestion, or request a summary by priority (Critical, High, etc.). I’ve got your back!`
  },
  {
    patterns: ['how are you', 'you ok', 'doing well'],
    reply: `Running at 100% efficiency — and ready to boost *your* site’s performance! 💪  
(Though I’ll admit, I’d love to see that mobile Performance score climb from 70 → 85! 😉)`
  },
  {
    patterns: ['where can i see the full report', 'pdf', 'full report', 'detailed audit', 'download report'],
    reply: `You can download the complete Lighthouse audit reports here:\n\n` +
           `📄 **Desktop Report**: [hai_desktop_expanded.pdf](${auditData.desktop.pdfUrl})\n` +
           `📱 **Mobile Report**: [hai_mobile_expanded.pdf](${auditData.mobile.pdfUrl})\n\n` +
           `These include full diagnostics, screenshots, and timeline traces — perfect for deep dives with your dev team!`
  },
  {
    patterns: ['target performance', 'target', 'goal', 'what should it be', 'performance goal'],
    reply: `Great question! 🎯 Here are the official performance targets:\n\n` +
           `🖥️ **Desktop**: ${auditData.desktop.targetPerformance}/100 (currently at ${auditData.desktop.performance})\n` +
           `📱 **Mobile**: ${auditData.mobile.targetPerformance}/100 (currently at ${auditData.mobile.performance})\n\n` +
           `Mobile is the tougher environment — slower CPUs, variable networks — so hitting 85+ there is a strong benchmark for user experience.`
  },
  {
    patterns: ['what can you do', 'help', 'what do you offer', 'features', 'capabilities'],
    reply: `I specialize in turning Lighthouse audit data into actionable insights! Specifically, I can:\n\n` +
           `✅ Explain your **Performance, Accessibility, Best Practices, and SEO** scores\n` +
           `✅ Break down **Core Web Vitals** (LCP, FID/INP, CLS)\n` +
           `✅ Share **prioritized suggestions** — from Critical fixes to Low-hanging fruit\n` +
           `✅ Compare **desktop vs. mobile** bottlenecks\n` +
           `✅ Link you to the **full PDF reports**\n\n` +
           `Just ask! Examples: “Show me critical mobile issues” or “What’s hurting accessibility?”`
  },
  {
    patterns: ['mobile performance', 'why is mobile slow', 'mobile score low'],
    reply: `Your mobile Performance score is **70/100**, below the **85 target**. The biggest culprits:\n\n` +
           `⚡ **Render-blocking resources** (1.3s delay)\n` +
           `🧱 **Huge JavaScript bundles** → Speed Index at **29.3s** (should be <4s!)\n` +
           `📱 **6 long tasks** blocking interactivity\n` +
           `🖼️ **Unoptimized images** (no srcset, offscreen images not deferred)\n\n` +
           `Fixing these could dramatically improve LCP and TTI. Want me to list the top 3 fixes?`
  },
  {
    patterns: ['desktop performance', 'desktop issues', 'desktop score'],
    reply: `Your desktop Performance is strong at **90/100** (target: 95)! 🎉\n\n` +
           `To close the gap, focus on:\n` +
           `⏱️ Reducing document latency (1,070ms → <500ms)\n` +
           `🗑️ Removing **139 KiB of unused JavaScript**\n` +
           `📦 Implementing better caching (**353 KiB savings**)\n` +
           `✂️ Minifying JS (**57 KiB saved**)\n\n` +
           `These tweaks will push you into the green zone consistently!`
  },
  {
    patterns: ['accessibility', 'a11y', 'wcag', 'color contrast', 'screen reader'],
    reply: `Your Accessibility scores are good (**90 desktop / 86 mobile**) but not perfect. Critical fixes include:\n\n` +
           `🎨 **Color contrast** — some text fails WCAG 2.1 AA (needs 4.5:1 for normal text)\n` +
           `🔘 **Missing button labels** — especially on mobile (use aria-label or visible text)\n` +
           `🔗 **Generic link text** like “click here” — replace with descriptive labels\n` +
           `📑 **Heading structure** — ensure H1 → H2 → H3 flow (no skips!)\n` +
           `👆 **Touch targets** — must be ≥44×44px on mobile\n\n` +
           `These aren’t just compliance checkboxes — they make your site usable for *everyone*.`
  },
  {
    patterns: ['core web vitals', 'lcp', 'cls', 'tti', 'inp', 'fcp'],
    reply: `Core Web Vitals measure real-user experience:\n\n` +
           `🟢 **LCP (Largest Contentful Paint)** – When main content loads (goal: <2.5s)\n` +
           `🟠 **INP (Interaction to Next Paint)** – Responsiveness to clicks/taps (goal: <200ms)\n` +
           `🔵 **CLS (Cumulative Layout Shift)** – Visual stability (goal: <0.1)\n\n` +
           `Your mobile LCP is likely high due to render-blocking resources and unoptimized images.  
Fixing the **Critical Mobile Issues** will directly improve these metrics! Want a deep dive on one?`
  },
  {
    patterns: ['show suggestions', 'optimization tips', 'how to improve', 'fixes', 'recommendations'],
    reply: `I’ve got **6 categories** of suggestions — from Critical to Low priority:\n\n` +
           `❗ **Critical**: Mobile performance & accessibility must-fixes\n` +
           `❗ **High**: Desktop perf + mobile network optimizations\n` +
           `🔶 **Medium**: Caching & asset tuning\n` +
           `🔷 **Low**: Security hardening (CSP, HSTS, etc.)\n\n` +
           `Just say:\n• “Show critical suggestions”\n• “What’s high priority for mobile?”\n• “List all accessibility fixes”`
  },
  {
    patterns: ['best practices', 'seo', 'security', 'privacy'],
    reply: `Great news — you’re already at **100/100** for both **Best Practices** and **SEO**! 🏆\n\n` +
           `To keep it that way:\n` +
           `🔒 Maintain secure headers (CSP, HSTS, COOP)\n` +
           `🔍 Keep semantic HTML, valid meta tags, and crawlable content\n` +
           `🧩 Avoid deprecated APIs or browser warnings\n\n` +
           `The “Security & Best Practices” suggestions include ways to future-proof this perfect score!`
  }
];
