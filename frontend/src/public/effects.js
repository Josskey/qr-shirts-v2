
/**
 * CODTEXA — OPTIMIZED DIGITAL ATMOSPHERE + REAL GLITCH SLICES
 */

export function initQrEffects(options = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  document.querySelector(".qrfx-overlay")?.remove();

  const settings = {
  pixelCount: 34,
  maxPixelSize: 18,
  reveal: true,

  // Настройки появления элементов
  revealSelectors: [
    "section h1",
    "section h2",
    "section h3",
    ".block-content",
    ".card-box",
    ".feature",
    ".audience-card",
    ".cta"
  ],
  revealSkipFirstSections: 2,

  hover: true,

  glitch: true,
  glitchSelector: ".qrfx-hero",
  glitchMinDelay: 4200,
  glitchMaxDelay: 9000,
  glitchSlicesMin: 3,
  glitchSlicesMax: 6,
  glitchMaxShift: 34,
  glitchDuration: 230,
  glitchMobile: true,
    // Performance
    fps: 30,
    desktopRainCount: 260,
    mobileRainCount: 140,

    ...options,
  };

  const reducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const overlay = document.createElement("div");
  overlay.className = "qrfx-overlay";
  overlay.setAttribute("aria-hidden", "true");

  const canvas = document.createElement("canvas");
  canvas.className = "qrfx-canvas";
  overlay.appendChild(canvas);

  const scanline = document.createElement("span");
  scanline.className = "qrfx-scanline";
  overlay.appendChild(scanline);

  if (!reducedMotion) {
    for (let i = 0; i < settings.pixelCount; i += 1) {
      const pixel = document.createElement("span");
      pixel.className = "qrfx-pixel";

      const x = Math.random() < 0.5
        ? Math.random() * 14
        : 86 + Math.random() * 14;

      pixel.style.setProperty("--qrfx-x", `${x}%`);
      pixel.style.setProperty("--qrfx-y", `${Math.random() * 100}%`);
      pixel.style.setProperty(
        "--qrfx-size",
        `${4 + Math.random() * settings.maxPixelSize}px`
      );
      pixel.style.setProperty(
        "--qrfx-duration",
        `${4 + Math.random() * 7}s`
      );
      pixel.style.setProperty("--qrfx-delay", `${Math.random() * 8}s`);
      pixel.style.setProperty(
        "--qrfx-opacity",
        `${0.08 + Math.random() * 0.22}`
      );

      overlay.appendChild(pixel);
    }
  }

  document.body.appendChild(overlay);
  document.documentElement.classList.add("qr-noise-enabled");

  const ctx = canvas.getContext("2d");

  let width = 0;
  let height = 0;
  let rafId = 0;
  let resizeRaf = 0;
  let active = true;
  let lastFrame = 0;
  let glitchTimer = null;

  const activeGlitchAnimations = new Set();
  const fragmentTimers = new Set();

  const frameInterval = 1000 / Math.max(1, settings.fps);

  function drawFinder(x, y, cell) {
    if (!ctx) return;

    ctx.strokeStyle = "rgba(235,242,255,.10)";
    ctx.lineWidth = 1;

    ctx.strokeRect(x, y, cell * 5, cell * 5);
    ctx.strokeRect(x + cell, y + cell, cell * 3, cell * 3);

    ctx.fillStyle = "rgba(235,242,255,.07)";
    ctx.fillRect(x + cell * 2, y + cell * 2, cell, cell);
  }

  let rainLines = [];

  function createRainLines() {
    rainLines = [];

    const count = width > 768
      ? settings.desktopRainCount
      : settings.mobileRainCount;

    for (let i = 0; i < count; i += 1) {
      const alpha = 0.015 + Math.random() * 0.04;

      rainLines.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 40 + Math.random() * 260,
        speed: 0.03 + Math.random() * 0.15,
        bucket: Math.min(3, Math.floor((alpha - 0.015) / 0.01)),
      });
    }
  }

  // Объединяем линии с близкой прозрачностью в общие Canvas-пути.
  // Вместо сотен отдельных stroke() выполняется всего четыре.
  function drawDigitalRain(deltaTime = 16.67) {
    if (!ctx) return;

    const groups = [[], [], [], []];

    const movement = Math.min(deltaTime, 50) / 16.67;

    rainLines.forEach((line) => {
      groups[line.bucket].push(line);

      line.y += line.speed * movement;

      if (line.y > height + line.length) {
        line.y = -line.length;
        line.x = Math.random() * width;
        line.length = 40 + Math.random() * 260;
        line.speed = 0.03 + Math.random() * 0.15;
      }
    });

    for (let i = 0; i < groups.length; i += 1) {
      const group = groups[i];

      if (!group.length) continue;

      ctx.beginPath();

      group.forEach((line) => {
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x, line.y + line.length);
      });

      const alpha = 0.015 + i * 0.01;

      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawGrid(deltaTime = 16.67) {
    if (!ctx || !active) return;

    ctx.clearRect(0, 0, width, height);

    const cell = 9;

    const regions = [
      { x: 18, y: height * 0.18, cols: 8, rows: 10 },
      { x: width - 18 - cell * 8, y: height * 0.56, cols: 8, rows: 10 },
    ];

    regions.forEach((region, regionIndex) => {
      for (let row = 0; row < region.rows; row += 1) {
        for (let col = 0; col < region.cols; col += 1) {
          const value = (row * 13 + col * 7 + regionIndex * 11) % 5;

          if (value > 1) continue;

          ctx.fillStyle = value === 0
            ? "rgba(235,242,255,.14)"
            : "rgba(235,242,255,.08)";

          ctx.fillRect(
            region.x + col * cell,
            region.y + row * cell,
            cell - 1,
            cell - 1
          );
        }
      }
    });

    drawFinder(22, height * 0.18 + 104, 5);
    drawFinder(width - 47, height * 0.56 - 58, 5);

    drawDigitalRain(deltaTime);
  }

  function resizeCanvas() {
    if (!active) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

    createRainLines();
    drawGrid();
  }

  function scheduleResize() {
    if (resizeRaf) return;

    resizeRaf = window.requestAnimationFrame(() => {
      resizeRaf = 0;
      resizeCanvas();
    });
  }

  function stopCanvas() {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }

    lastFrame = 0;
  }

  function animate(timestamp) {
    if (!active || reducedMotion || document.hidden) {
      rafId = 0;
      return;
    }

    if (!lastFrame || timestamp - lastFrame >= frameInterval) {
      const deltaTime = lastFrame
        ? timestamp - lastFrame
        : 16.67;

      drawGrid(deltaTime);
      lastFrame = timestamp;
    }

    rafId = window.requestAnimationFrame(animate);
  }

  function startCanvas() {
    if (!active || reducedMotion || document.hidden || rafId) return;

    lastFrame = 0;
    rafId = window.requestAnimationFrame(animate);
  }

  resizeCanvas();

  window.addEventListener("resize", scheduleResize, { passive: true });

  if (!reducedMotion) {
    startCanvas();

    if (!document.hidden) {
      window.requestAnimationFrame(() => {
        if (active) overlay.classList.add("qrfx-active");
      });
    }
  } else {
    overlay.classList.add("qrfx-active");
  }

  
    // Scroll reveal
  const revealTargets = [];

  if (settings.reveal) {
    const selectors = settings.revealSelectors || [
      "section h1",
      "section h2",
      "section h3",
      ".block-content",
      ".card-box",
      ".feature",
      ".audience-card",
      ".cta"
    ];

    document.querySelectorAll(selectors.join(",")).forEach((el) => {
      if (el.dataset.qrfxReveal === "true") return;

      // Количество секций, которые не нужно анимировать.
      // Для главной — первые две, для магазина — ни одной.
      const skipFirstSections = settings.revealSkipFirstSections ?? 2;

      const section = el.closest("section");
      const sections = Array.from(document.querySelectorAll("section"));
      const sectionIndex = section ? sections.indexOf(section) : -1;

      if (
        sectionIndex >= 0 &&
        sectionIndex < skipFirstSections
      ) {
        return;
      }

      el.dataset.qrfxReveal = "true";
      el.classList.add("qrfx-reveal");

      revealTargets.push(el);
    });
  }

  let observer;

  if ("IntersectionObserver" in window && revealTargets.length) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("qrfx-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("qrfx-visible"));
  }

  
  // Hover highlights
  const hoverTargets = [];

  if (settings.hover && !reducedMotion) {
    document.querySelectorAll(
      "a, button, [class*='card'], [class*='step'], .feature, .audience-card"
    ).forEach((el) => {
      if (el.closest(".qrfx-overlay")) return;

      el.classList.add("qrfx-hover-target");

      if (el.matches("a, button")) {
        el.classList.add("qrfx-button");
      }

      hoverTargets.push(el);
    });
  }

  // GLITCH ENGINE

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function getGlitchTargets() {
    const hero = document.querySelector(settings.glitchSelector);

    if (!hero) return [];

    const explicitlyMarked = [...hero.querySelectorAll("[data-glitch]")];

    if (explicitlyMarked.length) return explicitlyMarked;

    const targets = [];
    const heading = hero.querySelector("h1");
    const image = hero.querySelector("img, picture img, video");

    if (heading) targets.push(heading);
    if (image && image !== heading) targets.push(image);

    return targets;
  }

  function makeFragment(target, rect, topPercent, bottomPercent, shift, className) {
    const fragment = target.cloneNode(true);
    const style = getComputedStyle(target);

    fragment.classList.add("qrfx-glitch-fragment", className);
    fragment.removeAttribute?.("id");
    fragment.setAttribute?.("aria-hidden", "true");

    Object.assign(fragment.style, {
      position: "fixed",
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      maxWidth: "none",
      maxHeight: "none",
      minWidth: "0",
      minHeight: "0",
      margin: "0",
      padding: style.padding,
      border: style.border,
      borderRadius: style.borderRadius,
      boxSizing: "border-box",
      overflow: "hidden",
      objectFit: style.objectFit,
      objectPosition: style.objectPosition,
      font: style.font,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      textAlign: style.textAlign,
      color: style.color,
      background: style.background,
      opacity: "1",
      clipPath: `inset(${topPercent}% 0 ${100 - bottomPercent}% 0)`,
      webkitClipPath: `inset(${topPercent}% 0 ${100 - bottomPercent}% 0)`,
      transform: `translate3d(${shift}px, 0, 0)`,
    });

    if (target instanceof HTMLImageElement) {
      fragment.src = target.currentSrc || target.src;
      fragment.srcset = "";
      fragment.sizes = "";
    }

    document.body.appendChild(fragment);

    return fragment;
  }

  function clearGlitchFragments() {
    activeGlitchAnimations.forEach((animation) => animation.cancel());
    activeGlitchAnimations.clear();

    fragmentTimers.forEach((timer) => window.clearTimeout(timer));
    fragmentTimers.clear();

    document.querySelectorAll(".qrfx-glitch-fragment").forEach((el) => {
      el.remove();
    });
  }

  function glitchTarget(target) {
    if (!active || reducedMotion || document.hidden || !target?.isConnected) {
      return;
    }

    const rect = target.getBoundingClientRect();

    if (rect.width < 2 || rect.height < 2) return;
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    const sliceCount = Math.round(randomBetween(
      settings.glitchSlicesMin,
      settings.glitchSlicesMax
    ));

    const fragments = [];
    const sliceHeight = 100 / sliceCount;

    for (let i = 0; i < sliceCount; i += 1) {
      const top = i * sliceHeight;
      const bottom = (i + 1) * sliceHeight;

      const direction = Math.random() < 0.5 ? -1 : 1;
      const shift = direction * randomBetween(5, settings.glitchMaxShift);

      const colorClass = Math.random() < 0.5
        ? "qrfx-glitch-cyan"
        : "qrfx-glitch-red";

      const fragment = makeFragment(
        target,
        rect,
        top,
        bottom,
        shift,
        colorClass
      );

      fragments.push(fragment);

      if (typeof fragment.animate === "function") {
        const animation = fragment.animate(
          [
            {
              transform: `translate3d(${shift}px, 0, 0)`,
              opacity: 1,
              offset: 0,
            },
            {
              transform: `translate3d(${shift * 0.45}px, ${randomBetween(-1, 1)}px, 0)`,
              opacity: 0.96,
              offset: 0.38,
            },
            {
              transform: "translate3d(0, 0, 0)",
              opacity: 0,
              offset: 1,
            },
          ],
          {
            duration: settings.glitchDuration + randomBetween(-45, 55),
            easing: "steps(2, end)",
            fill: "forwards",
          }
        );

        activeGlitchAnimations.add(animation);

        animation.onfinish = () => {
          activeGlitchAnimations.delete(animation);
        };

        animation.oncancel = () => {
          activeGlitchAnimations.delete(animation);
        };
      }
    }

    const timer = window.setTimeout(() => {
      fragments.forEach((fragment) => fragment.remove());
      fragmentTimers.delete(timer);
    }, settings.glitchDuration + 180);

    fragmentTimers.add(timer);
  }

  function scheduleNextGlitch() {
    if (!active || reducedMotion || !settings.glitch || document.hidden) {
      return;
    }

    const delay = randomBetween(
      settings.glitchMinDelay,
      settings.glitchMaxDelay
    );

    glitchTimer = window.setTimeout(runGlitchBurst, delay);
  }

  function runGlitchBurst() {
    glitchTimer = null;

    if (!active || reducedMotion || !settings.glitch || document.hidden) {
      return;
    }

    if (!settings.glitchMobile && window.innerWidth <= 600) {
      scheduleNextGlitch();
      return;
    }

    const targets = getGlitchTargets().filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    if (targets.length) {
      const burstTargets = Math.random() < 0.72
        ? targets
        : [targets[Math.floor(Math.random() * targets.length)]];

      burstTargets.forEach(glitchTarget);
    }

    scheduleNextGlitch();
  }

  function pauseGlitch() {
    if (glitchTimer !== null) {
      window.clearTimeout(glitchTimer);
      glitchTimer = null;
    }

    clearGlitchFragments();
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      stopCanvas();
      pauseGlitch();
      return;
    }

    startCanvas();

    if (settings.glitch && !reducedMotion) {
      scheduleNextGlitch();
    }
  }

  document.addEventListener("visibilitychange", handleVisibilityChange);

  if (settings.glitch && !reducedMotion && !document.hidden) {
    glitchTimer = window.setTimeout(
      runGlitchBurst,
      randomBetween(1400, 2600)
    );
  }

  return function cleanupQrEffects() {
    active = false;

    stopCanvas();

    if (resizeRaf) {
      window.cancelAnimationFrame(resizeRaf);
      resizeRaf = 0;
    }

    if (glitchTimer !== null) {
      window.clearTimeout(glitchTimer);
      glitchTimer = null;
    }

    clearGlitchFragments();

    window.removeEventListener("resize", scheduleResize);
    document.removeEventListener("visibilitychange", handleVisibilityChange);

    observer?.disconnect();

    revealTargets.forEach((el) => {
      el.classList.remove("qrfx-reveal", "qrfx-visible");
      delete el.dataset.qrfxReveal;
    });

    hoverTargets.forEach((el) => {
      el.classList.remove("qrfx-hover-target", "qrfx-button");
    });

    overlay.remove();
    document.documentElement.classList.remove("qr-noise-enabled");
  };
}
