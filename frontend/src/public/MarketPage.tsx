import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./MarketPage.css";

type ProductType = "physical" | "digital";
type CategoryFilter = "all" | ProductType;
type ViewMode = "grid" | "list";
type SortMode = "newest" | "price-asc" | "price-desc";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ProductType;
  typeLabel: string;
  image: string;
  imageAlt: string;
  buttonLabel: string;
  vkUrl: string;
};

const products: Product[] = [
  {
    id: "codtexa-tshirt-v1",
    name: "Футболка CODTEXA V1",
    description: "Уникальный QR-код · Oversize · Чёрный",
    price: 4000,
    type: "physical",
    typeLabel: "Физический товар",
    image: "/images/hero-shirt.webp",
    imageAlt: "Чёрная футболка CODTEXA",
    buttonLabel: "Купить в VK",
    vkUrl:
      "https://vk.ru/market/product/futbolka-codtexa-243489852-14008255",
  },
  {
    id: "codtexa-stickers",
    name: "QR-наклейки CODTEXA",
    description: "10 фирменных наклеек · Винил · Влагостойкие",
    price: 1000,
    type: "physical",
    typeLabel: "Физический товар",
    image: "/images/QR-760.webp",
    imageAlt: "Набор фирменных QR-наклеек CODTEXA",
    buttonLabel: "Купить в VK",
    vkUrl:
      "https://vk.ru/market/product/qr-nakleyki-codtexa-243489852-14040248?with_group_header=1",
  },
  {
    id: "codtexa-digital-qr",
    name: "Цифровой QR-код",
    description: "Персональный QR-код · Онлайн-активация",
    price: 500,
    type: "digital",
    typeLabel: "Цифровой товар",
    image: "/images/QR-380.webp",
    imageAlt: "Цифровой QR-код CODTEXA",
    buttonLabel: "Заказать в VK",
    vkUrl:
      "https://vk.ru/market/product/tsifrovoy-qr-kod-243489852-14034074",
  },
];

const formatPrice = (price: number) =>
  `${price.toLocaleString("ru-RU")} ₽`;


export default function MarketPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const loadEffects = () => {
      // @ts-ignore
      import("./effects.js").then(({ initQrEffects }) => {
        if (cancelled) return;

        cleanup = initQrEffects({
          glitchSelector: ".market-hero",

          revealSelectors: [
            ".market-hero-content",
            ".market-toolbar",
            ".market-card",
            ".market-footer-top"
          ],

          revealSkipFirstSections: 0
        });
      });
    };

    loadEffects();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      return category === "all" || product.type === category;
    });

    if (sortMode === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortMode === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [category, sortMode]);

  return (
    <div className="market-page">
      <header className="market-header">
        <Link to="/" className="market-logo" aria-label="CODTEXA — главная">
          <img src="/favicon.svg" alt="" />
          <span>CODTEXA</span>
        </Link>

        <Link to="/" className="market-home-link">
          Главная
        </Link>
      </header>


      <main className="market-main">
        <section className="market-hero">
          <div className="market-hero-content">
            <span className="market-eyebrow">
              <span className="market-eyebrow-line" />
              ТОВАРЫ
            </span>

            <h1>
              Товары
              <br />
              CODTEXA
            </h1>

            <p>
              Физические и цифровые продукты экосистемы CODTEXA.
              <br />
              Выберите нужный формат.
            </p>
          </div>

          <img
            className="market-hero-image"
            src="/images/hero-shirt.webp"
            alt=""
            loading="lazy"
            decoding="async"
          />

          <div className="market-hero-corner" />
        </section>

        <section className="market-catalog" aria-label="Каталог товаров">
          <div className="market-toolbar">
            <div className="market-filters" aria-label="Фильтр товаров">
              <button
                type="button"
                className={`market-filter ${
                  category === "all" ? "is-active" : ""
                }`}
                onClick={() => setCategory("all")}
                aria-pressed={category === "all"}
              >
                Все товары
              </button>

              <button
                type="button"
                className={`market-filter ${
                  category === "physical" ? "is-active" : ""
                }`}
                onClick={() => setCategory("physical")}
                aria-pressed={category === "physical"}
              >
                Физические
              </button>

              <button
                type="button"
                className={`market-filter ${
                  category === "digital" ? "is-active" : ""
                }`}
                onClick={() => setCategory("digital")}
                aria-pressed={category === "digital"}
              >
                Цифровые
              </button>
            </div>

            <div className="market-tools">
              <label className="market-sort">
                <span className="market-sort-label">Сортировка</span>
                <select
                  value={sortMode}
                  onChange={(event) =>
                    setSortMode(event.target.value as SortMode)
                  }
                  aria-label="Сортировка товаров"
                >
                  <option value="newest">Сначала новые</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                </select>
                <span className="market-sort-arrow" aria-hidden="true">
                  ↓
                </span>
              </label>

              <div className="market-view-switch" aria-label="Вид каталога">
                <button
                  type="button"
                  className={`market-view-button ${
                    viewMode === "grid" ? "is-active" : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Показать сеткой"
                  aria-pressed={viewMode === "grid"}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>

                <button
                  type="button"
                  className={`market-view-button ${
                    viewMode === "list" ? "is-active" : ""
                  }`}
                  onClick={() => setViewMode("list")}
                  aria-label="Показать списком"
                  aria-pressed={viewMode === "list"}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 5h12M9 12h12M9 19h12" />
                    <circle cx="4" cy="5" r="1" />
                    <circle cx="4" cy="12" r="1" />
                    <circle cx="4" cy="19" r="1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className={`market-products market-products--${viewMode}`}
            aria-live="polite"
          >
            {visibleProducts.map((product) => (
              <article className="market-card" key={product.id}>
                <div className="market-card-image">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="market-product-type">
                    {product.typeLabel}
                  </span>
                </div>

                <div className="market-card-content">
                  <div className="market-card-info">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                  </div>

                  <div className="market-card-bottom">
                    <strong className="market-price">
                      {formatPrice(product.price)}
                    </strong>

                    <a
                      className="market-buy-button"
                      href={product.vkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M14 4h6v6" />
                        <path d="M20 4 11 13" />
                        <path d="M18 13v6H5V6h6" />
                      </svg>
                      {product.buttonLabel}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <p className="market-empty">
              В этой категории пока нет товаров.
            </p>
          )}
        </section>
      </main>

      <footer className="market-footer">
        <div className="market-footer-top">
          <Link to="/" className="market-logo" aria-label="CODTEXA — главная">
            <img src="/favicon.svg" alt="" />
            <span>CODTEXA</span>
          </Link>

          <nav className="market-footer-links" aria-label="Информация">
            <Link to="/faq">FAQ</Link>
            <Link to="/legal">Правовые документы</Link>
          </nav>

          <a
  href="https://vk.ru/codtexa"
  target="_blank"
  rel="noopener noreferrer"
  className="market-vk-link"
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

        <div className="market-footer-bottom">
          <span>© 2026 CODTEXA. Все права защищены.</span>
          <span>WEAR. SCAN. EXPLORE.</span>
        </div>
      </footer>
    </div>
  );
}
