// DOM이 로드된 후에 실행
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded successfully!');

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
                    <div class="github-repo-card">
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
        }

        fetchGitHubRepos();
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
});
