"use client";

import Image from 'next/image';
import { type Wallpaper } from '@/lib/data';
import { Download as DownloadIcon, Brush, ExternalLink } from 'lucide-react';
// Modal overlay for Dialog
import { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react";
const Dialog = ({ children }: { children: ReactNode }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in">
    {children}
  </div>
);
const DialogContent = ({ children, className = "", onClose, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode; className?: string; onClose?: () => void }) => (
  <div
    className={`relative bg-white dark:bg-[#181f2a] rounded-2xl shadow-2xl border-2 border-primary/30 max-w-3xl w-full mx-4 overflow-hidden animate-dialog-pop ${className}`}
    {...props}
  >
    {/* Close button */}
    <button
      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-black/40 hover:bg-pink-500 hover:text-white transition-colors text-2xl text-gray-700 dark:text-gray-200 shadow-lg border border-gray-200 dark:border-gray-700"
      onClick={onClose}
      aria-label="Close"
      tabIndex={0}
    >
      <span className="block w-6 h-6 flex items-center justify-center">×</span>
    </button>
    {children}
  </div>
);
const DialogHeader = ({ children, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => <div {...props}>{children}</div>;
const DialogTitle = ({ children, ...props }: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) => <h2 {...props}>{children}</h2>;
const DialogDescription = ({ children, ...props }: HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }) => <p {...props}>{children}</p>;
const Button = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => <button {...props}>{children}</button>;
// Removed emoji icon placeholders, using lucide-react SVGs instead
const useToast = () => ({ toast: () => {} });

interface WallpaperDialogProps {
  wallpaper: Wallpaper | null;
  isOpen: boolean;
}

export default function WallpaperDialog({ wallpaper, isOpen }: WallpaperDialogProps) {
  const { toast } = useToast();
  if (!isOpen || !wallpaper) return null;

  // Close handler for the X button
  const handleClose = () => {
    if (
      typeof window !== 'undefined' &&
      '__closeWallpaperDialog' in window &&
      typeof (window as unknown as { __closeWallpaperDialog?: () => void }).__closeWallpaperDialog === 'function'
    ) {
      (window as unknown as { __closeWallpaperDialog?: () => void }).__closeWallpaperDialog?.();
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(wallpaper.url);
      if (!response.ok) throw new Error('Network response was not ok.');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = `${wallpaper.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast();
    } catch (error) {
      console.error("Download failed:", error);
      toast();
    }
  };

  const handleCustomize = () => {
    window.open(wallpaper.url, '_blank');
    toast();
  };

  return (
    <Dialog>
      <DialogContent className="p-0 gap-0 max-w-full sm:max-w-2xl md:max-w-3xl" onClose={handleClose}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[9/16] md:aspect-auto h-[38vh] xs:h-[42vh] sm:h-[56vh] md:h-auto bg-muted flex items-center justify-center">
            <div className="w-full h-full max-w-xs sm:max-w-full mx-auto flex items-center justify-center">
              <Image
                src={wallpaper.url}
                alt={wallpaper.name}
                fill
                data-ai-hint={wallpaper.hint}
                className="object-contain sm:object-cover rounded-xl"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
                priority
                style={{ objectPosition: 'center' }}
              />
            </div>
          </div>
          <div className="p-4 sm:p-8 flex flex-col md:items-start items-center">
            <DialogHeader className="mb-4 sm:mb-6">
              <DialogTitle className="text-2xl sm:text-3xl font-headline text-primary drop-shadow">{wallpaper.name}</DialogTitle>
              <DialogDescription className="text-sm sm:text-base text-muted-foreground">Category: {wallpaper.category}</DialogDescription>
            </DialogHeader>

            <div className="flex-1 space-y-3 sm:space-y-4">
               <p className="text-xs sm:text-sm text-muted-foreground">
                  Download the wallpaper or open it in a new tab to customize.
               </p>
               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                 <Button onClick={handleDownload} className="w-full flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow text-lg py-3">
                    <DownloadIcon className="mr-2 h-5 w-5" /> Download
                  </Button>
                  <Button onClick={handleCustomize} className="w-full flex items-center justify-center border border-primary/30 bg-white dark:bg-[#232b3a] hover:bg-primary/10 text-primary font-semibold rounded-lg shadow text-lg py-3">
                    <Brush className="mr-2 h-5 w-5" /> Customize
                  </Button>
               </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 border-t text-xs text-muted-foreground flex items-center gap-1.5">
              <ExternalLink className="h-4 w-4" />
              <span>Images are from free-to-use sources via Unsplash.</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
// Animations
// Add these to your global CSS if not present:
// .animate-fade-in { animation: fadeIn 0.2s ease; }
// .animate-dialog-pop { animation: dialogPop 0.25s cubic-bezier(.22,1,.36,1); }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes dialogPop { 0% { transform: scale(0.96) translateY(20px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
