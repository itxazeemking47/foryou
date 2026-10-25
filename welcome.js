document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     PAGE LOADER
  ===================================================== */

  const loader = document.getElementById("pageLoader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) loader.classList.add("hide");
    }, 500);
  });


  /* =====================================================
     SECURITY
     Direct access without login -> index.html
  ===================================================== */

  if (sessionStorage.getItem("accessGranted") !== "true") {
    window.location.replace("index.html");
    return;
  }


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });


  /* =====================================================
     CARD PRESS EFFECT
  ===================================================== */

  const cards = document.querySelectorAll(".feature-card");

  cards.forEach((card) => {

    card.addEventListener(
      "pointerdown",
      () => {
        card.classList.add("pressed");
      },
      { passive: true }
    );

    card.addEventListener(
      "pointerup",
      () => {
        card.classList.remove("pressed");
      },
      { passive: true }
    );

    card.addEventListener(
      "pointercancel",
      () => {
        card.classList.remove("pressed");
      },
      { passive: true }
    );

  });


  /* =====================================================
     CUTE CLICK PARTICLES
     Lightweight — no canvas
  ===================================================== */

  let lastEffect = 0;

  function createCuteEffect(x, y) {

    const now = Date.now();

    // Prevent excessive effects on rapid tapping
    if (now - lastEffect < 120) return;

    lastEffect = now;

    const symbols = ["♡", "✦", "✧", "✿", "⋆"];
    const symbol =
      symbols[Math.floor(Math.random() * symbols.length)];

    const particle = document.createElement("span");

    particle.textContent = symbol;

    particle.style.position = "fixed";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.zIndex = "9998";
    particle.style.pointerEvents = "none";

    particle.style.fontSize =
      `${14 + Math.random() * 10}px`;

    particle.style.color =
      ["#ff6fae", "#9b82ff", "#ffb84d", "#72cfff"][
        Math.floor(Math.random() * 4)
      ];

    particle.style.fontFamily =
      '"Patrick Hand", cursive';

    particle.style.transform =
      "translate(-50%, -50%) scale(0.5)";

    particle.style.opacity = "1";

    particle.style.transition =
      "transform .7s cubic-bezier(.2,.8,.2,1), opacity .7s ease";

    document.body.appendChild(particle);

    requestAnimationFrame(() => {

      const randomX =
        (Math.random() - 0.5) * 80;

      const randomY =
        -45 - Math.random() * 55;

      particle.style.transform =
        `translate(calc(-50% + ${randomX}px), ${randomY}px) scale(1.2)`;

      particle.style.opacity = "0";

    });

    setTimeout(() => {
      particle.remove();
    }, 750);
  }


  /* =====================================================
     TOUCH + MOUSE EFFECT
  ===================================================== */

  document.addEventListener(
    "pointerdown",
    (event) => {

      // Don't create effects while clicking external links
      // excessively; still keeps the interaction cute.
      createCuteEffect(event.clientX, event.clientY);

    },
    { passive: true }
  );


  /* =====================================================
     HERO PARALLAX
     Desktop only
  ===================================================== */

  const heroCard = document.querySelector(".hero-card");

  const canParallax =
    window.matchMedia("(min-width: 801px)").matches &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  if (heroCard && canParallax) {

    let ticking = false;

    document.addEventListener(
      "mousemove",
      (event) => {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(() => {

          const x =
            (event.clientX / window.innerWidth - 0.5);

          const y =
            (event.clientY / window.innerHeight - 0.5);

          heroCard.style.transform =
            `perspective(1000px)
             rotateX(${y * -1.5}deg)
             rotateY(${x * 1.5}deg)`;

          ticking = false;

        });

      },
      { passive: true }
    );

    document.addEventListener(
      "mouseleave",
      () => {

        heroCard.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";

      },
      { passive: true }
    );

  }


  /* =====================================================
     CARD TILT
     Desktop only
  ===================================================== */

  if (
    window.matchMedia("(min-width: 801px)").matches &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  ) {

    cards.forEach((card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateY =
            ((x / rect.width) - 0.5) * 5;

          const rotateX =
            ((y / rect.height) - 0.5) * -5;

          card.style.transform =
            `translateY(-7px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

        },
        { passive: true }
      );

      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "";

        },
        { passive: true }
      );

    });

  }


  /* =====================================================
     SMOOTH INTERNAL SCROLL
  ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetID =
        link.getAttribute("href");

      const target =
        document.querySelector(targetID);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =====================================================
     WELCOME CONSOLE
  ===================================================== */

  console.log(
    "%c♡ Noor's Little Corner ♡",
    "font-size:18px;font-weight:bold;color:#ff6fae;"
  );

  console.log(
    "%cMade with little thoughts ✨",
    "font-size:13px;color:#9b82ff;"
  );


  /* =====================================================
     BASIC PAGE PROTECTION
     This is only a front-end deterrent.
  ===================================================== */

  document.addEventListener("keydown", (event) => {

    const key = event.key.toLowerCase();

    if (
      event.key === "F12" ||
      (event.ctrlKey &&
        event.shiftKey &&
        ["i", "j", "c"].includes(key)) ||
      (event.ctrlKey && key === "u")
    ) {

      event.preventDefault();

    }

  });


  /* =====================================================
     DISABLE CONTEXT MENU
  ===================================================== */

  document.addEventListener(
    "contextmenu",
    (event) => {
      event.preventDefault();
    }
  );


  /* =====================================================
     PAGE VISIBILITY
     Pause visual effects when tab is hidden
  ===================================================== */

  document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

      document.body.classList.add("page-hidden");

    } else {

      document.body.classList.remove("page-hidden");

    }

  });

});
