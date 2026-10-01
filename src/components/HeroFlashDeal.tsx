import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, Flame } from 'lucide-react';
import { useStore } from '../store/useStore';

export const HeroFlashDeal: React.FC = () => {
  const { products, addToCart, setIsCartOpen, openProductModal } = useStore();
  const dealProduct = products.find((p) => p.isFlashDeal) || products[0];

  // Countdown timer state: 4h 12m 35s
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 12,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigits = (val: number) => val.toString().padStart(2, '0');

  const handleClaimDeal = () => {
    addToCart(dealProduct, 1);
    setIsCartOpen(true);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-cyber-900 via-slate-900 to-cyber-950 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
      {/* Background ambient neon glow spheres */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyber-neon/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyber-cyan/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Deal Information & Countdown */}
        <div className="lg:col-span-7 space-y-5 text-left">
          
          {/* Badge & Flash Status */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyber-neon/10 border border-cyber-neon/40 text-cyber-neon tracking-wide">
              <Flame className="w-3.5 h-3.5 fill-cyber-neon" /> FLASH DEAL OF THE HOUR
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-rose-500/10 border border-rose-500/30 text-rose-400">
              Save {dealProduct.dealDiscountPercent || 35}% OFF
            </span>
          </div>

          {/* Product Headline */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              {dealProduct.name}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl font-light">
              {dealProduct.tagline}
            </p>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-3xl sm:text-4xl font-black text-white">
              ${dealProduct.price.toFixed(2)}
            </span>
            <span className="font-mono text-lg text-slate-500 line-through">
              ${dealProduct.originalPrice.toFixed(2)}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-cyber-neon border border-emerald-500/30">
              Prime 1-Day Free
            </span>
          </div>

          {/* Countdown Clock (Amazon-grade urgency) */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 max-w-md">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1 font-mono uppercase tracking-wider text-[11px]">
                <Clock className="w-3.5 h-3.5 text-cyber-cyan" /> Offer Expires In
              </span>
              <span className="text-emerald-400 font-mono text-[11px]">
                {dealProduct.dealClaimedPercent || 82}% Claimed
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-900 border border-white/10 rounded-xl py-1.5 text-center">
                <span className="block font-mono text-xl sm:text-2xl font-bold text-white">
                  {formatDigits(timeLeft.hours)}
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-slate-400">HRS</span>
              </div>
              <span className="font-mono text-xl text-slate-500 font-bold">:</span>
              <div className="flex-1 bg-slate-900 border border-white/10 rounded-xl py-1.5 text-center">
                <span className="block font-mono text-xl sm:text-2xl font-bold text-white">
                  {formatDigits(timeLeft.minutes)}
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-slate-400">MIN</span>
              </div>
              <span className="font-mono text-xl text-slate-500 font-bold">:</span>
              <div className="flex-1 bg-slate-900 border border-white/10 rounded-xl py-1.5 text-center">
                <span className="block font-mono text-xl sm:text-2xl font-bold text-cyber-neon animate-pulse">
                  {formatDigits(timeLeft.seconds)}
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-slate-400">SEC</span>
              </div>
            </div>

            {/* Inventory Progress Bar */}
            <div className="mt-3">
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-neon rounded-full transition-all duration-500 shadow-neon-green"
                  style={{ width: `${dealProduct.dealClaimedPercent || 82}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>In Stock: Only {dealProduct.stockCount} Units Remaining</span>
                <span>Fast Delivery Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleClaimDeal}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-cyber-neon hover:bg-cyber-cyan text-cyber-950 transition-all duration-300 shadow-neon-green hover:shadow-neon-hover flex items-center gap-2 group cursor-pointer"
            >
              <span>CLAIM DEAL NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => openProductModal(dealProduct)}
              className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>View Full Specs</span>
            </button>
          </div>

        </div>

        {/* Right Column: Hero Product Visual with Glass Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group max-w-md w-full">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-950 shadow-2xl p-4 group-hover:border-cyber-neon transition-colors duration-500">
              <img
                src={dealProduct.image}
                alt={dealProduct.name}
                className="w-full h-64 sm:h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              {/* Glass overlay badge on image */}
              <div className="absolute top-7 right-7 bg-cyber-950/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-left shadow-lg">
                <span className="block text-[10px] text-slate-400 uppercase font-mono">Verified Audio</span>
                <span className="font-mono text-xs font-bold text-cyber-neon">Hi-Res LDAC Certified</span>
              </div>
            </div>

            {/* Spec Highlights Pill Under Image */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                <span className="block text-[10px] text-slate-400 font-mono">LATENCY</span>
                <span className="text-xs font-bold text-cyber-cyan">38ms Pro</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                <span className="block text-[10px] text-slate-400 font-mono">BATTERY</span>
                <span className="text-xs font-bold text-cyber-neon">36H Total</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                <span className="block text-[10px] text-slate-400 font-mono">ANC</span>
                <span className="text-xs font-bold text-amber-400">-45dB Depth</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
