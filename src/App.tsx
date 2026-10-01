import { useState } from 'react';
import { Header } from './components/Header';
import { HeroFlashDeal } from './components/HeroFlashDeal';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Radio 
} from 'lucide-react';

export default function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cyber-950 text-slate-100 flex flex-col font-sans selection:bg-cyber-neon selection:text-cyber-950">
      
      {/* 1. Header with Omnibar & Categories */}
      <Header onToggleSidebarMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

      {/* 2. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Flash Deal Hero Spotlight */}
        <HeroFlashDeal />

        {/* Feature Highlights Ticker (Amazon-grade trust signals) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-cyber-900/40 border border-white/5 backdrop-blur-md flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyber-neon/10 text-cyber-neon border border-cyber-neon/20">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-left leading-tight">
              <span className="text-xs font-bold text-white block">Quantum Express</span>
              <span className="text-[10px] text-slate-400 font-mono">1-Day Priority Transit</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-cyber-900/40 border border-white/5 backdrop-blur-md flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left leading-tight">
              <span className="text-xs font-bold text-white block">Zero Plagiarism</span>
              <span className="text-[10px] text-slate-400 font-mono">Original UI System</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-cyber-900/40 border border-white/5 backdrop-blur-md flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="text-left leading-tight">
              <span className="text-xs font-bold text-white block">Verified Hardware</span>
              <span className="text-[10px] text-slate-400 font-mono">100% Genuine Specs</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-cyber-900/40 border border-white/5 backdrop-blur-md flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Radio className="w-4 h-4" />
            </div>
            <div className="text-left leading-tight">
              <span className="text-xs font-bold text-white block">Instant Search</span>
              <span className="text-[10px] text-slate-400 font-mono">Real-Time Filtering</span>
            </div>
          </div>
        </div>

        {/* Catalog Section: Sidebar + Product Bento Grid */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block sticky top-28">
            <FilterSidebar />
          </div>

          {/* Mobile Filter Drawer */}
          {isMobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div 
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              <div className="relative z-10 w-4/5 max-w-xs h-full bg-cyber-950 p-4 overflow-y-auto">
                <FilterSidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <ProductGrid />

        </div>

      </main>

      {/* 3. Amazon-Grade Modern Footer */}
      <footer className="mt-16 border-t border-white/10 bg-cyber-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs text-slate-400">
            
            {/* Brand Col */}
            <div className="space-y-3">
              <div className="font-mono font-bold text-white text-base flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-cyber-neon flex items-center justify-center text-cyber-950 text-xs font-black">
                  C
                </div>
                <span>CYBER&lt;MART&gt;</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Next-generation frosted-glass e-commerce architecture engineered with React, TypeScript, Tailwind CSS, and Zustand.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyber-neon">
                Resume Project Showcase • 2026 Edition
              </div>
            </div>

            {/* Department Links */}
            <div className="space-y-2">
              <h4 className="font-mono font-bold text-white uppercase text-xs tracking-wider">
                Departments
              </h4>
              <ul className="space-y-1.5 font-mono">
                <li className="hover:text-cyber-cyan cursor-pointer transition-colors">Audio & Soundstages</li>
                <li className="hover:text-cyber-cyan cursor-pointer transition-colors">Wearables & Biometrics</li>
                <li className="hover:text-cyber-cyan cursor-pointer transition-colors">Gaming & Peripherals</li>
                <li className="hover:text-cyber-cyan cursor-pointer transition-colors">Creator Laptops</li>
                <li className="hover:text-cyber-cyan cursor-pointer transition-colors">Desk Accessories</li>
              </ul>
            </div>

            {/* Customer Care / Architecture */}
            <div className="space-y-2">
              <h4 className="font-mono font-bold text-white uppercase text-xs tracking-wider">
                Tech Architecture
              </h4>
              <ul className="space-y-1.5 font-mono">
                <li className="text-slate-300">Vite + React 18 / 19 ESM</li>
                <li className="text-slate-300">TypeScript Type-Safety</li>
                <li className="text-slate-300">Zustand Persistent Store</li>
                <li className="text-slate-300">Frosted Glassmorphism CSS</li>
                <li className="text-slate-300">Faceted Multi-filter Engine</li>
              </ul>
            </div>

            {/* GitHub & Resume Callout */}
            <div className="space-y-3">
              <h4 className="font-mono font-bold text-white uppercase text-xs tracking-wider">
                Portfolio Ready
              </h4>
              <p className="text-slate-400">
                Ready to deploy on Vercel, Netlify, or GitHub Pages. Zero third-party backend required for client-side demo.
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-[11px] border border-white/10 flex items-center gap-1.5"
                >
                  <span>Back to Top</span>
                </button>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>© 2026 CYBER&lt;MART&gt; Quantum Commerce Inc. All rights reserved.</span>
            <span className="mt-2 sm:mt-0 text-cyber-cyan">Built with Zero Plagiarism for Frontend / Fullstack Portfolios</span>
          </div>
        </div>
      </footer>

      {/* 4. Modals, Drawers & Notifications */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <Toast />

    </div>
  );
}
