#!/bin/bash
# Generate gallery HTML with modern responsive images (WebP + fallback)

cd "$(dirname "$0")"

echo "Generating gallery HTML with responsive images..."

# Get all jpg files from gallery folder
images=(images/gallery/*.jpg)

# Start building HTML
html=""
index=0

for img in "${images[@]}"; do
  # Get filename without path and extension
  filename=$(basename "$img")
  basename_noext="${filename%.*}"

  # Create alt text
  alt="Energieffektiv Fremtid 2024"

  # WebP paths
  webp_thumb="images/gallery/optimized/webp/${basename_noext}-400.webp"
  webp_medium="images/gallery/optimized/webp/${basename_noext}-1200.webp"
  webp_large="images/gallery/optimized/webp/${basename_noext}-2048.webp"

  # Add gallery item with picture element
  html+="        <div class=\"gallery-item group cursor-pointer overflow-hidden rounded-lg mb-4 md:mb-6 break-inside-avoid\" data-index=\"$index\">
          <picture>
            <source
              type=\"image/webp\"
              srcset=\"${webp_thumb} 400w,
                      ${webp_medium} 1200w,
                      ${webp_large} 2048w\"
              sizes=\"(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw\">
            <img
              src=\"$img\"
              alt=\"$alt\"
              width=\"600\"
              height=\"400\"
              class=\"w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105\"
              loading=\"lazy\"
              decoding=\"async\"
            />
          </picture>
        </div>

"

  ((index++))
done

# Output the HTML
echo "$html" > gallery-items.html
echo "OK Generated gallery with $index images (WebP + JPG fallback)"
echo "Gallery HTML saved to gallery-items.html"
