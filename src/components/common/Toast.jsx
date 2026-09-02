import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-20 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
        };

        const borders = {
          success: 'border-emerald-500/30 bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-950 dark:text-emerald-100',
          error: 'border-rose-500/30 bg-rose-50/95 dark:bg-rose-950/90 text-rose-950 dark:text-rose-100',
          warning: 'border-amber-500/30 bg-amber-50/95 dark:bg-amber-950/90 text-amber-950 dark:text-amber-100',
          info: 'border-blue-500/30 bg-blue-50/95 dark:bg-blue-950/90 text-blue-950 dark:text-blue-100'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-300 animate-slideIn ${borders[toast.type] || borders.info}`}
          >
            {icons[toast.type] || icons.info}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm font-sans">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-current opacity-60 hover:opacity-100 transition-opacity p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
