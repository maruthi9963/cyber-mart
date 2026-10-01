import React from 'react';
import { Star, ShoppingCart, Heart, Eye, Truck, Zap } from 'lucide-react';
import type { Product } from '../types/product';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, openProductModal } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-cyber-900/75 border border-white/10 hover:border-cyber-neon/40 backdrop-blur-md p-4 transition-all duration-300 hover:shadow-neon-cyan hover:-translate-y-1">
      
      {/* Top Badges & Wishlist Trigger */}
      <div className="relative w-full overflow-hidden rounded-xl bg-slate-950/80 mb-3 aspect-square flex items-center justify-center">
        
        {/* Deal/Stock Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyber-neon/15 text-cyber-neon border border-cyber-neon/30">
              {product.badge}
            </span>
          )}
          {product.isFlashDeal && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-current" /> -{product.dealDiscountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyber-rose backdrop-blur-md border border-white/10 transition-colors"
          title="Save to Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
              isWishlisted ? 'text-cyber-rose fill-cyber-rose' : ''
            }`}
          />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
          onClick={() => openProductModal(product)}
        />

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => openProductModal(product)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-semibold border border-white/20 hover:border-cyber-cyan backdrop-blur-md shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
            <span>{product.brand}</span>
            <span>{product.category}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openProductModal(product)}
            className="text-sm font-semibold text-slate-100 group-hover:text-cyber-neon transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-light leading-relaxed">
            {product.tagline}
          </p>

          {/* Star Rating & Review Count (Amazon Standard) */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-amber-400 font-medium">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Pricing & Quick Add Row */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="font-mono text-lg font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="font-mono text-xs text-slate-500 line-through ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.fastDelivery && (
              <span className="flex items-center gap-1 text-[10px] text-cyber-cyan font-mono">
                <Truck className="w-3 h-3" /> Priority
              </span>
            )}
          </div>

          {/* 1-Click Quick Add Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2 px-3 rounded-xl text-xs font-bold font-mono tracking-tight bg-white/5 hover:bg-cyber-neon text-slate-200 hover:text-cyber-950 border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>QUICK ADD</span>
          </button>
        </div>
      </div>

    </div>
  );
};
