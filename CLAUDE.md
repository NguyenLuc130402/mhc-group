# MHC Website — Project Guide

## Project Overview

Corporate website for MHC ( MHC Group) built with React. The site introduces the company and its services. Design reference: Column.com — minimal, modern, professional.

## Tech Stack

- **Framework:** React 19 (Create React App)
- **Styling:** CSS Modules or plain CSS (no CSS-in-JS unless needed)
- **Icons:** Use SVG inline or a lightweight icon library (e.g. `lucide-react`)
- **Fonts:** Inter or a similar clean sans-serif via Google Fonts
- **Routing:** React Router DOM (add when multi-page needed)
- **Animation:** CSS transitions / `framer-motion` for scroll reveals (keep subtle)
- **No UI framework** (no Bootstrap, MUI) — hand-crafted styles to match design intent

## Design System

### Principles

- Minimal white space — generous padding, no clutter
- Typography-first layout — headlines carry the visual weight
- Professional and trustworthy — never playful or loud
- Consistent grid — 12-column, max-width `1200px`, centered

### Color Palette

```
--color-bg:        #FFFFFF
--color-bg-dark:   #0D1117   /* dark section backgrounds */
--color-bg-muted:  #F5F5F5   /* subtle section separators */
--color-text:      #111111
--color-text-muted:#6B7280
--color-accent:    #E85D2F   /* primary CTA / highlight (orange) */
--color-border:    #E5E7EB
```

### Typography

```
font-family: 'Inter', -apple-system, sans-serif;

--text-xs:   12px
--text-sm:   14px
--text-base: 16px
--text-lg:   18px
--text-xl:   20px
--text-2xl:  28px
--text-3xl:  40px
--text-4xl:  56px
--text-5xl:  72px

font-weight: 400 (body), 500 (label), 600 (subheading), 700 (heading)
line-height: 1.5 (body), 1.15 (headlines)
```

### Spacing

Use multiples of 8px. Common values: 8, 16, 24, 32, 48, 64, 96, 128px.

### Components

- **Button primary:** bg accent, white text, border-radius 4px, no shadow
- **Button secondary:** border 1px solid text-color, transparent bg
- **Card:** white bg, 1px border (#E5E7EB), border-radius 8px, subtle shadow
- **Section label:** uppercase, 11px, letter-spacing 0.08em, muted color
- **Stat block:** large bold number + small muted descriptor below

## Page Structure

### Navbar

- Logo (left) + nav links (center or right) + CTA button
- Sticky, white background, border-bottom on scroll
- Mobile: hamburger menu

### Hero Section

- Large headline (2–3 lines, bold)
- Subtext (1–2 sentences, muted)
- Primary + secondary CTA buttons
- Visual element: graphic, map, or abstract illustration (right side)

### Stats / Trust Bar

- 3–4 key metrics (e.g. "500+ Clients", "20+ Years", "#1 in Region")
- Logo strip of partner/client logos

### Services / Features Section

- Section label (e.g. "OUR SERVICES")
- Grid of service cards (2 or 3 columns)
- Each card: icon + title + short description

### About / Why MHC Section

- Split layout: text left, visual right
- 3–4 bullet points with icons
- Optional CTA

### Dark Feature Section

- Dark background (`--color-bg-dark`)
- Showcase of key products/offerings with mock UI or illustrations
- Light text on dark

### Partners / Clients Section

- Logo grid or strip
- Optional testimonial quote

### CTA Banner

- Full-width, accent or dark background
- Headline + CTA button

### Footer

- Logo + tagline
- Navigation links in columns
- Social links
- Copyright

## File Structure (target)

```
src/
  components/
    Navbar/
    Hero/
    Stats/
    Services/
    About/
    DarkFeature/
    Partners/
    CTABanner/
    Footer/
  pages/
    Home.js
  styles/
    variables.css   ← CSS custom properties (design tokens)
    global.css      ← resets, base styles
  assets/
    images/
    icons/
  App.js
  index.js
```

## Content (Vietnamese / English bilingual option)

Primary language: **Vietnamese** for body copy, English allowed for headings/labels.

### Company Info

- **Full name:** MHC Group
- **Tagline:** We Don't Just Drive Traffic — We Drive Profit
- **Core services:**
  - Google Ads: Search Ads, Demand keywords, Lead generation
  - Affiliate Marketing: Setup hệ thống affiliate, Scale traffic, Tối ưu conversion
  - Performance Marketing: Funnel, Landing page, Conversion tracking
- **Key stats:** (fill in)

### Contact Info

- **Address:** No. 88 Vo Thi Sau Street, Vinh City, Nghe An, Vietnam
- **Hotline:** +84 376 015 024
- **Email:** xbotteam37@gmail.com

## Development Rules

### Bắt buộc

- Website phải mobile-friendly — test trên mobile viewport trước khi báo hoàn thành
- Mọi section phải có scroll animation (fade-in, slide-up) — dùng `framer-motion` hoặc Intersection Observer API

### Code

- No comments explaining what code does — only comments for non-obvious WHY
- No unused imports, variables, or components
- Mobile-first CSS — base styles for mobile, `@media (min-width: 768px)` for desktop
- Semantic HTML (`<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`, `<article>`)
- Images: always include `alt` text; use `loading="lazy"` for below-fold images
- Accessibility: sufficient color contrast, focusable interactive elements

## Commands

```bash
cd mhc-app
npm start        # dev server at localhost:3000
npm run build    # production build
```
