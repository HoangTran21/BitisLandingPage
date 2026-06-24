document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Bird Reveal Animation Trigger
    const journeySection = document.getElementById('journey');

    const birdObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                journeySection.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    if (journeySection) {
        birdObserver.observe(journeySection);
    }

    // GSAP Rhythm Journey Animation removed bird logic
    const fusionGallery = document.querySelector('.fusion-gallery');
    if (fusionGallery) {
        gsap.set(fusionGallery, { opacity: 1, y: 0, scale: 1 });
    }

    // GSAP Product Section Animation
    const productSectionEl = document.querySelector('#product');
    if (productSectionEl && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const productCards = document.querySelectorAll('.product-card');
        const footprints = document.querySelectorAll('.product-fp');

        gsap.timeline({
            scrollTrigger: {
                trigger: "#product",
                start: "top 70%",
                toggleActions: "play none none none"
            }
        })
            .set(".product-bird", { opacity: 0, left: "-200px" })
            .set(footprints, { opacity: 0, scale: 0.8 })
            .set(productCards, { opacity: 0, y: 30 })
            .to(".product-bird", {
                opacity: 1,
                left: "0%",
                duration: 0.8,
                ease: "power2.out"
            })
            // Reveal all footprints first (walking trail)
            .to(footprints, {
                opacity: 1,
                scale: 1,
                stagger: 0.2,
                duration: 0.4,
                ease: "back.out(1.7)"
            })
            // Bird starts flying across and "converting" footprints to cards
            .to(".product-bird", {
                left: "140%",
                duration: 5,
                ease: "none"
            }, "+=0.2")
            // Card 1 reveal
            .to(footprints[0], { opacity: 0, scale: 1.2, duration: 0.3 }, "-=4.6")
            .to(productCards[0], { opacity: 1, y: 0, duration: 0.5 }, "-=4.4")
            // Card 2 reveal
            .to(footprints[1], { opacity: 0, scale: 1.2, duration: 0.3 }, "-=3.2")
            .to(productCards[1], { opacity: 1, y: 0, duration: 0.5 }, "-=3.0")
            // Card 3 reveal
            .to(footprints[2], { opacity: 0, scale: 1.2, duration: 0.3 }, "-=1.8")
            .to(productCards[2], { opacity: 1, y: 0, duration: 0.5 }, "-=1.6")
            .to(".product-bird", {
                opacity: 0,
                duration: 0.5
            }, "-=0.5");
    }

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.querySelector('span') ? stat.querySelector('span').innerText : '';

        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: "top 85%",
            },
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            ease: "power2.out",
            onUpdate: function () {
                if (suffix) {
                    stat.innerHTML = Math.ceil(this.targets()[0].innerHTML) + `<span>${suffix}</span>`;
                }
            }
        });
    });

    // Add subtle dust motion on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.querySelectorAll('.fp-left, .fp-right').forEach((fp, index) => {
            const speed = 0.02 * (index + 1);
            const rotation = fp.classList.contains('fp-left') ? 10 : -10;
            fp.style.transform = `translateY(${scrolled * speed % 5}px) rotate(${rotation}deg)`;
        });
    });

    // Reveal on scroll animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .connection-item, section h2').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Custom CSS for intersection observer reveal
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    let currentLang = 'en';

    function switchLanguage(lang) {
        if (lang !== 'en' && lang !== 'vi') return;
        currentLang = lang;

        // Toggle language classes for modals and content blocks
        document.body.classList.toggle('lang-vi-active', lang === 'vi');

        // Apply Vietnamese Font style
        const mainHeading = document.querySelector('.main-heading');
        const cardTitles = document.querySelectorAll('.card-title');
        const nodes = document.querySelectorAll('.node');
        const tagline = document.querySelector('.tagline');
        
        if (lang === 'vi') {
            if (mainHeading) mainHeading.classList.add('vi-font');
            cardTitles.forEach(t => t.classList.add('vi-font'));
            nodes.forEach(n => n.classList.add('vi-font'));
            if (tagline) tagline.classList.add('vi-font');
        } else {
            if (mainHeading) mainHeading.classList.remove('vi-font');
            cardTitles.forEach(t => t.classList.remove('vi-font'));
            nodes.forEach(n => n.classList.remove('vi-font'));
            if (tagline) tagline.classList.remove('vi-font');
        }
    }

    // Attach event listener to EN|VI link
    const allLinks = document.querySelectorAll('a');
    let langLink = null;
    for (let link of allLinks) {
        if (link.textContent.includes('EN') && link.textContent.includes('VI')) {
            langLink = link;
            break;
        }
    }

    if (langLink) {
        langLink.style.cursor = 'pointer';
        langLink.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = currentLang === 'en' ? 'vi' : 'en';
            switchLanguage(newLang);
            langLink.textContent = newLang === 'en' ? 'EN | VI' : 'VI | EN';
        });
    }

    // Default to English on load
    switchLanguage('en');

    // Modal Logic
    const modalTriggers = document.querySelectorAll('.product-link, .card[data-modal]');
    const closeButtons = document.querySelectorAll('[data-close]');
    const allModals = document.querySelectorAll('.modal-overlay');

    modalTriggers.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Initialize carousel if this modal has one
                const carousel = targetModal.querySelector('.shoe-carousel');
                if (carousel && !carousel.dataset.initialized) {
                    initCarousel(carousel);
                }
            }
        });
    });

    function initCarousel(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.carousel-button-right');
        const prevButton = carousel.querySelector('.carousel-button-left');
        const dotsNav = carousel.querySelector('.carousel-nav');
        const dots = Array.from(dotsNav.children);

        // No need for setSlidePosition if using CSS flex and percentage transform
        // Just ensure the track has the right width or translation
        
        const moveToSlide = (track, currentSlide, targetSlide) => {
            const targetIndex = slides.indexOf(targetSlide);
            track.style.transform = `translateX(-${targetIndex * 100}%)`;
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };

        const updateDots = (currentDot, targetDot) => {
            currentDot.classList.remove('current-slide');
            targetDot.classList.add('current-slide');
        };

        const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
            if (targetIndex === 0) {
                prevButton.classList.add('is-hidden');
                nextButton.classList.remove('is-hidden');
            } else if (targetIndex === slides.length - 1) {
                prevButton.classList.remove('is-hidden');
                nextButton.classList.add('is-hidden');
            } else {
                prevButton.classList.remove('is-hidden');
                nextButton.classList.remove('is-hidden');
            }
        };

        // When I click left, move slides to the left
        prevButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling;
            const currentDot = dotsNav.querySelector('.current-slide');
            const prevDot = currentDot.previousElementSibling;
            const prevIndex = slides.findIndex(slide => slide === prevSlide);

            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
            hideShowArrows(slides, prevButton, nextButton, prevIndex);
        });

        // When I click right, move slides to the right
        nextButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            const currentDot = dotsNav.querySelector('.current-slide');
            const nextDot = currentDot.nextElementSibling;
            const nextIndex = slides.findIndex(slide => slide === nextSlide);

            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
            hideShowArrows(slides, prevButton, nextButton, nextIndex);
        });

        // When I click the nav indicators, move to that slide
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button');

            if (!targetDot) return;

            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(track, currentSlide, targetSlide);
            updateDots(currentDot, targetDot);
            hideShowArrows(slides, prevButton, nextButton, targetIndex);
        });

        // Add Zoom functionality
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                img.style.cursor = 'zoom-in';
                // Trigger zoom on image click
                img.onclick = (e) => {
                    e.stopPropagation();
                    console.log('Zooming image:', img.src);
                    openLightbox(img.src);
                };
            }
        });

        carousel.dataset.initialized = "true";
    }

    // Lightbox Logic
    function openLightbox(src) {
        let lightbox = document.getElementById('lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${src}" alt="Zoomed shoe">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', (e) => {
                if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
                    lightbox.classList.remove('active');
                }
            });
        } else {
            lightbox.querySelector('img').src = src;
        }
        
        // Use a tiny timeout to trigger transition
        setTimeout(() => {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Keep background locked
        }, 10);
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            allModals.forEach(modal => modal.classList.remove('active'));
            document.body.style.overflow = '';
        });
    });

    allModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Video Scroll Trigger Logic
    const journeyVideo = document.getElementById('journey-video');
    if (journeyVideo) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
                    journeyVideo.play();
                } else {
                    journeyVideo.pause();
                }
            });
        }, { 
            threshold: [0, 0.8] // Trigger when 80% is visible
        });

        videoObserver.observe(journeyVideo);
    }
});
