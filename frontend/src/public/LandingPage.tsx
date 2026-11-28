import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";
import "./effects.css";




export default function LandingPage() {
  useEffect(() => {
  let cancelled = false;
  let cleanup: (() => void) | undefined;
  let idleId: number | undefined;
  let timeoutId: number | undefined;

  const loadEffects = () => {
    // @ts-ignore
    import("./effects.js").then(({ initQrEffects }) => {
      if (cancelled) return;
      cleanup = initQrEffects();
    });
  };

  if ("requestIdleCallback" in window) {
    idleId = window.requestIdleCallback(loadEffects, { timeout: 2000 });
  } else {
    timeoutId = globalThis.setTimeout(loadEffects, 500);
  }

  return () => {
    cancelled = true;

    if (idleId !== undefined) {
      window.cancelIdleCallback(idleId);
    }

    if (timeoutId !== undefined) {
      globalThis.clearTimeout(timeoutId);
    }

    cleanup?.();
  };
}, []);
  return (
    <div className="landing">

      <header className="landing-header">

        <div className="landing-logo">
  <img
    src="/favicon.svg"
    alt="CODTEXA"
    className="brand-logo"
  />

  <span className="brand-name">
    CODTEXA
  </span>
</div>

        <nav className="landing-nav landing-nav-home">
  <a href="#about">О продукте</a>
  <a href="#how">Как это работает</a>
  <a href="#possibilities">Возможности</a>
  <a href="#audience">Для кого</a>
  <Link to="/market">Магазин</Link>
</nav>

        <div className="landing-actions">
          <Link
            to="/login"
            className="landing-login"
          >
            Вход
          </Link>

          <Link
            to="/register"
            className="landing-register"
          >
            Регистрация
          </Link>
        </div>

      </header>
<main> 
      <section className="hero qrfx-hero">

        <div className="hero-overlay" />

        
<img
  src="/images/hero-shirt.webp"
  className="hero-bg"
  alt="CODTEXA"
  fetchPriority="high"
  loading="eager"
  decoding="async"
  data-glitch
/>


        <div className="hero-content">

          <h1 data-glitch>
  WEAR.
  <br />
  SCAN.
  <br />
  EXPLORE.
</h1>

          <h2>
            Больше, чем просто футболка.
          </h2>

          <p>
            Один QR-код.
            Безграничные возможности.
            Ваш цифровой профиль всегда под рукой.
          </p>

          <Link to="/market" className="hero-button">
  Купить футболку →
</Link>

<div className="hero-meta">

  <div className="hero-line" />

  <span>
    CODTEXA
  </span>

</div>

        </div>

      </section>

      <section
        id="about"
        className="block about"
      >

        <div className="block-image">

          <img
  src="/images/cta-placeholder-750-optimized.webp"
  srcSet="
    /images/cta-placeholder-450-optimized.webp 450w,
    /images/cta-placeholder-750-optimized.webp 750w,
    /images/cta-placeholder-900-optimized.webp 900w
  "
  sizes="
    (max-width: 600px) calc(100vw - 40px),
    (max-width: 900px) calc(100vw - 60px),
    (max-width: 1200px) calc((100vw - 100px) / 2),
    (max-width: 1600px) calc((100vw - 10vw - 120px) / 2),
    720px
  "
  alt=""
  loading="lazy"
  decoding="async"
/>
        </div>

        <div className="block-content">

          <span className="section-number">
            01 — О ПРОДУКТЕ
          </span>

          <h2>
            Футболка
            <br />
            с QR-кодом
          </h2>

          <p>
            Каждая футболка содержит
            уникальный QR-код, который
            подтверждает владение и открывает
            доступ к вашему цифровому профилю.
          </p>

          <div className="advantages">

            <div>
  <img
    src="/icons/Infinity.svg"
    alt=""
    className="advantage-icon"
  />

  <span>
    Безлимитная
    смена данных
  </span>
</div>

<div>
  <img
    src="/icons/Zap.svg"
    alt=""
    className="advantage-icon"
  />

  <span>
    Быстрая
    активация
  </span>
</div>

<div>
  <img
    src="/icons/ShieldCheck.svg"
    alt=""
    className="advantage-icon"
  />

  <span>
    Защита
    подлинности
  </span>
</div>

          </div>

        </div>

      </section>

      <section
  id="how"
  className="split-section"
>

  <div className="split-left">

    <span className="section-number">
      02 — КАК ЭТО РАБОТАЕТ
    </span>

    <h2>
      Легко.
      <br />
      Быстро.
      <br />
      Удобно.
    </h2>

    <p>
      Активируйте футболку за несколько
      минут и управляйте своим цифровым
      профилем через личный кабинет.
    </p>

    <Link
      to="/register"
      className="hero-button"
    >
      Начать →
    </Link>

  </div>

  <div className="cards">

  <div className="card-box">

  <h3>1</h3>

  <p>Получите футболку</p>

  <img
    src="/icons/Shirt.svg"
    alt=""
    className="step-icon"
  />

</div>

  <div className="flow-arrow">
    →
  </div>

  <div className="card-box">
  <h3>2</h3>

  <p>Введите код активации</p>

  <img
    src="/icons/CreditCard.svg"
    alt=""
    className="step-icon"
  />
</div>

  <div className="flow-arrow">
    →
  </div>

  <div className="card-box">
  <h3>3</h3>

  <p>Активируйте изделие</p>

  <img
    src="/icons/Link.svg"
    alt=""
    className="step-icon"
  />
</div>


  <div className="flow-arrow">
    →
  </div>

  <div className="card-box">
  <h3>4</h3>

  <p>Управляйте профилем</p>

  <img
    src="/icons/ScanQrCode.svg"
    alt=""
    className="step-icon"
  />
</div>

  </div>

</section>

      <section id="possibilities" 
      className="split-section">

  <div className="split-left">

    <span className="section-number">
      03 — ВОЗМОЖНОСТИ
    </span>

    <h2>
      Что можно связать
      с QR-кодом?
    </h2>

    <p>
      CODTEXA позволяет объединить
      физическую одежду с цифровым
      контентом и данными владельца.
    </p>

    <a
  href="https://vk.ru/codtexa"
  target="_blank"
  rel="noopener noreferrer"
  className="hero-button"
>
  Узнать больше →
</a>

  </div>

  <div className="split-right">

    <div className="features-grid">

      <div className="feature">
    <img
      src="/icons/Send.svg"
      alt=""
      className="feature-icon"
    />
    <span>Социальные сети</span>
  </div>

  <div className="feature">
    <img
      src="/icons/Globe.svg"
      alt=""
      className="feature-icon"
    />
    <span>Личный сайт и портфолио</span>
  </div>

  <div className="feature">
    <img
      src="/icons/Music4.svg"
      alt=""
      className="feature-icon"
    />
    <span>Музыка и афиша мероприятий</span>
  </div>

  <div className="feature">
    <img
      src="/icons/BriefcaseBusiness.svg"
      alt=""
      className="feature-icon"
    />
    <span>Профессиональная визитка</span>
  </div>

  <div className="feature">
    <img
      src="/icons/BadgePercent.svg"
      alt=""
      className="feature-icon"
    />
    <span>Промо-акции и реклама</span>
  </div>

  <div className="feature">
    <img
      src="/icons/Plus.svg"
      alt=""
      className="feature-icon"
    />
    <span>И многое другое...</span>
  </div>

    </div>

  </div>

</section>

      <section id="audience"
  className="split-section">

  <div className="split-left">

    <span className="section-number">
      04 — ДЛЯ КОГО
    </span>

    <h2>
      Для всех,
      кто ценит
      подлинность
    </h2>

    <p>
      Для создателей, брендов,
      коллекционеров и всех, кто хочет
      связать реальный продукт
      с цифровым пространством.
    </p>

  </div>

  <div className="split-right">

    <div className="audience-grid">

  <div
    className="audience-card"
    style={{
      backgroundImage: "url('/images/collector-optimized.webp')"
    }}
  >
    Зумеры
  </div>

  <div
    className="audience-card"
    style={{
      backgroundImage: "url('/images/blogger-optimized.webp')"
    }}
  >
    Блогеры
  </div>

  <div
    className="audience-card"
    style={{
      backgroundImage: "url('/images/musician-optimized.webp')"
    }}
  >
    Музыканты
  </div>

  <div
    className="audience-card"
    style={{
      backgroundImage: "url('/images/spicer-optimized.webp')"
    }}
  >
    Спикеры
  </div>

  <div
    className="audience-card"
    style={{
      backgroundImage: "url('/images/actor-optimized.webp')"
    }}
  >
    Модели
  </div>

</div>

  </div>

</section>


      <section className="cta">

  <div className="cta-image">

  <img
    src="/images/QR-760.webp"
    srcSet="
      /images/QR-380.webp 380w,
      /images/QR-760.webp 760w
    "
    sizes="
      (max-width: 600px) calc(100vw - 32px),
      (max-width: 900px) calc((100vw - 80px) / 2),
      (max-width: 1600px) calc((100vw - 80px) * 0.405),
      648px
    "
    alt="CODTEXA"
    loading="lazy"
    decoding="async"
  />

</div>

  <div className="cta-content">

    <h2>
      CODTEXA
    </h2>

    <h3>
      Технология. Стиль. Свобода.
    </h3>

    <p>
      Присоединяйтесь к новому поколению
      умной одежды.
    </p>

    <Link to="/market" className="hero-button">
  Купить сейчас →
</Link>

  </div>

</section>
</main>
      <footer id="contacts" className="footer">
  <div className="footer-inner">

    <div className="footer-top">

      <div className="footer-brand">
  <img
    src="/favicon.svg"
    alt="CODTEXA"
    className="brand-logo"
  />

  <span className="brand-name">
    CODTEXA
  </span>
</div>

      <div className="footer-center">

        <div className="footer-links">

          <Link to="/faq">
            FAQ
          </Link>

          <Link to="/legal">
            Правовые документы
          </Link>

        </div>

      </div>

      <div className="footer-socials">

        <a
  href="https://vk.ru/codtexa"
  target="_blank"
  rel="noopener noreferrer"
  className="vk-link"
  aria-label="CODTEXA во ВКонтакте"
>
  <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
>
  <path d="M12.785 16.77c-5.52 0-8.67-3.79-8.8-10.1h2.77c.09 4.64 2.13 6.6 3.74 7V6.67h2.6v4c1.58-.17 3.26-2 3.82-4h2.6c-.43 2.25-2.25 4.08-3.45 4.83 1.2.61 3.26 2.2 4.04 5.27h-2.86c-.61-1.91-2.15-3.39-4.15-3.59v3.59h-.31Z" />
</svg>
</a>

      </div>

    </div>

    <div className="footer-bottom">

      <div className="footer-copyright">
        © 2026 CODTEXA. Все права защищены.
      </div>

      <div className="footer-slogan">
        WEAR. SCAN. EXPLORE.
      </div>

    </div>

  </div>
</footer>

    </div>
  );
}