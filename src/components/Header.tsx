import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  MapPin, 
  User, 
  Zap, 
  X, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../store/useStore';
import type { ProductCategory } from '../types/product';

interface HeaderProps {
  onToggleSidebarMobile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebarMobile }) => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    cart,
    wishlist,
    setIsCartOpen,
    deliveryAddress,
    openProductModal,
    setOnlyDeals
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [zipInput, setZipInput] = useState(deliveryAddress.zipCode);
  const searchRef = useRef<HTMLDivElement>(null);

  // Cart total items count
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Live search suggestions
  const searchSuggestions = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const categories: ProductCategory[] = [
    'All',
    'Audio',
    'Wearables',
    'Gaming',
    'Laptops',
    'Accessories',
    'Deals'
  ];

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (cat: ProductCategory) => {
    if (cat === 'Deals') {
      setSelectedCategory('All');
      setOnlyDeals(true);
    } else {
      setSelectedCategory(cat);
      setOnlyDeals(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-cyber-950/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      {/* Top Banner Alert (Amazon-like prime notice) */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-cyan-950/80 to-slate-950/80 border-b border-emerald-500/20 px-4 py-1 text-center text-xs text-cyber-neon flex items-center justify-center gap-2">
        <Zap className="w-3.5 h-3.5 text-cyber-neon animate-pulse" />
        <span>CYBER PROTOCOL ACTIVE: Use code <strong className="underline tracking-wider font-mono">CYBER20</strong> for 20% off all quantum hardware</span>
      </div>

      {/* Main Omnibar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setOnlyDeals(false); }}
              className="group flex items-center gap-2 text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyber-neon to-cyber-cyan flex items-center justify-center shadow-neon-green group-hover:scale-105 transition-transform">
                <span className="font-mono font-black text-cyber-950 text-xl tracking-tighter">C</span>
              </div>
              <div className="flex flex-col">
                <div className="font-mono font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center">
                  CYBER<span className="text-cyber-neon group-hover:text-cyber-cyan transition-colors">&lt;MART&gt;</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-1 hidden sm:inline">Quantum Commerce</span>
              </div>
            </button>

            {/* Delivery Location Indicator */}
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/5 hover:border-cyber-cyan/30 hover:bg-white/5 transition-all text-left text-xs"
            >
              <MapPin className="w-4 h-4 text-cyber-cyan shrink-0 animate-bounce" />
              <div className="leading-tight">
                <span className="text-[10px] text-slate-400 block">Deliver to {deliveryAddress.fullName.split(' ')[0]}</span>
                <span className="font-semibold text-slate-200 block truncate max-w-[110px]">{deliveryAddress.city} {deliveryAddress.zipCode}</span>
              </div>
            </button>
          </div>

          {/* Omnibar Search Box (Center) */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative">
            <div className={`relative flex items-center rounded-xl bg-cyber-900/90 border transition-all duration-300 ${
              isSearchFocused ? 'border-cyber-cyan shadow-neon-cyan ring-1 ring-cyber-cyan/50' : 'border-white/10 hover:border-white/20'
            }`}>
              
              {/* Category Prefix Dropdown */}
              <div className="relative hidden md:block">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategorySelect(e.target.value as ProductCategory)}
                  aria-label="Filter by department"
                  className="appearance-none bg-slate-800/80 hover:bg-slate-700/80 text-xs font-medium text-slate-200 py-2.5 pl-3 pr-7 rounded-l-xl border-r border-white/10 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Tech</option>
                  <option value="Audio">Audio</option>
                  <option value="Wearables">Wearables</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Search Input */}
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Search audio, laptops, biometric rings, keycaps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 py-2.5 pl-4 pr-10 focus:outline-none font-sans"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 text-slate-400 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Submit Button */}
              <button 
                onClick={() => setIsSearchFocused(false)}
                className="bg-cyber-neon hover:bg-cyber-cyan text-cyber-950 px-4 py-2.5 rounded-r-xl transition-all font-semibold flex items-center justify-center shrink-0"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Live Search Autocomplete Popup */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-cyber-900/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl p-2 z-50 overflow-hidden divide-y divide-white/5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Instant Matches ({searchSuggestions.length})
                </div>
                {searchSuggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      openProductModal(item);
                      setIsSearchFocused(false);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-10 h-10 rounded-lg object-cover bg-slate-800 border border-white/10 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-200 group-hover:text-cyber-neon transition-colors truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="font-mono text-emerald-400 font-semibold">${item.price.toFixed(2)}</span>
                        <span>•</span>
                        <span>{item.category}</span>
                        <span>•</span>
                        <span className="text-amber-400">★ {item.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons (Wishlist, Account, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Mobile Filter Toggle */}
            {onToggleSidebarMobile && (
              <button 
                onClick={onToggleSidebarMobile}
                className="lg:hidden p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300"
                title="Filters"
              >
                <SlidersHorizontal className="w-5 h-5 text-cyber-cyan" />
              </button>
            )}

            {/* Wishlist Pill */}
            <div className="hidden sm:flex items-center text-xs text-slate-300 gap-1.5 px-3 py-1.5 rounded-xl border border-white/5 hover:border-white/20 transition-all cursor-pointer">
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-cyber-rose fill-cyber-rose' : 'text-slate-400'}`} />
              <span className="hidden md:inline">Saved</span>
              {wishlist.length > 0 && (
                <span className="bg-cyber-rose/20 text-cyber-rose text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* Account / User Menu */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 hover:border-white/20 cursor-pointer transition-all">
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left hidden xl:block leading-none">
                <span className="text-[10px] text-slate-400 block">Hello, Alex</span>
                <span className="text-xs font-semibold text-slate-200 block">Account & Prime</span>
              </div>
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-gradient-to-r from-cyber-neon/20 to-cyber-cyan/20 hover:from-cyber-neon/30 hover:to-cyber-cyan/30 text-white border border-cyber-neon/40 px-3.5 py-2 rounded-xl transition-all duration-300 hover:shadow-neon-green group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-cyber-neon group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-cyber-neon text-cyber-950 text-[10px] font-mono font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold font-mono tracking-tight hidden sm:inline">
                Cart
              </span>
            </button>
          </div>

        </div>

        {/* Sub-Navigation Department Chips */}
        <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = (cat === 'Deals' && useStore.getState().onlyDeals) || selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyber-neon text-cyber-950 shadow-neon-green font-bold'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-white/5'
                }`}
              >
                {cat === 'Deals' && <Zap className="w-3.5 h-3.5 fill-current" />}
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Delivery ZIP modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-cyber-900 border border-white/10 rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyber-cyan" /> Update Delivery Location
              </h3>
              <button onClick={() => setIsLocationModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Enter your postal code to calculate exact quantum delivery speeds and local stock availability.
            </p>
            <input
              type="text"
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value)}
              placeholder="e.g. 94107"
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white mb-4 focus:outline-none focus:border-cyber-cyan"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  useStore.getState().setDeliveryAddress({
                    ...deliveryAddress,
                    zipCode: zipInput || '94107'
                  });
                  setIsLocationModalOpen(false);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-cyber-neon text-cyber-950 hover:bg-cyber-cyan transition-colors"
              >
                Apply Location
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
