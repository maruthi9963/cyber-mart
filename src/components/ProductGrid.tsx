import React, { useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { useStore } from '../store/useStore';
import { ArrowUpDown, AlertCircle } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    searchQuery,
    selectedCategory,
    priceRange,
    minRating,
    onlyDeals,
    onlyInStock,
    onlyFastDelivery,
    sortBy,
    setSortBy,
    resetFilters,
  } = useStore();

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (
          searchQuery &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }

        // Price range
        if (p.price > priceRange[1]) {
          return false;
        }

        // Min rating
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }

        // Flash deals only
        if (onlyDeals && !p.isFlashDeal) {
          return false;
        }

        // In stock only
        if (onlyInStock && !p.inStock) {
          return false;
        }

        // Fast delivery
        if (onlyFastDelivery && !p.fastDelivery) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [
    products,
    searchQuery,
    selectedCategory,
    priceRange,
    minRating,
    onlyDeals,
    onlyInStock,
    onlyFastDelivery,
    sortBy,
  ]);

  return (
    <div className="flex-1 space-y-4">
      {/* Top Controls: Result count & Sort Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-cyber-900/40 backdrop-blur-md border border-white/5 rounded-2xl px-4 py-3">
        <div className="text-xs text-slate-300 font-mono">
          Showing <span className="font-bold text-cyber-neon">{filteredProducts.length}</span> results
          {searchQuery && (
            <span> for &quot;<span className="text-white font-semibold">{searchQuery}</span>&quot;</span>
          )}
        </div>

        {/* Sort by selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="hidden sm:inline">Sort by:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyber-cyan cursor-pointer"
          >
            <option value="featured">Featured / Best Match</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(selectedCategory !== 'All' || minRating > 0 || onlyDeals || priceRange[1] < 2500 || onlyFastDelivery) && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-mono text-slate-500 uppercase">Active filters:</span>
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyber-neon/10 text-cyber-neon border border-cyber-neon/30">
              Dept: {selectedCategory}
            </span>
          )}
          {priceRange[1] < 2500 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/20">
              Under ${priceRange[1]}
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30">
              {minRating}★+
            </span>
          )}
          {onlyDeals && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30">
              Flash Deals
            </span>
          )}
          {onlyFastDelivery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Priority Delivery
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer ml-1"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty Results State */
        <div className="rounded-2xl border border-dashed border-white/15 bg-cyber-900/30 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
            <AlertCircle className="w-6 h-6 text-cyber-cyan" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">No products found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              We couldn&apos;t find any items matching your selected criteria. Try adjusting your filters or search keywords.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyber-neon text-cyber-950 hover:bg-cyber-cyan transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
