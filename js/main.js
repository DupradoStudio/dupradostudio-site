/* =============================================================
   DUPRADO STUDIO — Interactions
   Scroll nativo · Custom cursor · Fullscreen menu · Reveals · FAQ
   ============================================================= */

(function () {
    'use strict';

    /* ----------  CUSTOM CURSOR ---------- */
    function initCursor() {
        const cursor = document.getElementById('cursor');
        const label = document.getElementById('cursor-label');
        if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

        let x = 0, y = 0, tx = 0, ty = 0;

        document.addEventListener('mousemove', function (e) {
            tx = e.clientX;
            ty = e.clientY;
            cursor.classList.add('is-active');
        });

        function loop() {
            x += (tx - x) * 0.18;
            y += (ty - y) * 0.18;
            cursor.style.transform = 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -50%)';
            requestAnimationFrame(loop);
        }
        loop();

        // Hover states
        document.querySelectorAll('a, button, [data-cursor]').forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                cursor.classList.add('is-hover');
                const l = el.getAttribute('data-cursor');
                if (l) {
                    cursor.classList.add('is-text');
                    label.textContent = l;
                }
            });
            el.addEventListener('mouseleave', function () {
                cursor.classList.remove('is-hover', 'is-text');
                label.textContent = '';
            });
        });

        document.addEventListener('mouseleave', function () {
            cursor.classList.remove('is-active');
        });
    }

    /* ----------  PRELOADER ---------- */
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const count = document.getElementById('preloader-count');
        if (!preloader) return;

        let current = 0;
        const interval = setInterval(function () {
            current += Math.floor(Math.random() * 8) + 3;
            if (current >= 100) {
                current = 100;
                clearInterval(interval);
                if (count) count.textContent = '100';
                setTimeout(function () {
                    preloader.classList.add('is-loaded');
                    document.documentElement.classList.add('is-loaded');
                }, 350);
            } else if (count) {
                count.textContent = current < 10 ? '0' + current : current;
            }
        }, 90);
    }

    /* ----------  FULLSCREEN MENU ---------- */
    function initMenu() {
        const toggle = document.getElementById('menu-toggle');
        const close = document.getElementById('menu-close');
        const menu = document.getElementById('menu');
        if (!menu) return;

        function open() {
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeFn() {
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        if (toggle) toggle.addEventListener('click', open);
        if (close) close.addEventListener('click', closeFn);

        // Close on nav link click
        menu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', closeFn);
        });

        // Close on ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeFn();
        });
    }

    /* ----------  REVEAL ON SCROLL ---------- */
    function initReveal() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('[data-reveal], [data-reveal-lines]').forEach(function (el) {
                el.classList.add('is-in');
            });
            return;
        }

        const obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        document.querySelectorAll('[data-reveal], [data-reveal-lines]').forEach(function (el) {
            obs.observe(el);
        });
    }

    /* ----------  FAQ ACCORDION ---------- */
    function initFaq() {
        document.querySelectorAll('.faq__item').forEach(function (item) {
            item.addEventListener('click', function () {
                const isOpen = item.classList.contains('is-open');
                document.querySelectorAll('.faq__item').forEach(function (i) { i.classList.remove('is-open'); });
                if (!isOpen) item.classList.add('is-open');
            });
        });
    }

    /* ----------  MAGNETIC HOVER (buttons) ---------- */
    function initMagnetic() {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        document.querySelectorAll('.btn').forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                const rect = btn.getBoundingClientRect();
                const mx = e.clientX - rect.left - rect.width / 2;
                const my = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = 'translate(' + (mx * 0.15) + 'px, ' + (my * 0.25) + 'px)';
            });
            btn.addEventListener('mouseleave', function () {
                btn.style.transform = '';
            });
        });
    }

    /* ----------  NAV SCROLL STATE ---------- */
    function initNav() {
        const nav = document.querySelector('.nav');
        if (!nav) return;
        let lastY = 0;
        window.addEventListener('scroll', function () {
            const y = window.scrollY;
            if (y > 60) nav.classList.add('is-scrolled');
            else nav.classList.remove('is-scrolled');
            lastY = y;
        });
    }

    /* ----------  CONTACT FORM (Formspree AJAX) ---------- */
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const status = document.getElementById('contact-status');
        const submit = document.getElementById('contact-submit');
        const originalBtnText = submit ? submit.textContent : '';

        function setStatus(state, message) {
            if (!status) return;
            status.className = 'form__status is-' + state;
            status.textContent = message;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Honeypot — se preenchido, é bot
            const honey = form.querySelector('[name="_gotcha"]');
            if (honey && honey.value) {
                setStatus('success', 'Mensagem recebida. Retornaremos em até 24h.');
                form.reset();
                return;
            }

            const action = form.getAttribute('action') || '';
            if (action.indexOf('SEU_FORM_ID') !== -1) {
                setStatus('error', 'Formulário ainda não configurado. Use antonio@duprado.com diretamente enquanto isso.');
                return;
            }

            if (submit) {
                submit.disabled = true;
                submit.textContent = 'Enviando...';
            }
            setStatus('loading', 'Enviando briefing...');

            fetch(action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(function (response) {
                if (response.ok) {
                    setStatus('success', 'Briefing enviado. Retornamos em até 24h no e-mail informado.');
                    form.reset();
                } else {
                    response.json().then(function (data) {
                        const msg = (data && data.errors && data.errors.length)
                            ? data.errors.map(function (er) { return er.message; }).join(', ')
                            : 'Erro ao enviar. Tente novamente ou escreva direto para antonio@duprado.com.';
                        setStatus('error', msg);
                    }).catch(function () {
                        setStatus('error', 'Erro ao enviar. Tente novamente ou escreva direto para antonio@duprado.com.');
                    });
                }
            }).catch(function () {
                setStatus('error', 'Erro de conexão. Verifique sua internet ou escreva direto para antonio@duprado.com.');
            }).finally(function () {
                if (submit) {
                    submit.disabled = false;
                    submit.textContent = originalBtnText;
                }
            });
        });
    }

    /* ----------  INIT ---------- */
    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        initPreloader();
        initCursor();
        initMenu();
        initReveal();
        initFaq();
        initMagnetic();
        initNav();
        initContactForm();
    });

})();
