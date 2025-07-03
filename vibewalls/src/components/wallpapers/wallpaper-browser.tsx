"use client";

import { useState } from "react";
import { Wallpaper } from "@/lib/data";
import WallpaperCard from "./wallpaper-card";

interface WallpaperBrowserProps {
  wallpapers: Wallpaper[];
  categories: string[];
}

export default function WallpaperBrowser({ wallpapers, categories }: WallpaperBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  const filteredWallpapers =
    selectedCategory === "All"
      ? wallpapers
      : wallpapers.filter((w) => w.category === selectedCategory);

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-medium transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/60
              ${selectedCategory === cat
                ? "bg-primary text-primary-foreground shadow"
                : "bg-muted text-muted-foreground hover:bg-primary/10"}
            `}
            onClick={() => setSelectedCategory(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Wallpaper Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredWallpapers.map((wallpaper, idx) => (
          <WallpaperCard
            key={`${wallpaper.id}-${idx}`}
            wallpaper={wallpaper}
            onSelect={() => {}}
          />
        ))}
        {filteredWallpapers.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No wallpapers found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
