#!/usr/bin/env python3
"""
Image Optimization Script for Energieffektiv Fremtid
Converts JPG images to WebP format in multiple sizes for responsive loading
"""

import os
import sys
from pathlib import Path
from PIL import Image

# Configuration
SOURCE_DIR = Path("images/gallery")
OUTPUT_DIR = Path("images/gallery/optimized")
SIZES = {
    "thumb": 400,    # For gallery grid display
    "medium": 1200,  # For lightbox on mobile/tablet
    "large": 2048,   # For lightbox on desktop
}
WEBP_QUALITY = 85

def create_output_dirs():
    """Create output directory structure"""
    webp_dir = OUTPUT_DIR / "webp"
    webp_dir.mkdir(parents=True, exist_ok=True)
    return webp_dir

def get_image_files():
    """Get all JPG files from source directory"""
    if not SOURCE_DIR.exists():
        print(f"Error: Source directory '{SOURCE_DIR}' not found")
        sys.exit(1)

    images = list(SOURCE_DIR.glob("*.jpg")) + list(SOURCE_DIR.glob("*.JPG"))
    return sorted(images)

def optimize_image(image_path, webp_dir):
    """
    Convert a single image to WebP in multiple sizes

    Args:
        image_path: Path to source JPG image
        webp_dir: Path to WebP output directory
    """
    print(f"Processing: {image_path.name}")

    try:
        # Open original image
        with Image.open(image_path) as img:
            # Convert to RGB if necessary (remove alpha channel)
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')

            # Get original dimensions
            orig_width, orig_height = img.size

            # Generate each size variant
            for size_name, target_width in SIZES.items():
                # Skip if original is smaller than target
                if orig_width <= target_width and size_name != "large":
                    print(f"  Skipping {size_name} (original is smaller)")
                    continue

                # Calculate new dimensions maintaining aspect ratio
                if orig_width > target_width:
                    ratio = target_width / orig_width
                    new_width = target_width
                    new_height = int(orig_height * ratio)
                else:
                    new_width = orig_width
                    new_height = orig_height

                # Resize image
                resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

                # Generate output filename
                base_name = image_path.stem
                webp_filename = f"{base_name}-{target_width}.webp"
                webp_path = webp_dir / webp_filename

                # Save as WebP
                resized.save(webp_path, 'WEBP', quality=WEBP_QUALITY, method=6)

                # Get file size for reporting
                size_kb = webp_path.stat().st_size / 1024
                print(f"  OK {size_name}: {new_width}x{new_height} -> {size_kb:.1f} KB")

    except Exception as e:
        print(f"  ERROR Error processing {image_path.name}: {e}")
        return False

    return True

def main():
    """Main execution function"""
    print("=" * 70)
    print("Image Optimization Script - Energieffektiv Fremtid")
    print("=" * 70)
    print()

    # Create output directories
    print("Creating output directories...")
    webp_dir = create_output_dirs()
    print(f"OK Output directory: {OUTPUT_DIR}")
    print()

    # Get list of images
    images = get_image_files()
    total = len(images)

    if total == 0:
        print("No JPG images found in source directory")
        sys.exit(1)

    print(f"Found {total} images to process")
    print()

    # Process each image
    success_count = 0
    for idx, image_path in enumerate(images, 1):
        print(f"[{idx}/{total}] {image_path.name}")
        if optimize_image(image_path, webp_dir):
            success_count += 1
        print()

    # Summary
    print("=" * 70)
    print(f"Processing complete: {success_count}/{total} images optimized")

    # Calculate total size savings
    original_size = sum(img.stat().st_size for img in images)
    webp_size = sum(f.stat().st_size for f in webp_dir.glob("*.webp"))

    print(f"Original JPG size: {original_size / 1024 / 1024:.1f} MB")
    print(f"WebP total size: {webp_size / 1024 / 1024:.1f} MB")
    print(f"Savings: {(1 - webp_size / original_size) * 100:.1f}%")
    print("=" * 70)

if __name__ == "__main__":
    main()
