import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Layers, 
  MessageSquare
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const ProductModal: React.FC = () => {
  const { activeProductModal, closeProductModal, addToCart, setIsCartOpen, products } = useStore();
  
  if (!activeProductModal) return null;

  const product = activeProductModal;
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Default');
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  // Bundle product (Frequently Bought Together Amazon feature)
  const bundleProduct = products.find((p) => p.id !== product.id && p.category === 'Accessories') || products[4];
  const bundleDiscountPrice = (product.price + bundleProduct.price) * 0.85; // 15% bundle discount

  const handleAddSingle = () => {
    addToCart(product, 1, selectedColor);
    setIsCartOpen(true);
    closeProductModal();
  };

  const handleAddBundle = () => {
    addToCart(product, 1, selectedColor);
    addToCart(bundleProduct, 1);
    setIsCartOpen(true);
    closeProductModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-cyber-900 border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Gallery & Images */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-cyber-950/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-mono text-cyber-neon">
                {product.brand} Quantum Series
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? 'border-cyber-neon shadow-neon-green'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-slate-400 font-mono">
              <div className="p-2 rounded-xl bg-slate-950/50 border border-white/5">
                <Truck className="w-4 h-4 text-cyber-cyan mx-auto mb-1" />
                <span>Next-Day Free</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/50 border border-white/5">
                <ShieldCheck className="w-4 h-4 text-cyber-neon mx-auto mb-1" />
                <span>2-Yr Warranty</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/50 border border-white/5">
                <RotateCcw className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span>30-Day Return</span>
              </div>
            </div>
          </div>

          {/* Right Column: Buy Box, Specs & Reviews */}
          <div className="md:col-span-6 flex flex-col justify-between text-left space-y-4">
            
            <div>
              {/* Category & Badge */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyber-neon/15 text-cyber-neon border border-cyber-neon/30">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {product.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-semibold text-amber-400">
                  {product.rating}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>

              {/* Pricing Box */}
              <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-baseline justify-between">
                <div>
                  <span className="font-mono text-2xl font-black text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="font-mono text-sm text-slate-500 line-through ml-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  In Stock ({product.stockCount} left)
                </span>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="block text-xs font-mono text-slate-400 mb-2">
                    Color: <strong className="text-white">{selectedColor}</strong>
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                          selectedColor === c
                            ? 'bg-cyber-cyan/20 border-cyber-cyan text-white shadow-neon-cyan'
                            : 'border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mt-3">
                {product.description}
              </p>

              {/* Tabs: Specs vs Reviews */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex gap-4 border-b border-white/5 pb-2">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                      activeTab === 'specs'
                        ? 'text-cyber-neon border-b-2 border-cyber-neon pb-1 -mb-2.5'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" /> Technical Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                      activeTab === 'reviews'
                        ? 'text-cyber-neon border-b-2 border-cyber-neon pb-1 -mb-2.5'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Verified Reviews ({product.reviews?.length || 2})
                  </button>
                </div>

                {/* Specs Tab Content */}
                {activeTab === 'specs' && (
                  <div className="mt-3 divide-y divide-white/5 text-xs font-mono">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="py-1.5 flex justify-between">
                        <span className="text-slate-400">{key}</span>
                        <span className="text-slate-200 font-semibold">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab Content */}
                {activeTab === 'reviews' && (
                  <div className="mt-3 space-y-3 max-h-40 overflow-y-auto pr-1">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((rev) => (
                        <div key={rev.id} className="p-2.5 rounded-xl bg-slate-950/40 border border-white/5 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-white">{rev.author}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{rev.date}</span>
                          </div>
                          <div className="flex text-amber-400 mb-1">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <div className="font-semibold text-slate-200 mb-0.5">{rev.title}</div>
                          <p className="text-slate-400 text-[11px] leading-relaxed">{rev.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400">All customer ratings are 100% verified buyers.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Amazon-style "Frequently Bought Together" Bundle Card */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-cyber-cyan/30 text-xs space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-cyber-cyan font-bold">Frequently Bought Together</span>
                <span className="bg-cyber-cyan/20 text-cyber-cyan px-2 py-0.5 rounded-full font-bold">
                  Save 15%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img src={product.image} alt={product.name} className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-slate-500 font-bold">+</span>
                <img src={bundleProduct.image} alt={bundleProduct.name} className="w-8 h-8 rounded-lg object-cover" />
                <div className="flex-1 min-w-0 text-[11px] leading-tight text-slate-300 truncate">
                  {product.name} + {bundleProduct.name}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="font-mono font-bold text-white">${bundleDiscountPrice.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-500 line-through ml-1.5 font-mono">
                    ${(product.price + bundleProduct.price).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleAddBundle}
                  className="px-3 py-1 rounded-lg bg-cyber-cyan text-cyber-950 font-bold text-[10px] font-mono hover:bg-white transition-colors"
                >
                  Add Both to Cart
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={handleAddSingle}
                className="flex-1 py-3 rounded-xl font-bold font-mono text-xs bg-cyber-neon hover:bg-cyber-cyan text-cyber-950 transition-all shadow-neon-green flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
