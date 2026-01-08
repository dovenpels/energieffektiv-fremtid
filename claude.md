1. Use Tailwind CSS [text](https://tailwindcss.com/). Only use TailWind for CSS and styling, position etc.
2. Always follow SEO best practices when creating new pages (see SEO Checklist below).


## SEO Checklist for New Pages

When creating or updating HTML pages, ensure the following are included:

### Required Meta Tags:
- `<title>` - Descriptive, unique title (50-60 characters)
- `<meta name="description">` - Summary for search results (150-160 characters)
- `<meta name="author" content="SINTEF">`
- `<link rel="canonical">` - Full URL to the page
- `lang="nb-NO"` on `<html>` tag

### Open Graph Tags (for social media sharing):
- `og:type`, `og:url`, `og:title`, `og:description`
- `og:image` - Use `/EEF-logo-vektor.svg`
- `og:locale` - Set to `nb_NO`

### Twitter Card Tags:
- `twitter:card`, `twitter:url`, `twitter:title`
- `twitter:description`, `twitter:image`

### Favicon:
- `<link rel="icon" type="image/svg+xml" href="/EEF-logo-vektor.svg">`

### After Creating New Pages:
- Update `sitemap.xml` with new URL
- Set appropriate `<priority>` (1.0 for home, 0.8 for main pages, 0.6 for archive pages)
- Set `<changefreq>` (weekly/monthly/yearly)
- Update `<lastmod>` date


## Build Instructions

For Windows, use the batch file to watch for CSS changes:
- Double-click `watch.bat` to start Tailwind CSS in watch mode
- Or manually build: `tailwindcss-windows-x64.exe -i ./css/input.css -o ./css/output.css --minify`

## PageSpeed Optimizations (Completed 2026-01-08)

### Completed Improvements:

#### 1. WCAG Accessibility (100% Compliance)
- Fixed all contrast issues in footer.html, index.html, program-2025.html, barekraft.html
- Changed `text-white/40` → `text-white/70` for secondary labels
- Changed `text-white/60` → `text-white/80` for body text
- All text now meets WCAG AA standards (4.5:1 minimum contrast ratio)

#### 2. LCP (Largest Contentful Paint) Optimization
- Deferred canvas animation initialization in `js/hero-animation.js`
- Uses `requestIdleCallback` to delay animation until browser is idle
- Animation now loads after page content is visible
- Expected improvement: 4050ms → ~800-1200ms (75% faster)

#### 3. Render-Blocking Resources
- Implemented deferred CSS loading using preload technique
- Added DNS prefetch for Google Fonts
- Optimized font loading with async technique
- Standardized to essential font weights only (400, 700, 800)
- Expected improvement: 1350ms → ~200ms (85% reduction)

#### 4. Image Optimization
- Created Python script: `scripts/optimize-images.py`
- Converted 39 gallery images to WebP format
- Generated 3 responsive sizes per image:
  - Thumbnail: 400px (for gallery grid)
  - Medium: 1200px (for lightbox mobile/tablet)
  - Large: 2048px (for lightbox desktop)
- Updated `generate-gallery.sh` to generate `<picture>` elements with srcset
- Updated `js/lightbox.js` to load optimal image size based on viewport
- Added explicit width/height attributes to prevent CLS
- Image payload reduction: 24MB JPG → ~13MB WebP (47% savings)

#### 5. Browser Caching & Compression
- Added gzip/deflate compression in `.htaccess`
- Configured browser caching:
  - Images: 1 year cache
  - CSS/JS: 1 month cache
  - HTML: 1 hour cache
- Added Cache-Control headers for optimal performance

#### 6. CSS Enhancements
- Added aspect-ratio utilities in `css/input.css`
- All gallery images have `decoding="async"` attribute
- Prevents Cumulative Layout Shift (CLS)

### Files Modified:
- `footer.html` - Contrast fixes
- `index.html` - Contrast fixes, responsive images with picture elements
- `barekraft.html` - Contrast fixes, optimized font loading
- `program-2025.html` - Contrast fixes, optimized font loading
- `js/hero-animation.js` - Deferred animation initialization
- `js/lightbox.js` - Responsive image loading
- `generate-gallery.sh` - Generate picture elements with WebP srcsets
- `css/input.css` - Added aspect-ratio utilities
- `.htaccess` - Compression and caching headers

### New Files Created:
- `scripts/optimize-images.py` - Batch image optimization script
- `images/gallery/optimized/webp/` - 117 optimized WebP images (3 sizes × 39 images)

### Expected Performance Improvements:
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| LCP | 4050ms+ | ~800-1200ms | -75% |
| FCP | 1350ms+ | ~400-600ms | -60% |
| Images | 24MB JPG | ~13MB WebP | -47% |
| Render Blocking | 1350ms | ~200ms | -85% |
| CLS | Present | 0 | Eliminated |
| WCAG Contrast | 4 failures | 0 failures | 100% AA |

### How to Re-optimize Images:
If you add new images to `images/gallery/`, run:
```bash
python scripts/optimize-images.py
bash generate-gallery.sh
```
Then replace the gallery section in index.html with the generated content from gallery-items.html.

---

## Completed Features

- ✅ Removed Konferansesal image from gallery
- ✅ Created "Fjorårets program 2025" page (program-2025.html) with:
  - List of all 2025 speakers and participants
  - Detailed program schedule
  - Navigation links in footer and below gallery
- ✅ Added scroll-based fade effect for "Powered by SINTEF" logo
- ✅ Added frosted glass background effect to hero content
- ✅ SEO optimization:
  - Meta descriptions and keywords for all pages
  - Open Graph tags for social media sharing
  - Twitter Card tags
  - Favicon using EEF logo
  - Canonical URLs
  - robots.txt and sitemap.xml
  - Improved page titles
- ✅ PageSpeed performance optimization (see above section for details)
