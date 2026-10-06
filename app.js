// ============================================================
// VARENYA CHIVUKULA — PORTFOLIO V3
// app.js
// ============================================================


// ------------------------------------------------------------
// MOBILE NAVIGATION
// ------------------------------------------------------------

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";

    menu.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
    menu.textContent = open ? "Close −" : "Menu +";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
      menu.textContent = "Menu +";
    });
  });
}


// ------------------------------------------------------------
// HEADER SCROLL STATE
// ------------------------------------------------------------

const header = document.querySelector("header");

function updateHeader() {
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();


// ------------------------------------------------------------
// PAGE PROGRESS BAR
// ------------------------------------------------------------

const progressBar = document.querySelector(".progress span");

function updateProgress() {
  if (!progressBar) return;

  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (scrollableHeight <= 0) {
    progressBar.style.width = "0%";
    return;
  }

  const progress = Math.min(
    Math.max(window.scrollY / scrollableHeight, 0),
    1
  );

  progressBar.style.width = `${progress * 100}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();


// ------------------------------------------------------------
// SCROLL REVEAL
// ------------------------------------------------------------

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


// ------------------------------------------------------------
// ACTIVE NAVIGATION SECTION
// ------------------------------------------------------------

const sections = document.querySelectorAll("main section[id]");

const navigationLinks = document.querySelectorAll(
  'nav a[href^="#"]'
);

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navigationLinks.forEach((link) => {
          const target = link.getAttribute("href");

          link.classList.toggle(
            "active",
            target === `#${currentId}`
          );
        });
      });
    },
    {
      threshold: 0.25,
      rootMargin: "-25% 0px -55% 0px",
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


// ------------------------------------------------------------
// PROJECT DETAILS
// ------------------------------------------------------------

const projectToggles =
  document.querySelectorAll(".project-toggle");

projectToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const panelId =
      button.getAttribute("aria-controls");

    const panel =
      document.getElementById(panelId);

    if (!panel) return;

    const isOpening = panel.hidden;

    panel.hidden = !isOpening;

    button.setAttribute(
      "aria-expanded",
      String(isOpening)
    );

    const openLabel =
      button.dataset.openLabel ||
      "View project details";

    const closeLabel =
      button.dataset.closeLabel ||
      "Close project details";

    button.innerHTML = isOpening
      ? `${closeLabel} <span>−</span>`
      : `${openLabel} <span>↗</span>`;
  });
});


// ------------------------------------------------------------
// ENGINEERING SYSTEM MAP — POINTER RESPONSE
// ------------------------------------------------------------

const systemMap =
  document.querySelector(".system-map");

if (systemMap && !prefersReducedMotion.matches) {
  systemMap.addEventListener(
    "pointermove",
    (event) => {
      const rect =
        systemMap.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width;

      const y =
        (event.clientY - rect.top) /
        rect.height;

      const rotateX =
        (0.5 - y) * 2.5;

      const rotateY =
        (x - 0.5) * 2.5;

      systemMap.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;
    }
  );

  systemMap.addEventListener(
    "pointerleave",
    () => {
      systemMap.style.transform = "";
    }
  );
}


// ------------------------------------------------------------
// SYSTEM MAP NODE INTERACTION
// ------------------------------------------------------------

const systemNodes =
  document.querySelectorAll(".system-node");

systemNodes.forEach((node) => {
  node.addEventListener("mouseenter", () => {
    systemNodes.forEach((otherNode) => {
      if (otherNode !== node) {
        otherNode.classList.add("muted");
      }
    });

    node.classList.add("focused");
  });

  node.addEventListener("mouseleave", () => {
    systemNodes.forEach((otherNode) => {
      otherNode.classList.remove(
        "muted",
        "focused"
      );
    });
  });
});


// ------------------------------------------------------------
// PROJECT CARD POINTER EFFECT
// ------------------------------------------------------------

const interactiveCards =
  document.querySelectorAll(
    ".project-card, .case-study, .experience-feature"
  );

if (!prefersReducedMotion.matches) {
  interactiveCards.forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const rect =
          card.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) /
            rect.width) *
          100;

        const y =
          ((event.clientY - rect.top) /
            rect.height) *
          100;

        card.style.setProperty(
          "--pointer-x",
          `${x}%`
        );

        card.style.setProperty(
          "--pointer-y",
          `${y}%`
        );
      }
    );

    card.addEventListener(
      "pointerleave",
      () => {
        card.style.removeProperty(
          "--pointer-x"
        );

        card.style.removeProperty(
          "--pointer-y"
        );
      }
    );
  });
}


// ------------------------------------------------------------
// BUTTERFLY
// ------------------------------------------------------------

const motionButton =
  document.querySelector(".butterfly-motion");

const butterfly =
  document.querySelector(".flying-butterfly");

function setButterflyPaused(paused) {
  if (!butterfly || !motionButton) return;

  butterfly.classList.toggle(
    "paused",
    paused
  );

  motionButton.setAttribute(
    "aria-pressed",
    String(paused)
  );

  motionButton.textContent = paused
    ? "Let butterfly fly"
    : "Pause butterfly";
}

if (butterfly && motionButton) {
  setButterflyPaused(
    prefersReducedMotion.matches
  );

  motionButton.addEventListener(
    "click",
    () => {
      const currentlyPaused =
        motionButton.getAttribute(
          "aria-pressed"
        ) === "true";

      setButterflyPaused(
        !currentlyPaused
      );
    }
  );

  if (
    typeof prefersReducedMotion
      .addEventListener === "function"
  ) {
    prefersReducedMotion.addEventListener(
      "change",
      (event) => {
        setButterflyPaused(
          event.matches
        );
      }
    );
  }
}


// ------------------------------------------------------------
// SMOOTH INTERNAL ANCHOR SCROLLING
// ------------------------------------------------------------

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const href =
          link.getAttribute("href");

        if (!href || href === "#")
          return;

        const target =
          document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior:
            prefersReducedMotion.matches
              ? "auto"
              : "smooth",

          block: "start",
        });

        history.replaceState(
          null,
          "",
          href
        );
      }
    );
  });


// ------------------------------------------------------------
// KEYBOARD ESCAPE SUPPORT
// ------------------------------------------------------------

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key !== "Escape") return;

    if (
      nav &&
      nav.classList.contains("open")
    ) {
      nav.classList.remove("open");

      if (menu) {
        menu.setAttribute(
          "aria-expanded",
          "false"
        );

        menu.textContent = "Menu +";

        menu.focus();
      }
    }

    projectToggles.forEach(
      (button) => {
        const panelId =
          button.getAttribute(
            "aria-controls"
          );

        const panel =
          document.getElementById(
            panelId
          );

        if (!panel || panel.hidden)
          return;

        panel.hidden = true;

        button.setAttribute(
          "aria-expanded",
          "false"
        );

        const openLabel =
          button.dataset.openLabel ||
          "View project details";

        button.innerHTML =
          `${openLabel} <span>↗</span>`;
      }
    );
  }
);
