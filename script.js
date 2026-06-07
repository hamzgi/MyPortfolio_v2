// DOM??濡쒕뱶???꾩뿉 ?ㅽ뻾
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded successfully!');

    // revealObserver瑜??곸쐞 踰붿쐞?먯꽌 ?뺤쓽 (?숈쟻 ?붿냼 愿李곗쓣 ?꾪븿)
    let revealObserver = null;

    // ==================== ?뚮쭏 ?좉? 湲곕뒫 ====================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    console.log('Theme toggle button:', themeToggle);

    // ?섏씠吏 濡쒕뱶 ????λ맂 ?뚮쭏 遺덈윭?ㅺ린
    const currentTheme = localStorage.getItem('theme') || 'dark';
    console.log('Current theme from localStorage:', currentTheme);

    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        updateThemeIcon();
        console.log('Light mode applied on page load');
    }

    // ?뚮쭏 ?좉? ?대깽??由ъ뒪??
    themeToggle.addEventListener('click', () => {
        console.log('Theme toggle clicked!');
        body.classList.toggle('light-mode');
        console.log('Body classes after toggle:', body.className);

        // ?뚮쭏 ?곹깭瑜?localStorage?????
        const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        console.log('Theme saved to localStorage:', theme);

        // ?꾩씠肄??낅뜲?댄듃
        updateThemeIcon();
    });

    // ?뚮쭏 ?꾩씠肄??낅뜲?댄듃 ?⑥닔
    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        console.log('Icon element:', icon);

        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            console.log('Switched to sun icon');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            console.log('Switched to moon icon');
        }
    }

    // ==================== 紐⑤컮??硫붾돱 ?좉? ====================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        // ?꾨쾭嫄?硫붾돱 ?대┃ ?대깽??
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // ?ㅻ퉬寃뚯씠??留곹겕 ?대┃ ??硫붾돱 ?먮룞 ?リ린
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // 硫붾돱 ?몃? ?대┃ ??硫붾돱 ?リ린
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ==================== ??댄븨 ?④낵 (Typewriter Effect) ====================
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const words = [
            "??媛쒕컻??怨듬??섍퀬 ?덈뒗 諛뺥삎吏꾩엯?덈떎.",
            "蹂댁븞怨??뱀쓣 ?щ옉?섎뒗 ??숈깮?낅땲??",
            "硫뗭웳?댁궗?먯쿂?쇱뿉???댁젙?곸쑝濡??쒕룞?섍퀬 ?덉뒿?덈떎.",
            "?ъ슜??以묒떖???쒕퉬?ㅻ? 怨좊??섎뒗 二쇰땲?댁엯?덈떎."
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                // ??湲?먯뵫 ??젣
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // ??湲?먯뵫 ??댄븨
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentWord.length) {
                // ?⑥뼱媛 紐⑤몢 ?묒꽦?섎㈃ 2珥덇컙 ?湲???吏?곌린 ?쒖옉
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // ?⑥뼱媛 紐⑤몢 吏?뚯?硫??ㅼ쓬 ?⑥뼱濡?蹂寃?
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // 珥덇린 ?쒖옉
        setTimeout(type, 500);
    }

    // ==================== 湲곗닠 ?ㅽ깮 ?ㅽ겕濡?寃뚯씠吏 ?좊땲硫붿씠??(Intersection Observer) ====================
    const progressBars = document.querySelectorAll('.skill-progress');
    if (progressBars.length > 0) {
        const observerOptions = {
            root: null, // viewport
            threshold: 0.1 // 10% ?몄텧 ???ㅽ뻾
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    // CSS 而ㅼ뒪? 蹂??--progress)??紐⑺몴移??좊떦 諛?visible ?대옒??異붽?
                    progressBar.style.setProperty('--progress', progress);
                    progressBar.classList.add('visible');
                    // ??踰??ㅽ뻾???꾩뿉??愿李?以묒?
                    observer.unobserve(progressBar);
                }
            });
        }, observerOptions);

        progressBars.forEach(bar => observer.observe(bar));
    }

    // ==================== ?꾨줈?앺듃 移댄뀒怨좊━ ?꾪꽣 湲곕뒫 ====================
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // ?≫떚釉??대옒??蹂寃?
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

    // ==================== GitHub API ?ㅼ떆媛??곕룞 (projects.html ?꾩슜) ====================
    const githubReposContainer = document.getElementById('github-repos');
    if (githubReposContainer) {
        const username = 'hamzgi';
        
        async function fetchGitHubRepos() {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
                if (!response.ok) {
                    throw new Error('GitHub API ?몄텧 ?ㅽ뙣');
                }
                const repos = await response.json();
                renderGitHubRepos(repos);
            } catch (error) {
                console.error('Error fetching repos:', error);
                githubReposContainer.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #ff4a5a;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <p>GitHub ??μ냼瑜?遺덈윭?ㅼ? 紐삵뻽?듬땲??</p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--text-secondary);">${error.message}</p>
                    </div>
                `;
            }
        }

        function renderGitHubRepos(repos) {
            if (repos.length === 0) {
                githubReposContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">怨듦컻????μ냼媛 ?놁뒿?덈떎.</p>`;
                return;
            }

            githubReposContainer.innerHTML = '';
            repos.forEach(repo => {
                const description = repo.description || '?ㅻ챸???묒꽦?섏? ?딆? ?덊룷吏?좊━?낅땲??';
                const language = repo.language || 'HTML/CSS';
                const stars = repo.stargazers_count;
                const forks = repo.forks_count;

                const cardHtml = `
                    <div class="github-repo-card reveal-element reveal-card-left">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="github-repo-title">
                            <i class="fab fa-github"></i> ${repo.name}
                        </a>
                        <p class="github-repo-desc">${description}</p>
                        <div class="github-repo-meta">
                            <span class="tag" style="padding: 0.2rem 0.6rem; font-size: 0.75rem; border-color: rgba(0, 212, 255, 0.3);">${language}</span>
                            <div class="github-repo-stats">
                                <span class="github-repo-stat"><i class="far fa-star"></i> ${stars}</span>
                                <span class="github-repo-stat"><i class="fas fa-code-branch"></i> ${forks}</span>
                            </div>
                        </div>
                    </div>
                `;
                githubReposContainer.insertAdjacentHTML('beforeend', cardHtml);
            });

            // ?숈쟻?쇰줈 ?앹꽦??GitHub ??μ냼 移대뱶 愿李?諛??ㅽ깭嫄??쒕젅??遺??
            if (revealObserver) {
                const newCards = githubReposContainer.querySelectorAll('.reveal-element');
                newCards.forEach((card, index) => {
                    card.style.transitionDelay = `${index * 150}ms`;
                    revealObserver.observe(card);
                });
            }
        }

        fetchGitHubRepos();
    }

    // ==================== LocalStorage 諛⑸챸濡?(Guestbook) CRUD 援ы쁽 ====================
    const guestbookForm = document.getElementById('guestbookForm');
    const guestbookList = document.getElementById('guestbookList');

    if (guestbookForm && guestbookList) {
        // 硫붿떆吏 濡쒕뱶 諛??뚮뜑留?
        function loadGuestbook() {
            const messages = JSON.parse(localStorage.getItem('guestbook_messages')) || [];
            
            if (messages.length === 0) {
                guestbookList.innerHTML = `
                    <div style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                        ?꾩쭅 ?깅줉??諛⑸챸濡앹씠 ?놁뒿?덈떎. 泥?留덈뵒瑜??④꺼蹂댁꽭??
                    </div>
                `;
                return;
            }

            guestbookList.innerHTML = '';
            // 理쒖떊湲???꾨줈 ?ㅻ룄濡???닚 異쒕젰
            messages.slice().reverse().forEach((msg) => {
                const card = document.createElement('div');
                card.className = 'guest-card';
                card.innerHTML = `
                    <div class="guest-card-header">
                        <div>
                            <span class="guest-name">${escapeHTML(msg.name)}</span>
                            <span class="guest-date">${msg.date}</span>
                        </div>
                        <button class="btn-delete-guest" data-id="${msg.id}" title="??젣">
                            <i class="fas fa-trash-alt"></i> ??젣
                        </button>
                    </div>
                    <div class="guest-content">${escapeHTML(msg.message)}</div>
                `;
                guestbookList.appendChild(card);
            });

            // ??젣 踰꾪듉 ?대깽???깅줉
            const deleteButtons = guestbookList.querySelectorAll('.btn-delete-guest');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.currentTarget.getAttribute('data-id');
                    deleteGuestbookItem(id);
                });
            });
        }

        // HTML ?댁뒪耳?댄봽 ?⑥닔 (XSS 諛⑹?)
        function escapeHTML(str) {
            return str.replace(/[&<>'"]/g, 
                tag => ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    "'": '&#39;',
                    '"': '&quot;'
                }[tag] || tag)
            );
        }

        // 諛⑸챸濡??깅줉
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('guestName');
            const passwordInput = document.getElementById('guestPassword');
            const messageInput = document.getElementById('guestMessage');

            const newMsg = {
                id: Date.now().toString(),
                name: nameInput.value.trim(),
                password: passwordInput.value,
                message: messageInput.value.trim(),
                date: new Date().toLocaleDateString('ko-KR') + ' ' + new Date().toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' })
            };

            const messages = JSON.parse(localStorage.getItem('guestbook_messages')) || [];
            messages.push(newMsg);
            localStorage.setItem('guestbook_messages', JSON.stringify(messages));

            // ?낅젰 ?꾨뱶 珥덇린??
            nameInput.value = '';
            passwordInput.value = '';
            messageInput.value = '';

            loadGuestbook();
        });

        // 諛⑸챸濡???젣
        function deleteGuestbookItem(id) {
            const inputPassword = prompt('諛⑸챸濡??묒꽦 ???낅젰??鍮꾨?踰덊샇瑜??낅젰?댁＜?몄슂:');
            if (inputPassword === null) return;

            const messages = JSON.parse(localStorage.getItem('guestbook_messages')) || [];
            const targetIndex = messages.findIndex(msg => msg.id === id);

            if (targetIndex === -1) {
                alert('?대떦 諛⑸챸濡앹쓣 李얠쓣 ???놁뒿?덈떎.');
                return;
            }

            if (messages[targetIndex].password === inputPassword) {
                messages.splice(targetIndex, 1);
                localStorage.setItem('guestbook_messages', JSON.stringify(messages));
                alert('??젣?섏뿀?듬땲??');
                loadGuestbook();
            } else {
                alert('鍮꾨?踰덊샇媛 ?щ컮瑜댁? ?딆뒿?덈떎.');
            }
        }

        // 珥덇린 濡쒕뱶 ?ㅽ뻾
        loadGuestbook();
    }

    // ==================== Back to Top (留??꾨줈 媛湲? 踰꾪듉 ====================
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== Scrollspy (?ㅽ겕濡ㅼ뿉 ?곕Ⅸ ?쒖꽦 硫붾돱 ?쒖떆) ====================
    const isMainPage = document.getElementById('home') && document.querySelector('.hero');
    if (isMainPage) {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 100;
                const sectionId = current.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
                    if (activeLink) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        activeLink.classList.add('active');
                    }
                }
            });
        });
    }

    // ==================== ?ㅽ겕濡?Reveal ?좊땲硫붿씠??(Intersection Observer) ====================
    const revealElements = document.querySelectorAll('.reveal-element');
    
    if (revealElements.length > 0) {
        // 洹몃９ ?붿냼(?ㅽ꺈 移대뱶, ?ㅽ궗 移대뱶, ?꾨줈?앺듃 移대뱶 ????????쒖감???쒕젅??Stagger) ?먮룞 ?ㅼ젙
        const revealGroups = document.querySelectorAll('.about-stats, .skills-grid, .projects-grid, .contact-methods');
        revealGroups.forEach(group => {
            const children = group.querySelectorAll('.reveal-element');
            children.forEach((child, index) => {
                if (!child.style.transitionDelay) {
                    child.style.transitionDelay = `${index * 150}ms`;
                }
            });
        });

        // Intersection Observer ?듭뀡 ?ㅼ젙
        const revealObserverOptions = {
            root: null, // viewport
            threshold: 0.1, // 10% ?몄텧 ???ㅽ뻾
            rootMargin: '0px 0px -40px 0px' // ?붾㈃ ?섎떒???꾨떖?섍린 ?쎄컙 ?꾩뿉 媛먯?
        };

        revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    // ?ㅽ겕濡ㅼ뿉??踰쀬뼱?ъ쓣 ??(?щ씪媛嫄곕굹 ?대젮媛???붾㈃ 諛뽰쑝濡??섍컮???? ?곹깭 珥덇린??
                    entry.target.classList.remove('revealed');
                }
            });
        }, revealObserverOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ==================== ?먭꺽利?/ ?ㅽ궗 諭껋? 紐⑤떖 ?쒖뼱 ====================
    const placeholders = document.querySelectorAll('.badge-image-placeholder');
    const modal = document.getElementById('credentialModal');
    
    if (placeholders.length > 0 && modal) {
        const modalImg = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalIssuer = document.getElementById('modalIssuer');
        const modalDate = document.getElementById('modalDate');
        const modalDesc = document.getElementById('modalDescription');
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = modal.querySelector('.modal-overlay');

        placeholders.forEach(placeholder => {
            placeholder.addEventListener('click', () => {
                // ?대┃ ???대떦 ?붿냼??data ?띿꽦 ?쎄린
                const title = placeholder.getAttribute('data-title') || '';
                const issuer = placeholder.getAttribute('data-issuer') || '';
                const date = placeholder.getAttribute('data-date') || '';
                const desc = placeholder.getAttribute('data-description') || '';
                
                // ?대?吏 ?쒓렇?먯꽌 src? alt ?쎄린
                const img = placeholder.querySelector('img');
                const imgSrc = img ? img.getAttribute('src') : '';
                const imgAlt = img ? img.getAttribute('alt') : '';

                // 紐⑤떖 ?댁슜 梨꾩슦湲?
                if (modalImg) {
                    modalImg.src = imgSrc;
                    modalImg.alt = imgAlt;
                }
                if (modalTitle) modalTitle.textContent = title;
                if (modalIssuer) modalIssuer.textContent = issuer;
                if (modalDate) modalDate.textContent = date;
                if (modalDesc) modalDesc.textContent = desc;

                // 紐⑤떖 ?쒖꽦??諛?body ?ㅽ겕濡?諛⑹?
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // 紐⑤떖 ?リ린 湲곕뒫 ?⑥닔
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // ?リ린 踰꾪듉 ?대┃
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // ?ㅻ쾭?덉씠 ?곸뿭 ?대┃
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        // ESC ???낅젰 ???リ린
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});



/* ============================================
   SLIDESHOW LOGIC (teampj.html)
   ============================================ */
(function () {
    const track = document.getElementById('slideshowTrack');
    if (!track) return; // teampj.html 외 페이지에서는 실행 안 함

    const slides = Array.from(track.querySelectorAll('.slide'));
    const dots   = Array.from(document.querySelectorAll('.slide-dot'));
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');

    let current = 0;
    let autoTimer = null;
    const AUTO_DELAY = 4000;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(() => goTo(current + 1), AUTO_DELAY);
    }

    function stopAuto() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goTo(parseInt(dot.dataset.index, 10));
            startAuto();
        });
    });

    // 터치/스와이프 지원
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            goTo(diff > 0 ? current + 1 : current - 1);
            startAuto();
        }
    }, { passive: true });

    // 마우스 오버 시 자동 재생 일시정지
    const wrapper = track.closest('.slideshow-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', stopAuto);
        wrapper.addEventListener('mouseleave', startAuto);
    }

    startAuto();
})();
