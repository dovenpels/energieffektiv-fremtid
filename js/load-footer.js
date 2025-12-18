// Load footer from external file
async function loadFooter() {
  try {
    const response = await fetch('./footer.html');
    const html = await response.text();
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = html;
    }
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}

// Load footer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadFooter);
} else {
  loadFooter();
}
