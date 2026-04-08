// Ensure GSAP is loaded
document.addEventListener("DOMContentLoaded", (event) => {
    // Initialize Lenis
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Text Stagger Animation
    gsap.from(".anim-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
    });

    // 2. Navbar fade in
    gsap.from(".navbar", {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    // 3. Bottles Entrance Animation
    const t1 = gsap.timeline({ delay: 0.5 });

    // Center bottle enters first
    t1.from(".bottle-center", {
        y: 100,
        opacity: 0,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.2)"
    }, 0)

        // Left bottle enters
        .from(".bottle-left", {
            x: -100,
            y: 50,
            opacity: 0,
            rotation: -20,
            duration: 1,
            ease: "power3.out"
        }, 0.2)

        // Right bottle enters
        .from(".bottle-right", {
            x: 100,
            y: 50,
            opacity: 0,
            rotation: 25,
            duration: 1,
            ease: "power3.out"
        }, 0.4);

    // 3. Hero Image Entrance Animation
    gsap.from(".hero-bottles-img", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5
    });

    // 4. Hover effect on CTA Button
    const shopBtn = document.querySelector(".shop-btn");
    shopBtn.addEventListener("mouseenter", () => {
        gsap.to(shopBtn, { scale: 1.05, duration: 0.2, ease: "power1.out" });
    });
    shopBtn.addEventListener("mouseleave", () => {
        gsap.to(shopBtn, { scale: 1, duration: 0.2, ease: "power1.out" });
    });

    // 5. Play Button Hover effect
    // const playBtn = document.querySelector(".play-video-wrapper");
    // playBtn.addEventListener("mouseenter", () => {
    //     gsap.to(".play-btn", { scale: 1.1, backgroundColor: "#fff", duration: 0.3 });
    // });
    // playBtn.addEventListener("mouseleave", () => {
    //     gsap.to(".play-btn", { scale: 1, backgroundColor: "#fdf5e6", duration: 0.3 });
    // });

    // 6. Testimonials Carousel
    const track = document.querySelector('.testimonials-track');
    const originalCards = Array.from(document.querySelectorAll('.testimonial-card'));
    const nextBtn = document.querySelector('.control-btn.next');
    const prevBtn = document.querySelector('.control-btn.prev');
    const carouselWrapper = document.querySelector('.testimonials-carousel-wrapper');

    // Clone all cards twice (once before, once after) for a truly continuous effect
    originalCards.forEach(card => {
        const cloneBefore = card.cloneNode(true);
        const cloneAfter = card.cloneNode(true);
        track.insertBefore(cloneBefore, originalCards[0]);
        track.appendChild(cloneAfter);
    });

    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    let currentIndex = originalCards.length; // Start at the first real card
    let isTransitioning = false;

    function updateCarousel(instant = false) {
        const cardWidth = cards[0].offsetWidth + 30; // Width + gap
        const offset = - (currentIndex * cardWidth) + (window.innerWidth / 2) - (cardWidth / 2);

        if (instant) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        }

        track.style.transform = `translateX(${offset}px)`;

        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    function handleLoop() {
        isTransitioning = false;

        // If we hit the beginning of the triple-set
        if (currentIndex <= 0) {
            currentIndex = originalCards.length;
            updateCarousel(true);
        }
        // If we hit the end of the triple-set
        else if (currentIndex >= cards.length - 1) {
            currentIndex = originalCards.length - 1;
            updateCarousel(true);
        }
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateCarousel();
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updateCarousel();
    }

    track.addEventListener('transitionend', handleLoop);
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-play
    let autoPlay = setInterval(nextSlide, 2000);

    // Pause on hover
    carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carouselWrapper.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 5000));

    // Handle initial positioning
    // 7. Flavors Section Scroll Animation
    gsap.from(".flavors-header > *", {
        scrollTrigger: {
            trigger: ".flavors-section",
            start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    gsap.from(".flavor-card", {
        scrollTrigger: {
            trigger: ".flavors-container",
            start: "top 85%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scale: 0.95
    });

    // 8. Benefits Section Scroll Animation
    gsap.from(".benefits-header > *", {
        scrollTrigger: {
            trigger: ".benefits-section",
            start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
    });

    gsap.from(".grid-card", {
        scrollTrigger: {
            trigger: ".benefits-grid",
            start: "top 85%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scale: 0.98
    });

    // 9. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 10. Story Section Premium Horizontal Scroll
    const storySection = document.querySelector('.story-section');
    const timelineTrack = document.querySelector('.timeline-track');
    const scrollContainer = document.querySelector('.horizontal-scroll-container');
    const progressFill = document.querySelector('.progress-fill');

    if (storySection && timelineTrack) {
        // Calculate the amount to scroll
        const getScrollAmount = () => {
            let trackWidth = timelineTrack.scrollWidth;
            return -(trackWidth - window.innerWidth + 160); // 160 for padding
        };

        const storyTimeline = gsap.to(timelineTrack, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: ".story-section",
                start: "top top",
                end: () => `+=${storySection.offsetHeight}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Update progress bar
                    gsap.to(progressFill, { width: `${self.progress * 100}%`, duration: 0.1 });
                }
            }
        });

        // Animation for each card as it enters
        gsap.utils.toArray(".story-card").forEach((card, index) => {
            gsap.from(card.querySelector('.card-inner'), {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: storyTimeline, // Important for horizontal scroll
                    start: "left 90%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    // 11. FAQ Section Scroll Animation
    gsap.from(".faq-header > *", {
        scrollTrigger: {
            trigger: ".faq-section",
            start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    gsap.from(".faq-item", {
        scrollTrigger: {
            trigger: ".faq-accordion",
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
    });

    // Handle initial positioning
    window.addEventListener('resize', () => updateCarousel(true));
    updateCarousel(true);

});