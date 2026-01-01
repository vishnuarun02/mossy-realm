/**
 * MossyRealm Cabin Pages - Demo Interactivity
 * Simple vanilla JS for filter functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // === FILTER FUNCTIONALITY ===
  
  const filterTags = document.querySelectorAll('.filter-tag');
  const timelineEntries = document.querySelectorAll('.timeline-entry');
  const movieCards = document.querySelectorAll('.movie-card');
  
  filterTags.forEach(tag => {
    tag.addEventListener('click', function() {
      const filter = this.dataset.filter;
      const parent = this.closest('.filter-tags');
      
      // Update active state within the same filter group
      parent.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Filter timeline entries (Library page)
      if (timelineEntries.length > 0) {
        filterItems(timelineEntries, filter);
      }
      
      // Filter movie cards (Video Vault page)
      if (movieCards.length > 0) {
        filterItems(movieCards, filter);
      }
    });
  });
  
  function filterItems(items, filter) {
    items.forEach(item => {
      const tags = item.dataset.tags || '';
      
      if (filter === 'all') {
        item.style.display = '';
        item.style.opacity = '1';
      } else if (tags.includes(filter)) {
        item.style.display = '';
        item.style.opacity = '1';
      } else {
        item.style.opacity = '0.3';
        // Optional: completely hide non-matching items
        // item.style.display = 'none';
      }
    });
  }
  
  // === MOVIE CARD CLICK (placeholder for future modal/detail view) ===
  
  movieCards.forEach(card => {
    card.addEventListener('click', function() {
      const title = this.querySelector('.movie-title')?.textContent;
      console.log('Clicked:', title);
      // Future: Open modal with movie details
    });
    
    // Keyboard accessibility
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // === VHS SPINE HOVER EFFECT ===
  
  const vhsSpines = document.querySelectorAll('.vhs-spine');
  vhsSpines.forEach(spine => {
    spine.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(8px)';
    });
    spine.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });
  
});

