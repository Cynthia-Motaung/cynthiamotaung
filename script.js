document.addEventListener("DOMContentLoaded", () => {
  // --- DYNAMIC COPYRIGHT YEAR ---
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // --- CURSOR FOLLOWER & MAGNETIC EFFECT ---
  const cursorDot = document.querySelector("[data-cursor-dot]");
  const cursorOutline = document.querySelector("[data-cursor-outline]");
  const magneticElements = document.querySelectorAll('[data-magnetic]');

  window.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate({
          left: `${posX}px`,
          top: `${posY}px`
      }, { duration: 500, fill: "forwards" });

      magneticElements.forEach(el => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = Math.floor(centerX - posX);
        const deltaY = Math.floor(centerY - posY);
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const notActive = !el.classList.contains('active');

        if (dist < 100 && notActive) {
            el.style.transform = `translate(${-deltaX * 0.2}px, ${-deltaY * 0.2}px)`;
        } else {
            el.style.transform = 'translate(0,0)';
        }
      });
  });

  // --- LOADER ---
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
  }

  // --- THEME TOGGLE ---
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme') || 'dark';

  const applyTheme = (theme) => {
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    // document.documentElement.classList.add(theme + '-mode'); // This line was potentially buggy

    if (theme === 'light') {
        document.documentElement.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
    } else {
        document.documentElement.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
    }
    if (typeof particlesJS !== 'undefined') {
        initParticles(theme);
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
  
  // --- CONTACT MODAL ---
  const contactModal = document.getElementById('contact-modal');
  const openContactModalButton = document.getElementById('connect-button');
  const closeContactTriggers = document.querySelectorAll('[data-close-modal]');

  const openContactModal = () => {
    contactModal.classList.add('is-visible');
    contactModal.setAttribute('aria-hidden', 'false');
  };

  const closeContactModal = () => {
    contactModal.classList.remove('is-visible');
    contactModal.setAttribute('aria-hidden', 'true');
  };

  if(openContactModalButton) {
    openContactModalButton.addEventListener('click', openContactModal);
  }
  closeContactTriggers.forEach(trigger => trigger.addEventListener('click', closeContactModal));

  // --- PROJECT MODAL ---
  const projectModal = document.getElementById('project-modal');
  const projectModalBody = projectModal.querySelector('.project-modal-body');
  const projectGrid = document.querySelector('.project-grid');
  const closeProjectTriggers = document.querySelectorAll('[data-close-project-modal]');

  const openProjectModal = (projectCard) => {
      const content = projectCard.querySelector('.project-content-hidden').innerHTML;
      projectModalBody.innerHTML = content;
      projectModal.classList.add('is-visible');
      projectModal.setAttribute('aria-hidden', 'false');
  };

  const closeProjectModal = () => {
      projectModal.classList.remove('is-visible');
      projectModal.setAttribute('aria-hidden', 'true');
  };
  
  if (projectGrid) {
    projectGrid.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        if (projectCard) {
            openProjectModal(projectCard);
        }
    });
  }

  closeProjectTriggers.forEach(trigger => trigger.addEventListener('click', closeProjectModal));

  // --- PROJECT FILTERING ---
  const filterContainer = document.querySelector('.project-filters');
  const projectCards = document.querySelectorAll('.project-grid .project-card');

  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
        const targetButton = e.target.closest('button');
        if (!targetButton) return;

        const filterBtns = filterContainer.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        targetButton.classList.add('active');

        const filterValue = targetButton.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            card.style.display = 'none';
            if (card.dataset.category.includes(filterValue) || filterValue === 'all') {
                card.style.display = 'block';
            }
        });
    });
  }

  // --- NETLIFY FORM HANDLING ---
  const contactForm = document.querySelector('.contact-form');
  const formStatus = document.querySelector('.form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formStatus.textContent = "Sending...";
      formStatus.style.color = "var(--accent-color)";

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new URLSearchParams(formData).toString(),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        if (response.ok) {
          formStatus.textContent = "Message sent successfully!";
          formStatus.style.color = "var(--success-color)";
          contactForm.reset();
          setTimeout(closeContactModal, 2000);
        } else {
          throw new Error(`Form submission failed`);
        }
      } catch (error) {
        formStatus.textContent = "Error sending message.";
        formStatus.style.color = "var(--error-color)";
      }
    });
  }

  // --- SCROLL-TRIGGERED ANIMATIONS ---
  const animatedSections = document.querySelectorAll('.animated-section');
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 
  });

  animatedSections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  const resumeEntries = document.querySelectorAll('.resume-entry');
  const resumeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 150);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  resumeEntries.forEach(entry => {
    resumeObserver.observe(entry);
  });


  // --- ACTIVE NAV LINK ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  
  const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${id}`) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }, {
      rootMargin: '-50% 0px -50% 0px'
  });

  sections.forEach(section => {
      navObserver.observe(section);
  });

  // --- TEXT SCRAMBLE EFFECT ---
  class TextScramble {
      constructor(el) {
          this.el = el;
          this.chars = '!<>-_\\/[]{}—=+*^?#________';
          this.update = this.update.bind(this);
      }
      setText(newText) {
          const oldText = this.el.innerText;
          const length = Math.max(oldText.length, newText.length);
          const promise = new Promise((resolve) => this.resolve = resolve);
          this.queue = [];
          for (let i = 0; i < length; i++) {
              const from = oldText[i] || '';
              const to = newText[i] || '';
              const start = Math.floor(Math.random() * 40);
              const end = start + Math.floor(Math.random() * 40);
              this.queue.push({ from, to, start, end });
          }
          cancelAnimationFrame(this.frameRequest);
          this.frame = 0;
          this.update();
          return promise;
      }
      update() {
          let output = '';
          let complete = 0;
          for (let i = 0, n = this.queue.length; i < n; i++) {
              let { from, to, start, end, char } = this.queue[i];
              if (this.frame >= end) {
                  complete++;
                  output += to;
              } else if (this.frame >= start) {
                  if (!char || Math.random() < 0.28) {
                      char = this.randomChar();
                      this.queue[i].char = char;
                  }
                  output += `<span class="dud">${char}</span>`;
              } else {
                  output += from;
              }
          }
          this.el.innerHTML = output;
          if (complete === this.queue.length) {
              this.resolve();
          } else {
              this.frameRequest = requestAnimationFrame(this.update);
              this.frame++;
          }
      }
      randomChar() {
          return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
  }

  const textScrambleElement = document.querySelector('.text-scramble');
  if (textScrambleElement) {
    const fx = new TextScramble(textScrambleElement);
    setTimeout(() => {
        fx.setText("Hello, I'm Cynthia Motaung");
    }, 1000);
  }

  // --- VANILLA TILT INITIALIZATION ---
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });
  }

  // --- PARALLAX EFFECT ---
  const parallaxContainer = document.querySelector('[data-parallax-container]');
  if (parallaxContainer) {
    const parallaxItems = parallaxContainer.querySelectorAll('[data-parallax-item]');
    parallaxContainer.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = parallaxContainer;
        
        const x = (clientX - offsetWidth / 2) / (offsetWidth / 2);
        const y = (clientY - offsetHeight / 2) / (offsetHeight / 2);

        parallaxItems.forEach((item, index) => {
            const speed = (index + 1) * 2;
            item.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
  }
  
  // --- PARTICLES.JS INITIALIZATION ---
  function initParticles(theme) {
    if (typeof particlesJS === 'undefined') return;
    const color = theme === 'light' ? '#333333' : '#e0e0e0';
    const particlesConfig = {
      "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 }},
        "color": { "value": color },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": false },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": color, "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 }}
      },
      "retina_detect": true
    };
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', particlesConfig);
    }
  }

  // --- CLI "CURRENTLY LEARNING" ANIMATION ---
  const cliBody = document.getElementById('cli-body');
  const learningItems = [
      { text: 'Blazor', desc: 'Exploring client-side web UI with C#.' },
      { text: 'Microservices w/ DAPR', desc: 'Building resilient, distributed apps.' },
      { text: 'Azure Functions', desc: 'Learning serverless compute in Azure.' },
      { text: 'Minimal APIs', desc: 'Mastering lightweight API development in .NET.' }
  ];

  let currentItem = 0;
  let isAnimating = false;

  const cliObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting && !isAnimating) {
          isAnimating = true;
          if(cliBody) cliBody.innerHTML = '';
          typeCommand();
      }
  }, { threshold: 0.6 });
  
  const learningSection = document.getElementById('learning');
  if (learningSection) {
    cliObserver.observe(learningSection);
  }

  function typeCommand() {
      if (!isAnimating || !cliBody) return;
      if (currentItem >= learningItems.length) {
          currentItem = 0; // Loop
          setTimeout(() => {
              if (cliBody) cliBody.innerHTML = '';
              typeCommand();
          }, 3000);
          return;
      }

      const item = learningItems[currentItem];
      const line = document.createElement('p');
      line.innerHTML = `<span class="prompt">~ learn --now</span> <span class="command">${item.text}</span>`;
      cliBody.appendChild(line);

      setTimeout(() => {
          const output = document.createElement('p');
          output.textContent = `> ${item.desc}`;
          output.classList.add('output');
          if (cliBody) {
            cliBody.appendChild(output);
            cliBody.scrollTop = cliBody.scrollHeight;
          }
          currentItem++;
          setTimeout(typeCommand, 1500);
      }, 1000);
  }

  // --- COMMAND PALETTE ---
  const commandPalette = document.getElementById('command-palette');
  const commandInput = document.getElementById('command-input');
  const commandResults = document.getElementById('command-results');
  const closeCmdTriggers = document.querySelectorAll('[data-close-cmd]');

  const commands = [
      { name: 'Home', action: () => window.location.href = '#home' },
      { name: 'About', action: () => window.location.href = '#about' },
      { name: 'Resume', action: () => window.location.href = '#resume' },
      { name: 'Skills', action: () => window.location.href = '#skills' },
      { name: 'Projects', action: () => window.location.href = '#projects' },
      { name: 'Toggle Theme', action: () => themeToggle.click() },
      { name: 'Contact Me', action: openContactModal },
      { name: 'View Source', action: () => window.open('https://github.com/Cynthia-Motaung/portfolio', '_blank') },
      { name: 'Open GitHub', action: () => window.open('https://github.com/Cynthia-Motaung', '_blank') },
      { name: 'Open LinkedIn', action: () => window.open('https://www.linkedin.com/in/cynthia-motaung/', '_blank') },
  ];

  const openCommandPalette = () => {
    if(!commandPalette) return;
      commandPalette.classList.add('is-visible');
      commandPalette.setAttribute('aria-hidden', 'false');
      commandInput.focus();
      renderCommands(commands);
  };

  const closeCommandPalette = () => {
    if(!commandPalette) return;
      commandPalette.classList.remove('is-visible');
      commandPalette.setAttribute('aria-hidden', 'true');
      commandInput.value = '';
  };

  const renderCommands = (cmds) => {
    if (!commandResults) return;
      commandResults.innerHTML = '';
      cmds.forEach((cmd, index) => {
          const li = document.createElement('li');
          li.textContent = cmd.name;
          li.dataset.index = index;
          if (index === 0) li.classList.add('selected');
          li.addEventListener('click', () => {
              cmd.action();
              closeCommandPalette();
          });
          commandResults.appendChild(li);
      });
  };

  window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          openCommandPalette();
      }
      if (e.key === 'Escape' && commandPalette && commandPalette.classList.contains('is-visible')) {
          closeCommandPalette();
      }
  });

  if (commandInput) {
    commandInput.addEventListener('input', () => {
        const query = commandInput.value.toLowerCase();
        const filteredCommands = commands.filter(cmd => cmd.name.toLowerCase().includes(query));
        renderCommands(filteredCommands);
    });
    
    commandInput.addEventListener('keydown', (e) => {
      const results = commandResults.querySelectorAll('li');
      if (results.length === 0) return;

      let selected = commandResults.querySelector('.selected');
      let newSelected;

      if (e.key === 'ArrowDown') {
          e.preventDefault();
          newSelected = selected ? selected.nextElementSibling : results[0];
          if (!newSelected) newSelected = results[0];
      } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          newSelected = selected ? selected.previousElementSibling : results[results.length-1];
          if (!newSelected) newSelected = results[results.length - 1];
      } else if (e.key === 'Enter') {
          e.preventDefault();
          if (selected) {
              const commandName = selected.textContent;
              const command = commands.find(c => c.name === commandName);
              if (command) {
                  command.action();
                  closeCommandPalette();
              }
          }
      }

      if (newSelected) {
          if (selected) selected.classList.remove('selected');
          newSelected.classList.add('selected');
          newSelected.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  closeCmdTriggers.forEach(trigger => trigger.addEventListener('click', closeCommandPalette));

});

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
  }
});