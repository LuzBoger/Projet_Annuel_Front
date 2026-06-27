import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Cross } from '@/assets/icons';
import { clsx, type ClassValue } from 'clsx';
import { ModalSize } from '@/types/components/modal';
import { sizeClasses } from '@/constants/modal';

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e1217]/60 dark:bg-gray-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={cn(
          "relative w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]",
          sizeClasses[size],
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
            {title ? (
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </div>
            ) : <div />}

            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                aria-label="Close"
              >
                <Cross className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <div className="px-6 pb-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
