import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    setIsCheckoutOpen,
    promoCode,
    promoDiscountPercent,
    applyPromoCode,
  } = useStore();

  const [inputPromo, setInputPromo] = useState('');

  if (!isCartOpen) return null;

  // Free shipping threshold: $150
  const FREE_SHIPPING_THRESHOLD = 150;
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * promoDiscountPercent) / 100;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || promoCode === 'FREESHIP';
  const shippingAmount = isFreeShipping ? 0 : 15.0;
  const total = Math.max(0, subtotal - discountAmount + shippingAmount);
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cyber-900/95 border-l border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyber-neon" />
              <h2 className="text-base font-bold text-white font-mono">
                Your Cyber Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tier Meter (Amazon standard gamification) */}
          <div className="bg-slate-950/60 p-4 border-b border-white/5 text-xs">
            <div className="flex items-center gap-2 mb-1.5 text-slate-300 font-mono">
              <Truck className="w-4 h-4 text-cyber-cyan" />
              {isFreeShipping ? (
                <span className="text-cyber-neon font-bold">
                  🎉 FREE Quantum Priority Delivery Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-cyber-cyan font-bold">${amountNeeded.toFixed(2)}</strong> for FREE Express Delivery
                </span>
              )}
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-neon transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-white/5">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="pt-4 first:pt-0 flex gap-3 text-left">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedColor && (
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        Color: {item.selectedColor}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-mono text-sm font-bold text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-slate-950/80 border border-white/10 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-mono font-bold text-slate-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600" />
                <h3 className="text-sm font-bold text-slate-300">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Browse our catalog and take advantage of today&apos;s flash hardware deals.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-cyber-neon text-cyber-950 hover:bg-cyber-cyan"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-slate-950/80 space-y-3 text-left">
              
              {/* Promo Code Box */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Promo: CYBER20"
                    value={inputPromo}
                    onChange={(e) => setInputPromo(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyber-neon"
                  />
                </div>
                <button
                  onClick={() => applyPromoCode(inputPromo)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-slate-200"
                >
                  Apply
                </button>
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs font-mono pt-1 text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-200">${subtotal.toFixed(2)}</span>
                </div>
                {promoDiscountPercent > 0 && (
                  <div className="flex justify-between text-cyber-neon">
                    <span>Discount ({promoDiscountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className={isFreeShipping ? 'text-cyber-cyan font-bold' : 'text-slate-200'}>
                    {isFreeShipping ? 'FREE' : `$${shippingAmount.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Due</span>
                  <span className="text-cyber-neon font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 rounded-xl font-bold font-mono text-xs tracking-wider bg-cyber-neon hover:bg-cyber-cyan text-cyber-950 transition-all shadow-neon-green flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-cyber-neon" />
                <span>256-Bit Quantum Encrypted Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
