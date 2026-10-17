// SiddhiXTech Interactive & Mobile Navigation Script
(function () {
  'use strict';

  // Highlight current page link
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPath === '') currentPath = 'index.html';

  var navLinks = document.querySelectorAll('header.nav nav a, footer a');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var targetPath = href.split('#')[0].split('/').pop();
    if (targetPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // Mobile navigation hamburger toggle
  var toggleBtn = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');

  if (toggleBtn && siteNav) {
    function toggleMenu(open) {
      var isExpanded = typeof open === 'boolean' ? open : !siteNav.classList.contains('active');
      toggleBtn.classList.toggle('active', isExpanded);
      siteNav.classList.toggle('active', isExpanded);
      toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      if (isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (siteNav.classList.contains('active') && !siteNav.contains(e.target) && e.target !== toggleBtn) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && siteNav.classList.contains('active')) {
        toggleMenu(false);
      }
    });

    // Close menu when a navigation link is clicked
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMenu(false);
      });
    });

    // Reset when resizing back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && siteNav.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  }
})();