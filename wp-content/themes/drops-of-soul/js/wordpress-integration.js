
/**
 * WordPress Integration Script for Drops of Soul
 * 
 * This file helps integrate the React components into a WordPress environment.
 * Add this to your theme's js directory and enqueue it in functions.php
 */

(function() {
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    // Find all React mount points in the WordPress site
    const mountPoints = document.querySelectorAll('.drops-of-soul-react-app');
    
    if (mountPoints.length > 0) {
      // If mount points exist, initialize React application
      mountPoints.forEach(mountPoint => {
        const componentType = mountPoint.getAttribute('data-component');
        
        // Import the React app dynamically
        import('./main.tsx')
          .then(module => {
            console.log('React app initialized for component: ' + componentType);
          })
          .catch(error => {
            console.error('Failed to load React application:', error);
          });
      });
    }
  });
})();
