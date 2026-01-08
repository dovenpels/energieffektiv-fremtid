// Lightbox functionality for image gallery
// Supports keyboard navigation, prev/next buttons, and captions

class Lightbox {
  constructor() {
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.getElementById('lightbox-image');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.closeBtn = document.getElementById('lightbox-close');
    this.prevBtn = document.getElementById('lightbox-prev');
    this.nextBtn = document.getElementById('lightbox-next');
    this.galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    this.currentIndex = 0;

    if (!this.lightbox || this.galleryItems.length === 0) {
      return;
    }

    this.init();
  }

  init() {
    // Add click listeners to all gallery items
    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.open(index);
      });
    });

    // Close button
    this.closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    // Previous button
    this.prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.prev();
    });

    // Next button
    this.nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.next();
    });

    // Click on image - check which side was clicked
    this.lightboxImage.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = this.lightboxImage.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const imageWidth = rect.width;

      // If clicked on left half - previous, right half - next
      if (clickX < imageWidth / 2) {
        this.prev();
      } else {
        this.next();
      }
    });

    // Click outside image (on backdrop) - close
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.close();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen()) return;

      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });

    // Touch swipe support (basic)
    let touchStartX = 0;
    let touchEndX = 0;

    this.lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  }

  open(index) {
    this.currentIndex = index;
    this.lightbox.classList.remove('hidden');
    this.lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
    this.loadImage();
  }

  close() {
    this.lightbox.classList.add('hidden');
    this.lightbox.classList.remove('flex');
    document.body.style.overflow = ''; // Restore body scroll
  }

  isOpen() {
    return !this.lightbox.classList.contains('hidden');
  }

  loadImage() {
    const item = this.galleryItems[this.currentIndex];
    const img = item.querySelector('img');
    const picture = item.querySelector('picture');
    const caption = item.querySelector('.caption');

    // Determine optimal image size based on viewport
    const viewportWidth = window.innerWidth;
    let imageSrc;

    if (picture) {
      // Get the WebP source element
      const webpSource = picture.querySelector('source[type="image/webp"]');

      if (webpSource && webpSource.srcset) {
        // Extract image paths from srcset - normalize whitespace first
        const srcsetNormalized = webpSource.srcset.replace(/\s+/g, ' ').trim();
        const srcsetParts = srcsetNormalized.split(',').map(s => s.trim());

        // Choose size based on viewport width
        if (viewportWidth < 1920) {
          // Use medium size (1200px) for smaller screens
          const mediumSrc = srcsetParts.find(s => s.includes('1200'));
          // Split from the end to handle filenames with spaces
          imageSrc = mediumSrc ? mediumSrc.substring(0, mediumSrc.lastIndexOf(' ')) : null;
        } else {
          // Use large size (2048px) for large screens
          const largeSrc = srcsetParts.find(s => s.includes('2048'));
          // Split from the end to handle filenames with spaces
          imageSrc = largeSrc ? largeSrc.substring(0, largeSrc.lastIndexOf(' ')) : null;
        }
      }
    }

    // Fallback to original JPG if WebP not available
    if (!imageSrc || imageSrc === '') {
      imageSrc = img.src;
    }

    // Load image
    this.lightboxImage.src = imageSrc;
    this.lightboxImage.alt = img.alt;

    // Load caption
    if (caption && caption.textContent.trim()) {
      this.lightboxCaption.textContent = caption.textContent;
      this.lightboxCaption.classList.remove('hidden');
    } else {
      this.lightboxCaption.classList.add('hidden');
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
    this.loadImage();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
    this.loadImage();
  }

  handleSwipe(startX, endX) {
    const threshold = 50; // Minimum swipe distance in pixels
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next image
        this.next();
      } else {
        // Swipe right - previous image
        this.prev();
      }
    }
  }
}

// Initialize lightbox when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
  });
} else {
  new Lightbox();
}
