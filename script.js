/* ===============================a=================
   SULTAN BARRA - PORTFOLIO & CV DIGITAL
   JavaScript (Vanilla JS)
   ================================================ */

// ================================================
// Tunggu DOM selesai dimuat
// ================================================
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // TYPING ANIMATION
    // Menampilkan efek mengetik pada hero section
    // ============================================
    const typingElement = document.getElementById('typingText');
    const words = ['Student', 'Web Developer', 'Software Engineering Student', 'UI Designer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            // Menghapus karakter satu per satu
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Mengetik karakter satu per satu
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Jika kata sudah selesai diketik
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Jeda sebelum menghapus
            isDeleting = true;
        }

        // Jika kata sudah selesai dihapus
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Jeda sebelum mengetik kata baru
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Mulai efek mengetik
    typeEffect();

    // ============================================
    // NAVBAR - Efek blur saat scroll
    // ============================================
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ============================================
    // NAVBAR - Hamburger Menu (Mobile)
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Tutup menu saat nav link diklik
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // ============================================
    // NAVBAR - Active link saat scroll
    // ============================================
    const sections = document.querySelectorAll('section[id], header[id]');

    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ============================================
    // SMOOTH SCROLL untuk semua anchor links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // SCROLL REVEAL ANIMATION
    // Elemen muncul saat discroll menggunakan IntersectionObserver
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Berhenti mengamati setelah terungkap
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ============================================
    // SKILL PROGRESS BAR ANIMATION
    // Progress bar terisi saat masuk viewport
    // ============================================
    const skillFills = document.querySelectorAll('.skill-fill');

    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    skillFills.forEach(function (fill) {
        skillObserver.observe(fill);
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // PORTFOLIO MODAL
    // Menampilkan detail project dalam modal
    // ============================================
    const modal = document.getElementById('portfolioModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');

    // Data project untuk modal
    const projectData = [
        {
            img: './assets/gambar1.JPG',
            title: 'Website Biodata',
            desc: 'Website biodata pribadi yang menampilkan informasi diri secara modern dan responsif. Dibuat menggunakan HTML dan CSS dengan desain yang bersih dan user-friendly.',
            tags: ['SERTIFIKAT']
        },
        {
            img: 'https://picsum.photos/seed/web-portfolio/600/400',
            title: 'Website Portfolio',
            desc: 'Website portfolio personal untuk menampilkan karya dan pengalaman profesional. Dilengkapi dengan animasi halus dan tampilan yang elegan.',
            tags: ['HTML', 'CSS', 'JavaScript']
        },
        {
            img: 'https://picsum.photos/seed/web-login/600/400',
            title: 'Website Login',
            desc: 'Halaman login dengan desain modern dan fitur validasi form yang interaktif. Menggunakan PHP untuk backend authentication.',
            tags: ['HTML', 'CSS', 'PHP']
        },
        {
            img: 'https://picsum.photos/seed/web-school/600/400',
            title: 'Website Sekolah',
            desc: 'Website profil sekolah dengan informasi lengkap dan navigasi yang mudah dipahami. Dibangun menggunakan framework Laravel.',
            tags: ['HTML', 'CSS', 'Laravel']
        },
        {
            img: 'https://picsum.photos/seed/landing-modern/600/400',
            title: 'Landing Page Modern',
            desc: 'Landing page modern dengan desain minimalis, animasi halus, dan UX yang optimal. Cocok untuk promosi produk atau jasa.',
            tags: ['HTML', 'CSS', 'JavaScript']
        }
    ];

    // Event listener untuk tombol "Lihat Detail"
    const portfolioBtns = document.querySelectorAll('.portfolio-btn');
    portfolioBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const projectIndex = parseInt(this.getAttribute('data-project'));
            const project = projectData[projectIndex];

            modalImg.src = project.img;
            modalImg.alt = project.title;
            modalTitle.textContent = project.title;
            modalDesc.textContent = project.desc;

            // Render tags
            modalTags.innerHTML = '';
            project.tags.forEach(function (tag) {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = tag;
                modalTags.appendChild(span);
            });

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Tutup modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Tutup modal dengan tombol Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ============================================
    // CONTACT FORM HANDLER
    // Menampilkan pesan sukses saat form dikirim
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Tampilkan pesan sukses
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';

        // Reset form setelah 4 detik
        setTimeout(function () {
            contactForm.reset();
            contactForm.style.display = '';
            formSuccess.style.display = 'none';
        }, 4000);
    });

    // ============================================
    // COMBINE SCROLL EVENTS
    // Menggabungkan semua event scroll untuk performa
    // ============================================
    // Semua scroll handler sudah ditambahkan di atas
    // Menggunakan event listener terpisah untuk kode yang lebih bersih

}); // End DOMContentLoaded
