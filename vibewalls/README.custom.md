# VibeWalls: AI-Powered Wallpapers

Welcome to VibeWalls, a modern web application designed to help you find the perfect wallpaper to match your mood and style. This project was built with a focus on beautiful design, high performance, and a touch of AI magic.

This document explains how the site was built, the tools used, and where to find key pieces of the code.

---

## Core Technologies & Tools

This application is built using a modern, production-ready tech stack:

- **Framework:** **Next.js** (with the App Router) provides the foundation, enabling fast server-side rendering and a component-based architecture.
- **UI Library:** **React** is used to build the interactive and dynamic user interface.
- **Styling:** **Tailwind CSS** is used for all styling. It's a utility-first CSS framework that allows for rapid and consistent design directly within the components.
- **Component Library:** **shadcn/ui** provides a set of beautifully designed and accessible components (like Buttons, Cards, and Dialogs) that are built on top of Tailwind CSS.
- **Generative AI:** **Google's Genkit** powers the "AI Wallpaper Suggester," allowing the app to provide intelligent recommendations based on user input.
- **Animations:** **Framer Motion** is used to add subtle, delightful animations that enhance the user experience, like the fading in of wallpapers.

---

## How The App is Structured

Instead of a single `index.html` file, this app is composed of many smaller files that work together. Here are the most important ones:

- `src/app/page.tsx`: This is the main homepage component. It defines the overall layout of the landing page, including the hero section, the AI suggester, and the wallpaper browser.
- `src/app/layout.tsx`: This is the root layout for the entire app. It includes the `<html>` and `<body>` tags and is where the global fonts and theme provider are set up.
- `src/lib/data.ts`: This file contains all the data for the wallpapers, including their IDs, names, categories, and image URLs.
- `src/app/actions.ts`: This file contains the server-side logic (a Next.js Server Action) that connects the AI Suggester form to the Genkit AI flow.

---

## Image & Data Source

A key feature of VibeWalls is its large and beautiful collection of wallpapers.

- **Data Source:** All metadata for the wallpapers (like their ID, name, category, and AI hint) is managed in the `src/lib/data.ts` file. This makes it easy to add or modify wallpapers.

- **Image Sourcing:** The application currently uses placeholder images from `picsum.photos`. This service provides high-resolution images based on a unique seed for each wallpaper, which is great for development and showcasing the layout.

- **Future-Proofing with AI Hints:** Each wallpaper includes a `data-ai-hint` attribute (e.g., `data-ai-hint="cherry blossom"`). This hint provides keywords that can be used to programmatically fetch relevant, high-quality images from services like **Unsplash**, which was the intended source for production-quality visuals. This is why you see a reference to Unsplash in the app's UI.

---

## Design and Styling

The visual design of VibeWalls is clean, modern, and vibrant.

### Color Palette

The entire color scheme is defined in **`src/app/globals.css`** using CSS variables. This makes it easy to change the look and feel of the entire site from one central place.
- **Primary:** A vibrant hot pink (`hsl(330 90% 65%)`) used for buttons and highlights.
- **Accent:** A bright cyan (`hsl(180 85% 55%)`) used for subtle gradients and secondary highlights.
- **Background:** A very light gray for light mode and a deep, dark blue for dark mode, providing a clean canvas for the wallpapers.

### Typography

The app uses two primary fonts to create a professional and stylish typographic hierarchy:
- **Headlines:** **Playfair Display** is used for all major headings, giving the site an elegant and bold feel.
- **Body Text:** **Inter** is used for all other text, providing excellent readability.

These fonts are loaded from Google Fonts in `src/app/layout.tsx` and configured for Tailwind CSS in `tailwind.config.ts`.

### The Navbar (Header)

The navigation bar at the top of the page is a custom component located at **`src/components/layout/header.tsx`**. It has a modern "glassy" effect, achieved with background blur and transparency, making it float elegantly over the content as you scroll. It also includes the theme toggle button for switching between light and dark modes.

---
