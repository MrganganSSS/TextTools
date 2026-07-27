/**
 * TextTools — Main JavaScript
 * Handles: mobile menu, smooth scrolling, search, scroll-to-top,
 *          active nav highlighting, and fade-in animations.
 */

(function () {
    'use strict';

    // ==================== DOM ELEMENTS ====================
    const navHamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const searchInput = document.getElementById('search-input');
    const scrollTopBtn = document.getElementById('scroll-top');
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const fadeElements = document.querySelectorAll('.fade-in');

    // ==================== MOBILE MENU TOGGLE ====================
    /**
     * Opens or closes the mobile navigation menu.
     * Also toggles the hamburger icon animation and aria state.
     */
    function toggleMobileMenu() {
        const isOpen = navMenu.classList.toggle('is-open');
        navHamburger.classList.toggle('is-active');
        navHamburger.setAttribute('aria-expanded', isOpen.toString());
    }

    /**
     * Closes the mobile menu (used when a link is clicked or
     * when the viewport is resized back to desktop).
     */
    function closeMobileMenu() {
        navMenu.classList.remove('is-open');
        navHamburger.classList.remove('is-active');
        navHamburger.setAttribute('aria-expanded', 'false');
    }

    navHamburger.addEventListener('click', toggleMobileMenu);

    // Close menu when a nav link is tapped
    navLinks.forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // ==================== SMOOTH SCROLLING ====================
    /**
     * Smoothly scrolls to the target element for anchor links.
     * The scroll-padding-top CSS property handles the header offset.
     */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==================== SEARCH INPUT HANDLING ====================
    /**
     * Dummy search handler.
     * In the future this will filter or navigate to tool pages.
     * For now, it logs the query and clears the input.
     */
    if (searchInput) {
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                var query = searchInput.value.trim();
                if (query) {
                    console.log('[TextTools Search] Query:', query);
                    searchInput.value = '';
                    searchInput.blur();
                }
            }
        });
    }

    // ==================== SCROLL TO TOP BUTTON ====================
    /**
     * Shows or hides the scroll-to-top button based on scroll position.
     * Appears after scrolling 400px down.
     */
    function handleScrollToTop() {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('is-visible');
        } else {
            scrollTopBtn.classList.remove('is-visible');
        }
    }

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', handleScrollToTop, { passive: true });

    // ==================== ACTIVE NAV HIGHLIGHTING ====================
    /**
     * Highlights the active navigation link based on the current
     * scroll position. Determines which section is in view and
     * updates the corresponding nav link.
     */
    function highlightActiveNav() {
        var scrollPosition = window.scrollY + 120;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav, { passive: true });

    // ==================== FADE-IN ANIMATIONS ====================
    /**
     * Uses IntersectionObserver to add a visible class to elements
     * with the .fade-in class when they enter the viewport.
     * This creates a subtle slide-up effect.
     */
    if ('IntersectionObserver' in window) {
        var fadeObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        fadeObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        fadeElements.forEach(function (el) {
            fadeObserver.observe(el);
        });
    } else {
        // Fallback: show all elements immediately
        fadeElements.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    // ==================== FAQ ACCORDION ====================
    /**
     * Handles FAQ accordion toggle behavior.
     * Clicking a question toggles its answer open/closed.
     */
    var faqItems = document.querySelectorAll('.tool-faq__item');
    faqItems.forEach(function (item) {
        var question = item.querySelector('.tool-faq__question');
        if (question) {
            question.addEventListener('click', function () {
                var isOpen = item.classList.contains('is-open');
                // Close all other FAQ items
                faqItems.forEach(function (otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('is-open');
                        var otherQ = otherItem.querySelector('.tool-faq__question');
                        if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
                    }
                });
                // Toggle current item
                item.classList.toggle('is-open');
                question.setAttribute('aria-expanded', (!isOpen).toString());
            });
        }
    });

    // ==================== INITIAL CALLS ====================
    highlightActiveNav();
    handleScrollToTop();

    // Re-observe new fade-in elements (for dynamically added content)
    if ('IntersectionObserver' in window) {
        var newFadeElements = document.querySelectorAll('.fade-in:not(.is-visible)');
        newFadeElements.forEach(function (el) {
            if (!el.dataset.observed) {
                fadeObserver.observe(el);
                el.dataset.observed = 'true';
            }
        });
    }

})();
