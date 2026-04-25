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
});
