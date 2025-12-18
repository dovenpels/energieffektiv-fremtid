// Swirl Halftone Animation
// Animated dot pattern with wave effects

class SwirlAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error(`Canvas with id "${canvasId}" not found`);
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.time = 0;
    this.animationId = null;
    this.isVisible = true;

    // Configuration - adapted for Energieffektiv Fremtid
    this.config = {
      backgroundColor: '#131313', // Dark base color
      dotColors: [
        '#7ac893', // Green
        '#5835e4', // Purple
        '#4b52ff', // Blue
        '#f2cc55', // Yellow
        '#e4586b'  // Red
      ],
      gridCols: 100,
      gridRows: 60,
      dotSize: 3.5,
      waveFrequency: 0.015,
      waveAmplitude: 8,
      animationSpeed: 0.02
    };

    this.init();
    this.setupVisibilityListener();
    this.setupResizeListener();
  }

  init() {
    this.resizeCanvas();
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    // Recalculate grid spacing
    this.spacingX = this.canvas.width / this.config.gridCols;
    this.spacingY = this.canvas.height / this.config.gridRows;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }

  // Calculate if dot should be visible based on distance from center
  shouldDrawDot(x, y) {
    const dx = x - this.centerX;
    const dy = y - this.centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Create wave pattern based on distance
    const wave = Math.sin(distance * this.config.waveFrequency - this.time) * this.config.waveAmplitude;

    // Add diagonal wave patterns from corners
    const diagonalWave1 = Math.sin((x + y) * 0.01 - this.time * 0.5) * 5;
    const diagonalWave2 = Math.sin((x - y) * 0.01 - this.time * 0.5) * 5;

    // Combine waves
    const combinedWave = wave + diagonalWave1 * 0.3 + diagonalWave2 * 0.3;

    // More dots in corners, fewer in center
    const maxDistance = Math.sqrt(this.centerX * this.centerX + this.centerY * this.centerY);
    const normalizedDist = distance / maxDistance;

    // Threshold varies with distance - higher threshold = fewer dots
    const threshold = 15 - (normalizedDist * 25);

    return combinedWave > threshold;
  }

  drawHalftone() {
    // Clear canvas
    this.ctx.fillStyle = this.config.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw dots with varying colors
    for (let row = 0; row < this.config.gridRows; row++) {
      for (let col = 0; col < this.config.gridCols; col++) {
        const x = col * this.spacingX + this.spacingX / 2;
        const y = row * this.spacingY + this.spacingY / 2;

        // Check if this dot should be drawn
        if (this.shouldDrawDot(x, y)) {
          // More random color selection using multiple noise sources
          const noiseX = Math.sin(x * 0.02 + this.time * 0.3) * Math.cos(y * 0.015);
          const noiseY = Math.cos(y * 0.02 - this.time * 0.2) * Math.sin(x * 0.018);
          const noiseTime = Math.sin(this.time * 0.5 + x * 0.01 + y * 0.01);

          // Combine noise sources for more randomness
          const combinedNoise = (noiseX + noiseY + noiseTime + 3) / 6; // Normalize to 0-1
          const colorIndex = Math.floor(combinedNoise * this.config.dotColors.length) % this.config.dotColors.length;

          this.ctx.fillStyle = this.config.dotColors[colorIndex];
          this.ctx.beginPath();
          this.ctx.arc(x, y, this.config.dotSize, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }

  animate() {
    if (!this.isVisible) return;

    this.time += this.config.animationSpeed;
    this.drawHalftone();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  setupVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;

      if (this.isVisible) {
        this.animate();
      } else {
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
        }
      }
    });
  }

  setupResizeListener() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resizeCanvas();
      }, 250);
    });
  }
}

// Initialize animation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SwirlAnimation('hero-canvas');
  });
} else {
  new SwirlAnimation('hero-canvas');
}
