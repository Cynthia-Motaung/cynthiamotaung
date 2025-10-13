
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme') || 'dark';

    const applyTheme = (theme) => {
      document.documentElement.classList.remove('light-mode', 'dark-mode');
      if (theme === 'light') {
        document.documentElement.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
      } else {
        document.documentElement.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
      }
    };

    applyTheme(storedTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.classList.toggle('light-mode');
        const newTheme = isLight ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
      });
    }

    // Print functionality
    const printBtn = document.getElementById('print-btn');
    printBtn.addEventListener('click', () => {
      window.print();
    });

    // Scroll animations
    const resumeSections = document.querySelectorAll('.resume-section');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    resumeSections.forEach(section => {
      sectionObserver.observe(section);
    });

    // Update copyright year
    document.getElementById('copyright-year').textContent = new Date().getFullYear();

    // Mobile menu functionality (same as main site)
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuToggle && mainNav) {
      mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
        
        const icon = mobileMenuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
          icon.className = 'bi bi-x-lg';
        } else {
          icon.className = 'bi bi-list';
        }
      });
    }


    // Update last modified date in footer
function updateLastModified() {
    const lastModifiedElements = document.querySelectorAll('#last-updated');
    if (lastModifiedElements.length > 0) {
        const lastModified = new Date(document.lastModified);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const formattedDate = lastModified.toLocaleDateString('en-US', options);
        
        lastModifiedElements.forEach(element => {
            element.textContent = formattedDate;
        });
    }
}

document.addEventListener('DOMContentLoaded', updateLastModified);