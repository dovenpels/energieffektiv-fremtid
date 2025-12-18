#!/bin/bash
# Start local web server
# Usage: ./serve.sh

echo "🌐 Starting local web server on http://localhost:8000"
echo "Press Ctrl+C to stop"
echo ""

python3 -m http.server 8000
