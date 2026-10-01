import React from 'react';
import { useStore } from '../store/useStore';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, hideToast } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-cyber-900/95 border border-cyber-neon/40 shadow-neon-green backdrop-blur-xl text-slate-100 text-xs font-mono font-medium">
        <CheckCircle2 className="w-4 h-4 text-cyber-neon shrink-0" />
        <span>{toastMessage}</span>
        <button
          onClick={hideToast}
          className="ml-2 p-1 text-slate-400 hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
