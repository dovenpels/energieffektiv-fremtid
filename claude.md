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