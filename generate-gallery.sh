#!/bin/bash
# Generate gallery HTML from images

cd "$(dirname "$0")"

echo "Generating gallery HTML..."

# Get all jpg files from gallery folder
images=(images/gallery/*.jpg)

# Start building HTML
html=""
index=0

for img in "${images[@]}"; do
  # Get filename without path
  filename=$(basename "$img")

  # Create alt text from filename
  alt="Energieffektiv Fremtid 2024 - $filename"

  # Add gallery item
  html+="        <div class=\"gallery-item group cursor-pointer overflow-hidden rounded-lg mb-4 md:mb-6 break-inside-avoid\" data-index=\"$index\">
          <img
            src=\"$img\"
            alt=\"$alt\"
            class=\"w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105\"
            loading=\"lazy\"
          />
        </div>

"

  ((index++))
done

# Output the HTML
echo "$html" > gallery-items.html
echo "✅ Generated gallery with $index images"
echo "Gallery HTML saved to gallery-items.html"
