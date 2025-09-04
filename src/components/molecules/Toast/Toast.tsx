'use client';

import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils/cn';

export function Toast() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div data-testid="toast" className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'relative px-[11px] py-[15px] rounded-[6px] transform transition-all duration-300 ease-in-out',
            'animate-in slide-in-from-right-2 fade-in-0',
            'max-w-sm min-w-[171px]',
            {
              'bg-[#4C825B] text-white border body-small border-green-200 shadow-[0px_0px_0px_2px_#00000040_inset]':
                toast.type === 'success',

              'bg-blue-100 text-blue-800 border border-blue-200 shadow-[0px_0px_0px_2px_#00000040_inset]':
                toast.type === 'info',
            }
          )}
        >
          <div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="absolute right-[5px] top-0 text-white hover:text-gray-400 transition-colors cursor-pointer body-small"
              aria-label="Chiudi notifica"
            >
              x
            </button>
            <p className="text-sm font-medium flex-1">{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
