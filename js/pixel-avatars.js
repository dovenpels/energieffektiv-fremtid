// Pixel Avatar Generator
// Creates unique pixelated avatars based on names

class PixelAvatar {
  constructor(name, size = 64) {
    this.name = name;
    this.size = size;
    this.gridSize = 8; // 8x8 pixel grid
    this.colors = [
      '#7ac893', // Green
      '#5835e4', // Purple
      '#4b52ff', // Blue
      '#f2cc55', // Yellow
      '#e4586b'  // Red
    ];
  }

  // Simple hash function to generate consistent random values from name
  hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  // Get a seeded random number
  seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // Generate avatar pattern
  generatePattern() {
    const hash = this.hash(this.name);
    const pattern = [];

    // Generate symmetric pattern (mirror horizontally)
    for (let y = 0; y < this.gridSize; y++) {
      pattern[y] = [];
      for (let x = 0; x < Math.ceil(this.gridSize / 2); x++) {
        const seed = hash + y * this.gridSize + x;
        const random = this.seededRandom(seed);
        pattern[y][x] = random > 0.5 ? 1 : 0;
      }
      // Mirror the pattern
      for (let x = Math.ceil(this.gridSize / 2); x < this.gridSize; x++) {
        pattern[y][x] = pattern[y][this.gridSize - 1 - x];
      }
    }

    return pattern;
  }

  // Get color for this avatar
  getColor() {
    const hash = this.hash(this.name);
    return this.colors[hash % this.colors.length];
  }

  // Create canvas element with avatar
  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.size;
    canvas.height = this.size;
    const ctx = canvas.getContext('2d');

    const pattern = this.generatePattern();
    const color = this.getColor();
    const pixelSize = this.size / this.gridSize;

    // Background
    ctx.fillStyle = '#131313';
    ctx.fillRect(0, 0, this.size, this.size);

    // Draw pattern
    ctx.fillStyle = color;
    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        if (pattern[y][x]) {
          ctx.fillRect(
            x * pixelSize,
            y * pixelSize,
            pixelSize,
            pixelSize
          );
        }
      }
    }

    return canvas;
  }

  // Get data URL for use in img src
  getDataURL() {
    return this.createCanvas().toDataURL();
  }
}

// Initialize avatars when DOM is ready
function initializeAvatars() {
  const avatarElements = document.querySelectorAll('[data-avatar-name]');

  avatarElements.forEach(element => {
    const name = element.getAttribute('data-avatar-name');
    const size = parseInt(element.getAttribute('data-avatar-size') || '64');

    const avatar = new PixelAvatar(name, size);
    const img = document.createElement('img');
    img.src = avatar.getDataURL();
    img.alt = `${name} avatar`;
    img.className = 'w-full h-full';

    element.appendChild(img);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAvatars);
} else {
  initializeAvatars();
}
