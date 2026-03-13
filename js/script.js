(function () {
  // Elements principaux
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, main');

  // Prévenir les erreurs si les éléments n'existent pas
  if (!toggle || !nav) return;

  // 1) Toggle du menu mobile
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // 2) Fermer le menu après clic sur un lien (mobile UX)
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // Ne ferme que si le menu est ouvert (mobile)
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 3) Animation d'apparition des sections au scroll (intersection observer)
  const appearOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  sections.forEach((sec) => {
    if (sec.classList.contains('section-hidden')) {
      // On ne déclenche que si la section est marquée comme cachée par défaut
      appearOnScroll.observe(sec);
    } else {
      // Sinon, on peut aussi animer sans condition
      appearOnScroll.observe(sec);
    }
  });

  // 4) Progress de défilement (barre en haut)
  const progressBar = document.createElement('div');
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '3px';
  progressBar.style.background = 'var(--color-primary)';
  progressBar.style.width = '0%';
  progressBar.style.zIndex = '9999';
  document.body.appendChild(progressBar);

  const updateProgress = () => {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  // Init
  updateProgress();

  // 5) (Optionnel) Validation simple du formulaire de réservation
  const form = document.querySelector('.reservation-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      // Petite vérification côté client
      const name = form.querySelector('#name');
      const date = form.querySelector('#date');
      const time = form.querySelector('#time');
      const people = form.querySelector('#people');

      let ok = true;
        [name, date, time, people].forEach((el) => {
        if (!el || !el.value || el.value.toString().trim() === '') ok = false;
      });

      if (!ok) {
        e.preventDefault();
        // Simple feedback
        alert('Veuillez remplir tous les champs obligatoires du formulaire de réservation.');
      }
    });
  }

  // 6) Petite physics-based parallax option pour le hero (optionnel)
  // Si tu veux activer, décommenter ci-dessous
  
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      hero.style.backgroundPosition = `calc(50% + ${x * 20}px) calc(50% + ${y * 10}px)`;
    });
  }

})();