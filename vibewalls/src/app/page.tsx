"use client";
import { useState } from "react";
import { wallpapers } from "../lib/data";



import WallpaperCard from "../components/wallpapers/wallpaper-card";
import WallpaperDialog from "../components/wallpapers/wallpaper-dialog";
import { useEffect } from "react";


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState<import("../lib/data").Wallpaper | null>(null);
  const categories = ["Abstract", "Minimalist", "Nature", "Aesthetic"];
  const filteredWallpapers = selectedCategory
    ? wallpapers.filter((w) => w.category === selectedCategory)
    : wallpapers;

  // Listen for dialog close event from modal close button
  useEffect(() => {
    // Expose a global close handler for the dialog close button
    (window as { [key: string]: any }).__closeWallpaperDialog = () => {
      setDialogOpen(false);
      setSelectedWallpaper(null);
    };
    // Prevent background scroll when dialog is open
    if (dialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      delete (window as { [key: string]: any }).__closeWallpaperDialog;
      document.body.style.overflow = '';
    };
  }, [dialogOpen]);

  return (
    <div className="max-w-5xl mx-auto px-4 flex flex-col gap-16">
      {/* Hero Section */}
      <section className="text-center mt-8">
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-pink-500 mb-4">Find Your Vibe</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
          Discover beautiful, AI-powered wallpapers to match your mood and style.
        </p>
      </section>

      {/* AI Suggester Placeholder */}
      <section className="flex flex-col items-center gap-4">
        <div className="w-full max-w-md flex items-center justify-center min-h-[48px]">
          <span className="text-sm text-gray-500 text-center w-full py-3 bg-white/70 dark:bg-[#1a2630]/70 rounded-lg border border-dashed border-pink-300">
            AI suggestions coming soon!
          </span>
        </div>
        {/* Category Tabs below AI Suggester */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 mb-4 w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`relative px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/60 whitespace-nowrap
                ${selectedCategory === cat
                  ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 text-white border-primary shadow-lg scale-105"
                  : "bg-muted text-muted-foreground border-transparent hover:bg-primary/10 hover:scale-105"}
              `}
              style={{ boxShadow: selectedCategory === cat ? '0 4px 24px 0 rgba(236,72,153,0.15)' : undefined }}
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              type="button"
            >
              <span className="relative z-10 drop-shadow-lg">{cat}</span>
              {selectedCategory === cat && (
                <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-6 h-1 rounded-full bg-primary/80 blur-sm opacity-80" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Wallpaper Browser */}
      <section>
        <h2 className="font-playfair text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Wallpapers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredWallpapers.map((wallpaper, idx) => (
            <WallpaperCard
              key={`${wallpaper.id}-${idx}`}
              wallpaper={wallpaper}
              onSelect={() => {
                setSelectedWallpaper(wallpaper);
                setDialogOpen(true);
              }}
            />
          ))}
      {/* Wallpaper Preview Dialog */}
      {dialogOpen && (
        <WallpaperDialog
          wallpaper={selectedWallpaper}
          isOpen={dialogOpen}
        />
      )}
          {filteredWallpapers.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No wallpapers found in this category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
