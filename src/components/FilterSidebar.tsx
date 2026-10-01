import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Star, 
  Truck, 
  Flame, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { useStore } from '../store/useStore';
import type { ProductCategory } from '../types/product';

interface FilterSidebarProps {
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCloseMobile }) => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    onlyDeals,
    setOnlyDeals,
    onlyInStock,
    setOnlyInStock,
    onlyFastDelivery,
    setOnlyFastDelivery,
    resetFilters,
  } = useStore();

  const categories: ProductCategory[] = [
    'All',
    'Audio',
    'Wearables',
    'Gaming',
    'Laptops',
    'Accessories',
  ];

  // Helper to get category product count
  const getCount = (cat: ProductCategory) => {
    if (cat === 'All') return products.length;
    return products.filter((p) => p.category === cat).length;
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6 bg-cyber-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-left text-sm">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 font-mono font-bold text-white text-base">
          <Filter className="w-4 h-4 text-cyber-neon" />
          <span>Filters</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="text-xs text-slate-400 hover:text-cyber-cyan flex items-center gap-1 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Category Department Section */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
          Departments
        </h4>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  isSelected
                    ? 'bg-cyber-neon/15 text-cyber-neon border border-cyber-neon/30 font-semibold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{cat === 'All' ? 'All Departments' : cat}</span>
                <span className="text-[10px] font-mono text-slate-500">
                  ({getCount(cat)})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range Slider */}
      <div className="border-t border-white/5 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Price Range
          </h4>
          <span className="font-mono text-xs font-semibold text-cyber-neon">
            Up to ${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="2500"
          step="50"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-cyber-neon cursor-pointer bg-slate-800 h-1.5 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span>$0</span>
          <span>$1000</span>
          <span>$2500+</span>
        </div>
      </div>

      {/* 3. Customer Rating Filter (Amazon 4 Stars & Up) */}
      <div className="border-t border-white/5 pt-4">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[4.8, 4.5, 4.0].map((rating) => {
            const isSelected = minRating === rating;
            return (
              <button
                key={rating}
                onClick={() => setMinRating(isSelected ? 0 : rating)}
                className={`w-full flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs transition-colors ${
                  isSelected
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span>{rating}★ & Up</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Special Perks & Shipping */}
      <div className="border-t border-white/5 pt-4 space-y-3">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Delivery & Offers
        </h4>

        {/* Priority Delivery Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={onlyFastDelivery}
            onChange={(e) => setOnlyFastDelivery(e.target.checked)}
            className="w-4 h-4 rounded bg-slate-900 border-white/20 accent-cyber-cyan cursor-pointer"
          />
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>Priority 1-Day Delivery</span>
          </div>
        </label>

        {/* Deals Only Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={onlyDeals}
            onChange={(e) => setOnlyDeals(e.target.checked)}
            className="w-4 h-4 rounded bg-slate-900 border-white/20 accent-cyber-neon cursor-pointer"
          />
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-cyber-neon" />
            <span>Flash Deals Only</span>
          </div>
        </label>

        {/* In Stock Only Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 rounded bg-slate-900 border-white/20 accent-emerald-400 cursor-pointer"
          />
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>In Stock Only</span>
          </div>
        </label>
      </div>

    </aside>
  );
};
