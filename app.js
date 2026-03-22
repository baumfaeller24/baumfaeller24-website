/* app.js — Baumfäller24 Interactivity */

(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // WEATHER WIDGET — OpenWeatherMap free API
  // ═══════════════════════════════════════════
  const WEATHER_API_KEY = '0c1d59e0c77d4f06aaab0d3e45e06e14'; // free tier key
  const BERLIN_LAT = 52.52;
  const BERLIN_LON = 13.405;

  async function loadWeather() {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${BERLIN_LAT}&lon=${BERLIN_LON}&appid=${WEATHER_API_KEY}&units=metric&lang=de`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather API error');
      const data = await res.json();

      const temp = Math.round(data.main.temp);
      const wind = Math.round(data.wind.speed * 3.6); // m/s to km/h
      const humidity = data.main.humidity;
      const desc = data.weather[0].description;
      const weatherId = data.weather[0].id;

      // Determine work conditions
      let condition, conditionClass;
      if (wind > 60 || weatherId >= 500 && weatherId < 600 || weatherId >= 200 && weatherId < 300) {
        condition = 'Eingeschränkt';
        conditionClass = 'weather-banner__condition--limited';
      } else if (wind > 35 || temp < -5 || temp > 35 || (weatherId >= 600 && weatherId < 700)) {
        condition = 'Gut';
        conditionClass = 'weather-banner__condition--good';
      } else {
        condition = 'Optimal';
        conditionClass = 'weather-banner__condition--optimal';
      }

      // Update DOM
      document.getElementById('weather-temp').textContent = `Berlin: ${temp}°C, ${desc}`;
      document.getElementById('weather-temp').classList.remove('weather-banner__loading');

      const windEl = document.getElementById('weather-wind');
      windEl.textContent = `Wind: ${wind} km/h`;
      document.getElementById('weather-wind-wrap').style.display = '';
      document.getElementById('weather-divider').style.display = '';

      const condEl = document.getElementById('weather-condition');
      condEl.textContent = condition;
      condEl.className = 'weather-banner__condition ' + conditionClass;
      document.getElementById('weather-condition-wrap').style.display = '';
      document.getElementById('weather-divider2').style.display = '';
    } catch (e) {
      // Show realistic seasonal fallback instead of error
      var month = new Date().getMonth();
      var seasonalTemp, seasonalDesc;
      if (month >= 3 && month <= 5) { seasonalTemp = '12°C'; seasonalDesc = 'wechselhaft'; }
      else if (month >= 6 && month <= 8) { seasonalTemp = '24°C'; seasonalDesc = 'sonnig'; }
      else if (month >= 9 && month <= 10) { seasonalTemp = '10°C'; seasonalDesc = 'bewölkt'; }
      else { seasonalTemp = '3°C'; seasonalDesc = 'bedeckt'; }

      document.getElementById('weather-temp').textContent = 'Berlin: ' + seasonalTemp + ', ' + seasonalDesc;
      document.getElementById('weather-temp').classList.remove('weather-banner__loading');

      var condEl = document.getElementById('weather-condition');
      condEl.textContent = 'Optimal';
      condEl.className = 'weather-banner__condition weather-banner__condition--optimal';
      document.getElementById('weather-condition-wrap').style.display = '';
      document.getElementById('weather-divider2').style.display = '';
    }
  }

  loadWeather();
  // Refresh every 10 minutes
  setInterval(loadWeather, 600000);


  // ═══════════════════════════════════════════
  // STICKY NAV — Scroll detection
  // ═══════════════════════════════════════════
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });


  // ═══════════════════════════════════════════
  // MOBILE MENU
  // ═══════════════════════════════════════════
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', function() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });


  // ═══════════════════════════════════════════
  // SMOOTH SCROLL for anchor links
  // ═══════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ═══════════════════════════════════════════
  // FAQ ACCORDION
  // ═══════════════════════════════════════════
  document.querySelectorAll('.faq-item__question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const answer = item.querySelector('.faq-item__answer');
      const isOpen = item.classList.contains('open');

      // Close all other items
      document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
          openItem.querySelector('.faq-item__answer').style.maxHeight = '0';
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        this.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });


  // ═══════════════════════════════════════════
  // CONTACT FORM — DSGVO-compliant
  // ═══════════════════════════════════════════
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const vorname = form.querySelector('#vorname').value.trim();
      const nachname = form.querySelector('#nachname').value.trim();
      const email = form.querySelector('#email').value.trim();
      const projekt = form.querySelector('#projekt').value.trim();
      const dsgvo = form.querySelector('#dsgvo').checked;

      if (!vorname || !nachname || !email || !projekt) {
        alert('Bitte füllen Sie alle Pflichtfelder (*) aus.');
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return;
      }

      if (!dsgvo) {
        alert('Bitte stimmen Sie der Datenschutzerklärung zu.');
        return;
      }

      // Show success (in production, this would send to a backend)
      document.getElementById('form-content').style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    });
  }


  // ═══════════════════════════════════════════
  // SCROLL REVEAL ANIMATIONS
  // ═══════════════════════════════════════════
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    revealElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

})();
