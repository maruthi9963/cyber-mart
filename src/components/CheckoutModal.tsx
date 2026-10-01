import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../store/useStore';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    deliveryAddress,
    promoDiscountPercent,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * promoDiscountPercent) / 100;
  const isFreeShipping = subtotal >= 150;
  const shippingAmount = isFreeShipping ? 0 : 15.0;
  const total = Math.max(0, subtotal - discountAmount + shippingAmount);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedId = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      setOrderId(generatedId);
      setIsProcessing(false);
      setStep(3);
      clearCart();
      // Trigger fireworks confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00f5a0', '#00d8f6', '#f59e0b', '#ffffff'],
        });
      } catch (err) {
        // Fallback gracefully if canvas context isn't supported
      }
    }, 1500);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setOrderId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto rounded-3xl bg-cyber-900 border border-white/10 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyber-neon" />
            <h2 className="text-lg font-bold text-white font-mono">
              Secure Quantum Checkout
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 relative max-w-md mx-auto">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 -z-0" />
          
          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                step >= 1 ? 'bg-cyber-neon text-cyber-950 shadow-neon-green' : 'bg-slate-800 text-slate-400'
              }`}
            >
              1
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1">Shipping</span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                step >= 2 ? 'bg-cyber-neon text-cyber-950 shadow-neon-green' : 'bg-slate-800 text-slate-400'
              }`}
            >
              2
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1">Payment</span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                step === 3 ? 'bg-cyber-neon text-cyber-950 shadow-neon-green' : 'bg-slate-800 text-slate-400'
              }`}
            >
              3
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1">Confirmed</span>
          </div>
        </div>

        {/* Step 1: Shipping Details */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyber-cyan flex items-center gap-1.5 font-bold">
                  <MapPin className="w-4 h-4" /> Delivery Destination
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Prime Fast Transit</span>
              </div>
              <div className="text-sm text-slate-200">
                <p className="font-bold">{deliveryAddress.fullName}</p>
                <p className="text-xs text-slate-400">{deliveryAddress.street}</p>
                <p className="text-xs text-slate-400">
                  {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-cyber-neon" /> Delivery Speed
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl border border-cyber-neon/40 bg-cyber-neon/5">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Quantum Priority 1-Day Transit
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Guaranteed delivery by 2:00 PM Tomorrow
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-cyber-neon">
                  {isFreeShipping ? 'FREE' : `$${shippingAmount.toFixed(2)}`}
                </span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl font-bold font-mono text-xs bg-cyber-neon hover:bg-cyber-cyan text-cyber-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-neon-green"
            >
              <span>CONTINUE TO PAYMENT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Payment Simulation */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-3">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-cyber-cyan" /> Select Payment Method
              </span>

              {/* Simulated Card */}
              <div className="p-4 rounded-xl border border-cyber-cyan/50 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs text-cyber-neon font-bold tracking-wider">
                    CYBER&lt;CARD&gt; PRO
                  </span>
                  <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
                </div>
                <div className="font-mono text-base tracking-widest text-white mb-3">
                  •••• •••• •••• 4242
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>HOLDER: {deliveryAddress.fullName.toUpperCase()}</span>
                  <span>EXP: 12/28</span>
                </div>
              </div>
            </div>

            {/* Total Review */}
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {promoDiscountPercent > 0 && (
                <div className="flex justify-between text-cyber-neon">
                  <span>Savings:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Shipping:</span>
                <span>{isFreeShipping ? 'FREE' : `$${shippingAmount.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                <span>Total Amount:</span>
                <span className="text-cyber-neon font-mono">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl font-bold font-mono text-xs bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="flex-1 py-3.5 rounded-xl font-bold font-mono text-xs bg-cyber-neon hover:bg-cyber-cyan text-cyber-950 transition-all shadow-neon-green flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="animate-pulse">PROCESSING QUANTUM TRANSACTION...</span>
                ) : (
                  <span>AUTHORIZE & PAY ${total.toFixed(2)}</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyber-neon/15 border border-cyber-neon text-cyber-neon flex items-center justify-center mx-auto shadow-neon-green animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-mono">
                Order Dispatched Successfully!
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Your order <strong className="text-cyber-cyan font-mono">{orderId}</strong> is confirmed. Tracking updates have been sent to your terminal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 max-w-md mx-auto text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Status:</span>
                <span className="text-cyber-neon font-bold">PREPARING DISPATCH</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Arrival:</span>
                <span className="text-white">Tomorrow, by 2:00 PM</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Destination:</span>
                <span className="text-white">{deliveryAddress.city}, {deliveryAddress.zipCode}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-xl font-bold font-mono text-xs bg-cyber-neon text-cyber-950 hover:bg-cyber-cyan transition-colors"
            >
              Continue Browsing Cyber&lt;Mart&gt;
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
