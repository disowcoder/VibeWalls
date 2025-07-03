"use client";

import Image from 'next/image';
import { type Wallpaper } from '@/lib/data';
// ...existing code...
// Placeholder imports for Card, CardContent, Badge, Eye
import { ReactNode, HTMLAttributes } from "react";
const Card = ({ children, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => <div {...props}>{children}</div>;
const CardContent = ({ children, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => <div {...props}>{children}</div>;
const Badge = ({ children, ...props }: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) => <span {...props}>{children}</span>;
import { Eye } from 'lucide-react';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onSelect: () => void;
}

export default function WallpaperCard({ wallpaper, onSelect }: WallpaperCardProps) {
  return (
    <Card
      className="border bg-card text-card-foreground shadow-sm overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 rounded-xl hover:ring-2 hover:ring-primary/80 flex flex-col justify-end aspect-[9/16] w-full min-h-[320px] max-h-[500px] mx-auto"
      onClick={onSelect}
      style={{ height: '100%' }}
    >
      <CardContent className="p-0 relative flex-1 flex flex-col justify-end h-full min-h-[320px]">
        <div className="absolute inset-0 z-0 flex flex-col justify-end">
          <Image
            src={wallpaper.url}
            alt={wallpaper.name}
            width={1080}
            height={1920}
            data-ai-hint={wallpaper.hint}
            className="aspect-[9/16] object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            style={{ color: 'transparent' }}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 20vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="p-2 bg-background/70 rounded-full backdrop-blur-sm pointer-events-auto">
            <Eye className="h-6 w-6 text-foreground" />
          </div>
        </div>
        {wallpaper.exclusive && (
          <Badge
            variant="default"
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-pink-600 absolute top-2 right-2 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 text-white shadow-lg animate-pulse"
          >
            New
          </Badge>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
          <h3 className="text-white text-sm font-semibold truncate">{wallpaper.name}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
