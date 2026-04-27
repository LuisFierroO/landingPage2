/* =====================================================
   Aliado en Ejecución · main.js
   ===================================================== */

(() => {
  // -------- Footer year --------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -------- Reveal on scroll --------
  // NOTE: do NOT add `.carousel` here — applying translateY/transform on it
  // breaks the 3D perspective chain and stops the orbiting animation.
  const revealTargets = document.querySelectorAll(
    ".section__head, .m-card, .hero__left, .hero__right, .contact__left, .contact__right"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  // -------- Carousel control --------
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const ring = carousel.querySelector("[data-ring]");
  const cards = ring ? ring.querySelectorAll(".card") : [];
  const dots = carousel.querySelectorAll("[data-dots] .dot");
  const toggleBtn = carousel.querySelector('[data-action="toggle"]');
  const toggleIcon = carousel.querySelector("[data-toggle-icon]");
  const prevBtn = carousel.querySelector('[data-action="prev"]');
  const nextBtn = carousel.querySelector('[data-action="next"]');

  const cardCount = cards.length || 5;
  const stepDeg = 360 / cardCount;
  let currentIndex = 0;
  let manualMode = false;

  // Mark first dot active
  if (dots.length) dots[0].setAttribute("aria-current", "true");

  // Pause on hover (desktop only — relies on hover capability)
  const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (hoverCapable && ring) {
    ring.addEventListener("mouseenter", () => {
      carousel.setAttribute("data-paused", "true");
    });
    ring.addEventListener("mouseleave", () => {
      if (!manualMode) carousel.removeAttribute("data-paused");
    });
  }

  // Pause on focus within (keyboard users)
  carousel.addEventListener("focusin", () => {
    carousel.setAttribute("data-paused", "true");
  });
  carousel.addEventListener("focusout", (e) => {
    if (!carousel.contains(e.relatedTarget) && !manualMode) {
      carousel.removeAttribute("data-paused");
    }
  });

  // Manual rotation: override the CSS animation by writing inline transform
  // tiltX: angle around X-axis (-38 = normal orbit view, 0 = straight-on for selected)
  const setRotation = (index, tiltX = -38) => {
    if (!ring) return;
    currentIndex = ((index % cardCount) + cardCount) % cardCount;
    const angle = -currentIndex * stepDeg;
    ring.style.animation = "none";
    ring.style.transform = `rotateX(${tiltX}deg) rotateY(${angle}deg)`;

    dots.forEach((d, i) => {
      if (i === currentIndex) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
  };

  const goManual = (dir) => {
    manualMode = true;
    carousel.setAttribute("data-paused", "true");
    if (toggleIcon) toggleIcon.textContent = "▶";
    setRotation(currentIndex + dir); // keep normal tilt
  };

  if (prevBtn) prevBtn.addEventListener("click", () => goManual(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => goManual(1));

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.i, 10) || 0;
      manualMode = true;
      carousel.setAttribute("data-paused", "true");
      if (toggleIcon) toggleIcon.textContent = "▶";
      setRotation(idx);
    });
  });

  // -------- Card selection by click --------
  const deselectAll = () => {
    cards.forEach((c) => c.classList.remove("is-selected"));
    carousel.removeAttribute("data-selected");
  };

  cards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      const alreadySelected = card.classList.contains("is-selected");

      // Toggle off if clicking the selected card
      if (alreadySelected) {
        deselectAll();
        // Resume auto-rotation
        manualMode = false;
        if (ring) {
          ring.style.transform = "";
          ring.style.animation = "";
        }
        carousel.removeAttribute("data-paused");
        if (toggleIcon) toggleIcon.textContent = "❚❚";
        return;
      }

      // Pause and bring selected card to front
      deselectAll();
      manualMode = true;
      carousel.setAttribute("data-paused", "true");
      carousel.setAttribute("data-selected", idx);
      if (toggleIcon) toggleIcon.textContent = "▶";

      // Rotate ring so card idx faces the camera straight-on:
      // tiltX=0 neutralizes the orbital tilt, so the card is perpendicular to the camera.
      setRotation(idx, 0);

      card.classList.add("is-selected");
    });
  });

  // Click outside carousel → deselect & resume
  document.addEventListener("click", (e) => {
    if (!carousel.contains(e.target) && carousel.hasAttribute("data-selected")) {
      deselectAll();
      manualMode = false;
      if (ring) {
        ring.style.transform = "";
        ring.style.animation = "";
      }
      carousel.removeAttribute("data-paused");
      if (toggleIcon) toggleIcon.textContent = "❚❚";
    }
  });

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const paused = carousel.getAttribute("data-paused") === "true";
      if (paused) {
        // resume — also clear any card selection
        deselectAll();
        manualMode = false;
        carousel.removeAttribute("data-paused");
        if (ring) {
          ring.style.transform = "";
          ring.style.animation = "";
        }
        if (toggleIcon) toggleIcon.textContent = "❚❚";
      } else {
        manualMode = true;
        carousel.setAttribute("data-paused", "true");
        if (toggleIcon) toggleIcon.textContent = "▶";
      }
    });
  }

  // Keyboard left/right when carousel is in viewport and focused
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); goManual(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); goManual(1); }
  });
  // Make carousel focusable for keyboard nav
  carousel.setAttribute("tabindex", "0");

  // -------- Contact form --------
  const form = document.getElementById("contactForm");
  if (form) {
    const msg = form.querySelector("[data-form-msg]");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        if (msg) {
          msg.textContent = "Revisa los campos marcados — falta información.";
          msg.setAttribute("data-state", "error");
        }
        form.reportValidity();
        return;
      }
      if (msg) {
        msg.removeAttribute("data-state");
        msg.textContent = "Mensaje enviado · te respondo en menos de 24 h hábiles.";
      }
      form.reset();
    });
  }
})();
