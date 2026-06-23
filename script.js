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

    // GSAP Rhythm Journey Animation
    const rhythmSection = document.querySelector('#rhythm.scroll-journey-container');
    if (rhythmSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const rhythmTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#rhythm",
                start: "top 65%",
                end: "bottom bottom",
                toggleActions: "play none none none"
            }
        })
            .set(".rhythm-container img", {
                opacity: 0,
                y: 20,
                scale: 0.985
            })
            .set(".sa-lac-bird", {
                opacity: 0,
                left: "-200px"
            })
            .set(".footprint", {
                opacity: 0,
                y: 0,
                scale: 1
            })
            .to(".sa-lac-bird", {
                opacity: 1,
                left: "8%",
                duration: 0.9,
                ease: "power2.out"
            })
            .to(".footprint", {
                opacity: 1,
                duration: 0.35,
                ease: "power2.out"
            }, "<")
            // slow, steady glide all the way offscreen, then vanish
            .to(".sa-lac-bird", {
                left: "140%",
                duration: 7,
                ease: "linear"
            })
            // once fully offscreen, fade bird then immediately hide footprints and show rhythm image
            .to(".sa-lac-bird", {
                opacity: 0,
                duration: 0.24,
                ease: "power2.in"
            })
            // remove footprints instantly and reveal main rhythm image at the same time
            .to(".footprint", {
                opacity: 0,
                duration: 0,
                stagger: 0,
                ease: "none"
            }, "<")
            .to(".rhythm-container img", {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            }, "<")
            ;
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

    document.querySelectorAll('.card, .product-card, .connection-item, section h2').forEach(el => {
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

    // Language Toggle Support - Vietnamese translations
    const translations = {
        en: {
            journeyHeading: "A STORY IN<br>MOTION",
            journeySubtitle: "From the coffee highlands of Vietnam to the vibrant streets of South Africa. Different places, same rhythm.",
            kmCaption: "10,433 KM<br>Across the<br>Indian Ocean",
            card1Title: "Coffee Highlands",
            card1Text: "Where millions of coffee beans are grown. And our story begins.",
            card2Title: "Coffee Grounds",
            card2Text: "What's left behind can still create something amazing.",
            card3Title: "GroundStep Technology",
            card3Text: "Recycled coffee grounds turned into a high-performance insole.",
            card4Title: "Geluk",
            card4Text: "Happiness in Afrikaans. A new word, same feeling.",
            card5Title: "Ubuntu",
            card5Text: "\"I am because we are.\" A philosophy that brings us together.",
            card6Title: "Cape Town Streets",
            card6Text: "New streets to walk. New stories to live. Same rhythm.",
            wordVN: "HẠNH PHÚC",
            wordAF: "GELUK",
            wordFromLang: "(VIETNAMESE)",
            wordToLang: "(AFRIKAANS)",
            tagline: "Different streets.<br>Same rhythm."
        },
        vi: {
            journeyHeading: "MỘT CÂU CHUYỆN<br>KHÔNG NGỪNG CHUYỂN ĐỘNG",
            journeySubtitle: "Từ những cao nguyên cà phê của Việt Nam đến những con phố sôi động của Nam Phi. Dẫu có khác biệt về địa lý, nhưng lại cùng chung một nhịp điệu.",
            kmCaption: "10,433 KM<br>Băng qua Ấn Độ<br>Dương",
            card1Title: "Cao nguyên cà phê",
            card1Text: "Nơi hàng triệu hạt cà phê được nuôi dưỡng mỗi năm, và cũng là nơi khởi đầu của từng bước chân",
            card2Title: "Bã cà phê",
            card2Text: "Những gì tưởng chừng bị bỏ lại phía sau vẫn có thể tạo nên những điều phi thường.",
            card3Title: "Công nghệ GroundStep™",
            card3Text: "Bã cà phê tái chế được chuyển hóa thành đế lót hiệu năng cao, nâng niu từng bước chân.",
            card4Title: "GELUK",
            card4Text: "\"Hạnh phúc\"",
            card5Title: "Ubuntu",
            card5Text: "\"Tôi tồn tại vì chúng ta tồn tại\" - Một triết lý đề cao sự gắn kết và sức mạnh của cộng đồng.",
            card6Title: "Đường phố Cape Town",
            card6Text: "Có những cung đường mới để khám phá, những câu chuyện mới để trải nghiệm, nhưng nhìn chung vẫn là cùng một nhịp điệu.",
            wordVN: "HẠNH PHÚC",
            wordAF: "GELUK",
            wordFromLang: "(TIẾNG VIỆT)",
            wordToLang: "(TIẾNG AFRIKAANS)",
            tagline: "Những con phố khác.<br>Nhưng cùng một nhịp điệu."
        }
    };

    let currentLang = 'en';

    function switchLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        localStorage.setItem('siteLanguage', lang);

        // Update heading
        const h1 = document.querySelector('.title-block h1');
        if (h1) h1.innerHTML = translations[lang].journeyHeading;

        // Update subtitle
        const subtitle = document.querySelector('.title-block .subtitle');
        if (subtitle) subtitle.textContent = translations[lang].journeySubtitle;

        // Update KM caption
        const kmCaption = document.querySelector('.km-caption');
        if (kmCaption) kmCaption.innerHTML = translations[lang].kmCaption;

        // Update cards
        const cards = document.querySelectorAll('.card');
        const cardKeys = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6'];
        cards.forEach((card, index) => {
            const key = cardKeys[index];
            const titleEl = card.querySelector('.card-title');
            const textEl = card.querySelector('.card-text');
            if (titleEl) titleEl.textContent = translations[lang][key + 'Title'];
            if (textEl) textEl.textContent = translations[lang][key + 'Text'];
        });

        // Update word swap
        const wordVN = document.querySelector('.word-vn');
        const wordAF = document.querySelector('.word-af');
        const wordLangs = document.querySelectorAll('.word-lang');
        if (wordVN) wordVN.textContent = translations[lang].wordVN;
        if (wordAF) wordAF.textContent = translations[lang].wordAF;
        if (wordLangs[0]) wordLangs[0].textContent = translations[lang].wordFromLang;
        if (wordLangs[1]) wordLangs[1].textContent = translations[lang].wordToLang;

        // Update tagline
        const tagline = document.querySelector('.tagline');
        if (tagline) tagline.innerHTML = translations[lang].tagline;
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

    // Restore saved language on page load
    const savedLang = localStorage.getItem('siteLanguage') || 'en';
    if (savedLang !== 'en') {
        switchLanguage(savedLang);
        if (langLink) {
            langLink.textContent = savedLang === 'en' ? 'EN | VI' : 'VI | EN';
        }
    }
});
