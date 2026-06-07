// DOM이 로드된 후에 실행
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded successfully!');

    // revealObserver를 상위 범위에서 정의 (동적 요소 관찰을 위함)
    let revealObserver = null;

    // ==================== 테마 토글 기능 ====================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    console.log('Theme toggle button:', themeToggle);

    // 페이지 로드 시 저장된 테마 불러오기
    const currentTheme = localStorage.getItem('theme') || 'dark';
    console.log('Current theme from localStorage:', currentTheme);

    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        updateThemeIcon();
        console.log('Light mode applied on page load');
    }

    // 테마 토글 이벤트 리스너
    themeToggle.addEventListener('click', () => {
        console.log('Theme toggle clicked!');
        body.classList.toggle('light-mode');
        console.log('Body classes after toggle:', body.className);

        // 테마 상태를 localStorage에 저장
        const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        console.log('Theme saved to localStorage:', theme);

        // 아이콘 업데이트
        updateThemeIcon();
    });

    // 테마 아이콘 업데이트 함수
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

    // ==================== 모바일 메뉴 토글 ====================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        // 햄버거 메뉴 클릭 이벤트
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 네비게이션 링크 클릭 시 메뉴 자동 닫기
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // 메뉴 외부 클릭 시 메뉴 닫기
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ==================== 타이핑 효과 (Typewriter Effect) ====================
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const words = [
            "웹 개발을 공부하고 있는 박형진입니다.",
            "보안과 웹을 사랑하는 대학생입니다.",
            "멋쟁이사자처럼에서 열정적으로 활동하고 있습니다.",
            "사용자 중심의 서비스를 고민하는 주니어입니다."
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                // 한 글자씩 삭제
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // 한 글자씩 타이핑
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentWord.length) {
                // 단어가 모두 작성되면 2초간 대기 후 지우기 시작
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // 단어가 모두 지워지면 다음 단어로 변경
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // 초기 시작
        setTimeout(type, 500);
    }

    // ==================== 기술 스택 스크롤 게이지 애니메이션 (Intersection Observer) ====================
    const progressBars = document.querySelectorAll('.skill-progress');
    if (progressBars.length > 0) {
        const observerOptions = {
            root: null, // viewport
            threshold: 0.1 // 10% 노출 시 실행
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    // CSS 커스텀 변수(--progress)에 목표치 할당 및 visible 클래스 추가
                    progressBar.style.setProperty('--progress', progress);
                    progressBar.classList.add('visible');
                    // 한 번 실행된 후에는 관찰 중지
                    observer.unobserve(progressBar);
                }
            });
        }, observerOptions);

        progressBars.forEach(bar => observer.observe(bar));
    }

    // ==================== 프로젝트 카테고리 필터 기능 ====================
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 액티브 클래스 변경
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

    // ==================== GitHub API 실시간 연동 (projects.html 전용) ====================
    const githubReposContainer = document.getElementById('github-repos');
    if (githubReposContainer) {
        const username = 'hamzgi';
        
        async function fetchGitHubRepos() {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
                if (!response.ok) {
                    throw new Error('GitHub API 호출 실패');
                }
                const repos = await response.json();
                renderGitHubRepos(repos);
            } catch (error) {
                console.error('Error fetching repos:', error);
                githubReposContainer.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #ff4a5a;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <p>GitHub 저장소를 불러오지 못했습니다.</p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--text-secondary);">${error.message}</p>
                    </div>
                `;
            }
        }

        function renderGitHubRepos(repos) {
            if (repos.length === 0) {
                githubReposContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">공개된 저장소가 없습니다.</p>`;
                return;
            }

            githubReposContainer.innerHTML = '';
            repos.forEach(repo => {
                const description = repo.description || '설명이 작성되지 않은 레포지토리입니다.';
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

            // 동적으로 생성된 GitHub 저장소 카드 관찰 및 스태거 딜레이 부여
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

    // ==================== 티스토리 블로그 글 (정적 데이터 - RSS 기반) ====================
    // 티스토리가 외부 서버의 RSS 접근을 차단하므로, RSS에서 직접 파싱한 데이터를 내장합니다.
    // 새 글을 작성하면 아래 TISTORY_POSTS 배열 맨 앞에 항목을 추가하세요.
    const tistoryPostsContainer = document.getElementById('tistory-posts');
    const tistoryFilters = document.getElementById('tistory-filters');

    if (tistoryPostsContainer) {
        const TISTORY_POSTS = [
            {
                title: '[구글 스터디잼] App Engine: Qwik Start - Python',
                link: 'https://hamzgi.tistory.com/15',
                date: '2026년 5월 4일',
                summary: '이 실습에서는 Python 앱으로 클론/다운로드, 테스트, 업데이트, 배포 작업을 수행하는 방법을 알아봅니다. GCP를 이용하여 파이썬 앱을 배포해봤는데 서버구축 및 운영실습 수업시간 때 배웠던 리눅스 명령어나 깃 공부했던게 여기서도 쓰였습니다.',
                categories: ['Google-Studyjam [with GCP]', 'Cloud', 'gcp', '스터디잼']
            },
            {
                title: '[구글 스터디잼] Cloud Storage: Qwik Start - Google Cloud 콘솔',
                link: 'https://hamzgi.tistory.com/14',
                date: '2026년 4월 28일',
                summary: '중급 난이도 실습을 해보다가 너무 복잡해서 GCP의 기초부터 배우기 위해 Standard-Infra 부터 공부를 시작했습니다. 버킷 만들기, 객체 업로드, 공개 공유, 폴더 생성 등을 실습했습니다.',
                categories: ['Google-Studyjam [with GCP]', 'Cloud', 'gcp', '스터디잼']
            },
            {
                title: '[Python] 문자열 뒤집기 - 슬라이싱으로 해결하기',
                link: 'https://hamzgi.tistory.com/10',
                date: '2025년 10월 27일',
                summary: '문자열을 뒤집는 방법 중 가장 간결한 슬라이싱([::-1]) 방식을 정리했습니다. 리스트로 바꿔서 뒤집는 방법도 있지만 꼭 필요한 경우에만 사용하고, 내장 타입 이름은 변수로 쓰지 않아야 합니다.',
                categories: ['기초부터 시작하는 Programmers!']
            },
            {
                title: '무엇을 하는 곳인고?',
                link: 'https://hamzgi.tistory.com/8',
                date: '2025년 10월 27일',
                summary: '백준 문제를 풀다가 프로그래머스에 오랜만에 다시 들어와서 문제를 풀어봤습니다. 웹에서 직접 코드를 실행하며 오답인지 정답인지 바로 확인할 수 있어 좋았습니다. 앞으로 공부했던 내용을 블로그에 기록할 계획입니다.',
                categories: ['기초부터 시작하는 Programmers!']
            },
            {
                title: '백준 10430 나머지',
                link: 'https://hamzgi.tistory.com/6',
                date: '2025년 10월 22일',
                summary: '(A+B)%C와 ((A%C)+(B%C))%C가 같은지 확인하는 문제입니다. map()과 split()을 함께 사용하는 입력 방식과 다양한 대안적 접근법을 정리했습니다. 같은 정답이라도 코드를 구성하는 방법은 다양합니다.',
                categories: ['기초부터 시작하는 백준 풀이!']
            },
            {
                title: '백준 2739번 - 구구단',
                link: 'https://hamzgi.tistory.com/4',
                date: '2025년 10월 15일',
                summary: 'N을 입력받아 구구단 N단을 출력하는 문제입니다. for문에서 반복 변수를 직접 수정하는 실수를 겪고, range(1,10)을 사용하는 깔끔한 방식으로 정답을 도출했습니다. 코드를 자주 최적화하는 습관의 중요성을 배웠습니다.',
                categories: ['기초부터 시작하는 백준 풀이!']
            },
            {
                title: '백준 10926번 - ??!',
                link: 'https://hamzgi.tistory.com/3',
                date: '2025년 10월 14일',
                summary: '사용자가 입력한 아이디 뒤에 "??!"를 붙여 출력하는 문제입니다. input() 안에 프롬프트 문구를 넣으면 백준에서 오답 처리된다는 점을 배웠습니다. 기초 문제라도 형식을 정확히 맞추는 것이 중요합니다.',
                categories: ['기초부터 시작하는 백준 풀이!']
            }
        ];

        let allPosts = TISTORY_POSTS;
        let activeCategory = 'all';

        function buildCategoryFilters(posts) {
            if (!tistoryFilters) return;
            const categorySet = new Set();
            posts.forEach(p => p.categories.forEach(c => { if (c) categorySet.add(c); }));

            tistoryFilters.innerHTML = '<button class="btn-filter active" data-category="all">전체</button>';
            categorySet.forEach(cat => {
                const btn = document.createElement('button');
                btn.className = 'btn-filter';
                btn.setAttribute('data-category', cat);
                btn.textContent = cat;
                tistoryFilters.appendChild(btn);
            });

            tistoryFilters.querySelectorAll('.btn-filter').forEach(btn => {
                btn.addEventListener('click', () => {
                    tistoryFilters.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    activeCategory = btn.getAttribute('data-category');
                    const filtered = activeCategory === 'all'
                        ? allPosts
                        : allPosts.filter(p => p.categories.includes(activeCategory));
                    renderTistoryPosts(filtered);
                });
            });
        }

        function renderTistoryPosts(posts) {
            tistoryPostsContainer.innerHTML = '';

            if (posts.length === 0) {
                tistoryPostsContainer.innerHTML = `
                    <p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 2rem;">
                        해당 카테고리의 글이 없습니다.
                    </p>`;
                return;
            }

            const directions = ['reveal-card-left', 'reveal-card-right'];
            const icons = ['fa-pen-nib', 'fa-book-open', 'fa-lightbulb', 'fa-star', 'fa-flask', 'fa-code'];

            posts.forEach((post, index) => {
                const tagsHtml = post.categories.map(cat =>
                    `<span class="tag">${cat}</span>`
                ).join('');
                const iconClass = icons[index % icons.length];
                const dir = directions[index % 2];

                const cardHtml = `
                    <div class="project-card reveal-element ${dir}" data-tistory-post>
                        <div class="project-image">
                            <i class="fas ${iconClass}"></i>
                        </div>
                        <div class="project-content">
                            <h3 style="font-size: 1.1rem; line-height: 1.5;">${post.title}</h3>
                            <p style="font-size: 0.9rem;">${post.summary}</p>
                            <div class="project-tags">
                                ${tagsHtml || '<span class="tag">블로그</span>'}
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                                <span style="font-size: 0.8rem; color: var(--text-secondary);">
                                    <i class="fas fa-calendar-alt" style="margin-right: 0.3rem;"></i>${post.date}
                                </span>
                                <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                                    글 읽기
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                tistoryPostsContainer.insertAdjacentHTML('beforeend', cardHtml);
            });

            if (revealObserver) {
                const newCards = tistoryPostsContainer.querySelectorAll('.reveal-element');
                newCards.forEach((card, i) => {
                    card.style.transitionDelay = `${i * 100}ms`;
                    revealObserver.observe(card);
                });
            }
        }

        // 즉시 렌더링 (API 없이 정적 데이터 사용)
        buildCategoryFilters(allPosts);
        renderTistoryPosts(allPosts);
    }

    // ==================== LocalStorage 방명록 (Guestbook) CRUD 구현 ====================
    const guestbookForm = document.getElementById('guestbookForm');
    const guestbookList = document.getElementById('guestbookList');

    if (guestbookForm && guestbookList) {
        // 메시지 로드 및 렌더링
        function loadGuestbook() {
            const messages = JSON.parse(localStorage.getItem('guestbook_messages')) || [];
            
            if (messages.length === 0) {
                guestbookList.innerHTML = `
                    <div style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                        아직 등록된 방명록이 없습니다. 첫 마디를 남겨보세요!
                    </div>
                `;
                return;
            }

            guestbookList.innerHTML = '';
            // 최신글이 위로 오도록 역순 출력
            messages.slice().reverse().forEach((msg) => {
                const card = document.createElement('div');
                card.className = 'guest-card';
                card.innerHTML = `
                    <div class="guest-card-header">
                        <div>
                            <span class="guest-name">${escapeHTML(msg.name)}</span>
                            <span class="guest-date">${msg.date}</span>
                        </div>
                        <button class="btn-delete-guest" data-id="${msg.id}" title="삭제">
                            <i class="fas fa-trash-alt"></i> 삭제
                        </button>
                    </div>
                    <div class="guest-content">${escapeHTML(msg.message)}</div>
                `;
                guestbookList.appendChild(card);
            });

            // 삭제 버튼 이벤트 등록
            const deleteButtons = guestbookList.querySelectorAll('.btn-delete-guest');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.currentTarget.getAttribute('data-id');
                    deleteGuestbookItem(id);
                });
            });
        }

        // HTML 이스케이프 함수 (XSS 방지)
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

        // 방명록 등록
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

            // 입력 필드 초기화
            nameInput.value = '';
            passwordInput.value = '';
            messageInput.value = '';

            loadGuestbook();
        });

        // 방명록 삭제
        function deleteGuestbookItem(id) {
            const inputPassword = prompt('방명록 작성 시 입력한 비밀번호를 입력해주세요:');
            if (inputPassword === null) return;

            const messages = JSON.parse(localStorage.getItem('guestbook_messages')) || [];
            const targetIndex = messages.findIndex(msg => msg.id === id);

            if (targetIndex === -1) {
                alert('해당 방명록을 찾을 수 없습니다.');
                return;
            }

            if (messages[targetIndex].password === inputPassword) {
                messages.splice(targetIndex, 1);
                localStorage.setItem('guestbook_messages', JSON.stringify(messages));
                alert('삭제되었습니다.');
                loadGuestbook();
            } else {
                alert('비밀번호가 올바르지 않습니다.');
            }
        }

        // 초기 로드 실행
        loadGuestbook();
    }

    // ==================== Back to Top (맨 위로 가기) 버튼 ====================
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

    // ==================== Scrollspy (스크롤에 따른 활성 메뉴 표시) ====================
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

    // ==================== 스크롤 Reveal 애니메이션 (Intersection Observer) ====================
    const revealElements = document.querySelectorAll('.reveal-element');
    
    if (revealElements.length > 0) {
        // 그룹 요소(스탯 카드, 스킬 카드, 프로젝트 카드 등)에 대해 순차적 딜레이(Stagger) 자동 설정
        const revealGroups = document.querySelectorAll('.about-stats, .skills-grid, .projects-grid, .contact-methods');
        revealGroups.forEach(group => {
            const children = group.querySelectorAll('.reveal-element');
            children.forEach((child, index) => {
                if (!child.style.transitionDelay) {
                    child.style.transitionDelay = `${index * 150}ms`;
                }
            });
        });

        // Intersection Observer 옵션 설정
        const revealObserverOptions = {
            root: null, // viewport
            threshold: 0.1, // 10% 노출 시 실행
            rootMargin: '0px 0px -40px 0px' // 화면 하단에 도달하기 약간 전에 감지
        };

        revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    // 스크롤에서 벗어났을 때 (올라가거나 내려가서 화면 밖으로 나갔을 때) 상태 초기화
                    entry.target.classList.remove('revealed');
                }
            });
        }, revealObserverOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ==================== 자격증 / 스킬 뱃지 모달 제어 ====================
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
                // 클릭 시 해당 요소의 data 속성 읽기
                const title = placeholder.getAttribute('data-title') || '';
                const issuer = placeholder.getAttribute('data-issuer') || '';
                const date = placeholder.getAttribute('data-date') || '';
                const desc = placeholder.getAttribute('data-description') || '';
                
                // 이미지 태그에서 src와 alt 읽기
                const img = placeholder.querySelector('img');
                const imgSrc = img ? img.getAttribute('src') : '';
                const imgAlt = img ? img.getAttribute('alt') : '';

                // 모달 내용 채우기
                if (modalImg) {
                    modalImg.src = imgSrc;
                    modalImg.alt = imgAlt;
                }
                if (modalTitle) modalTitle.textContent = title;
                if (modalIssuer) modalIssuer.textContent = issuer;
                if (modalDate) modalDate.textContent = date;
                if (modalDesc) modalDesc.textContent = desc;

                // 모달 활성화 및 body 스크롤 방지
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // 모달 닫기 기능 함수
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // 닫기 버튼 클릭
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // 오버레이 영역 클릭
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        // ESC 키 입력 시 닫기
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
