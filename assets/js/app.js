/* =========================================================================
   ABODHI — Application core
   Vanilla JS state, hash router, cart, search, language, overlays & helpers
   ========================================================================= */
(() => {
  "use strict";

  const D = window.ABODHI_DATA;
  const { CATEGORIES, PRODUCTS, ARTICLES, TESTIMONIALS, FAQ, PROCESS, PILLARS, STATS, UI } = D;

  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));
  const icon = (name, cls = "") => `<svg class="icon ${cls}" aria-hidden="true"><use href="#${name}"></use></svg>`;
  const SHIPPING_FEE = 30000;
  const DEMO_ORDER_ID = "ABD-261108-1024";

  const loadJSON = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  };
  const saveJSON = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) { /* storage may be unavailable */ }
  };

  const storedCart = loadJSON("abodhi_cart_v1", []);
  const state = {
    lang: (localStorage.getItem("abodhi_lang") === "en" ? "en" : "vi"),
    route: { view: "home", slug: "", query: new URLSearchParams() },
    cart: Array.isArray(storedCart) ? storedCart.filter((i) => i && i.productId && i.optionId && i.qty > 0) : [],
    wishlist: loadJSON("abodhi_wishlist_v1", []),
    coupon: "",
    orders: loadJSON("abodhi_orders_v1", []),
    lastOrder: loadJSON("abodhi_last_order_v1", null),
    shop: {
      category: "all",
      sub: "all",
      minPrice: 0,
      maxPrice: 10000000,
      query: "",
      sort: "default",
      page: 1
    },
    productSelections: {},
    checkout: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      note: "",
      consent: false
    },
    payment: "cod",
    newsCat: "all",
    quoteProductId: null,
    ready: false
  };

  /* -----------------------------------------------------------------------
     Language & formatting
     ----------------------------------------------------------------------- */
  function t(key, vars) {
    let text = (UI[state.lang] && UI[state.lang][key]) || (UI.vi && UI.vi[key]) || key;
    if (vars) {
      Object.keys(vars).forEach((k) => { text = text.replace(new RegExp(`\\{${k}\\}`, "g"), vars[k]); });
    }
    return text;
  }
  function tx(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[state.lang] || value.vi || Object.values(value)[0] || "";
  }
  function money(value) {
    if (value == null) return t("contactForPrice");
    const n = Number(value);
    return new Intl.NumberFormat(state.lang === "vi" ? "vi-VN" : "en-US").format(n) + "₫";
  }
  function percent(value, compareAt) {
    if (!value || !compareAt || compareAt <= value) return null;
    return "-" + Math.round(((compareAt - value) / compareAt) * 100) + "%";
  }
  function formatDate(iso) {
    const date = new Date(iso + (iso.length <= 10 ? "T12:00:00" : ""));
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString(state.lang === "vi" ? "vi-VN" : "en-GB", { day: "2-digit", month: "long", year: "numeric" });
  }
  function formatDateTime(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleString(state.lang === "vi" ? "vi-VN" : "en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }
  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

  /* -----------------------------------------------------------------------
     Data lookups
     ----------------------------------------------------------------------- */
  const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
  const getProductBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);
  const getArticleBySlug = (slug) => ARTICLES.find((a) => a.slug === slug);
  const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
  const getCategoryBySub = (sub) => CATEGORIES.find((c) => c.subs.some((s) => s.id === sub));
  const getSub = (catId, subId) => {
    const cat = getCategory(catId);
    return cat ? cat.subs.find((s) => s.id === subId) : null;
  };
  const catName = (p) => tx(getCategory(p.cat)?.name) || p.cat;
  const badgeLabel = (badge) => {
    const map = { bestseller: "bestseller", new: "new", limited: "limited", oneofakind: "oneofakind", bespoke: "bespoke" };
    return map[badge] ? t(map[badge]) : "";
  };

  /* -----------------------------------------------------------------------
     Product option helpers
     ----------------------------------------------------------------------- */
  function defaultSelection(product) {
    if (!product) return null;
    if (product.jewelrySpec) {
      const size = product.jewelrySpec.sizes[0];
      const count = product.jewelrySpec.counts[0];
      return { optionId: `${size.id}:${count.id}`, sizeId: size.id, countId: count.id, qty: 1 };
    }
    if (product.options && product.options.length) {
      return { optionId: product.options[0].id, sizeId: null, countId: null, qty: 1 };
    }
    return { optionId: "default", sizeId: null, countId: null, qty: 1 };
  }

  function resolveOption(product, selection) {
    if (!product) return null;
    if (product.jewelrySpec) {
      const sizes = product.jewelrySpec.sizes;
      const counts = product.jewelrySpec.counts;
      let size = sizes.find((s) => s.id === selection?.sizeId);
      let count = counts.find((c) => c.id === selection?.countId);
      if (!size && selection?.optionId?.includes(":")) {
        const [sid, cid] = selection.optionId.split(":");
        size = sizes.find((s) => s.id === sid);
        count = counts.find((c) => c.id === cid);
      }
      size = size || sizes[0];
      count = count || counts[0];
      return {
        id: `${size.id}:${count.id}`,
        sizeId: size.id,
        countId: count.id,
        label: `${tx(size.label)} / ${tx(count.label)}`,
        price: count.price + size.add,
        stock: Math.min(size.stock, count.stock),
        size,
        count
      };
    }
    const opts = product.options || [];
    const opt = opts.find((o) => o.id === selection?.optionId) || opts[0];
    if (!opt) {
      return { id: "default", label: tx(product.subtitle), price: product.price, stock: product.stock ?? 10, size: null, count: null };
    }
    return {
      id: opt.id,
      sizeId: null,
      countId: null,
      label: tx(opt.label),
      price: opt.price,
      compareAt: opt.compareAt || product.compareAt,
      stock: opt.stock ?? product.stock ?? 10,
      option: opt
    };
  }

  function productFromPrice(product) {
    if (product.price == null) return null;
    if (product.jewelrySpec) {
      return Math.min(...product.jewelrySpec.counts.map((c) => c.price)) + product.jewelrySpec.sizes[0].add;
    }
    if (product.options && product.options.length) {
      return Math.min(...product.options.filter((o) => o.price != null).map((o) => o.price));
    }
    return product.price;
  }

  function productCompareAt(product) {
    if (product.compareAt) return product.compareAt;
    const def = defaultSelection(product);
    const option = resolveOption(product, def);
    return option?.compareAt || null;
  }

  function cartKey(item) { return `${item.productId}::${item.optionId}`; }

  function cartLines() {
    return state.cart.map((item) => {
      const product = getProduct(item.productId);
      if (!product) return null;
      const option = resolveOption(product, item);
      if (!option) return null;
      return {
        key: cartKey(item),
        item,
        product,
        option,
        qty: item.qty,
        lineTotal: option.price * item.qty
      };
    }).filter(Boolean);
  }

  function cartTotals() {
    const lines = cartLines();
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const discount = state.coupon === "ABODHI10" ? Math.round(subtotal * 0.1) : 0;
    const shipping = lines.length ? SHIPPING_FEE : 0;
    return { lines, subtotal, discount, shipping, total: Math.max(0, subtotal - discount + shipping), count: lines.reduce((n, line) => n + line.qty, 0) };
  }

  /* -----------------------------------------------------------------------
     SVG / UI helpers
     ----------------------------------------------------------------------- */
  function stars(rating = 5, count = null, cls = "") {
    const filled = Math.round(Number(rating) || 0);
    let html = `<span class="stars ${cls}" aria-label="${rating} / 5">`;
    for (let i = 1; i <= 5; i++) html += icon("i-star", i <= filled ? "" : "is-empty");
    html += "</span>";
    if (count != null) html += `<span class="rating-count">(${count})</span>`;
    return html;
  }

  function badgesFor(product) {
    const items = [];
    if (product.badge) items.push(`<span class="product-badge ${product.badge === "new" ? "badge-gold" : product.badge === "oneofakind" || product.badge === "bespoke" ? "badge-dark" : ""}">${badgeLabel(product.badge)}</span>`);
    const value = productFromPrice(product);
    const pct = percent(value, productCompareAt(product));
    if (pct) items.push(`<span class="product-badge badge-gold">${pct}</span>`);
    return items.join("");
  }

  function productCard(product, opts = {}) {
    if (!product) return "";
    const name = tx(product.name);
    const short = tx(product.short);
    const cat = catName(product);
    const fromPrice = productFromPrice(product);
    const compareAt = productCompareAt(product);
    const isQuote = product.quoteOnly;
    const isContact = product.contactOnly;
    const altImage = product.images && product.images[1] ? product.images[1] : "";
    const wish = state.wishlist.includes(product.id);

    let action = "";
    if (isQuote) {
      action = `<button class="card-add is-quote" type="button" data-quote="${product.id}" aria-label="${escapeHtml(t("quoteRequest"))}">${icon("i-quote")}<span>${escapeHtml(t("quoteRequest"))}</span></button>`;
    } else if (isContact) {
      action = `<a class="card-add is-quote" href="#/product/${product.slug}" aria-label="${escapeHtml(t("consult"))}">${icon("i-phone")}<span>${escapeHtml(t("consult"))}</span></a>`;
    } else {
      action = `<button class="card-add" type="button" data-add="${product.id}" aria-label="${escapeHtml(t("addToCart"))} ${escapeHtml(name)}">${icon("i-plus")}</button>`;
    }

    const priceHtml = fromPrice == null
      ? `<span class="price-contact">${escapeHtml(t("contactForPrice"))}</span>`
      : `<div class="price">${product.jewelrySpec || (product.options && product.options.length > 1) ? `<span class="price-from">${escapeHtml(t("from"))}</span>` : ""}<span class="price-now">${money(fromPrice)}</span>${compareAt ? `<span class="price-old">${money(compareAt)}</span>` : ""}</div>`;

    return `
      <article class="product-card${opts.className ? " " + opts.className : ""}" data-product-id="${product.id}">
        <a class="product-media" href="#/product/${product.slug}" aria-label="${escapeHtml(name)}">
          <img class="img-main" src="${product.images[0]}" alt="${escapeHtml(name)}" loading="lazy" />
          ${altImage ? `<img class="img-alt" src="${altImage}" alt="" loading="lazy" aria-hidden="true" />` : ""}
          <span class="product-badges">${badgesFor(product)}</span>
          <span class="wish-btn${wish ? " is-active" : ""}" role="button" tabindex="0" aria-label="${escapeHtml(t("favorite") || "Wishlist")}" data-wishlist="${product.id}">${icon("i-heart")}</span>
          <span class="product-quick"><span class="btn">${escapeHtml(t("viewProduct"))} ${icon("i-arrow-right")}</span></span>
        </a>
        <div class="product-body">
          <div class="product-meta">
            <span class="product-cat">${escapeHtml(cat)}</span>
            <span class="product-rating">${stars(product.rating || 5)}<span>${Number(product.rating || 5).toFixed(1)}</span></span>
          </div>
          <h3 class="product-title"><a href="#/product/${product.slug}">${escapeHtml(name)}</a></h3>
          <p class="product-short">${escapeHtml(short)}</p>
          <div class="product-foot">
            ${priceHtml}
            ${action}
          </div>
        </div>
      </article>`;
  }

  function sectionHead({ eyebrow, title, lead, link, linkText, className = "" }) {
    return `
      <div class="section-head ${className}">
        <div class="section-head-left">
          ${eyebrow ? `<span class="eyebrow reveal">${escapeHtml(eyebrow)}</span>` : ""}
          <h2 class="section-title reveal">${title}</h2>
          ${lead ? `<p class="section-lead reveal">${escapeHtml(lead)}</p>` : ""}
        </div>
        ${link ? `<div class="section-head-right reveal"><a class="text-link" href="${link}">${escapeHtml(linkText || t("viewAll"))} ${icon("i-arrow-right")}</a></div>` : ""}
      </div>`;
  }

  function breadcrumb(items) {
    return `<nav class="breadcrumb" aria-label="Breadcrumb">${items.map((item, i) => {
      const label = escapeHtml(item.label);
      const sep = i < items.length - 1 ? icon("i-chevron-right") : "";
      return item.href ? `<a href="${item.href}">${label}</a>${sep}` : `<span class="current">${label}</span>`;
    }).join("")}</nav>`;
  }

  /* -----------------------------------------------------------------------
     Router
     ----------------------------------------------------------------------- */
  const VALID_VIEWS = ["home", "about", "shop", "product", "cart", "checkout", "order-confirmation", "tracking", "news", "contact"];

  function parseRoute() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    const [pathPart, queryPart = ""] = raw.split("?");
    const segments = pathPart.split("/").filter(Boolean);
    return {
      view: segments[0] || "home",
      slug: segments[1] || "",
      query: new URLSearchParams(queryPart)
    };
  }

  function navigate(path) {
    const next = path.startsWith("#") ? path : `#/${path.replace(/^\/+/, "")}`;
    if (location.hash === next) {
      handleRoute();
    } else {
      location.hash = next;
    }
  }

  function applyRouteQuery(route) {
    state.route = route;
    if (route.view === "shop") {
      const q = route.query;
      const cat = q.get("category");
      state.shop.category = cat && getCategory(cat) ? cat : "all";
      const sub = q.get("sub");
      state.shop.sub = sub && getCategoryBySub(sub) ? sub : "all";
      state.shop.query = q.get("q") || "";
      state.shop.minPrice = Math.max(0, Number(q.get("min")) || 0);
      state.shop.maxPrice = q.get("max") ? Math.max(0, Number(q.get("max"))) : 10000000;
      state.shop.page = Math.max(1, Number(q.get("page")) || 1);
      state.shop.sort = q.get("sort") || "default";
    }
  }

  function syncShopUrl() {
    if (state.route.view !== "shop") return;
    const q = new URLSearchParams();
    if (state.shop.category !== "all") q.set("category", state.shop.category);
    if (state.shop.sub !== "all") q.set("sub", state.shop.sub);
    if (state.shop.query) q.set("q", state.shop.query);
    if (state.shop.minPrice > 0) q.set("min", state.shop.minPrice);
    if (state.shop.maxPrice < 10000000) q.set("max", state.shop.maxPrice);
    if (state.shop.sort !== "default") q.set("sort", state.shop.sort);
    if (state.shop.page > 1) q.set("page", state.shop.page);
    const hash = `#/shop${q.toString() ? "?" + q.toString() : ""}`;
    history.replaceState(null, "", hash);
  }

  function handleRoute() {
    const route = parseRoute();
    if (!VALID_VIEWS.includes(route.view)) route.view = "notfound";
    applyRouteQuery(route);
    closeAllOverlays();
    closeMobileNav();
    renderCurrentPage(true);
  }

  function renderCurrentPage(scrollTop = true) {
    const app = $("#app");
    if (!app) return;
    let html = "";
    try {
      switch (state.route.view) {
        case "home": html = renderHomePage(); break;
        case "about": html = renderAboutPage(); break;
        case "shop": html = renderShopPage(); break;
        case "product": html = renderProductPage(state.route.slug); break;
        case "cart": html = renderCartPage(); break;
        case "checkout": html = renderCheckoutPage(); break;
        case "order-confirmation": html = renderOrderConfirmationPage(); break;
        case "tracking": html = renderTrackingPage(); break;
        case "news": html = renderNewsPage(); break;
        case "contact": html = renderContactPage(); break;
        default: html = renderNotFoundPage(); break;
      }
    } catch (err) {
      console.error(err);
      html = renderErrorPage();
    }
    app.innerHTML = html;
    app.classList.remove("view-enter");
    void app.offsetWidth;
    app.classList.add("view-enter");
    document.body.classList.toggle("route-product", state.route.view === "product");
    if (state.route.view !== "shop") document.body.classList.remove("filter-open");
    syncCartCount();
    updateActiveNav();
    updateDocumentMeta();
    observeReveals();
    if (scrollTop) window.scrollTo({ top: 0, behavior: "instant" });
  }

  /* -----------------------------------------------------------------------
     Static UI / footer / mega menu / language
     ----------------------------------------------------------------------- */
  function applyStaticLanguage() {
    document.documentElement.lang = state.lang;
    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    $$("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key) el.setAttribute("placeholder", t(key));
    });
    $$("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key) el.setAttribute("aria-label", t(key));
    });
    $$(".lang-btn").forEach((btn) => {
      const active = btn.dataset.lang === state.lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    const year = $("#copyrightYear");
    if (year) year.textContent = new Date().getFullYear();
    buildCategoryNavigation();
    updateActiveNav();
    updateDocumentMeta();
    renderCartDrawer();
    updateSearchPlaceholder();
  }

  function buildCategoryNavigation() {
    const footer = $("#footerCategories");
    if (footer) {
      footer.innerHTML = CATEGORIES.map((cat) => `<li><a href="#/shop?category=${cat.id}">${escapeHtml(tx(cat.name))}</a></li>`).join("");
    }
    const mega = $("#megaGrid");
    if (mega) {
      mega.innerHTML = CATEGORIES.map((cat) => `
        <div class="mega-cat">
          <a class="mega-cat-head" href="#/shop?category=${cat.id}">
            <span class="mega-cat-icon">${icon(cat.icon)}</span>
            <span>
              <span class="mega-cat-title">${escapeHtml(tx(cat.name))}</span>
              <span class="mega-cat-sub">${escapeHtml(tx(cat.tagline))}</span>
            </span>
          </a>
          <div class="mega-subs">
            ${cat.subs.slice(0, 4).map((sub) => `<a href="#/shop?category=${cat.id}&sub=${sub.id}">${escapeHtml(tx(sub.name))}</a>`).join("")}
            <a href="#/shop?category=${cat.id}" style="color:var(--emerald-700);font-weight:600">${escapeHtml(t("viewAll"))} ${icon("i-arrow-right", "icon-xs")}</a>
          </div>
        </div>`).join("");
    }
    const mobile = $("#mobileCategories");
    if (mobile) {
      mobile.innerHTML = CATEGORIES.map((cat) => `<a href="#/shop?category=${cat.id}">${icon(cat.icon)}${escapeHtml(tx(cat.name))}</a>`).join("");
    }
  }

  function updateSearchPlaceholder() {
    const input = $("#searchInput");
    if (input) input.placeholder = t("searchPlaceholder");
  }

  function updateActiveNav() {
    const map = { home: "home", about: "about", shop: "shop", product: "shop", news: "news", contact: "contact" };
    const active = map[state.route.view] || "";
    $$("[data-nav]").forEach((el) => {
      const isActive = el.dataset.nav === active;
      el.classList.toggle("is-active", isActive);
      if (isActive) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    });
  }

  function updateDocumentMeta() {
    const route = state.route;
    let title = state.lang === "vi"
      ? "Trầm Hương Abodhi — Trầm hương tự nhiên · An yên · Từ tâm"
      : "Abodhi — Natural Agarwood · Serenity · From the Heart";
    let desc = state.lang === "vi"
      ? "Trầm Hương Abodhi — Nhang trầm, trang sức, tinh dầu, nước cất, trà và mỹ nghệ trầm hương tự nhiên. Chế tác thủ công, minh bạch nguồn gốc."
      : "Abodhi — Natural agarwood incense, jewellery, essential oils, distilled waters, tea and art. Handcrafted with traceable origins.";
    if (route.view === "about") {
      title = `${state.lang === "vi" ? "Giới thiệu" : "About"} — Trầm Hương Abodhi`;
      desc = t("aboutLead");
    } else if (route.view === "shop") {
      title = `${state.lang === "vi" ? "Sản phẩm" : "Shop"} — Trầm Hương Abodhi`;
      desc = t("shopSubtitle");
    } else if (route.view === "product") {
      const p = getProductBySlug(route.slug);
      if (p) { title = `${tx(p.name)} — Trầm Hương Abodhi`; desc = tx(p.short); }
    } else if (route.view === "news" && route.slug) {
      const article = getArticleBySlug(route.slug);
      if (article) { title = `${tx(article.title)} — Trầm Hương Abodhi`; desc = tx(article.excerpt); }
    } else if (route.view === "news") {
      title = `${t("newsTitle2")} — Trầm Hương Abodhi`;
      desc = t("newsSubtitle2");
    } else if (route.view === "cart") {
      title = `${t("cartTitle")} — Trầm Hương Abodhi`;
    } else if (route.view === "checkout") {
      title = `${t("checkoutTitle")} — Trầm Hương Abodhi`;
    } else if (route.view === "tracking") {
      title = `${t("orderTracking")} — Trầm Hương Abodhi`;
    } else if (route.view === "order-confirmation") {
      title = `${t("orderConfirmed")} — Trầm Hương Abodhi`;
    } else if (route.view === "contact") {
      title = `${t("contactTitle")} — Trầm Hương Abodhi`;
      desc = t("contactLead");
    } else if (route.view === "notfound") {
      title = `${t("notFoundTitle")} — Trầm Hương Abodhi`;
      desc = t("notFoundDesc");
    }
    document.title = title;
    const meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
    const ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    const ogLocale = $('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", state.lang === "vi" ? "vi_VN" : "en_US");
  }

  /* -----------------------------------------------------------------------
     Header / overlays / global interactions
     ----------------------------------------------------------------------- */
  let revealObserver = null;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("in-view"));
      return;
    }
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => revealObserver.observe(el));
  }

  function initHeader() {
    const header = $("#siteHeader");
    const progress = $("#headerProgress");
    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > 18);
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = max > 0 ? `${clamp((y / max) * 100, 0, 100)}%` : "0%";
      }
      const top = $("#backToTop");
      if (top) top.classList.toggle("is-visible", y > 640);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const megaWrap = $("#megaWrap");
    if (megaWrap) {
      const trigger = $(".nav-link-mega", megaWrap);
      const setOpen = (open) => {
        megaWrap.classList.toggle("is-open", open);
        document.body.classList.toggle("mega-open", open);
        if (trigger) trigger.setAttribute("aria-expanded", String(open));
      };
      megaWrap.addEventListener("mouseenter", () => setOpen(true));
      megaWrap.addEventListener("mouseleave", () => setOpen(false));
      megaWrap.addEventListener("focusin", () => setOpen(true));
      megaWrap.addEventListener("focusout", (e) => {
        if (!megaWrap.contains(e.relatedTarget)) setOpen(false);
      });
    }

    $("#openSearch")?.addEventListener("click", openSearch);
    $("#closeSearch")?.addEventListener("click", closeSearch);
    $("#openCart")?.addEventListener("click", () => { renderCartDrawer(); openCart(); });
    $("#closeCart")?.addEventListener("click", closeCart);
    $("#menuToggle")?.addEventListener("click", openMobileNav);
    $("#closeMobileNav")?.addEventListener("click", closeMobileNav);
    $("#backToTop")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    $$("[data-close-cart]").forEach((el) => el.addEventListener("click", closeCart));
    $$("[data-close-search]").forEach((el) => el.addEventListener("click", closeSearch));
    $$("[data-close-quote]").forEach((el) => el.addEventListener("click", closeQuote));
    $("#closeLightbox")?.addEventListener("click", closeLightbox);

    const searchInput = $("#searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", () => renderSearchResults(searchInput.value));
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const first = $("#searchResults a");
          if (first) first.click();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      const typing = tag === "input" || tag === "textarea" || tag === "select";
      if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") closeAllOverlays();
    });

    document.addEventListener("click", (e) => {
      const tEl = e.target.closest("[data-lang]");
      if (tEl) setLanguage(tEl.dataset.lang);
      const searchChip = e.target.closest("[data-search-q]");
      if (searchChip) {
        const input = $("#searchInput");
        if (input) { input.value = searchChip.dataset.searchQ; input.focus(); renderSearchResults(input.value); }
      }
      if (e.target.closest("[data-close-search]")) closeSearch();
      if (e.target.closest("[data-close-cart]")) closeCart();
    });

    window.addEventListener("hashchange", handleRoute);
  }

  function setLanguage(lang) {
    if (!["vi", "en"].includes(lang) || lang === state.lang) return;
    state.lang = lang;
    localStorage.setItem("abodhi_lang", lang);
    applyStaticLanguage();
    renderCurrentPage(false);
    renderCartDrawer();
    if ($("#searchModal")?.classList.contains("is-open")) {
      renderSearchQuick();
      renderSearchResults($("#searchInput")?.value || "");
    }
    showToast(lang === "vi" ? "Đã chuyển sang Tiếng Việt" : "Switched to English", lang === "vi" ? "Ngôn ngữ đã được cập nhật." : "Language updated.");
  }

  function openMobileNav() {
    const el = $("#mobileNav");
    if (!el) return;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    $("#menuToggle")?.setAttribute("aria-expanded", "true");
    syncScrollLock();
  }
  function closeMobileNav() {
    const el = $("#mobileNav");
    if (!el) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    $("#menuToggle")?.setAttribute("aria-expanded", "false");
    syncScrollLock();
  }
  function openCart() {
    const el = $("#cartDrawer");
    if (!el) return;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    syncScrollLock();
  }
  function closeCart() {
    const el = $("#cartDrawer");
    if (!el) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    syncScrollLock();
  }
  function openSearch() {
    const el = $("#searchModal");
    if (!el) return;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    renderSearchQuick();
    renderSearchResults($("#searchInput")?.value || "");
    syncScrollLock();
    setTimeout(() => $("#searchInput")?.focus(), 180);
  }
  function closeSearch() {
    const el = $("#searchModal");
    if (!el) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    syncScrollLock();
  }
  function openQuote(productId) {
    const product = getProduct(productId);
    state.quoteProductId = productId;
    const modal = $("#quoteModal");
    if (!modal) return;
    const intro = $("#quoteIntro");
    if (intro) {
      intro.innerHTML = product
        ? `${escapeHtml(t("quoteIntro"))} <strong style="color:var(--emerald-800)">${escapeHtml(tx(product.name))}</strong>`
        : escapeHtml(t("quoteIntro"));
    }
    $("#quoteForm")?.reset();
    const pid = $("#quoteProductId");
    if (pid) pid.value = productId || "";
    $$("#quoteForm .field").forEach((f) => f.classList.remove("has-error"));
    const form = $("#quoteForm");
    const success = $("#quoteSuccess");
    if (form) form.hidden = false;
    if (success) success.hidden = true;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    syncScrollLock();
    setTimeout(() => $("#quoteName")?.focus(), 180);
  }
  function closeQuote() {
    const modal = $("#quoteModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    state.quoteProductId = null;
    syncScrollLock();
  }
  function openLightbox(src, alt = "") {
    const box = $("#lightbox");
    const img = $("#lightboxImage");
    if (!box || !img) return;
    img.src = src;
    img.alt = alt;
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
    syncScrollLock();
  }
  function closeLightbox() {
    const box = $("#lightbox");
    if (!box) return;
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
    syncScrollLock();
  }
  function closeAllOverlays() {
    closeSearch();
    closeCart();
    closeQuote();
    closeLightbox();
    document.body.classList.remove("filter-open");
    document.body.classList.remove("mega-open");
    const megaWrap = $("#megaWrap");
    if (megaWrap) {
      megaWrap.classList.remove("is-open");
      $(".nav-link-mega", megaWrap)?.setAttribute("aria-expanded", "false");
    }
  }
  function syncScrollLock() {
    const anyOpen = ["#mobileNav", "#cartDrawer", "#searchModal", "#quoteModal", "#lightbox"].some((sel) => $(sel)?.classList.contains("is-open"));
    document.body.classList.toggle("drawer-open", anyOpen);
  }

  function showToast(title, sub = "", linkText = "", linkHref = "") {
    const stack = $("#toastStack");
    if (!stack) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `
      <span class="toast-icon">${icon("i-check")}</span>
      <div><strong>${escapeHtml(title)}</strong>${sub ? `<span>${escapeHtml(sub)}</span>` : ""}</div>
      ${linkText && linkHref ? `<a class="toast-link" href="${linkHref}">${escapeHtml(linkText)}</a>` : ""}`;
    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-visible"));
    setTimeout(() => {
      el.classList.remove("is-visible");
      setTimeout(() => el.remove(), 400);
    }, 3800);
  }

  async function copyText(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(label || t("copied"), text);
    } catch (err) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); showToast(label || t("copied"), text); } catch (e) { showToast(t("noResult"), ""); }
      ta.remove();
    }
  }

  /* -----------------------------------------------------------------------
     Cart UI
     ----------------------------------------------------------------------- */
  function persistCart() { saveJSON("abodhi_cart_v1", state.cart); }
  function syncCartCount() {
    const count = state.cart.reduce((n, i) => n + i.qty, 0);
    const el = $("#cartCount");
    if (el) {
      el.textContent = count;
      el.classList.toggle("has-items", count > 0);
    }
  }
  function renderCartDrawer() {
    const wrap = $("#cartDrawerItems");
    const foot = $("#cartDrawerFoot");
    if (!wrap || !foot) return;
    const totals = cartTotals();
    if (!totals.lines.length) {
      wrap.innerHTML = `
        <div class="cart-empty">
          <span class="empty-icon">${icon("i-bag")}</span>
          <h3>${escapeHtml(t("cartEmptyTitle"))}</h3>
          <p>${escapeHtml(t("cartEmptyDesc"))}</p>
          <a class="btn btn-primary" href="#/shop" data-close-cart-btn>${escapeHtml(t("continueShopping"))} ${icon("i-arrow-right")}</a>
        </div>`;
      foot.innerHTML = "";
      $$("[data-close-cart-btn]").forEach((el) => el.addEventListener("click", closeCart));
      return;
    }
    wrap.innerHTML = totals.lines.map((line) => `
      <div class="cart-item">
        <a href="#/product/${line.product.slug}" aria-label="${escapeHtml(tx(line.product.name))}"><img src="${line.product.images[0]}" alt="${escapeHtml(tx(line.product.name))}" /></a>
        <div class="cart-item-info">
          <h4><a href="#/product/${line.product.slug}">${escapeHtml(tx(line.product.name))}</a></h4>
          <div class="cart-item-variant">${escapeHtml(line.option.label)}</div>
          <div class="cart-item-line">
            <div class="qty">
              <button type="button" data-cart-qty="-1" data-key="${escapeHtml(line.key)}" aria-label="-">${icon("i-minus")}</button>
              <span>${line.qty}</span>
              <button type="button" data-cart-qty="1" data-key="${escapeHtml(line.key)}" aria-label="+">${icon("i-plus")}</button>
            </div>
            <span class="cart-item-price">${money(line.lineTotal)}</span>
            <button type="button" class="cart-item-remove" data-remove-cart="${escapeHtml(line.key)}" aria-label="${escapeHtml(t("remove"))}">${icon("i-trash")}</button>
          </div>
        </div>
      </div>`).join("");
    foot.innerHTML = `
      <div class="cart-ship-note">${icon("i-truck")}<span>${escapeHtml(t("fixedShip"))}</span></div>
      <div class="cart-total-row"><span>${escapeHtml(t("subtotal"))}</span><strong>${money(totals.subtotal)}</strong></div>
      <div class="cart-drawer-actions">
        <a class="btn btn-outline" href="#/cart" data-close-cart-link>${escapeHtml(t("viewCart"))}</a>
        <a class="btn btn-primary" href="#/checkout" data-close-cart-link>${escapeHtml(t("checkout"))} ${icon("i-arrow-right")}</a>
      </div>`;
    $$("[data-close-cart-link]").forEach((el) => el.addEventListener("click", closeCart));
  }

  function addToCart(productId, selection = null, qty = 1, open = true) {
    const product = getProduct(productId);
    if (!product) return false;
    if (product.quoteOnly) { openQuote(productId); return false; }
    if (product.contactOnly) { navigate(`product/${product.slug}`); return false; }
    const chosen = selection || state.productSelections[productId] || defaultSelection(product);
    const option = resolveOption(product, chosen);
    if (!option) {
      showToast(t("chooseVariant"));
      return false;
    }
    if (option.stock <= 0) {
      showToast(t("outOfStock"), tx(product.name));
      return false;
    }
    const optionId = option.id;
    const key = `${productId}::${optionId}`;
    const existing = state.cart.find((i) => cartKey(i) === key);
    const current = existing ? existing.qty : 0;
    const next = Math.min(current + Math.max(1, Number(qty) || 1), option.stock);
    if (existing) existing.qty = next;
    else state.cart.push({ productId, optionId, sizeId: option.sizeId, countId: option.countId, qty: next });
    persistCart();
    syncCartCount();
    renderCartDrawer();
    if (open) openCart();
    showToast(t("addedToCart"), tx(product.name), t("viewCart"), "#/cart");
    return true;
  }

  function addDefaultToCart(productId) {
    const product = getProduct(productId);
    if (!product) return;
    if (product.quoteOnly) { openQuote(productId); return; }
    if (product.contactOnly) { navigate(`product/${product.slug}`); return; }
    addToCart(productId, defaultSelection(product), 1, true);
  }

  function changeCartQty(key, delta) {
    const item = state.cart.find((i) => cartKey(i) === key);
    if (!item) return;
    const product = getProduct(item.productId);
    const option = resolveOption(product, item);
    if (!option) return;
    const next = item.qty + delta;
    if (next <= 0) {
      removeCartItem(key);
      return;
    }
    if (next > option.stock) {
      showToast(t("lowStock", { n: option.stock }), tx(product.name));
      return;
    }
    item.qty = next;
    persistCart();
    syncCartCount();
    renderCartDrawer();
    if (state.route.view === "cart" || state.route.view === "checkout") renderCurrentPage(false);
    showToast(t("cartUpdated"), "", "", "");
  }

  function removeCartItem(key) {
    const item = state.cart.find((i) => cartKey(i) === key);
    state.cart = state.cart.filter((i) => cartKey(i) !== key);
    if (!state.cart.length) state.coupon = "";
    persistCart();
    syncCartCount();
    renderCartDrawer();
    if (state.route.view === "cart" || state.route.view === "checkout") renderCurrentPage(false);
    showToast(t("removedToast"), item ? tx(getProduct(item.productId)?.name) : "");
  }

  function toggleWishlist(productId, el) {
    const idx = state.wishlist.indexOf(productId);
    if (idx >= 0) state.wishlist.splice(idx, 1);
    else state.wishlist.push(productId);
    saveJSON("abodhi_wishlist_v1", state.wishlist);
    $$(`[data-wishlist="${productId}"]`).forEach((node) => node.classList.toggle("is-active", state.wishlist.includes(productId)));
  }

  /* -----------------------------------------------------------------------
     Search
     ----------------------------------------------------------------------- */
  function renderSearchQuick() {
    const box = $("#searchQuick");
    if (!box) return;
    const chips = [
      { q: state.lang === "vi" ? "nhang" : "incense" },
      { q: state.lang === "vi" ? "vòng tay" : "bracelet" },
      { q: state.lang === "vi" ? "tinh dầu" : "oil" },
      { q: state.lang === "vi" ? "trà" : "tea" },
      { q: state.lang === "vi" ? "quà tặng" : "gift" }
    ];
    box.innerHTML = `<span class="quick-label">${escapeHtml(t("searchPopular"))}</span>` + chips.map((c) => `<button class="quick-chip" type="button" data-search-q="${escapeHtml(c.q)}">${escapeHtml(c.q)}</button>`).join("");
  }

  function searchAll(query) {
    const q = normalizeText(query);
    if (!q) return { products: PRODUCTS.slice(0, 4), articles: [] };
    const products = PRODUCTS.filter((p) => {
      const hay = [p.name.vi, p.name.en, p.short.vi, p.short.en, p.description.vi, p.description.en, tx(getCategory(p.cat)?.name), p.sku].map(normalizeText).join(" ");
      return hay.includes(q);
    }).slice(0, 8);
    const articles = ARTICLES.filter((a) => {
      const hay = [a.title.vi, a.title.en, a.excerpt.vi, a.excerpt.en, a.tags.join(" ")].map(normalizeText).join(" ");
      return hay.includes(q);
    }).slice(0, 5);
    return { products, articles };
  }

  function renderSearchResults(query) {
    const box = $("#searchResults");
    if (!box) return;
    const { products, articles } = searchAll(query);
    if (!normalizeText(query)) {
      box.innerHTML = `<div class="search-group-title">${escapeHtml(t("bestTitle"))}</div>` + products.map((p) => `
        <a class="search-result" href="#/product/${p.slug}">
          <img src="${p.images[0]}" alt="" />
          <span class="sr-info"><strong>${escapeHtml(tx(p.name))}</strong><span>${escapeHtml(catName(p))}</span></span>
          <span class="sr-price">${productFromPrice(p) == null ? escapeHtml(t("contactForPrice")) : money(productFromPrice(p))}</span>
          ${icon("i-arrow-right")}
        </a>`).join("");
      return;
    }
    if (!products.length && !articles.length) {
      box.innerHTML = `<div class="search-empty">${escapeHtml(t("searchEmpty"))}</div>`;
      return;
    }
    let html = "";
    if (products.length) {
      html += `<div class="search-group-title">${escapeHtml(t("searchProducts"))} · ${products.length}</div>`;
      html += products.map((p) => `
        <a class="search-result" href="#/product/${p.slug}">
          <img src="${p.images[0]}" alt="" />
          <span class="sr-info"><strong>${escapeHtml(tx(p.name))}</strong><span>${escapeHtml(catName(p))}</span></span>
          <span class="sr-price">${productFromPrice(p) == null ? escapeHtml(t("contactForPrice")) : money(productFromPrice(p))}</span>
          ${icon("i-arrow-right")}
        </a>`).join("");
    }
    if (articles.length) {
      html += `<div class="search-group-title">${escapeHtml(t("searchArticles"))} · ${articles.length}</div>`;
      html += articles.map((a) => `
        <a class="search-result" href="#/news/${a.slug}">
          <img src="${a.image}" alt="" />
          <span class="sr-info"><strong>${escapeHtml(tx(a.title))}</strong><span>${escapeHtml(t("minuteRead", { n: a.read }))}</span></span>
          <span class="sr-price">${escapeHtml(t("readArticle"))}</span>
          ${icon("i-arrow-right")}
        </a>`).join("");
    }
    html += `<a class="btn btn-outline btn-block" style="margin-top:14px" href="#/shop?q=${encodeURIComponent(query)}">${escapeHtml(t("searchViewAll"))}</a>`;
    box.innerHTML = html;
  }

  /* -----------------------------------------------------------------------
     Global delegated actions
     ----------------------------------------------------------------------- */
  function bindDelegatedActions() {
    document.addEventListener("click", (e) => {
      const add = e.target.closest("[data-add]");
      if (add) {
        e.preventDefault();
        addDefaultToCart(add.dataset.add);
        return;
      }
      const quote = e.target.closest("[data-quote]");
      if (quote) {
        e.preventDefault();
        openQuote(quote.dataset.quote);
        return;
      }
      const wish = e.target.closest("[data-wishlist]");
      if (wish) {
        e.preventDefault();
        toggleWishlist(wish.dataset.wishlist, wish);
        return;
      }
      const qtyBtn = e.target.closest("[data-cart-qty]");
      if (qtyBtn) {
        e.preventDefault();
        changeCartQty(qtyBtn.dataset.key, Number(qtyBtn.dataset.cartQty));
        return;
      }
      const remove = e.target.closest("[data-remove-cart]");
      if (remove) {
        e.preventDefault();
        removeCartItem(remove.dataset.removeCart);
        return;
      }
      const copy = e.target.closest("[data-copy]");
      if (copy) {
        e.preventDefault();
        copyText(copy.dataset.copy, t("copied"));
        return;
      }
      const filterOpen = e.target.closest("[data-filter-open]");
      if (filterOpen) {
        document.body.classList.add("filter-open");
        return;
      }
      const filterClose = e.target.closest("[data-filter-close]");
      if (filterClose) {
        document.body.classList.remove("filter-open");
        return;
      }
      const rail = e.target.closest("[data-rail]");
      if (rail) {
        e.preventDefault();
        const wrap = rail.closest(".rail-wrap");
        const track = wrap?.querySelector(".product-rail");
        if (track) track.scrollBy({ left: Number(rail.dataset.rail) * Math.max(260, track.clientWidth * 0.82), behavior: "smooth" });
        return;
      }
      const tab = e.target.closest("[data-tab]");
      if (tab) {
        e.preventDefault();
        activateTab(tab);
        return;
      }
      const pdpTab = e.target.closest("[data-pdp-tab]");
      if (pdpTab) {
        e.preventDefault();
        activatePdpTab(pdpTab);
        return;
      }
      const thumb = e.target.closest("[data-gallery-thumb]");
      if (thumb) {
        e.preventDefault();
        selectGalleryImage(thumb);
        return;
      }
      const zoom = e.target.closest("[data-zoom]");
      if (zoom) {
        e.preventDefault();
        openLightbox(zoom.dataset.zoom, zoom.dataset.alt || "");
        return;
      }
      const size = e.target.closest("[data-variant-size]");
      if (size) {
        e.preventDefault();
        setProductVariant("size", size.dataset.variantSize);
        return;
      }
      const count = e.target.closest("[data-variant-count]");
      if (count) {
        e.preventDefault();
        setProductVariant("count", count.dataset.variantCount);
        return;
      }
      const opt = e.target.closest("[data-option]");
      if (opt) {
        e.preventDefault();
        setProductVariant("option", opt.dataset.option);
        return;
      }
      const pdpQty = e.target.closest("[data-pdp-qty]");
      if (pdpQty) {
        e.preventDefault();
        changePdpQty(Number(pdpQty.dataset.pdpQty));
        return;
      }
      const addCurrent = e.target.closest("[data-add-current]");
      if (addCurrent) {
        e.preventDefault();
        addCurrentProduct();
        return;
      }
      const buyNow = e.target.closest("[data-buy-now]");
      if (buyNow) {
        e.preventDefault();
        if (addCurrentProduct(false)) navigate("checkout");
        return;
      }
      const shopCat = e.target.closest("[data-shop-category]");
      if (shopCat) {
        e.preventDefault();
        state.shop.category = shopCat.dataset.shopCategory;
        state.shop.sub = "all";
        state.shop.page = 1;
        syncShopUrl();
        renderCurrentPage(false);
        return;
      }
      const shopSub = e.target.closest("[data-shop-sub]");
      if (shopSub) {
        e.preventDefault();
        state.shop.sub = shopSub.dataset.shopSub;
        state.shop.page = 1;
        syncShopUrl();
        renderCurrentPage(false);
        return;
      }
      const shopPage = e.target.closest("[data-shop-page]");
      if (shopPage) {
        e.preventDefault();
        state.shop.page = Number(shopPage.dataset.shopPage);
        syncShopUrl();
        refreshShopResults();
        document.getElementById("shopResults")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const clearFilters = e.target.closest("[data-clear-filters]");
      if (clearFilters) {
        e.preventDefault();
        state.shop = { category: "all", sub: "all", minPrice: 0, maxPrice: 10000000, query: "", sort: "default", page: 1 };
        syncShopUrl();
        renderCurrentPage(false);
        return;
      }
      const removeFilter = e.target.closest("[data-remove-filter]");
      if (removeFilter) {
        e.preventDefault();
        const type = removeFilter.dataset.removeFilter;
        if (type === "category") { state.shop.category = "all"; state.shop.sub = "all"; }
        if (type === "sub") state.shop.sub = "all";
        if (type === "price") { state.shop.minPrice = 0; state.shop.maxPrice = 10000000; }
        if (type === "query") state.shop.query = "";
        state.shop.page = 1;
        syncShopUrl();
        renderCurrentPage(false);
        return;
      }
      const preset = e.target.closest("[data-price-preset]");
      if (preset) {
        e.preventDefault();
        state.shop.minPrice = Number(preset.dataset.min || 0);
        state.shop.maxPrice = Number(preset.dataset.max || 10000000);
        state.shop.page = 1;
        syncShopUrl();
        renderCurrentPage(false);
        return;
      }
      const payment = e.target.closest("[data-payment]");
      if (payment) {
        e.preventDefault();
        state.payment = payment.dataset.payment;
        updatePaymentUI();
        return;
      }
      const newsFilter = e.target.closest("[data-news-filter]");
      if (newsFilter) {
        e.preventDefault();
        state.newsCat = newsFilter.dataset.newsFilter;
        $$(".journal-filter").forEach((el) => el.classList.toggle("is-active", el.dataset.newsFilter === state.newsCat));
        const grid = $("#journalGrid");
        if (grid) grid.innerHTML = renderJournalGrid();
        return;
      }
      const accordion = e.target.closest("[data-accordion]");
      if (accordion) {
        e.preventDefault();
        toggleAccordion(accordion);
      }
    });

    document.addEventListener("change", (e) => {
      if (e.target.matches("#sortSelect")) {
        state.shop.sort = e.target.value;
        state.shop.page = 1;
        syncShopUrl();
        refreshShopResults();
      }
      if (e.target.matches("#shopPriceRange")) {
        state.shop.maxPrice = Number(e.target.value);
        state.shop.minPrice = 0;
        state.shop.page = 1;
        syncShopUrl();
        refreshShopResults();
      }
      if (e.target.matches("#shopKeyword")) {
        state.shop.query = e.target.value.trim();
        state.shop.page = 1;
        syncShopUrl();
        refreshShopResults();
      }
    });

    document.addEventListener("input", (e) => {
      if (e.target.matches("#shopPriceRange")) {
        const output = $("#shopPriceOutput");
        if (output) output.textContent = money(Number(e.target.value));
        const percentVal = (Number(e.target.value) / Number(e.target.max || 10000000)) * 100;
        e.target.style.setProperty("--range-progress", percentVal + "%");
      }
      if (e.target.matches("[data-checkout-field]")) {
        state.checkout[e.target.name] = e.target.value;
      }
      if (e.target.matches("#checkoutNoteLong")) {
        state.checkout.note = e.target.value;
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.matches("#shopKeyword")) {
        e.preventDefault();
        e.target.blur();
      }
      if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-wishlist]")) {
        e.preventDefault();
        toggleWishlist(e.target.dataset.wishlist, e.target);
      }
    });

    document.addEventListener("submit", (e) => {
      if (e.target.matches("#quoteForm")) { e.preventDefault(); handleQuoteSubmit(e.target); }
      if (e.target.matches("#newsletterForm")) { e.preventDefault(); handleNewsletter(e.target); }
      if (e.target.matches("#contactForm")) { e.preventDefault(); handleContactSubmit(e.target); }
      if (e.target.matches("#checkoutForm")) { e.preventDefault(); handleCheckoutSubmit(e.target); }
      if (e.target.matches("#trackingForm")) { e.preventDefault(); handleTrackingSubmit(e.target); }
      if (e.target.matches("#couponForm")) { e.preventDefault(); handleCoupon(e.target); }
    });
  }

  /* -----------------------------------------------------------------------
     Tabs / gallery / variant / quote handlers
     ----------------------------------------------------------------------- */
  function activateTab(tab) {
    const group = tab.closest("[data-tabs]");
    if (!group) return;
    $$("[data-tab]", group).forEach((el) => el.classList.toggle("is-active", el === tab));
    const target = tab.dataset.tab;
    const panelWrap = group.parentElement;
    $$(".tab-panel", panelWrap).forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === target));
  }

  function activatePdpTab(tab) {
    const key = tab.dataset.pdpTab;
    $$(".pdp-tab").forEach((el) => el.classList.toggle("is-active", el === tab));
    $$(".pdp-panel").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.pdpPanel === key));
  }

  function selectGalleryImage(thumb) {
    const src = thumb.dataset.galleryThumb;
    const main = $("#pdpMainImage");
    if (main) {
      main.src = src;
      main.dataset.zoom = src;
    }
    $$("[data-gallery-thumb]").forEach((el) => el.classList.toggle("is-active", el === thumb));
  }

  function setProductVariant(kind, value) {
    const slug = state.route.slug;
    const product = getProductBySlug(slug);
    if (!product) return;
    const sel = state.productSelections[product.id] || defaultSelection(product);
    if (kind === "size") sel.sizeId = value;
    if (kind === "count") sel.countId = value;
    if (kind === "option") sel.optionId = value;
    const option = resolveOption(product, sel);
    if (option) sel.optionId = option.id;
    state.productSelections[product.id] = sel;
    updatePdpVariantUI(product, option);
  }

  function updatePdpVariantUI(product, option) {
    $$("[data-variant-size]").forEach((el) => el.classList.toggle("is-active", el.dataset.variantSize === option.sizeId));
    $$("[data-variant-count]").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.variantCount === option.countId);
      const count = product.jewelrySpec?.counts.find((c) => c.id === el.dataset.variantCount);
      const small = el.querySelector("small");
      if (count && small) small.textContent = money(count.price + (option.size?.add || 0));
    });
    $$("[data-option]").forEach((el) => el.classList.toggle("is-active", el.dataset.option === option.id));
    const price = $("#pdpPrice");
    if (price) {
      price.textContent = money(option.price);
      price.classList.toggle("hidden", false);
    }
    const old = $("#pdpOldPrice");
    if (old) old.textContent = (option.compareAt || product.compareAt) ? money(option.compareAt || product.compareAt) : "";
    const mobilePrice = $("#pdpMobilePrice");
    if (mobilePrice) mobilePrice.textContent = productFromPrice(product) == null ? t("contactForPrice") : money(option.price);
    const selected = $("#variantSelected");
    if (selected) selected.textContent = option.label;
    const stock = $("#variantStock");
    if (stock) {
      stock.className = "variant-stock" + (option.stock <= 0 ? " out" : option.stock <= 5 ? " low" : "");
      stock.innerHTML = `<span class="dot"></span>${option.stock <= 0 ? escapeHtml(t("outOfStock")) : option.stock <= 5 ? escapeHtml(t("lowStock", { n: option.stock })) : escapeHtml(t("inStock"))}`;
    }
    const addBtn = $("[data-add-current]");
    if (addBtn) addBtn.disabled = option.stock <= 0;
    const buyBtn = $("[data-buy-now]");
    if (buyBtn) buyBtn.disabled = option.stock <= 0;
  }

  function changePdpQty(delta) {
    const product = getProductBySlug(state.route.slug);
    if (!product) return;
    const sel = state.productSelections[product.id] || defaultSelection(product);
    const option = resolveOption(product, sel);
    sel.qty = clamp((sel.qty || 1) + delta, 1, Math.max(1, option.stock));
    state.productSelections[product.id] = sel;
    const el = $("#pdpQtyValue");
    if (el) el.textContent = sel.qty;
  }

  function addCurrentProduct(open = true) {
    const product = getProductBySlug(state.route.slug);
    if (!product) return false;
    if (product.quoteOnly) { openQuote(product.id); return false; }
    if (product.contactOnly) { window.location.href = "tel:0912578516"; return false; }
    const sel = state.productSelections[product.id] || defaultSelection(product);
    return addToCart(product.id, sel, sel.qty || 1, open);
  }

  function handleQuoteSubmit(form) {
    const name = $("#quoteName")?.value.trim();
    const phone = $("#quotePhone")?.value.trim();
    const dimensions = $("#quoteDimensions")?.value.trim();
    const consent = $("#quoteConsent")?.checked;
    let valid = true;
    clearFieldError($("#quoteName"));
    clearFieldError($("#quotePhone"));
    clearFieldError($("#quoteDimensions"));
    clearFieldError($("#quoteConsent"));
    if (!name) { setFieldError($("#quoteName"), t("required")); valid = false; }
    if (!phone || !isPhone(phone)) { setFieldError($("#quotePhone"), t("invalidPhone")); valid = false; }
    if (!dimensions) { setFieldError($("#quoteDimensions"), t("required")); valid = false; }
    if (!consent) { setFieldError($("#quoteConsent"), t("consentRequired")); valid = false; }
    if (!valid) return;
    const requests = loadJSON("abodhi_quote_requests_v1", []);
    requests.unshift({
      productId: state.quoteProductId,
      name, phone, dimensions,
      material: $("#quoteMaterial")?.value || "",
      note: $("#quoteNote")?.value || "",
      date: new Date().toISOString()
    });
    saveJSON("abodhi_quote_requests_v1", requests);
    const formEl = $("#quoteForm");
    const success = $("#quoteSuccess");
    if (formEl) formEl.hidden = true;
    if (success) success.hidden = false;
    showToast(t("quoteSuccessTitle"), t("quoteSuccessDesc"));
  }

  function handleNewsletter(form) {
    const input = form.querySelector("input[type=email]");
    if (!input || !isEmail(input.value)) {
      showToast(t("invalidEmail"), "");
      input?.focus();
      return;
    }
    showToast(t("subscribed"), input.value, "", "");
    form.reset();
  }

  function handleContactSubmit(form) {
    const name = $("#contactName")?.value.trim();
    const phone = $("#contactPhone")?.value.trim();
    const email = $("#contactEmail")?.value.trim();
    const message = $("#contactMessage")?.value.trim();
    const consent = $("#contactConsent")?.checked;
    let valid = true;
    clearFieldError($("#contactName"));
    clearFieldError($("#contactPhone"));
    clearFieldError($("#contactMessage"));
    clearFieldError($("#contactConsent"));
    if (!name) { setFieldError($("#contactName"), t("required")); valid = false; }
    if (!phone || !isPhone(phone)) { setFieldError($("#contactPhone"), t("invalidPhone")); valid = false; }
    if (email && !isEmail(email)) { setFieldError($("#contactEmail"), t("invalidEmail")); valid = false; }
    if (!message) { setFieldError($("#contactMessage"), t("required")); valid = false; }
    if (!consent) { setFieldError($("#contactConsent"), t("consentRequired")); valid = false; }
    if (!valid) return;
    const messages = loadJSON("abodhi_contact_messages_v1", []);
    messages.unshift({ name, phone, email, subject: $("#contactSubject")?.value, message, date: new Date().toISOString() });
    saveJSON("abodhi_contact_messages_v1", messages);
    const success = $("#contactSuccess");
    if (success) success.classList.add("is-visible");
    showToast(t("contactSuccess"), t("contactSuccessDesc"));
    form.reset();
  }

  function handleCoupon(form) {
    const input = form.querySelector("input");
    const value = (input?.value || "").trim().toUpperCase();
    if (value === "ABODHI10") {
      state.coupon = "ABODHI10";
      showToast(t("couponApplied"), "");
      renderCurrentPage(false);
    } else {
      state.coupon = "";
      showToast(t("couponInvalid"), "");
    }
  }

  function handleTrackingSubmit(form) {
    const id = ($("#trackingOrderId")?.value || "").trim().toUpperCase();
    const phone = ($("#trackingPhone")?.value || "").replace(/\s+/g, "").trim();
    const result = findOrder(id, phone);
    renderTrackingResult(result, id, phone);
  }

  function findOrder(id, phone) {
    const all = orderList();
    return all.find((o) => String(o.id).toUpperCase() === String(id).toUpperCase() && normalizePhone(o.phone) === normalizePhone(phone));
  }

  function orderList() {
    const demo = {
      id: DEMO_ORDER_ID,
      date: "2026-11-08T10:24:00+07:00",
      status: "shipping",
      customer: "Nguyễn Minh An",
      phone: "0912578516",
      email: "minhan@example.com",
      address: "25 Nguyễn Huệ, Phường Sài Gòn",
      city: "TP. Hồ Chí Minh",
      note: "",
      payment: "cod",
      items: [
        { productId: "inc-01", optionId: "45", qty: 1, price: 480000 },
        { productId: "jew-01", optionId: "6li:21", qty: 1, price: 1850000, sizeId: "6li", countId: "21" }
      ],
      subtotal: 2330000,
      shipping: 30000,
      discount: 0,
      total: 2360000
    };
    const stored = Array.isArray(state.orders) ? state.orders : [];
    return [demo, ...stored];
  }

  function isPhone(value) { return /^(?:\+84|0)\d{8,10}$/.test(String(value).replace(/[\s.\-()]/g, "")); }
  function normalizePhone(value) { return String(value).replace(/[\s.\-()+]/g, "").replace(/^84/, "0"); }
  function isEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value)); }
  function setFieldError(input, message) {
    if (!input) return;
    const field = input.closest(".field");
    if (!field) return;
    field.classList.add("has-error");
    const err = field.querySelector(".field-error");
    if (err) err.textContent = message;
  }
  function clearFieldError(input) {
    if (!input) return;
    const field = input.closest(".field");
    if (!field) return;
    field.classList.remove("has-error");
    const err = field.querySelector(".field-error");
    if (err) err.textContent = "";
  }

  /* -----------------------------------------------------------------------
     Boot
     ----------------------------------------------------------------------- */
  function boot() {
    state.ready = true;
    initHeader();
    bindDelegatedActions();
    applyStaticLanguage();
    syncCartCount();
    renderCartDrawer();
    renderSearchQuick();
    if (!location.hash) history.replaceState(null, "", "#/home");
    applyRouteQuery(parseRoute());
    renderCurrentPage(true);
    setTimeout(() => $("#pageLoader")?.classList.add("is-hidden"), 520);
    setTimeout(() => $("#pageLoader")?.remove(), 1300);
    window.addEventListener("load", () => {
      setTimeout(() => $("#pageLoader")?.classList.add("is-hidden"), 200);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  /* -----------------------------------------------------------------------
     PAGE: Home
     ----------------------------------------------------------------------- */
  function renderHomePage() {
    const bestIds = ["inc-01", "inc-03", "jew-01", "oil-01", "tea-01", "soap-01", "acc-01", "water-01"];
    const best = bestIds.map(getProduct).filter(Boolean);
    const featureGroups = {
      incense: ["inc-01", "inc-02", "inc-04", "inc-05"].map(getProduct).filter(Boolean),
      jewelry: ["jew-01", "jew-02", "jew-03", "jew-04"].map(getProduct).filter(Boolean),
      oils: ["oil-01", "water-01", "oil-02", "water-04"].map(getProduct).filter(Boolean),
      art: ["art-01", "art-03", "acc-01", "acc-02"].map(getProduct).filter(Boolean)
    };
    const gift = ["tea-01", "soap-02", "soap-03"].map(getProduct).filter(Boolean);
    const previewArticles = ARTICLES.slice(0, 3);
    const heroProduct = getProduct("jew-02");

    return `
      <section class="hero">
        <div class="hero-media" aria-hidden="true"></div>
        <div class="hero-mist m1" aria-hidden="true"></div>
        <div class="hero-mist m2" aria-hidden="true"></div>
        <div class="hero-mist m3" aria-hidden="true"></div>
        <div class="container hero-inner">
          <div class="hero-copy">
            <div class="hero-eyebrow"><span>${escapeHtml(t("heroEyebrow"))}</span><span class="dot"></span></div>
            <h1 class="hero-title">
              <span class="line-1">${escapeHtml(t("heroTitle1"))}</span>
              <span class="line-2">${escapeHtml(t("heroTitleAccent"))}</span>
              <span class="line-3">${escapeHtml(t("heroTitle2"))}</span>
            </h1>
            <p class="hero-subtitle">${escapeHtml(t("heroSubtitle"))}</p>
            <div class="hero-actions">
              <a class="btn btn-primary btn-lg" href="#/shop">${escapeHtml(t("exploreCollection"))} ${icon("i-arrow-right")}</a>
              <button class="btn btn-outline-light btn-lg" type="button" data-quote="art-02">${icon("i-bowl")} ${escapeHtml(t("bespokeCta"))}</button>
            </div>
            <div class="hero-foot">
              <div class="avatars" aria-hidden="true"><span class="avatar">H</span><span class="avatar">B</span><span class="avatar">A</span></div>
              <div>${stars(5)} <strong>3.200+</strong> ${state.lang === "vi" ? "khách hàng tin chọn" : "customers who trust us"}</div>
              <span class="dot" style="width:3px;height:3px;border-radius:50%;background:rgba(250,249,246,.25)"></span>
              <span>${escapeHtml(t("heroNote"))}</span>
            </div>
          </div>
          <div class="hero-side">
            <div class="hero-seal" aria-hidden="true">
              <svg viewBox="0 0 140 140" width="148" height="148">
                <defs><path id="sealPath" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"></path></defs>
                <text><textPath href="#sealPath" startOffset="0">TRẦM HƯƠNG TỰ NHIÊN · ABODHI · TỪ TÂM ·</textPath></text>
              </svg>
              <span class="seal-inner">${icon("i-logo")}</span>
            </div>
            <a class="hero-specimen" href="#/product/${heroProduct?.slug || ""}">
              <img src="assets/images/agarwood-chips.jpg" alt="" />
              <span><span class="spec-kicker">${escapeHtml(state.lang === "vi" ? "Tuyển chọn giới hạn" : "Limited selection")}</span><strong>${escapeHtml(t("heroCardTitle"))}</strong><p>${escapeHtml(t("heroCardText"))}</p></span>
              ${icon("i-arrow-right")}
            </a>
          </div>
        </div>
        <div class="hero-rail" aria-hidden="true">ABODHI · NATURAL AGARWOOD · EST. 2014</div>
        <div class="hero-scroll-cue"><span></span>${escapeHtml(t("heroScroll"))}</div>
      </section>

      <div class="trust-strip">
        <div class="container">
          <div class="trust-grid">
            <div class="trust-item"><span class="trust-icon">${icon("i-leaf")}</span><div><strong>${escapeHtml(t("trust1"))}</strong><span>${escapeHtml(t("trust1s"))}</span></div></div>
            <div class="trust-item"><span class="trust-icon">${icon("i-bowl")}</span><div><strong>${escapeHtml(t("trust2"))}</strong><span>${escapeHtml(t("trust2s"))}</span></div></div>
            <div class="trust-item"><span class="trust-icon">${icon("i-pin")}</span><div><strong>${escapeHtml(t("trust3"))}</strong><span>${escapeHtml(t("trust3s"))}</span></div></div>
            <div class="trust-item"><span class="trust-icon">${icon("i-truck")}</span><div><strong>${escapeHtml(t("trust4"))}</strong><span>${escapeHtml(t("trust4s"))}</span></div></div>
          </div>
        </div>
      </div>

      <section class="section" id="categories">
        <div class="container">
          ${sectionHead({ eyebrow: t("catEyebrow"), title: `${escapeHtml(t("catTitle")).split(" ").slice(0, -1).join(" ")} <em>${escapeHtml(t("catTitle")).split(" ").slice(-1)}</em>`, lead: t("catSubtitle"), link: "#/shop", linkText: t("viewAll") })}
          <div class="bento">
            ${CATEGORIES.map((cat, i) => {
              const sizes = ["cat-lg", "cat-md", "cat-md", "cat-md", "cat-md", "cat-md", "cat-5", "cat-sm"];
              const count = PRODUCTS.filter((p) => p.cat === cat.id).length;
              return `
                <a class="cat-card ${sizes[i]} reveal" href="#/shop?category=${cat.id}">
                  <img src="${cat.image}" alt="${escapeHtml(tx(cat.name))}" loading="lazy" />
                  <div class="cat-top"><span class="cat-index">${String(i + 1).padStart(2, "0")}</span><span class="cat-icon">${icon(cat.icon)}</span></div>
                  <div class="cat-bottom">
                    <div>
                      <div class="cat-kicker">${escapeHtml(tx(cat.tagline))}</div>
                      <h3 class="cat-title">${escapeHtml(tx(cat.name))}</h3>
                      ${i === 0 ? `<p class="cat-desc">${escapeHtml(tx(cat.desc))}</p>` : ""}
                      <span class="cat-count">${count} ${escapeHtml(t("products"))}</span>
                    </div>
                    <span class="cat-arrow">${icon("i-arrow-right")}</span>
                  </div>
                </a>`;
            }).join("")}
          </div>
        </div>
      </section>

      <section class="section section-sand">
        <div class="container">
          ${sectionHead({ eyebrow: t("bestEyebrow"), title: `${escapeHtml(t("bestTitle")).split(" ").slice(0, -2).join(" ")} <em>${escapeHtml(t("bestTitle")).split(" ").slice(-2).join(" ")}</em>`, lead: t("bestSubtitle"), link: "#/shop?sort=best", linkText: t("viewAllProducts") })}
          <div class="rail-wrap">
            <div class="product-rail" id="bestSellerRail">
              ${best.map((p) => productCard(p)).join("")}
            </div>
            <div class="rail-nav" style="position:absolute;right:0;top:-92px">
              <button class="rail-btn" type="button" data-rail="-1" aria-label="${escapeHtml(t("scrollPrev"))}">${icon("i-arrow-left")}</button>
              <button class="rail-btn" type="button" data-rail="1" aria-label="${escapeHtml(t("scrollNext"))}">${icon("i-arrow-right")}</button>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="featured-tabs">
            ${sectionHead({ eyebrow: t("featuredEyebrow"), title: `${escapeHtml(t("featuredTitle")).split(" & ")[0]} <em>&amp; ${escapeHtml(t("featuredTitle")).split(" & ")[1] || ""}</em>`, lead: t("featuredSubtitle") })}
            <div class="tabs" data-tabs>
              <button class="tab-btn is-active" type="button" data-tab="incense">${escapeHtml(t("tabIncense"))}</button>
              <button class="tab-btn" type="button" data-tab="jewelry">${escapeHtml(t("tabJewelry"))}</button>
              <button class="tab-btn" type="button" data-tab="oils">${escapeHtml(t("tabOils"))}</button>
              <button class="tab-btn" type="button" data-tab="art">${escapeHtml(t("tabArt"))}</button>
            </div>
            <div class="tab-panels">
              ${Object.entries(featureGroups).map(([key, items], i) => `
                <div class="tab-panel ${i === 0 ? "is-active" : ""}" data-panel="${key}">
                  <div class="product-grid">${items.map((p) => productCard(p)).join("")}</div>
                </div>`).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="section-tight" style="padding-bottom:104px">
        <div class="container">
          <div class="gift-block reveal">
            <div class="gift-copy">
              <span class="eyebrow">${escapeHtml(t("giftEyebrow"))}</span>
              <h2 class="section-title">${escapeHtml(t("giftTitle")).replace(escapeHtml(t("giftTitle")).split(" ").slice(-3).join(" "), `<em>${escapeHtml(t("giftTitle")).split(" ").slice(-3).join(" ")}</em>`)}</h2>
              <p>${escapeHtml(t("giftSubtitle"))}</p>
              <a class="btn btn-light" href="#/shop?category=tea">${escapeHtml(t("giftCta"))} ${icon("i-arrow-right")}</a>
            </div>
            <div class="gift-cards">
              ${gift.map((p, i) => `
                <a class="gift-card" href="#/product/${p.slug}">
                  <img src="${p.images[0]}" alt="${escapeHtml(tx(p.name))}" loading="lazy" />
                  <span>${escapeHtml(i === 0 ? tx(getCategory("tea")?.short) : tx(getCategory("soap")?.short))}</span>
                  <strong>${escapeHtml(tx(p.name))}</strong>
                </a>`).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="section story-section">
        <div class="container">
          <div class="story-split">
            <div class="story-visual reveal">
              <img src="assets/images/meditation-monk.jpg" alt="Thiền định cùng trầm hương" loading="lazy" />
              <div class="story-floating">
                <div class="num">25<span>+</span></div>
                <p>${escapeHtml(state.lang === "vi" ? "Năm tích trầm trong mỗi thớ gỗ Abodhi tuyển chọn." : "Years of resin in every selected block of Abodhi agarwood.")}</p>
                ${stars(5)}
              </div>
            </div>
            <div class="story-copy">
              <span class="eyebrow reveal">${escapeHtml(t("storyEyebrow"))}</span>
              <h2 class="section-title reveal">${escapeHtml(t("storyTitle"))}</h2>
              <p class="reveal">${escapeHtml(t("storyText1"))}</p>
              <p class="reveal">${escapeHtml(t("storyText2"))}</p>
              <div class="story-quote reveal">“${escapeHtml(t("storyQuote"))}”</div>
              <div class="story-points reveal">
                <span class="story-point">${icon("i-check")} ${escapeHtml(t("trust1"))}</span>
                <span class="story-point">${icon("i-check")} ${escapeHtml(t("trust2"))}</span>
                <span class="story-point">${icon("i-check")} ${escapeHtml(t("trust3"))}</span>
              </div>
              <a class="btn btn-outline reveal" href="#/about">${escapeHtml(t("storyCta"))} ${icon("i-arrow-right")}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${sectionHead({ eyebrow: t("testiEyebrow"), title: `${escapeHtml(t("testiTitle")).split(" ").slice(0, 3).join(" ")} <em>${escapeHtml(t("testiTitle")).split(" ").slice(3).join(" ")}</em>`, lead: t("testiSubtitle") })}
          <div class="testimonial-grid">
            ${TESTIMONIALS.slice(0, 3).map((item) => `
              <article class="testimonial-card reveal">
                <span class="quote-mark">${icon("i-quote")}</span>
                ${stars(item.rating)}
                <p class="testimonial-quote">“${escapeHtml(tx(item.quote))}”</p>
                <div class="testimonial-person">
                  <span class="testimonial-avatar">${escapeHtml(item.initial)}</span>
                  <div><strong>${escapeHtml(item.name)}</strong><span>${icon("i-check")} ${escapeHtml(t("verified"))} · ${escapeHtml(tx(item.location))}</span></div>
                  <span class="testimonial-product">${escapeHtml(item.product)}</span>
                </div>
              </article>`).join("")}
          </div>
        </div>
      </section>

      <section class="section section-sand">
        <div class="container">
          ${sectionHead({ eyebrow: t("newsEyebrow"), title: `${escapeHtml(t("newsTitle")).split(" ").slice(0, 2).join(" ")} <em>${escapeHtml(t("newsTitle")).split(" ").slice(2).join(" ")}</em>`, lead: t("newsSubtitle"), link: "#/news", linkText: t("viewAllNews") })}
          <div class="news-grid">
            ${previewArticles.map(journalPreviewCard).join("")}
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:20px">
        <div class="container">
          <div class="newsletter reveal">
            <div>
              <span class="eyebrow" style="color:var(--gold-soft)">${escapeHtml(t("newsletterTitle"))}</span>
              <h2 class="section-title">${escapeHtml(t("newsletterTitle")).includes("an yên") ? "Một lá thư <em>an yên</em>" : "A letter of <em>stillness</em>"}</h2>
              <p>${escapeHtml(t("newsletterSubtitle"))}</p>
            </div>
            <div>
              <form class="newsletter-form" id="newsletterForm" novalidate>
                <label class="newsletter-field">${icon("i-mail")}<input type="email" required placeholder="${escapeHtml(t("emailPh"))}" aria-label="${escapeHtml(t("emailPh"))}" /></label>
                <button class="btn" type="submit">${escapeHtml(t("subscribe"))} ${icon("i-arrow-right")}</button>
              </form>
              <p class="newsletter-note">${escapeHtml(t("privacyNote"))}</p>
            </div>
          </div>
        </div>
      </section>`;
  }

  function journalPreviewCard(article) {
    return `
      <article class="news-card reveal">
        <a class="news-media" href="#/news/${article.slug}" aria-label="${escapeHtml(tx(article.title))}">
          <img src="${article.image}" alt="${escapeHtml(tx(article.title))}" loading="lazy" />
          <span class="news-cat">${escapeHtml(articleCategoryLabel(article.cat))}</span>
        </a>
        <div class="news-body">
          <div class="news-meta"><span>${formatDate(article.date)}</span><span class="dot"></span><span>${escapeHtml(t("minuteRead", { n: article.read }))}</span></div>
          <h3 class="news-title"><a href="#/news/${article.slug}">${escapeHtml(tx(article.title))}</a></h3>
          <p class="news-excerpt">${escapeHtml(tx(article.excerpt))}</p>
          <a class="text-link" href="#/news/${article.slug}">${escapeHtml(t("readArticle"))} ${icon("i-arrow-right")}</a>
        </div>
      </article>`;
  }

  /* -----------------------------------------------------------------------
     PAGE: About
     ----------------------------------------------------------------------- */
  function renderAboutPage() {
    return `
      <section class="about-hero">
        <div class="container">
          ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("navAbout") }])}
          <div class="about-hero-grid">
            <div>
              <span class="eyebrow">${escapeHtml(t("aboutEyebrow"))}</span>
              <h1 class="page-title">${escapeHtml(t("aboutTitle")).replace("thời gian.", "<em>thời gian.</em>").replace("time.", "<em>time.</em>")}</h1>
              <p class="about-lead">${escapeHtml(t("aboutLead"))}</p>
            </div>
            <div class="about-hero-side">
              <div class="about-hero-quote">“${escapeHtml(t("aboutQuote"))}”</div>
              <div class="about-meta">
                <div><strong>12+</strong><span>${escapeHtml(t("statYears"))}</span></div>
                <div><strong>3.200+</strong><span>${escapeHtml(t("statCustomers"))}</span></div>
                <div><strong>8</strong><span>${escapeHtml(t("statProducts"))}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="about-mosaic reveal">
            <figure><img src="assets/images/smoke-vertical.jpg" alt="Khói trầm" loading="lazy" /><figcaption>An yên</figcaption></figure>
            <figure><img src="assets/images/agarwood-log.jpg" alt="Phôi trầm" loading="lazy" /><figcaption>Nguyên bản</figcaption></figure>
            <figure><img src="assets/images/incense-field.jpg" alt="Nhang trầm" loading="lazy" /><figcaption>Thủ công</figcaption></figure>
            <figure><img src="assets/images/temple-altar.jpg" alt="Không gian thờ tự" loading="lazy" /><figcaption>Từ tâm</figcaption></figure>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="about-story-grid">
            <div>
              <span class="eyebrow reveal">${escapeHtml(t("aboutStoryEyebrow"))}</span>
              <h2 class="section-title reveal">${escapeHtml(t("aboutStoryTitle")).replace("một nghi thức nhỏ", "<em>một nghi thức nhỏ</em>").replace("a small ritual", "<em>a small ritual</em>")}</h2>
            </div>
            <div class="about-story-copy reveal">
              <p>${escapeHtml(t("aboutStory1"))}</p>
              <p>${escapeHtml(t("aboutStory2"))}</p>
              <div class="about-signature">
                <span class="sig-mark">A</span>
                <div><strong>Abodhi</strong><span>Trầm hương tự nhiên · An yên · Từ tâm</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-sand">
        <div class="container">
          ${sectionHead({ eyebrow: t("aboutCommitEyebrow"), title: `${escapeHtml(t("aboutCommitTitle")).split(" ").slice(0, 2).join(" ")} <em>${escapeHtml(t("aboutCommitTitle")).split(" ").slice(2).join(" ")}</em>`, lead: t("storyText1") })}
          <div class="pillars-grid">
            ${PILLARS.map((pillar, i) => `
              <article class="pillar-card reveal">
                <span class="pillar-no">0${i + 1}</span>
                <span class="pillar-icon">${icon(pillar.icon)}</span>
                <h3>${escapeHtml(tx(pillar.title))}</h3>
                <p>${escapeHtml(tx(pillar.text))}</p>
              </article>`).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${sectionHead({ eyebrow: t("processEyebrow"), title: `${escapeHtml(t("processTitle")).split(" ").slice(0, 2).join(" ")} <em>${escapeHtml(t("processTitle")).split(" ").slice(2).join(" ")}</em>`, lead: t("processSubtitle") })}
          <div class="process-grid">
            ${PROCESS.map((step) => `
              <article class="process-step reveal">
                <div class="process-no">${step.no}</div>
                ${icon(step.icon)}
                <h3>${escapeHtml(tx(step.title))}</h3>
                <p>${escapeHtml(tx(step.text))}</p>
              </article>`).join("")}
          </div>
        </div>
      </section>

      <section class="quote-band">
        <div class="container">
          ${icon("i-quote", "quote-symbol")}
          <blockquote>“${escapeHtml(t("aboutQuote"))}”</blockquote>
          <cite>ABODHI · TỪ TÂM</cite>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="about-cta reveal">
            <h2>${escapeHtml(state.lang === "vi" ? "Mỗi sản phẩm là một lời mời trở về với sự an yên." : "Every piece is an invitation back to stillness.")}</h2>
            <a class="btn btn-primary" href="#/shop">${escapeHtml(t("aboutCta"))} ${icon("i-arrow-right")}</a>
          </div>
        </div>
      </section>`;
  }

  function renderNotFoundPage() {
    return `
      <section class="page-hero">
        <div class="container">
          ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("notFoundTitle") }])}
          <span class="eyebrow">404</span>
          <h1 class="page-title">${escapeHtml(t("notFoundTitle"))}</h1>
          <p class="page-hero-lead">${escapeHtml(t("notFoundDesc"))}</p>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="empty-state">
            <span class="empty-icon">${icon("i-logo")}</span>
            <h2>${escapeHtml(t("notFoundTitle"))}</h2>
            <p>${escapeHtml(t("notFoundDesc"))}</p>
            <a class="btn btn-primary" href="#/shop">${escapeHtml(t("backToShop"))} ${icon("i-arrow-right")}</a>
          </div>
        </div>
      </section>`;
  }

  function renderErrorPage() {
    return renderNotFoundPage();
  }

  /* -----------------------------------------------------------------------
     PAGE: Shop
     ----------------------------------------------------------------------- */
  function renderShopPage() {
    return `
      <section class="page-hero compact">
        <div class="container">
          ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("navShop") }])}
          <span class="eyebrow">${escapeHtml(t("shopEyebrow"))}</span>
          <h1 class="page-title">${escapeHtml(t("shopTitle"))}</h1>
          <p class="page-hero-lead">${escapeHtml(t("shopSubtitle"))}</p>
        </div>
      </section>
      <div class="container">
        <div class="shop-layout">
          <aside class="shop-sidebar" id="shopSidebar" aria-label="${escapeHtml(t("filters"))}">
            <div class="sidebar-head">
              <h2>${escapeHtml(t("filters"))}</h2>
              <div style="display:flex;align-items:center;gap:8px">
                <button type="button" class="clear-filter-btn" data-clear-filters>${escapeHtml(t("clearAll"))}</button>
                <button type="button" class="icon-btn sidebar-close" data-filter-close aria-label="${escapeHtml(t("close"))}">${icon("i-close")}</button>
              </div>
            </div>
            <div class="filter-group">
              <div class="filter-title">${escapeHtml(t("category"))}<span>${CATEGORIES.length}</span></div>
              <div class="filter-list">
                <button class="filter-cat ${state.shop.category === "all" ? "is-active" : ""}" type="button" data-shop-category="all">
                  ${icon("i-grid")}<span>${escapeHtml(t("allCategories"))}</span><span class="count">${PRODUCTS.length}</span>
                </button>
                ${CATEGORIES.map((cat) => {
                  const active = state.shop.category === cat.id;
                  return `
                    <button class="filter-cat ${active ? "is-active" : ""}" type="button" data-shop-category="${cat.id}">
                      ${icon(cat.icon)}<span>${escapeHtml(tx(cat.name))}</span><span class="count">${PRODUCTS.filter((p) => p.cat === cat.id).length}</span>
                    </button>
                    ${active ? `<div class="filter-sub">
                      <button class="${state.shop.sub === "all" ? "is-active" : ""}" type="button" data-shop-sub="all">${escapeHtml(t("all"))}</button>
                      ${cat.subs.map((sub) => `<button class="${state.shop.sub === sub.id ? "is-active" : ""}" type="button" data-shop-sub="${sub.id}">${escapeHtml(tx(sub.name))}</button>`).join("")}
                    </div>` : ""}`;
                }).join("")}
              </div>
            </div>
            <div class="filter-group">
              <div class="filter-title">${escapeHtml(t("priceRange"))}<span>${money(state.shop.minPrice)} – ${money(state.shop.maxPrice)}</span></div>
              <div class="price-range">
                <div class="price-range-head"><span>${escapeHtml(t("minPrice"))}</span><output id="shopPriceOutput">${money(state.shop.maxPrice)}</output></div>
                <input type="range" id="shopPriceRange" min="0" max="10000000" step="100000" value="${state.shop.maxPrice}" aria-label="${escapeHtml(t("priceRange"))}" style="--range-progress:${(state.shop.maxPrice / 10000000) * 100}%" />
                <div class="price-presets">
                  <button class="price-preset ${state.shop.minPrice === 0 && state.shop.maxPrice === 10000000 ? "is-active" : ""}" type="button" data-price-preset data-min="0" data-max="10000000">${escapeHtml(t("priceAll"))}</button>
                  <button class="price-preset ${state.shop.maxPrice === 500000 ? "is-active" : ""}" type="button" data-price-preset data-min="0" data-max="500000">${escapeHtml(t("priceUnder1"))}</button>
                  <button class="price-preset ${state.shop.minPrice === 500000 && state.shop.maxPrice === 1000000 ? "is-active" : ""}" type="button" data-price-preset data-min="500000" data-max="1000000">${escapeHtml(t("price500to1"))}</button>
                  <button class="price-preset ${state.shop.minPrice === 1000000 && state.shop.maxPrice === 3000000 ? "is-active" : ""}" type="button" data-price-preset data-min="1000000" data-max="3000000">${escapeHtml(t("price1to3"))}</button>
                  <button class="price-preset ${state.shop.minPrice === 3000000 && state.shop.maxPrice === 10000000 ? "is-active" : ""}" type="button" data-price-preset data-min="3000000" data-max="10000000">${escapeHtml(t("priceOver3"))}</button>
                </div>
              </div>
            </div>
            <div class="filter-group">
              <div class="filter-title">${escapeHtml(t("keyword"))}</div>
              <label class="sidebar-search">${icon("i-search")}<input type="search" id="shopKeyword" value="${escapeHtml(state.shop.query)}" placeholder="${escapeHtml(t("searchPlaceholder"))}" aria-label="${escapeHtml(t("keyword"))}" /></label>
            </div>
            <div class="sidebar-promo">
              <span class="eyebrow">${escapeHtml(t("freeConsultShort"))}</span>
              <h3>${escapeHtml(state.lang === "vi" ? "Cần giúp chọn quà?" : "Need help choosing?")}</h3>
              <p>${escapeHtml(state.lang === "vi" ? "Nhắn Zalo hoặc gọi Abodhi để được tư vấn đúng nhu cầu." : "Message Abodhi on Zalo or call us for personal advice.")}</p>
              <a class="text-link light" style="margin-top:12px" href="https://zalo.me/0912578516" target="_blank" rel="noopener">${escapeHtml(t("chatZalo"))} ${icon("i-arrow-right")}</a>
            </div>
          </aside>
          <div class="shop-main">
            <div id="shopResults">${renderShopResultsInner()}</div>
          </div>
        </div>
      </div>
      <div class="filter-backdrop" data-filter-close></div>`;
  }

  function filteredShopProducts() {
    const { category, sub, minPrice, maxPrice, query } = state.shop;
    const q = normalizeText(query);
    let list = PRODUCTS.filter((p) => {
      if (category !== "all" && p.cat !== category) return false;
      if (sub !== "all" && p.sub !== sub) return false;
      const price = productFromPrice(p);
      if (minPrice === 0 && maxPrice >= 10000000) {
        // keep all, including pieces on request
      } else {
        if (price == null) return false;
        if (price < minPrice || price > maxPrice) return false;
      }
      if (q) {
        const hay = [p.name.vi, p.name.en, p.short.vi, p.short.en, p.description.vi, p.description.en, catName(p), p.sku].map(normalizeText).join(" ");
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (state.shop.sort === "price-asc") list = list.slice().sort((a, b) => (productFromPrice(a) ?? 999999999) - (productFromPrice(b) ?? 999999999));
    if (state.shop.sort === "price-desc") list = list.slice().sort((a, b) => (productFromPrice(b) ?? -1) - (productFromPrice(a) ?? -1));
    if (state.shop.sort === "best") list = list.slice().sort((a, b) => (b.badge === "bestseller" ? 2 : b.rating || 0) - (a.badge === "bestseller" ? 2 : a.rating || 0));
    if (state.shop.sort === "newest") list = list.slice().sort((a, b) => PRODUCTS.indexOf(b) - PRODUCTS.indexOf(a));
    return list;
  }

  function renderShopResultsInner() {
    const list = filteredShopProducts();
    const perPage = 9;
    const totalPages = Math.max(1, Math.ceil(list.length / perPage));
    if (state.shop.page > totalPages) state.shop.page = totalPages;
    const page = state.shop.page;
    const start = (page - 1) * perPage;
    const pageItems = list.slice(start, start + perPage);
    const cat = getCategory(state.shop.category);
    const sub = state.shop.sub !== "all" ? getSub(state.shop.category, state.shop.sub) : null;
    const hasFilters = state.shop.category !== "all" || state.shop.sub !== "all" || state.shop.query || state.shop.minPrice > 0 || state.shop.maxPrice < 10000000;
    return `
      <div class="shop-toolbar">
        <div class="shop-count"><strong>${list.length}</strong> ${escapeHtml(t("products"))}${hasFilters ? ` · ${escapeHtml(t("resultFor"))} ${escapeHtml(cat ? tx(cat.name) : t("allCategories"))}` : ""}</div>
        <div class="shop-toolbar-right">
          <button class="mobile-filter-toggle" type="button" data-filter-open>${icon("i-filter")}${escapeHtml(t("filters"))}</button>
          <div class="sort-wrap">
            <label for="sortSelect">${escapeHtml(t("sortLabel"))}</label>
            <select class="sort-select" id="sortSelect" aria-label="${escapeHtml(t("sortBy"))}">
              <option value="default" ${state.shop.sort === "default" ? "selected" : ""}>${escapeHtml(t("sortDefault"))}</option>
              <option value="price-asc" ${state.shop.sort === "price-asc" ? "selected" : ""}>${escapeHtml(t("sortPriceAsc"))}</option>
              <option value="price-desc" ${state.shop.sort === "price-desc" ? "selected" : ""}>${escapeHtml(t("sortPriceDesc"))}</option>
              <option value="newest" ${state.shop.sort === "newest" ? "selected" : ""}>${escapeHtml(t("sortNewest"))}</option>
              <option value="best" ${state.shop.sort === "best" ? "selected" : ""}>${escapeHtml(t("sortBest"))}</option>
            </select>
            ${icon("i-chevron-down")}
          </div>
        </div>
      </div>
      ${hasFilters ? `<div class="active-filters">
        <span class="label">${escapeHtml(t("activeFilters"))}</span>
        ${cat ? `<span class="filter-chip">${escapeHtml(tx(cat.name))}<button type="button" data-remove-filter="category" aria-label="${escapeHtml(t("remove"))}">${icon("i-close")}</button></span>` : ""}
        ${sub ? `<span class="filter-chip">${escapeHtml(tx(sub.name))}<button type="button" data-remove-filter="sub" aria-label="${escapeHtml(t("remove"))}">${icon("i-close")}</button></span>` : ""}
        ${state.shop.query ? `<span class="filter-chip">“${escapeHtml(state.shop.query)}”<button type="button" data-remove-filter="query" aria-label="${escapeHtml(t("remove"))}">${icon("i-close")}</button></span>` : ""}
        ${state.shop.minPrice > 0 || state.shop.maxPrice < 10000000 ? `<span class="filter-chip">${money(state.shop.minPrice)} – ${money(state.shop.maxPrice)}<button type="button" data-remove-filter="price" aria-label="${escapeHtml(t("remove"))}">${icon("i-close")}</button></span>` : ""}
        <button class="clear-filter-btn" type="button" data-clear-filters>${escapeHtml(t("clearAll"))}</button>
      </div>` : ""}
      ${pageItems.length ? `<div class="shop-product-grid">${pageItems.map((p) => productCard(p)).join("")}</div>` : `
        <div class="shop-empty">
          <h3>${escapeHtml(t("noProducts"))}</h3>
          <p>${escapeHtml(t("searchEmpty"))}</p>
          <button class="btn btn-outline" type="button" data-clear-filters>${escapeHtml(t("reset"))}</button>
        </div>`}
      ${totalPages > 1 ? `<nav class="pagination" aria-label="${escapeHtml(t("page"))}">
        <button class="page-btn" type="button" data-shop-page="${page - 1}" ${page <= 1 ? "disabled" : ""} aria-label="${escapeHtml(t("prev"))}">${icon("i-arrow-left")}</button>
        ${Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => `<button class="page-btn ${n === page ? "is-active" : ""}" type="button" data-shop-page="${n}" ${n === page ? 'aria-current="page"' : ""}>${n}</button>`).join("")}
        <button class="page-btn" type="button" data-shop-page="${page + 1}" ${page >= totalPages ? "disabled" : ""} aria-label="${escapeHtml(t("next"))}">${icon("i-arrow-right")}</button>
      </nav>` : ""}`;
  }

  function refreshShopResults() {
    const box = $("#shopResults");
    if (box) box.innerHTML = renderShopResultsInner();
  }

  /* -----------------------------------------------------------------------
     PAGE: Product detail
     ----------------------------------------------------------------------- */
  function renderProductPage(slug) {
    const product = getProductBySlug(slug);
    if (!product) return renderNotFoundPage();
    const selection = state.productSelections[product.id] || defaultSelection(product);
    state.productSelections[product.id] = selection;
    const option = resolveOption(product, selection);
    const category = getCategory(product.cat);
    const related = PRODUCTS.filter((p) => p.id !== product.id && (p.cat === product.cat || p.badge === "bestseller")).slice(0, 4);
    const reviews = [0, 1, 2].map((i) => TESTIMONIALS[(PRODUCTS.indexOf(product) + i) % TESTIMONIALS.length]);
    const compareAt = option?.compareAt || product.compareAt;
    const pct = percent(option?.price, compareAt);
    const priceHtml = productFromPrice(product) == null
      ? `<span class="pdp-price-contact">${escapeHtml(t("contactForPrice"))}</span>`
      : `<span class="pdp-price" id="pdpPrice">${money(option.price)}</span>${compareAt ? `<span class="pdp-price-old" id="pdpOldPrice">${money(compareAt)}</span>` : ""}${pct ? `<span class="pdp-discount">${pct}</span>` : ""}`;

    let purchaseHtml = "";
    if (product.quoteOnly) {
      purchaseHtml = `
        <button class="btn btn-primary btn-block" type="button" data-quote="${product.id}">${icon("i-quote")} ${escapeHtml(t("quoteRequest"))}</button>
        <div class="pdp-quote-note">${icon("i-spark")}<span>${escapeHtml(t("quoteIntro"))}</span></div>`;
    } else if (product.contactOnly) {
      purchaseHtml = `
        <div class="pdp-buy-row" style="grid-template-columns:1fr 1fr">
          <a class="btn btn-primary" href="tel:0912578516">${icon("i-phone")} ${escapeHtml(t("callHotline"))}</a>
          <a class="btn btn-outline" href="https://zalo.me/0912578516" target="_blank" rel="noopener">${icon("i-zalo")} ${escapeHtml(t("contactZalo"))}</a>
        </div>
        <div class="pdp-quote-note">${icon("i-pin")}<span>${escapeHtml(state.lang === "vi" ? "Tác phẩm độc bản — Abodhi mời quý khách liên hệ để xem trực tiếp tại showroom hoặc nhận video chi tiết." : "A one-of-a-kind piece — contact Abodhi to view it at the showroom or receive a detailed video.")}</span></div>`;
    } else {
      purchaseHtml = `
        <div class="pdp-purchase">
          <div class="qty qty-lg">
            <button type="button" data-pdp-qty="-1" aria-label="-">${icon("i-minus")}</button>
            <span id="pdpQtyValue">${selection.qty || 1}</span>
            <button type="button" data-pdp-qty="1" aria-label="+">${icon("i-plus")}</button>
          </div>
          <button class="btn btn-primary" type="button" data-add-current ${option.stock <= 0 ? "disabled" : ""}>${icon("i-bag")} ${escapeHtml(t("addToCart"))}</button>
        </div>
        <div class="pdp-buy-row">
          <button class="btn btn-outline" type="button" data-buy-now ${option.stock <= 0 ? "disabled" : ""}>${escapeHtml(t("buyNow"))} ${icon("i-arrow-right")}</button>
          <a class="btn btn-outline" href="https://zalo.me/0912578516" target="_blank" rel="noopener">${icon("i-zalo")} ${escapeHtml(t("consult"))}</a>
        </div>`;
    }

    const variantHtml = product.jewelrySpec ? `
      <div class="variant-block">
        <div class="variant-head"><span class="variant-label">${escapeHtml(t("variantSize"))}</span><span class="variant-selected" id="variantSelected">${escapeHtml(option.label)}</span></div>
        <div class="variant-options">
          ${product.jewelrySpec.sizes.map((size) => `<button class="variant-chip ${option.sizeId === size.id ? "is-active" : ""}" type="button" data-variant-size="${size.id}" ${size.stock <= 0 ? "disabled" : ""}>${escapeHtml(tx(size.label))}<small>${escapeHtml(tx(size.note))}</small></button>`).join("")}
        </div>
      </div>
      <div class="variant-block">
        <div class="variant-head"><span class="variant-label">${escapeHtml(t("variantCount"))}</span><span class="variant-selected">${escapeHtml(state.lang === "vi" ? "Tự chọn theo nhu cầu" : "Choose your count")}</span></div>
        <div class="variant-options">
          ${product.jewelrySpec.counts.map((count) => `<button class="variant-chip ${option.countId === count.id ? "is-active" : ""}" type="button" data-variant-count="${count.id}" ${count.stock <= 0 ? "disabled" : ""}>${escapeHtml(tx(count.label))}<small>${money(count.price + (product.jewelrySpec.sizes.find((s) => s.id === option.sizeId)?.add || 0))}</small></button>`).join("")}
        </div>
        <div class="variant-stock ${option.stock <= 0 ? "out" : option.stock <= 5 ? "low" : ""}" id="variantStock"><span class="dot"></span>${option.stock <= 0 ? escapeHtml(t("outOfStock")) : option.stock <= 5 ? escapeHtml(t("lowStock", { n: option.stock })) : escapeHtml(t("inStock"))}</div>
      </div>` : product.options ? `
      <div class="variant-block">
        <div class="variant-head"><span class="variant-label">${escapeHtml(t("variantPack"))}</span><span class="variant-selected" id="variantSelected">${escapeHtml(option.label)}</span></div>
        <div class="variant-options">
          ${product.options.map((opt) => `<button class="variant-chip ${option.id === opt.id ? "is-active" : ""}" type="button" data-option="${opt.id}" ${opt.stock <= 0 ? "disabled" : ""}>${escapeHtml(tx(opt.label))}<small>${money(opt.price)}</small></button>`).join("")}
        </div>
        <div class="variant-stock ${option.stock <= 0 ? "out" : option.stock <= 5 ? "low" : ""}" id="variantStock"><span class="dot"></span>${option.stock <= 0 ? escapeHtml(t("outOfStock")) : option.stock <= 5 ? escapeHtml(t("lowStock", { n: option.stock })) : escapeHtml(t("inStock"))}</div>
      </div>` : "";

    return `
      <div class="pdp-wrap">
        <div class="container">
          ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("navShop"), href: "#/shop" }, { label: tx(category?.name), href: `#/shop?category=${product.cat}` }, { label: tx(product.name) }])}
          <div class="pdp-grid">
            <div class="pdp-gallery">
              <div class="pdp-thumbs">
                ${product.images.map((src, i) => `<button class="pdp-thumb ${i === 0 ? "is-active" : ""}" type="button" data-gallery-thumb="${src}" aria-label="${escapeHtml(tx(product.name))} ${i + 1}"><img src="${src}" alt="" loading="lazy" /></button>`).join("")}
              </div>
              <div class="pdp-main" data-zoom="${product.images[0]}" data-alt="${escapeHtml(tx(product.name))}">
                <img src="${product.images[0]}" alt="${escapeHtml(tx(product.name))}" id="pdpMainImage" data-zoom="${product.images[0]}" />
                <span class="product-badges">${badgesFor(product)}</span>
                <span class="pdp-zoom-hint">${icon("i-zoom")} ${escapeHtml(state.lang === "vi" ? "Phóng to" : "Zoom")}</span>
              </div>
            </div>
            <div class="pdp-detail">
              <div class="pdp-cat">${escapeHtml(tx(category?.name))}<span class="dot"></span>${escapeHtml(product.sku)}</div>
              <h1 class="pdp-title">${escapeHtml(tx(product.name))}</h1>
              <p class="pdp-subtitle">${escapeHtml(tx(product.subtitle))}</p>
              <div class="pdp-rating-row">
                ${stars(product.rating || 5)}
                <span class="rating-num">${Number(product.rating || 5).toFixed(1)}</span>
                <a class="rating-count" href="#" data-pdp-tab="reviews">${escapeHtml(t("basedOn", { n: product.reviewCount || 0 }))}</a>
                <span class="in-stock ${option.stock <= 0 ? "out-stock" : ""}">${option.stock <= 0 ? escapeHtml(t("outOfStock")) : escapeHtml(t("inStock"))}</span>
              </div>
              <div class="pdp-price-row">${priceHtml}</div>
              <p class="pdp-short">${escapeHtml(tx(product.short))}</p>
              ${variantHtml}
              ${purchaseHtml}
              <div class="pdp-assurance">
                <span>${icon("i-shield")} ${escapeHtml(t("authenticate"))}</span>
                <span>${icon("i-leaf")} ${escapeHtml(t("trust1"))}</span>
                <span>${icon("i-truck")} ${escapeHtml(t("fixedShip"))}</span>
                <span>${icon("i-package")} ${escapeHtml(t("return7"))}</span>
              </div>
              <div class="pdp-call">${icon("i-phone")}<span>${escapeHtml(t("trustNote"))} <a href="tel:0912578516">0912 578 516</a></span></div>
            </div>
          </div>
        </div>
        <div class="pdp-mobile-bar">
          <div class="m-price"><span>${escapeHtml(t("priceRange"))}</span><strong id="pdpMobilePrice">${productFromPrice(product) == null ? escapeHtml(t("contactForPrice")) : money(option?.price ?? productFromPrice(product))}</strong></div>
          ${product.quoteOnly ? `<button class="btn btn-primary" type="button" data-quote="${product.id}">${escapeHtml(t("quoteRequest"))}</button>` : product.contactOnly ? `<a class="btn btn-primary" href="tel:0912578516">${escapeHtml(t("callHotline"))}</a>` : `<button class="btn btn-primary" type="button" data-add-current>${escapeHtml(t("addToCart"))}</button>`}
        </div>
        <div class="pdp-tabs-section">
          <div class="container">
            <div class="pdp-tabs">
              <button class="pdp-tab is-active" type="button" data-pdp-tab="description">${escapeHtml(t("description"))}</button>
              <button class="pdp-tab" type="button" data-pdp-tab="usage">${escapeHtml(t("usage"))}</button>
              <button class="pdp-tab" type="button" data-pdp-tab="specs">${escapeHtml(t("specifications"))}</button>
              <button class="pdp-tab" type="button" data-pdp-tab="reviews">${escapeHtml(t("reviews"))} (${product.reviewCount || 0})</button>
            </div>
            <div class="pdp-panel is-active" data-pdp-panel="description">
              <div class="pdp-content-grid">
                <div class="rich-text">
                  <p>${escapeHtml(tx(product.description))}</p>
                  ${(product.story?.[state.lang] || product.story?.vi || []).map((para) => `<p>${escapeHtml(para)}</p>`).join("")}
                  <blockquote>“${escapeHtml(t("storyQuote"))}”</blockquote>
                </div>
                <div class="spec-table">
                  <dl>
                    <div class="spec-row"><dt>${escapeHtml(t("origin"))}</dt><dd>${escapeHtml(tx(product.specs.origin))}</dd></div>
                    <div class="spec-row"><dt>${escapeHtml(t("age"))}</dt><dd>${escapeHtml(tx(product.specs.age))}</dd></div>
                    <div class="spec-row"><dt>${escapeHtml(t("scent"))}</dt><dd>${escapeHtml(tx(product.specs.scent))}</dd></div>
                    <div class="spec-row"><dt>${escapeHtml(t("weight"))}</dt><dd>${escapeHtml(tx(product.specs.weight))}</dd></div>
                  </dl>
                </div>
              </div>
            </div>
            <div class="pdp-panel" data-pdp-panel="usage">
              <div class="usage-steps">
                ${(product.usage?.[state.lang] || product.usage?.vi || []).map((step, i) => `<div class="usage-step"><span class="num">0${i + 1}</span><p>${escapeHtml(step)}</p></div>`).join("")}
              </div>
            </div>
            <div class="pdp-panel" data-pdp-panel="specs">
              <div class="pdp-content-grid">
                <div class="rich-text">
                  <p>${escapeHtml(t("description"))}: ${escapeHtml(tx(product.description))}</p>
                  <h2>${escapeHtml(t("authenticate"))}</h2>
                  <p>${escapeHtml(state.lang === "vi" ? "Mỗi sản phẩm Abodhi đi kèm thông tin nguồn gốc, độ tuổi tích trầm và hướng dẫn bảo quản. Chúng tôi cam kết trầm hương tự nhiên, không hương liệu tổng hợp." : "Every Abodhi product includes origin information, resin age and care guidance. We promise natural agarwood with no synthetic fragrance.")}</p>
                </div>
                <div class="spec-table">
                  <dl>
                    <div class="spec-row"><dt>SKU</dt><dd>${escapeHtml(product.sku)}</dd></div>
                    <div class="spec-row"><dt>${escapeHtml(t("category"))}</dt><dd>${escapeHtml(tx(category?.name))}</dd></div>
                    <div class="spec-row"><dt>${escapeHtml(t("origin"))}</dt><dd>${escapeHtml(tx(product.specs.origin))}</dd></div>
                    <div class="spec-row"><dt>${escapeHtml(t("age"))}</dt><dd>${escapeHtml(tx(product.specs.age))}</dd></div>
                    <div class="spec-row"><dt>${escapeHtml(t("weight"))}</dt><dd>${escapeHtml(tx(product.specs.weight))}</dd></div>
                  </dl>
                </div>
              </div>
            </div>
            <div class="pdp-panel" data-pdp-panel="reviews">
              <div class="review-summary">
                <div class="review-score"><strong>${Number(product.rating || 5).toFixed(1)}</strong>${stars(product.rating || 5)}<span>${escapeHtml(t("basedOn", { n: product.reviewCount || 0 }))}</span></div>
                <div class="review-bars">
                  ${[5, 4, 3, 2, 1].map((n) => `<div class="review-bar"><span>${n} ★</span><span class="bar"><span style="width:${n === 5 ? 84 : n === 4 ? 12 : n === 3 ? 3 : 1}%"></span></span><span>${n === 5 ? 84 : n === 4 ? 12 : n === 3 ? 3 : 1}%</span></div>`).join("")}
                </div>
              </div>
              <div class="review-list">
                ${reviews.map((r) => `<article class="review-card"><div class="review-card-head"><span class="review-avatar">${escapeHtml(r.initial)}</span><div><strong>${escapeHtml(r.name)}</strong><span>${icon("i-check")} ${escapeHtml(t("verified"))}</span></div>${stars(r.rating)}</div><p>“${escapeHtml(tx(r.quote))}”</p></article>`).join("")}
              </div>
            </div>
          </div>
        </div>
        <section class="pdp-related">
          <div class="container">
            ${sectionHead({ eyebrow: t("related"), title: `${escapeHtml(t("relatedProducts"))}`, link: "#/shop", linkText: t("viewAll") })}
            <div class="product-grid">${related.map((p) => productCard(p)).join("")}</div>
          </div>
        </section>
      </div>`;
  }

  function renderJournalGrid() {
    const list = state.newsCat === "all" ? ARTICLES : ARTICLES.filter((a) => a.cat === state.newsCat);
    if (!list.length) return `<div class="journal-empty">${escapeHtml(t("noResult"))}</div>`;
    return list.map((article) => `
      <article class="journal-card reveal">
        <a class="journal-card-media" href="#/news/${article.slug}" aria-label="${escapeHtml(tx(article.title))}">
          <img src="${article.image}" alt="${escapeHtml(tx(article.title))}" loading="lazy" />
          <span class="journal-card-cat">${escapeHtml(articleCategoryLabel(article.cat))}</span>
        </a>
        <div class="journal-card-body">
          <div class="journal-card-meta"><span>${formatDate(article.date)}</span><span class="dot"></span><span>${escapeHtml(t("minuteRead", { n: article.read }))}</span></div>
          <h3><a href="#/news/${article.slug}">${escapeHtml(tx(article.title))}</a></h3>
          <p>${escapeHtml(tx(article.excerpt))}</p>
          <a class="text-link" href="#/news/${article.slug}">${escapeHtml(t("readArticle"))} ${icon("i-arrow-right")}</a>
        </div>
      </article>`).join("");
  }

  function articleCategoryLabel(cat) {
    if (cat === "knowledge") return t("knowledgeCat");
    if (cat === "fengshui") return t("fengshuiCat");
    return t("companyCat");
  }

  /* -----------------------------------------------------------------------
     PAGE: Cart
     ----------------------------------------------------------------------- */
  function renderCartPage() {
    const totals = cartTotals();
    if (!totals.lines.length) {
      return `
        <section class="page-hero compact">
          <div class="container">
            ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("cartTitle") }])}
            <span class="eyebrow">${escapeHtml(t("shoppingCart"))}</span>
            <h1 class="page-title">${escapeHtml(t("cartTitle"))}</h1>
          </div>
        </section>
        <div class="container cart-page">
          <div class="empty-state">
            <span class="empty-icon">${icon("i-bag")}</span>
            <h2>${escapeHtml(t("emptyCartTitle"))}</h2>
            <p>${escapeHtml(t("cartEmptyDesc"))}</p>
            <a class="btn btn-primary" href="#/shop">${escapeHtml(t("continueShopping"))} ${icon("i-arrow-right")}</a>
          </div>
        </div>`;
    }
    return `
      <section class="page-hero compact">
        <div class="container">
          ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("cartTitle") }])}
          <span class="eyebrow">${escapeHtml(t("shoppingCart"))}</span>
          <h1 class="page-title">${escapeHtml(t("cartTitle"))}</h1>
          <p class="page-hero-lead">${escapeHtml(t("cartSubtitle"))}</p>
        </div>
      </section>
      <div class="container cart-page">
        <div class="checkout-steps">
          <span class="checkout-step is-active"><span class="step-no">1</span><span>${escapeHtml(t("cart"))}</span></span>
          <span class="checkout-step-line"></span>
          <span class="checkout-step"><span class="step-no">2</span><span>${escapeHtml(t("checkout"))}</span></span>
          <span class="checkout-step-line"></span>
          <span class="checkout-step"><span class="step-no">3</span><span>${escapeHtml(state.lang === "vi" ? "Hoàn tất" : "Complete")}</span></span>
        </div>
        <div class="cart-layout">
          <div>
            <div class="cart-list">
              <div class="cart-list-head"><h2>${escapeHtml(t("yourSelection"))}</h2><span>${totals.count} ${escapeHtml(t("products"))}</span></div>
              ${totals.lines.map((line) => `
                <div class="cart-line">
                  <a class="cart-line-img" href="#/product/${line.product.slug}"><img src="${line.product.images[0]}" alt="${escapeHtml(tx(line.product.name))}" /></a>
                  <div class="cart-line-info">
                    <h3><a href="#/product/${line.product.slug}">${escapeHtml(tx(line.product.name))}</a></h3>
                    <div class="cart-line-variant">${escapeHtml(line.option.label)} · SKU ${escapeHtml(line.product.sku)}</div>
                    <div class="cart-line-price">${money(line.option.price)}</div>
                    <div class="cart-line-buy">
                      <div class="qty">
                        <button type="button" data-cart-qty="-1" data-key="${escapeHtml(line.key)}" aria-label="-">${icon("i-minus")}</button>
                        <span>${line.qty}</span>
                        <button type="button" data-cart-qty="1" data-key="${escapeHtml(line.key)}" aria-label="+">${icon("i-plus")}</button>
                      </div>
                      <button type="button" class="cart-item-remove" data-remove-cart="${escapeHtml(line.key)}">${icon("i-trash")} ${escapeHtml(t("remove"))}</button>
                    </div>
                  </div>
                  <div class="cart-line-total"><strong>${money(line.lineTotal)}</strong><span>${escapeHtml(t("lineTotal"))}</span></div>
                </div>`).join("")}
            </div>
            <div class="cart-actions-row">
              <a class="btn btn-outline btn-sm" href="#/shop">${icon("i-arrow-left")} ${escapeHtml(t("continueShopping"))}</a>
              <span class="cart-note">${icon("i-shield")} ${escapeHtml(t("fixedShip"))}</span>
            </div>
          </div>
          <aside class="cart-aside">
            <div class="summary-card">
              <h2>${escapeHtml(t("orderSummary"))}</h2>
              <div class="summary-lines">
                <div class="summary-line"><span>${escapeHtml(t("subtotal"))}</span><strong>${money(totals.subtotal)}</strong></div>
                ${totals.discount ? `<div class="summary-line"><span>${escapeHtml(t("discount"))} (ABODHI10)</span><strong style="color:var(--emerald-700)">−${money(totals.discount)}</strong></div>` : ""}
                <div class="summary-line"><span>${escapeHtml(t("shipping"))} <span class="free">${escapeHtml(t("shippingFixed"))}</span></span><strong>${money(totals.shipping)}</strong></div>
              </div>
              <div class="summary-total"><span>${escapeHtml(t("total"))}</span><div><strong>${money(totals.total)}</strong><small>${escapeHtml(state.lang === "vi" ? "Đã bao gồm VAT & phí vận chuyển" : "VAT & shipping included")}</small></div></div>
              <form class="coupon-row" id="couponForm">
                <input type="text" placeholder="${escapeHtml(t("coupon"))} · ABODHI10" aria-label="${escapeHtml(t("coupon"))}" />
                <button class="btn btn-outline" type="submit">${escapeHtml(t("applyCoupon"))}</button>
              </form>
              <p style="font-size:8.5px;color:var(--muted-2);margin:-5px 0 12px">${escapeHtml(t("couponHint"))}</p>
              <a class="btn btn-primary btn-block" href="#/checkout">${escapeHtml(t("checkout"))} ${icon("i-arrow-right")}</a>
              <div class="summary-safe">${icon("i-shield")} ${escapeHtml(state.lang === "vi" ? "Thanh toán an toàn · Bảo mật thông tin" : "Secure payment · Private data")}</div>
              <div class="payment-icons"><span>COD</span><span>BANK</span><span>VISA</span><span>MOMO</span></div>
            </div>
          </aside>
        </div>
      </div>`;
  }

  /* -----------------------------------------------------------------------
     PAGE: Checkout
     ----------------------------------------------------------------------- */
  function renderCheckoutPage() {
    const totals = cartTotals();
    if (!totals.lines.length) {
      return `
        <section class="page-hero compact">
          <div class="container">
            ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("cart"), href: "#/cart" }, { label: t("checkout") }])}
            <span class="eyebrow">${escapeHtml(t("checkout"))}</span>
            <h1 class="page-title">${escapeHtml(t("checkoutTitle"))}</h1>
          </div>
        </section>
        <div class="container checkout-page">
          <div class="empty-state">
            <span class="empty-icon">${icon("i-bag")}</span>
            <h2>${escapeHtml(t("emptyCartTitle"))}</h2>
            <p>${escapeHtml(t("cartEmptyCheckout"))}</p>
            <a class="btn btn-primary" href="#/shop">${escapeHtml(t("backToShop"))} ${icon("i-arrow-right")}</a>
          </div>
        </div>`;
    }
    const c = state.checkout;
    const bank = state.payment === "bank";
    return `
      <section class="page-hero compact">
        <div class="container">
          ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("cart"), href: "#/cart" }, { label: t("checkout") }])}
          <span class="eyebrow">${escapeHtml(t("shoppingCart"))}</span>
          <h1 class="page-title">${escapeHtml(t("checkoutTitle"))}</h1>
          <p class="page-hero-lead">${escapeHtml(t("checkoutSubtitle"))}</p>
        </div>
      </section>
      <div class="container checkout-page">
        <div class="checkout-steps">
          <a class="checkout-step is-done" href="#/cart"><span class="step-no">${icon("i-check")}</span><span>${escapeHtml(t("cart"))}</span></a>
          <span class="checkout-step-line"></span>
          <span class="checkout-step is-active"><span class="step-no">2</span><span>${escapeHtml(t("checkout"))}</span></span>
          <span class="checkout-step-line"></span>
          <span class="checkout-step"><span class="step-no">3</span><span>${escapeHtml(state.lang === "vi" ? "Hoàn tất" : "Complete")}</span></span>
        </div>
        <div class="checkout-layout">
          <form class="checkout-main" id="checkoutForm" novalidate>
            <div class="checkout-card">
              <div class="checkout-card-head"><span class="num">1</span><h2>${escapeHtml(t("shippingInfo"))}</h2></div>
              <div class="checkout-form-grid">
                <div class="field"><label for="checkoutName">${escapeHtml(t("fullName"))} *</label><input id="checkoutName" name="fullName" data-checkout-field type="text" value="${escapeHtml(c.fullName)}" placeholder="${escapeHtml(t("formNamePh"))}" required /><span class="field-error"></span></div>
                <div class="field"><label for="checkoutPhone">${escapeHtml(t("phoneNumber"))} *</label><input id="checkoutPhone" name="phone" data-checkout-field type="tel" value="${escapeHtml(c.phone)}" placeholder="${escapeHtml(t("formPhonePh"))}" required /><span class="field-error"></span></div>
                <div class="field field-full"><label for="checkoutEmail">${escapeHtml(t("email"))}</label><input id="checkoutEmail" name="email" data-checkout-field type="email" value="${escapeHtml(c.email)}" placeholder="${escapeHtml(t("formEmailPh"))}" /><span class="field-error"></span></div>
                <div class="field field-full"><label for="checkoutAddress">${escapeHtml(t("address"))} *</label><input id="checkoutAddress" name="address" data-checkout-field type="text" value="${escapeHtml(c.address)}" placeholder="${escapeHtml(state.lang === "vi" ? "Số nhà, đường, phường/xã…" : "Street, ward, district…")}" required /><span class="field-error"></span></div>
                <div class="field"><label for="checkoutCity">${escapeHtml(t("city"))} *</label><input id="checkoutCity" name="city" data-checkout-field type="text" value="${escapeHtml(c.city)}" placeholder="${escapeHtml(state.lang === "vi" ? "TP. Hồ Chí Minh" : "Ho Chi Minh City")}" required /><span class="field-error"></span></div>
                <div class="field"><label for="checkoutNote">${escapeHtml(t("note"))}</label><input id="checkoutNote" name="note" data-checkout-field type="text" value="${escapeHtml(c.note)}" placeholder="${escapeHtml(state.lang === "vi" ? "Thời gian nhận hàng, yêu cầu riêng…" : "Delivery time, special requests…")}" /></div>
              </div>
            </div>
            <div class="checkout-card">
              <div class="checkout-card-head"><span class="num">2</span><h2>${escapeHtml(t("payment"))}</h2></div>
              <div class="payment-options">
                <label class="payment-option ${!bank ? "is-active" : ""}" data-payment-option="cod">
                  <input type="radio" name="payment" value="cod" data-payment="cod" ${!bank ? "checked" : ""} />
                  <span class="payment-radio"></span>
                  <span class="payment-copy"><strong>${escapeHtml(t("paymentCod"))}</strong><span>${escapeHtml(t("paymentCodDesc"))}</span></span>
                  <span class="pay-icon">${icon("i-truck")}</span>
                </label>
                <label class="payment-option ${bank ? "is-active" : ""}" data-payment-option="bank">
                  <input type="radio" name="payment" value="bank" data-payment="bank" ${bank ? "checked" : ""} />
                  <span class="payment-radio"></span>
                  <span class="payment-copy"><strong>${escapeHtml(t("paymentBank"))}</strong><span>${escapeHtml(t("paymentBankDesc"))}</span></span>
                  <span class="pay-icon">${icon("i-package")}</span>
                </label>
              </div>
              <div class="bank-details ${bank ? "is-visible" : ""}" id="bankDetails">
                <div class="bank-details-grid">
                  <dt>${escapeHtml(t("bankName"))}</dt><dd>ACB – Ngân hàng TMCP Á Châu</dd>
                  <dt>${escapeHtml(t("accountNumber"))}</dt><dd>123456789 <button class="copy-btn" type="button" data-copy="123456789">${escapeHtml(t("copy"))}</button></dd>
                  <dt>${escapeHtml(t("accountName"))}</dt><dd>CONG TY TNHH TM VA DV PML TRUONG LAM</dd>
                  <dt>${escapeHtml(t("transferNote"))}</dt><dd>ABODHI ${escapeHtml(c.phone || "…")} <button class="copy-btn" type="button" data-copy="ABODHI ${escapeHtml(c.phone)}">${escapeHtml(t("copy"))}</button></dd>
                </div>
                <div class="bank-transfer-row">
                  ${qrGrid("ABODHI-ACB-123456789")}
                  <div class="qr-note"><strong>${escapeHtml(t("bankQrNote"))}</strong>${escapeHtml(state.lang === "vi" ? "Mã QR minh hoạ. Vui lòng kiểm tra kỹ thông tin trước khi chuyển khoản." : "Illustrative QR code. Please verify the details before transferring.")}</div>
                </div>
              </div>
            </div>
            <div class="checkout-card">
              <div class="checkout-card-head"><span class="num">3</span><h2>${escapeHtml(t("orderNote"))}</h2></div>
              <div class="field"><textarea id="checkoutNoteLong" name="noteLong" rows="3" placeholder="${escapeHtml(state.lang === "vi" ? "Ghi chú thêm cho Abodhi (không bắt buộc)" : "Anything else Abodhi should know? (optional)")}">${escapeHtml(c.note)}</textarea></div>
              <div class="checkout-submit">
                <button class="btn btn-primary btn-block btn-lg" type="submit">${icon("i-shield")} ${escapeHtml(t("placeOrder"))}</button>
                <p class="checkout-terms">${escapeHtml(state.lang === "vi" ? "Bằng việc đặt hàng, bạn đồng ý với chính sách vận chuyển và bảo mật của Abodhi." : "By placing an order you agree to Abodhi's shipping and privacy policies.")}</p>
              </div>
            </div>
          </form>
          <aside class="checkout-aside">
            <div class="summary-card">
              <h2>${escapeHtml(t("orderSummary"))}</h2>
              ${totals.lines.map((line) => `<div class="checkout-mini-item"><img src="${line.product.images[0]}" alt="" /><div class="m-info"><strong>${escapeHtml(tx(line.product.name))}</strong><span>${escapeHtml(line.option.label)} × ${line.qty}</span></div><span class="m-price">${money(line.lineTotal)}</span></div>`).join("")}
              <div class="summary-lines" style="margin-top:14px">
                <div class="summary-line"><span>${escapeHtml(t("subtotal"))}</span><strong>${money(totals.subtotal)}</strong></div>
                ${totals.discount ? `<div class="summary-line"><span>${escapeHtml(t("discount"))}</span><strong style="color:var(--emerald-700)">−${money(totals.discount)}</strong></div>` : ""}
                <div class="summary-line"><span>${escapeHtml(t("shipping"))}</span><strong>${money(totals.shipping)}</strong></div>
              </div>
              <div class="summary-total"><span>${escapeHtml(t("total"))}</span><div><strong>${money(totals.total)}</strong><small>${escapeHtml(t("shippingFixed"))}</small></div></div>
              <div class="summary-safe">${icon("i-shield")} ${escapeHtml(t("authenticate"))}</div>
            </div>
          </aside>
        </div>
      </div>`;
  }

  function qrGrid(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    let cells = "";
    for (let i = 0; i < 225; i++) {
      hash = (hash * 1103515245 + 12345) >>> 0;
      const corner = (i < 20 || (i % 15 < 5 && i < 75) || (i % 15 >= 10 && i < 75));
      const on = corner || (hash % 100) > 47;
      cells += `<span class="${on ? "on" : ""}"></span>`;
    }
    return `<div class="qr-grid" aria-hidden="true">${cells}</div>`;
  }

  function updatePaymentUI() {
    $$("[data-payment-option]").forEach((el) => el.classList.toggle("is-active", el.dataset.paymentOption === state.payment));
    const bank = $("#bankDetails");
    if (bank) bank.classList.toggle("is-visible", state.payment === "bank");
    $$('input[name="payment"]').forEach((el) => { el.checked = el.value === state.payment; });
  }

  function handleCheckoutSubmit(form) {
    const name = $("#checkoutName");
    const phone = $("#checkoutPhone");
    const email = $("#checkoutEmail");
    const address = $("#checkoutAddress");
    const city = $("#checkoutCity");
    const errors = [];
    [name, phone, email, address, city].forEach(clearFieldError);
    if (!name?.value.trim()) { setFieldError(name, t("required")); errors.push(name); }
    if (!phone?.value.trim() || !isPhone(phone.value)) { setFieldError(phone, t("invalidPhone")); errors.push(phone); }
    if (email?.value.trim() && !isEmail(email.value)) { setFieldError(email, t("invalidEmail")); errors.push(email); }
    if (!address?.value.trim()) { setFieldError(address, t("required")); errors.push(address); }
    if (!city?.value.trim()) { setFieldError(city, t("required")); errors.push(city); }
    if (errors.length) {
      errors[0].focus();
      showToast(t("formError"), "");
      return;
    }
    const totals = cartTotals();
    if (!totals.lines.length) return;
    state.checkout.fullName = name.value.trim();
    state.checkout.phone = phone.value.trim();
    state.checkout.email = email?.value.trim() || "";
    state.checkout.address = address.value.trim();
    state.checkout.city = city.value.trim();
    state.checkout.note = $("#checkoutNoteLong")?.value.trim() || "";
    const order = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      status: "confirmed",
      customer: state.checkout.fullName,
      phone: state.checkout.phone,
      email: state.checkout.email,
      address: state.checkout.address,
      city: state.checkout.city,
      note: state.checkout.note,
      payment: state.payment,
      items: totals.lines.map((line) => ({ productId: line.product.id, optionId: line.option.id, sizeId: line.option.sizeId, countId: line.option.countId, qty: line.qty, price: line.option.price })),
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      discount: totals.discount,
      total: totals.total
    };
    state.orders = [order, ...(Array.isArray(state.orders) ? state.orders : [])];
    saveJSON("abodhi_orders_v1", state.orders);
    state.lastOrder = order;
    saveJSON("abodhi_last_order_v1", order);
    state.cart = [];
    state.coupon = "";
    persistCart();
    syncCartCount();
    renderCartDrawer();
    navigate("order-confirmation");
  }

  function generateOrderId() {
    const d = new Date();
    const yy = String(d.getFullYear()).slice(-2);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const rand = String(Math.floor(1000 + Math.random() * 9000));
    return `ABD-${yy}${mm}${dd}-${rand}`;
  }

  function orderLines(order) {
    return (order.items || []).map((item) => {
      const product = getProduct(item.productId);
      if (!product) return null;
      const option = resolveOption(product, item);
      return { product, option, qty: item.qty, lineTotal: (item.price || option?.price || 0) * item.qty };
    }).filter(Boolean);
  }

  function renderOrderConfirmationPage() {
    const order = state.lastOrder || loadJSON("abodhi_last_order_v1", null);
    if (!order) {
      return `
        <div class="container confirm-page">
          <div class="empty-state"><span class="empty-icon">${icon("i-package")}</span><h2>${escapeHtml(t("notFoundTitle"))}</h2><p>${escapeHtml(t("notFoundDesc"))}</p><a class="btn btn-primary" href="#/shop">${escapeHtml(t("backToShop"))}</a></div>
        </div>`;
    }
    const lines = orderLines(order);
    return `
      <section class="page-hero compact">
        <div class="container">
          ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("orderConfirmed") }])}
          <span class="eyebrow">${escapeHtml(t("orderSuccess"))}</span>
          <h1 class="page-title">${escapeHtml(state.lang === "vi" ? "Cảm ơn bạn đã tin chọn Abodhi." : "Thank you for choosing Abodhi.")}</h1>
        </div>
      </section>
      <div class="container confirm-page">
        <div class="confirm-card">
          <div class="confirm-icon">${icon("i-check")}</div>
          <span class="eyebrow">${escapeHtml(t("orderSuccess"))}</span>
          <h1>${escapeHtml(t("orderConfirmed"))}</h1>
          <p>${escapeHtml(t("orderConfirmedDesc"))}</p>
          <div class="order-code-box"><span>${escapeHtml(t("orderCode"))}</span><strong>${escapeHtml(order.id)}</strong><small>${escapeHtml(t("saveOrderCode"))}</small><button class="copy-btn" style="margin-top:8px" type="button" data-copy="${escapeHtml(order.id)}">${escapeHtml(t("copy"))}</button></div>
          <div class="order-meta-grid">
            <div><span>${escapeHtml(t("orderDate"))}</span><strong>${escapeHtml(formatDateTime(order.date))}</strong></div>
            <div><span>${escapeHtml(t("paymentMethod"))}</span><strong>${escapeHtml(order.payment === "bank" ? t("bank") : t("cod"))}</strong></div>
            <div><span>${escapeHtml(t("status"))}</span><strong>${escapeHtml(t("statusConfirmed"))}</strong></div>
          </div>
          ${order.payment === "bank" ? `<div class="bank-details is-visible" style="text-align:left;margin-bottom:24px"><div class="bank-details-grid"><dt>${escapeHtml(t("bankName"))}</dt><dd>ACB – Ngân hàng TMCP Á Châu</dd><dt>${escapeHtml(t("accountNumber"))}</dt><dd>123456789 <button class="copy-btn" type="button" data-copy="123456789">${escapeHtml(t("copy"))}</button></dd><dt>${escapeHtml(t("accountName"))}</dt><dd>CONG TY TNHH TM VA DV PML TRUONG LAM</dd><dt>${escapeHtml(t("transferNote"))}</dt><dd>${escapeHtml(order.id)} <button class="copy-btn" type="button" data-copy="${escapeHtml(order.id)}">${escapeHtml(t("copy"))}</button></dd></div></div>` : ""}
          <div class="order-detail-list" style="text-align:left;margin-bottom:22px">
            <div><span>${escapeHtml(t("customer"))}</span><strong>${escapeHtml(order.customer)}</strong></div>
            <div><span>${escapeHtml(t("phoneNumber"))}</span><strong>${escapeHtml(order.phone)}</strong></div>
            <div><span>${escapeHtml(t("address"))}</span><strong>${escapeHtml(order.address)}, ${escapeHtml(order.city)}</strong></div>
            <div><span>${escapeHtml(t("total"))}</span><strong>${money(order.total)}</strong></div>
          </div>
          <div class="tracking-items" style="text-align:left;margin-bottom:26px">
            ${lines.map((line) => `<div class="tracking-item"><img src="${line.product.images[0]}" alt="" /><strong>${escapeHtml(tx(line.product.name))}</strong><span>${escapeHtml(line.option?.label || "")} × ${line.qty}</span></div>`).join("")}
          </div>
          <div class="confirm-actions">
            <a class="btn btn-primary" href="#/tracking?id=${encodeURIComponent(order.id)}&phone=${encodeURIComponent(order.phone)}">${escapeHtml(t("viewOrder"))} ${icon("i-arrow-right")}</a>
            <a class="btn btn-outline" href="#/shop">${escapeHtml(t("continueShopping"))}</a>
          </div>
        </div>
      </div>`;
  }

  /* -----------------------------------------------------------------------
     PAGE: Order tracking
     ----------------------------------------------------------------------- */
  function renderTrackingPage() {
    const qid = state.route.query.get("id") || "";
    const qphone = state.route.query.get("phone") || "";
    const found = qid && qphone ? findOrder(qid, qphone) : null;
    return `
      <section class="page-hero compact">
        <div class="container">
          ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("orderTracking") }])}
          <span class="eyebrow">${escapeHtml(t("orderTracking"))}</span>
          <h1 class="page-title">${escapeHtml(t("orderTracking"))}</h1>
          <p class="page-hero-lead">${escapeHtml(t("orderTrackingDesc"))}</p>
        </div>
      </section>
      <div class="container tracking-page">
        <div class="tracking-wrap">
          <div class="tracking-card">
            <h2>${escapeHtml(t("trackingResult"))}</h2>
            <p>${escapeHtml(t("orderTrackingDesc"))}</p>
            <form id="trackingForm" class="tracking-form" novalidate>
              <div class="field"><label for="trackingOrderId">${escapeHtml(t("orderId"))}</label><input id="trackingOrderId" type="text" value="${escapeHtml(qid || state.lastOrder?.id || "")}" placeholder="ABD-261108-1024" required /></div>
              <div class="field"><label for="trackingPhone">${escapeHtml(t("phoneNumber"))}</label><input id="trackingPhone" type="tel" value="${escapeHtml(qphone || state.lastOrder?.phone || "")}" placeholder="0912 578 516" required /></div>
              <button class="btn btn-primary" type="submit">${escapeHtml(t("track"))} ${icon("i-search")}</button>
            </form>
            <div id="trackingResult">${found ? trackingResultHtml(found) : `<div class="tracking-empty is-visible">${escapeHtml(t("trackingEmpty"))}</div>`}</div>
            <div style="margin-top:16px;padding:12px 14px;border-radius:9px;background:var(--ivory);font-size:9px;color:var(--muted-2)">
              ${escapeHtml(state.lang === "vi" ? "Dùng thử:" : "Demo:")} <strong style="color:var(--emerald-800)">ABD-261108-1024</strong> · <strong style="color:var(--emerald-800)">0912578516</strong>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderTrackingResult(order, id, phone) {
    const box = $("#trackingResult");
    if (!box) return;
    if (!order) {
      box.innerHTML = `<div class="tracking-empty is-visible">${escapeHtml(t("trackingEmpty"))}</div>`;
      return;
    }
    box.innerHTML = trackingResultHtml(order);
  }

  function trackingResultHtml(order) {
    const lines = orderLines(order);
    const statusOrder = ["confirmed", "packing", "shipping", "delivered"];
    const current = statusOrder.indexOf(order.status);
    const labels = {
      confirmed: t("statusConfirmed"),
      packing: t("statusPacking"),
      shipping: t("statusShipping"),
      delivered: t("statusDelivered")
    };
    return `
      <div class="tracking-result" style="display:block;border-top:1px solid var(--line);margin-top:24px;padding-top:24px">
        <div class="tracking-result-head"><h3>${escapeHtml(t("trackingResult"))} · ${escapeHtml(order.id)}</h3><span class="status-badge">${escapeHtml(labels[order.status] || order.status)}</span></div>
        <div class="order-detail-list">
          <div><span>${escapeHtml(t("orderDate"))}</span><strong>${escapeHtml(formatDateTime(order.date))}</strong></div>
          <div><span>${escapeHtml(t("customer"))}</span><strong>${escapeHtml(order.customer)}</strong></div>
          <div><span>${escapeHtml(t("paymentMethod"))}</span><strong>${escapeHtml(order.payment === "bank" ? t("bank") : t("cod"))}</strong></div>
          <div><span>${escapeHtml(t("total"))}</span><strong>${money(order.total)}</strong></div>
        </div>
        <div class="order-timeline">
          ${statusOrder.map((status, i) => `<div class="timeline-step ${i < current ? "is-done" : i === current ? "is-current" : ""}"><strong>${escapeHtml(labels[status])}</strong><span>${escapeHtml(i <= current ? state.lang === "vi" ? "Đã cập nhật" : "Updated" : state.lang === "vi" ? "Đang chờ" : "Pending")}</span></div>`).join("")}
        </div>
        <div class="tracking-items">
          ${lines.map((line) => `<div class="tracking-item"><img src="${line.product.images[0]}" alt="" /><strong>${escapeHtml(tx(line.product.name))}</strong><span>${escapeHtml(line.option?.label || "")} × ${line.qty} · ${money(line.lineTotal)}</span></div>`).join("")}
        </div>
      </div>`;
  }

  /* -----------------------------------------------------------------------
     PAGE: Journal & article reader
     ----------------------------------------------------------------------- */
  function renderNewsPage() {
    if (state.route.slug) return renderArticlePage(state.route.slug);
    const featured = ARTICLES.find((a) => a.featured) || ARTICLES[0];
    const filters = [
      { id: "all", label: t("allArticles") },
      { id: "knowledge", label: t("knowledgeCat") },
      { id: "fengshui", label: t("fengshuiCat") },
      { id: "news", label: t("companyCat") }
    ];
    return `
      <section class="page-hero compact">
        <div class="container">
          ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("navNews") }])}
          <span class="eyebrow">${escapeHtml(t("newsEyebrow2"))}</span>
          <h1 class="page-title">${escapeHtml(t("newsTitle2"))}</h1>
          <p class="page-hero-lead">${escapeHtml(t("newsSubtitle2"))}</p>
        </div>
      </section>
      <div class="container" style="padding:42px 0 100px">
        <a class="featured-post reveal" href="#/news/${featured.slug}">
          <div class="featured-post-media"><img src="${featured.image}" alt="${escapeHtml(tx(featured.title))}" /></div>
          <div class="featured-post-copy">
            <span class="eyebrow">${escapeHtml(t("featuredArticle"))}</span>
            <h2>${escapeHtml(tx(featured.title))}</h2>
            <p>${escapeHtml(tx(featured.excerpt))}</p>
            <div class="featured-post-meta"><span>${formatDate(featured.date)}</span><span class="dot"></span><span>${escapeHtml(t("minuteRead", { n: featured.read }))}</span><span class="dot"></span><span>${escapeHtml(featured.author)}</span></div>
            <span class="text-link">${escapeHtml(t("readArticle"))} ${icon("i-arrow-right")}</span>
          </div>
        </a>
        <div class="journal-filter-bar">
          <div class="journal-filters">
            ${filters.map((f) => `<button class="journal-filter ${state.newsCat === f.id ? "is-active" : ""}" type="button" data-news-filter="${f.id}">${escapeHtml(f.label)}</button>`).join("")}
          </div>
          <span class="shop-count"><strong>${ARTICLES.length}</strong> ${escapeHtml(t("searchArticles"))}</span>
        </div>
        <div class="journal-grid" id="journalGrid">${renderJournalGrid()}</div>
      </div>`;
  }

  function renderArticlePage(slug) {
    const article = getArticleBySlug(slug);
    if (!article) return renderNotFoundPage();
    const related = ARTICLES.filter((a) => a.slug !== article.slug && (a.cat === article.cat || a.featured)).slice(0, 3);
    const body = article.body[state.lang] || article.body.vi;
    const shareUrl = `${location.href.split("#")[0]}#/news/${article.slug}`;
    return `
      <div class="container article-page">
        ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("navNews"), href: "#/news" }, { label: tx(article.title) }])}
        <header class="article-header">
          <span class="eyebrow">${escapeHtml(articleCategoryLabel(article.cat))}</span>
          <h1>${escapeHtml(tx(article.title))}</h1>
          <p class="article-deck">${escapeHtml(tx(article.excerpt))}</p>
          <div class="article-meta">
            <span class="author">${escapeHtml(article.author)}</span>
            <span class="dot"></span>
            <span>${formatDate(article.date)}</span>
            <span class="dot"></span>
            <span>${escapeHtml(t("minuteRead", { n: article.read }))}</span>
          </div>
        </header>
        <div class="article-cover reveal"><img src="${article.image}" alt="${escapeHtml(tx(article.title))}" /></div>
        <div class="article-layout">
          <article class="article-body">
            ${body.map((block) => {
              if (block.type === "h2") return `<h2>${escapeHtml(block.text)}</h2>`;
              if (block.type === "quote") return `<blockquote>“${escapeHtml(block.text)}”</blockquote>`;
              if (block.type === "list") return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
              return `<p>${escapeHtml(block.text)}</p>`;
            }).join("")}
            <div class="article-signoff">
              <span class="sig-mark">A</span>
              <div><strong>${escapeHtml(article.author)}</strong><span>Trầm Hương Abodhi · An yên từ tâm</span></div>
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:26px">
              <a class="btn btn-outline btn-sm" href="#/news">${icon("i-arrow-left")} ${escapeHtml(t("backToNews"))}</a>
              <a class="btn btn-primary btn-sm" href="#/shop">${escapeHtml(t("exploreCollection"))} ${icon("i-arrow-right")}</a>
            </div>
          </article>
          <aside class="article-sidebar">
            <div class="article-side-block">
              <h3>${escapeHtml(t("share"))}</h3>
              <div class="share-row">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener" aria-label="Facebook">${icon("i-facebook")}</a>
                <a href="https://zalo.me/0912578516" target="_blank" rel="noopener" aria-label="Zalo">${icon("i-zalo")}</a>
                <button type="button" data-copy="${escapeHtml(shareUrl)}" aria-label="${escapeHtml(t("copyLink"))}">${icon("i-link")}</button>
              </div>
            </div>
            <div class="article-side-block">
              <h3>${escapeHtml(t("tags"))}</h3>
              <div class="article-tags">${article.tags.map((tag) => `<a href="#/news">#${escapeHtml(tag)}</a>`).join("")}</div>
            </div>
            <div class="article-side-block">
              <h3>${escapeHtml(t("relatedArticles"))}</h3>
              ${related.slice(0, 2).map((a) => `<a href="#/news/${a.slug}" style="display:block;padding:8px 0;border-bottom:1px solid var(--line);font-family:var(--serif);font-size:16px;line-height:1.25;color:var(--emerald-900)">${escapeHtml(tx(a.title))}</a>`).join("")}
            </div>
          </aside>
        </div>
        <section class="article-related">
          ${sectionHead({ eyebrow: t("newsEyebrow2"), title: escapeHtml(t("relatedArticles")), link: "#/news", linkText: t("viewAllArticles") })}
          <div class="journal-grid">${related.map((a) => `
            <article class="journal-card">
              <a class="journal-card-media" href="#/news/${a.slug}"><img src="${a.image}" alt="${escapeHtml(tx(a.title))}" loading="lazy" /><span class="journal-card-cat">${escapeHtml(articleCategoryLabel(a.cat))}</span></a>
              <div class="journal-card-body"><div class="journal-card-meta"><span>${formatDate(a.date)}</span><span class="dot"></span><span>${escapeHtml(t("minuteRead", { n: a.read }))}</span></div><h3><a href="#/news/${a.slug}">${escapeHtml(tx(a.title))}</a></h3><p>${escapeHtml(tx(a.excerpt))}</p><a class="text-link" href="#/news/${a.slug}">${escapeHtml(t("readArticle"))} ${icon("i-arrow-right")}</a></div>
            </article>`).join("")}</div>
        </section>
      </div>`;
  }

  /* -----------------------------------------------------------------------
     PAGE: Contact
     ----------------------------------------------------------------------- */
  function renderContactPage() {
    const mapQuery = encodeURIComponent("250 Huỳnh Minh Mương, Ấp 4, Xã Bình Mỹ, TP. Hồ Chí Minh");
    return `
      <section class="page-hero compact">
        <div class="container">
          ${breadcrumb([{ label: t("navHome"), href: "#/home" }, { label: t("navContact") }])}
          <span class="eyebrow">${escapeHtml(t("contactEyebrow"))}</span>
          <h1 class="page-title">${escapeHtml(t("contactTitle2"))}</h1>
          <p class="page-hero-lead">${escapeHtml(t("contactLead"))}</p>
        </div>
      </section>
      <div class="container" style="padding-top:34px">
        <div class="contact-cards">
          <a class="contact-card reveal" href="tel:0912578516"><span class="contact-icon">${icon("i-phone")}</span><div><h3>${escapeHtml(t("hotline"))}</h3><strong>0912 578 516</strong><p>0898 100 001</p></div></a>
          <a class="contact-card reveal" href="mailto:tranlequyquan11@gmail.com"><span class="contact-icon">${icon("i-mail")}</span><div><h3>${escapeHtml(t("emailLabel"))}</h3><strong style="font-size:18px">tranlequyquan11@gmail.com</strong><p>${escapeHtml(state.lang === "vi" ? "Phản hồi trong 24 giờ làm việc" : "Reply within 24 working hours")}</p></div></a>
          <a class="contact-card reveal" href="https://www.google.com/maps?q=${mapQuery}" target="_blank" rel="noopener"><span class="contact-icon">${icon("i-pin")}</span><div><h3>${escapeHtml(t("addressLabel"))}</h3><strong style="font-size:18px">250 Huỳnh Minh Mương</strong><p>Ấp 4, Xã Bình Mỹ, TP. Hồ Chí Minh</p></div></a>
          <div class="contact-card reveal"><span class="contact-icon">${icon("i-clock")}</span><div><h3>${escapeHtml(t("hoursLabel"))}</h3><strong style="font-size:20px">08:00 – 21:00</strong><p>${escapeHtml(state.lang === "vi" ? "Thứ 2 – Chủ nhật, kể cả lễ" : "Monday – Sunday, including holidays")}</p></div></div>
        </div>

        <div class="contact-main">
          <div class="contact-form-card">
            <span class="eyebrow">${escapeHtml(t("contactFormTitle"))}</span>
            <h2>${escapeHtml(state.lang === "vi" ? "Hãy kể Abodhi nghe." : "Tell Abodhi your story.")}</h2>
            <p>${escapeHtml(state.lang === "vi" ? "Điền form bên dưới hoặc nhắn Zalo. Chúng tôi đọc từng lời nhắn và phản hồi trong 24 giờ làm việc." : "Use the form below or message us on Zalo. We read every note and reply within 24 working hours.")}</p>
            <form class="contact-form" id="contactForm" novalidate>
              <div class="field"><label for="contactName">${escapeHtml(t("formName"))} *</label><input id="contactName" name="name" type="text" placeholder="${escapeHtml(t("formNamePh"))}" required /><span class="field-error"></span></div>
              <div class="field"><label for="contactPhone">${escapeHtml(t("formPhone"))} *</label><input id="contactPhone" name="phone" type="tel" placeholder="${escapeHtml(t("formPhonePh"))}" required /><span class="field-error"></span></div>
              <div class="field field-full"><label for="contactEmail">${escapeHtml(t("formEmail"))}</label><input id="contactEmail" name="email" type="email" placeholder="${escapeHtml(t("formEmailPh"))}" /><span class="field-error"></span></div>
              <div class="field field-full"><label for="contactSubject">${escapeHtml(t("formSubject"))}</label><select id="contactSubject" name="subject"><option value="product">${escapeHtml(state.lang === "vi" ? "Tư vấn sản phẩm" : "Product advice")}</option><option value="bespoke">${escapeHtml(state.lang === "vi" ? "Đặt chế tác riêng" : "Bespoke commission")}</option><option value="order">${escapeHtml(state.lang === "vi" ? "Hỗ trợ đơn hàng" : "Order support")}</option><option value="wholesale">${escapeHtml(state.lang === "vi" ? "Hợp tác / bán buôn" : "Wholesale / partnership")}</option><option value="other">${escapeHtml(state.lang === "vi" ? "Khác" : "Other")}</option></select></div>
              <div class="field field-full"><label for="contactMessage">${escapeHtml(t("formMessage"))} *</label><textarea id="contactMessage" name="message" rows="4" placeholder="${escapeHtml(t("formMessagePh"))}" required></textarea><span class="field-error"></span></div>
              <div class="field field-full form-consent"><label class="check-label"><input type="checkbox" id="contactConsent" name="consent" required /><span>${escapeHtml(t("formConsent"))}</span></label><span class="field-error"></span></div>
              <div class="field-full"><button class="btn btn-primary btn-block" type="submit">${escapeHtml(t("formSend"))} ${icon("i-arrow-right")}</button></div>
            </form>
            <div class="contact-success" id="contactSuccess">${icon("i-check")} ${escapeHtml(t("formSuccessDesc"))}</div>
          </div>
          <div class="contact-map-card">
            <iframe title="${escapeHtml(t("mapTitle"))}" src="https://www.google.com/maps?q=${mapQuery}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div class="map-overlay">
              <div><strong>${escapeHtml(t("showroom"))}</strong><span>250 Huỳnh Minh Mương, Ấp 4,<br />Xã Bình Mỹ, TP. Hồ Chí Minh</span></div>
              <a class="btn btn-primary" href="https://www.google.com/maps?q=${mapQuery}" target="_blank" rel="noopener">${escapeHtml(t("directions"))}</a>
            </div>
            <div class="map-address-chip">${icon("i-pin")}<span>${escapeHtml(state.lang === "vi" ? "Cách trung tâm TP.HCM khoảng 25 phút lái xe · Có chỗ đậu xe" : "About 25 minutes from central HCMC · Parking available")}</span></div>
          </div>
        </div>

        <div class="showroom-strip reveal">
          <div><h3>${escapeHtml(t("showroom"))}</h3><p>${escapeHtml(state.lang === "vi" ? "Mời bạn ghé thưởng trà, ngửi trầm và chọn sản phẩm trực tiếp cùng Abodhi." : "Join us for tea, a scent consultation and a quiet look at the collection.")}</p></div>
          <div class="showroom-actions"><a class="btn btn-primary btn-sm" href="tel:0912578516">${icon("i-phone")} ${escapeHtml(t("callHotline"))}</a><a class="btn btn-outline btn-sm" href="https://zalo.me/0912578516" target="_blank" rel="noopener">${icon("i-zalo")} ${escapeHtml(t("chatZalo"))}</a></div>
        </div>

        <section class="faq-section">
          <div class="faq-layout">
            <div class="faq-intro">
              <span class="eyebrow">${escapeHtml(t("support"))}</span>
              <h2>${escapeHtml(t("faqTitle"))}</h2>
              <p>${escapeHtml(state.lang === "vi" ? "Nếu câu hỏi của bạn chưa có ở đây, đừng ngần ngại gọi Abodhi." : "If your question is not here, please call us — we are happy to help.")}</p>
            </div>
            <div class="faq-list">
              ${FAQ.map((item, i) => `
                <div class="accordion-item">
                  <button class="accordion-btn" type="button" data-accordion aria-expanded="false"><span>${escapeHtml(tx(item.q))}</span><span class="acc-icon">${icon("i-plus")}</span></button>
                  <div class="accordion-panel"><div class="accordion-panel-inner">${escapeHtml(tx(item.a))}</div></div>
                </div>`).join("")}
            </div>
          </div>
        </section>
      </div>`;
  }

  function toggleAccordion(button) {
    const item = button.closest(".accordion-item");
    if (!item) return;
    const panel = item.querySelector(".accordion-panel");
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    if (panel) panel.style.maxHeight = open ? "0px" : `${panel.scrollHeight}px`;
  }

  /* Page renderers are declared below and hoisted. */
})();
