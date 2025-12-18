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
      console.warn('Lightbox elements not found or no gallery items');
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
    this.loadImage();
    this.lightbox.classList.remove('hidden');
    this.lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
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
    const caption = item.querySelector('.caption');

    // Load image
    this.lightboxImage.src = img.src;
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
