import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, ShoppingBag, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            id={`toast-${toast.id}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto flex items-center justify-between gap-3 bg-[#1E1E1E] text-[#FAF8F5] p-3.5 rounded-xl shadow-xl border border-[#333330]/60 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 min-w-0">
              {toast.type === 'cart' ? (
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5]/10 flex items-center justify-center text-[#E8DCC4] shrink-0">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              ) : toast.type === 'success' ? (
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5]/10 text-[#FAF8F5] flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4" />
                </div>
              )}

              {toast.product && toast.product.images[0] && (
                <img
                  src={toast.product.images[0]}
                  alt={toast.product.name}
                  className="w-10 h-10 rounded-md object-cover border border-[#444] shrink-0"
                  referrerPolicy="no-referrer"
                />
              )}

              <p className="text-xs font-medium text-[#FAF8F5] leading-snug line-clamp-2">
                {toast.message}
              </p>
            </div>

            <button
              id={`toast-close-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-[#999] hover:text-white transition-colors p-1 rounded-md shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const ToastContainer = Toast;

