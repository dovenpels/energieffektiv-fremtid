#!/bin/bash
# Auto-rebuild Tailwind CSS when files change
# Usage: ./watch.sh

echo "🎨 Watching for changes in HTML, CSS, and JS files..."
echo "Press Ctrl+C to stop"
echo ""

./tailwindcss -i ./css/input.css -o ./css/output.css --watch
