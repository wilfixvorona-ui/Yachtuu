/* =========================================================
   YACHTUU — interactions
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const coarse = !finePointer;
  const isDesktop = () => window.innerWidth > 900;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } }
  };

  let lang = store.get("yachtuu-lang") === "uk" ? "uk" : "en";
  const t = (k) => UI[lang][k];
  const pick = (o) => o[lang] ?? o.en;
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const ic = (name) => `<i data-lucide="${name}"></i>`;
  const drawIcons = () => window.lucide?.createIcons({ icons: window.lucide.icons });
  const TYPE_ICON = { motor: "ship", sail: "sailboat", sport: "zap", super: "crown" };

  /* ---------------------------------------------------------
     TEXT SPLITTING
     --------------------------------------------------------- */
  function splitLines(el) {
    const parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map((p) => `<span class="line"><span>${p.trim()}</span></span>`).join("");
  }
  function splitWords(el) {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span> `).join("");
  }

  /* ---------------------------------------------------------
     I18N
     --------------------------------------------------------- */
  const i18nEls = $$("[data-i18n]");
  const metaDesc = $("meta[name=description]");
  const META_EN = { title: document.title, desc: metaDesc.getAttribute("content") };
  i18nEls.forEach((el) => { el._en = el.innerHTML; });

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang === "uk" ? "uk" : "en";
    document.title = lang === "uk" ? UK["meta.title"] : META_EN.title;
    metaDesc.setAttribute("content", lang === "uk" ? UK["meta.desc"] : META_EN.desc);
    i18nEls.forEach((el) => {
      const key = el.dataset.i18n;
      el.innerHTML = lang === "uk" && UK[key] != null ? UK[key] : el._en;
    });
    $$("[data-split]").forEach(splitLines);
    $$("[data-words]").forEach(splitWords);
    $$(".lang__btn").forEach((b) => b.classList.toggle("is-active", b.dataset.lang === lang));
    store.set("yachtuu-lang", lang);

    renderFleet();
    renderRoutes();
    renderFaq();
    renderReview(revIndex, true);
    renderYachtSelect();
    renderCalendar();
    renderSlots();
    updateSummary();
    $(".slots").dataset.empty = t("pickDate");
    if (drawerYacht) fillDrawer(drawerYacht);
    drawIcons();
    requestAnimationFrame(measureFleet);
  }
  $$(".lang__btn").forEach((b) => b.addEventListener("click", () => b.dataset.lang !== lang && applyLang(b.dataset.lang)));

  /* ---------------------------------------------------------
     FLEET
     --------------------------------------------------------- */
  const fleetSection = $(".fleet");
  const track = $(".fleet__track");
  const viewport = $(".fleet__viewport");
  let fleetFilter = "all";
  let fleetDistance = 0;

  function renderFleet() {
    const cards = FLEET.map((y, i) => `
      <article class="yacht${fleetFilter !== "all" && y.type !== fleetFilter ? " is-out" : ""}" data-id="${y.id}" data-cursor="${t("details")}">
        <div class="yacht__img">
          <img src="${IMG(y.img, 900)}" alt="${y.name}" loading="lazy">
          <span class="yacht__num mono">${String(i + 1).padStart(2, "0")}</span>
          <span class="yacht__tag mono">${ic(TYPE_ICON[y.type])}${pick(y.typeLabel)}</span>
        </div>
        <div class="yacht__body">
          <h3 class="yacht__name">${y.name}</h3>
          <ul class="yacht__specs">
            <li><span class="spec__v">${ic("ruler")}<b>${y.ft} ft</b></span>${t("length")}</li>
            <li><span class="spec__v">${ic("users")}<b>${y.guests}</b></span>${t("guests")}</li>
            <li><span class="spec__v">${ic("bed-double")}<b>${y.cabins || "—"}</b></span>${t("cabins")}</li>
          </ul>
          <div class="yacht__foot">
            <span class="yacht__price">${money(y.price)}<small>${t("perHour")}</small></span>
            <button class="yacht__book" data-book="${y.id}">${t("book")}${ic("arrow-right")}</button>
          </div>
        </div>
      </article>`).join("");
    const more = `
      <article class="yacht yacht--more${fleetFilter !== "all" ? " is-out" : ""}">
        <span class="big">+10</span>
        <span class="yacht--more__ic">${ic("anchor")}</span>
        <div>
          <h3>${t("moreTitle")}</h3>
          <p>${t("moreText")}</p>
          <a href="https://wa.me/13055550147" class="btn btn--dark" target="_blank" rel="noopener"><span>${t("moreCta")}</span><i class="btn__arrow">→</i></a>
        </div>
      </article>`;
    track.innerHTML = cards + more;
    const visible = $$(".yacht:not(.is-out):not(.yacht--more)", track).length;
    $(".fleet__total").textContent = String(visible).padStart(2, "0");
    drawIcons();
  }

  let fleetPinned = true;
  const fleetPin = $(".fleet__pin");
  function measureFleet() {
    // pin (vertical scroll drives the horizontal track) whenever there is room for a card;
    // landscape phones and other short screens fall back to a native swipe
    fleetPinned = isDesktop() || window.innerHeight >= 560;
    fleetSection.classList.toggle("is-native", !fleetPinned);
    if (fleetPinned) {
      fleetDistance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      // pin height comes from 100svh, so mobile toolbars showing/hiding don't make it jump
      fleetSection.style.height = fleetPin.offsetHeight + fleetDistance + "px";
    } else {
      fleetDistance = 0;
      fleetSection.style.height = "";
      track.style.transform = "";
    }
  }

  function updateFleet() {
    let p;
    if (fleetPinned) {
      const top = fleetSection.getBoundingClientRect().top;
      p = fleetDistance ? clamp(-top / fleetDistance, 0, 1) : 0;
      track.style.transform = `translate3d(${-p * fleetDistance}px,0,0)`;
    } else {
      const max = viewport.scrollWidth - viewport.clientWidth;
      p = max > 0 ? viewport.scrollLeft / max : 0;
    }
    $(".fleet__bar i").style.width = p * 100 + "%";
    const total = parseInt($(".fleet__total").textContent, 10) || 1;
    $(".fleet__idx").textContent = String(Math.min(total, Math.round(p * (total - 1)) + 1)).padStart(2, "0");
  }

  $$(".filters .chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".filters .chip").forEach((c) => c.classList.toggle("is-active", c === chip));
    fleetFilter = chip.dataset.filter;
    renderFleet();
    measureFleet();
    if (fleetPinned) {
      const y = window.scrollY + fleetSection.getBoundingClientRect().top;
      if (window.scrollY > y) scrollToY(y);
    } else viewport.scrollLeft = 0;
  }));

  track.addEventListener("click", (e) => {
    const bookBtn = e.target.closest("[data-book]");
    if (bookBtn) { e.stopPropagation(); bookYacht(bookBtn.dataset.book); return; }
    const card = e.target.closest(".yacht[data-id]");
    if (card) openDrawer(FLEET.find((y) => y.id === card.dataset.id));
  });

  /* ---------------------------------------------------------
     DRAWER
     --------------------------------------------------------- */
  const drawer = $(".drawer");
  let drawerYacht = null;

  function fillDrawer(y) {
    $(".drawer__img img").src = IMG(y.img, 1400);
    $(".drawer__img img").alt = y.name;
    $(".drawer__type").textContent = pick(y.typeLabel);
    $(".drawer__name").textContent = y.name;
    $(".drawer__desc").textContent = pick(y.desc);
    $(".drawer__specs").innerHTML = `
      <li>${ic("ruler")}<b>${y.ft} ft</b>${t("length")}</li>
      <li>${ic("users")}<b>${y.guests}</b>${t("guests")}</li>
      <li>${ic("bed-double")}<b>${y.cabins || "—"}</b>${t("cabins")}</li>
      <li>${ic("life-buoy")}<b>${y.crew}</b>${t("crew")}</li>`;
    $(".drawer__amen").innerHTML = pick(y.amen).map((a) => `<li>${ic("check")}${a}</li>`).join("");
    $(".drawer__price").innerHTML = `${money(y.price)}<small> ${t("perHour")}</small>`;
    drawIcons();
  }
  function openDrawer(y) {
    drawerYacht = y;
    fillDrawer(y);
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    lockScroll(true);
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    drawerYacht = null;
    lockScroll(false);
  }
  $$("[data-close-drawer]").forEach((b) => b.addEventListener("click", closeDrawer));
  $(".drawer__book").addEventListener("click", () => { const id = drawerYacht.id; closeDrawer(); bookYacht(id); });

  /* ---------------------------------------------------------
     ROUTES
     --------------------------------------------------------- */
  const routeList = $(".route-list");
  function renderRoutes() {
    routeList.innerHTML = ROUTES.map((r, i) => `
      <li class="route" data-img="${IMG(r.img, 800)}" data-cursor="">
        <span class="route__num mono">${String(i + 1).padStart(2, "0")}</span>
        <div class="route__thumb"><img src="${IMG(r.img, 800)}" alt="" loading="lazy"></div>
        <h3 class="route__name">${pick(r.name)}</h3>
        <p class="route__desc">${pick(r.desc)}</p>
        <span class="route__dur">${ic("clock")}${r.dur ? r.dur + " " + t("h") : t("days")}</span>
        <span class="route__price">${t("from")} ${money(r.price)}</span>
        <span class="route__arrow">→</span>
      </li>`).join("");
    drawIcons();
  }
  // preload route images for the hover effect
  ROUTES.forEach((r) => { const i = new Image(); i.src = IMG(r.img, 800); });

  const float = $(".route-float");
  const floatImg = $("img", float);
  const fpos = { x: 0, y: 0, tx: 0, ty: 0 };
  routeList.addEventListener("mouseover", (e) => {
    const r = e.target.closest(".route");
    if (!r) return;
    if (floatImg.getAttribute("src") !== r.dataset.img) floatImg.src = r.dataset.img;
    float.classList.add("is-on");
  });
  routeList.addEventListener("mouseleave", () => float.classList.remove("is-on"));

  /* ---------------------------------------------------------
     EXPERIENCE PANELS
     --------------------------------------------------------- */
  $$(".panel").forEach((p) => {
    const open = () => $$(".panel").forEach((x) => x.classList.toggle("is-open", x === p));
    if (finePointer) p.addEventListener("mouseenter", () => { if (isDesktop()) open(); });
    p.addEventListener("click", open);
  });

  /* ---------------------------------------------------------
     REVIEWS
     --------------------------------------------------------- */
  let revIndex = 0;
  let revTimer = null;
  const revText = $(".reviews__text");
  const avatar = $(".reviews__avatar");
  const people = $(".reviews__people");
  people.innerHTML = REVIEWS.map((r, i) => `<button class="reviews__person" data-person="${i}" aria-label="${r.name}"><img src="${AVATAR(r.img)}" alt="" loading="lazy"></button>`).join("");
  people.addEventListener("click", (e) => {
    const b = e.target.closest("[data-person]");
    if (b && +b.dataset.person !== revIndex) renderReview(+b.dataset.person);
  });

  function renderReview(i, instant = false) {
    revIndex = (i + REVIEWS.length) % REVIEWS.length;
    const r = REVIEWS[revIndex];
    const swap = () => {
      revText.innerHTML = `<span class="line"><span>${pick(r.text)}</span></span>`;
      $(".reviews__name").textContent = r.name;
      avatar.src = AVATAR(r.img);
      avatar.alt = r.name;
      avatar.classList.remove("is-swap");
      $$(".reviews__person", people).forEach((p, j) => p.classList.toggle("is-active", j === revIndex));
      $(".reviews__meta").innerHTML = `<span class="stars">${ic("star").repeat(5)}</span>${pick(r.meta)}`;
      drawIcons();
      $(".reviews__count").textContent = `${String(revIndex + 1).padStart(2, "0")} / ${String(REVIEWS.length).padStart(2, "0")}`;
      requestAnimationFrame(() => requestAnimationFrame(() => revText.classList.add("is-in")));
    };
    if (instant) { revText.classList.add("is-in"); swap(); return; }
    revText.classList.remove("is-in");
    avatar.classList.add("is-swap");
    setTimeout(swap, 450);
    restartTimer();
  }
  function restartTimer() {
    const bar = $(".reviews__timer i");
    bar.classList.remove("run"); void bar.offsetWidth; bar.classList.add("run");
    clearTimeout(revTimer);
    revTimer = setTimeout(() => renderReview(revIndex + 1), 7000);
  }
  $$("[data-rev]").forEach((b) => b.addEventListener("click", () => renderReview(revIndex + (b.dataset.rev === "next" ? 1 : -1))));
  let swipeX = null, swipeY = null;
  const stage = $(".reviews__stage");
  stage.addEventListener("touchstart", (e) => { swipeX = e.touches[0].clientX; swipeY = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (swipeX === null) return;
    const dx = e.changedTouches[0].clientX - swipeX, dy = e.changedTouches[0].clientY - swipeY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) renderReview(revIndex + (dx < 0 ? 1 : -1));
    swipeX = null;
  }, { passive: true });

  /* ---------------------------------------------------------
     FAQ
     --------------------------------------------------------- */
  let faqOpen = 0;
  const faqList = $(".faq__list");
  function renderFaq() {
    faqList.innerHTML = FAQ.map((f, i) => `
      <div class="qa${i === faqOpen ? " is-open" : ""}">
        <button class="qa__q" aria-expanded="${i === faqOpen}"><span>${pick(f.q)}</span><i class="qa__icon"></i></button>
        <div class="qa__a"><div><p>${pick(f.a)}</p></div></div>
      </div>`).join("");
  }
  faqList.addEventListener("click", (e) => {
    const q = e.target.closest(".qa__q");
    if (!q) return;
    const items = $$(".qa", faqList);
    const i = items.indexOf(q.parentElement);
    faqOpen = faqOpen === i ? -1 : i;
    items.forEach((it, j) => {
      it.classList.toggle("is-open", j === faqOpen);
      $(".qa__q", it).setAttribute("aria-expanded", j === faqOpen);
    });
  });

  /* ---------------------------------------------------------
     BOOKING
     --------------------------------------------------------- */
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const SLOTS = ["09:00", "11:30", "14:00", "16:30", "18:30"];
  const book = {
    viewY: today.getFullYear(), viewM: today.getMonth(),
    date: null, time: null, dur: 3, yacht: FLEET[0].id, guests: 4,
    chef: false, toys: false, promo: false
  };

  const hash = (s) => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return Math.abs(h); };
  const dkey = (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  const isDeal = (d) => d.getDay() >= 1 && d.getDay() <= 4;
  function availability(d) {
    const h = hash(dkey(d) + book.yacht) % 100;
    if (h < 12) return "booked";
    if (h < 34) return "few";
    return "free";
  }
  function slotTaken(d, s) {
    if (+d === +today) {
      const [hh, mm] = s.split(":").map(Number);
      const now = new Date();
      if (hh * 60 + mm < now.getHours() * 60 + now.getMinutes() + 60) return true;
    }
    const h = hash(dkey(d) + s + book.yacht) % 100;
    return availability(d) === "few" ? h < 60 : h < 15;
  }

  function renderCalendar() {
    const first = new Date(book.viewY, book.viewM, 1);
    const days = new Date(book.viewY, book.viewM + 1, 0).getDate();
    const offset = (first.getDay() + 6) % 7;
    $(".cal__month").textContent = first.toLocaleDateString(t("locale"), { month: "long", year: "numeric" }).replace(" р.", "");
    $(".cal__dow").innerHTML = t("dow").map((d) => `<span>${d}</span>`).join("");

    let html = "";
    for (let i = 0; i < offset; i++) html += `<span class="day is-empty"></span>`;
    for (let n = 1; n <= days; n++) {
      const d = new Date(book.viewY, book.viewM, n);
      const past = d < today;
      const av = past ? "past" : availability(d);
      const deal = !past && av !== "booked" && isDeal(d);
      const sel = book.date && dkey(book.date) === dkey(d);
      const cls = ["day", `is-${av}`, deal && "is-deal", sel && "is-selected", +d === +today && "is-today"].filter(Boolean).join(" ");
      const note = past ? "" : av === "booked" ? t("booked") : deal ? t("deal") : av === "few" ? t("few") : "";
      html += `<button type="button" class="${cls}" data-day="${n}" ${past || av === "booked" ? "disabled" : ""}>${n}<small>${note}</small></button>`;
    }
    $(".cal__grid").innerHTML = html;

    const minMonth = today.getFullYear() * 12 + today.getMonth();
    const cur = book.viewY * 12 + book.viewM;
    $('[data-cal="prev"]').disabled = cur <= minMonth;
    $('[data-cal="prev"]').style.opacity = cur <= minMonth ? .3 : 1;
    $('[data-cal="next"]').disabled = cur >= minMonth + 6;
    $('[data-cal="next"]').style.opacity = cur >= minMonth + 6 ? .3 : 1;
  }

  $$("[data-cal]").forEach((b) => b.addEventListener("click", () => {
    const m = book.viewM + (b.dataset.cal === "next" ? 1 : -1);
    const d = new Date(book.viewY, m, 1);
    book.viewY = d.getFullYear(); book.viewM = d.getMonth();
    renderCalendar();
  }));

  $(".cal__grid").addEventListener("click", (e) => {
    const b = e.target.closest(".day[data-day]");
    if (!b || b.disabled) return;
    book.date = new Date(book.viewY, book.viewM, +b.dataset.day);
    book.time = null;
    renderCalendar(); renderSlots(); updateSummary(); clearError();
  });

  function renderSlots() {
    const box = $(".slots");
    if (!book.date) { box.innerHTML = ""; return; }
    box.innerHTML = SLOTS.map((s, i) => {
      const taken = slotTaken(book.date, s);
      const sunset = i === SLOTS.length - 1;
      return `<button type="button" class="slot${book.time === s ? " is-active" : ""}" data-slot="${s}" ${taken ? "disabled" : ""}>${s}<small>${taken ? t("full") : sunset ? ic("sunset") + t("sunset") : "&nbsp;"}</small></button>`;
    }).join("");
    drawIcons();
  }
  $(".slots").addEventListener("click", (e) => {
    const b = e.target.closest(".slot");
    if (!b || b.disabled) return;
    book.time = b.dataset.slot;
    renderSlots(); updateSummary(); clearError();
  });

  $$(".durations .chip").forEach((c) => c.addEventListener("click", () => {
    $$(".durations .chip").forEach((x) => x.classList.toggle("is-active", x === c));
    book.dur = +c.dataset.dur;
    updateSummary();
  }));

  const yachtSelect = $("#yachtSelect");
  function renderYachtSelect() {
    yachtSelect.innerHTML = FLEET.map((y) => `<option value="${y.id}"${y.id === book.yacht ? " selected" : ""}>${y.name} — ${money(y.price)}${t("perHour")} · ${t("max")(y.guests)}</option>`).join("");
  }
  yachtSelect.addEventListener("change", () => {
    book.yacht = yachtSelect.value;
    onYachtChange();
  });
  function onYachtChange() {
    const y = FLEET.find((f) => f.id === book.yacht);
    book.guests = Math.min(book.guests, y.guests);
    // availability depends on the yacht — re-validate the chosen date/time
    if (book.date && availability(book.date) === "booked") { book.date = null; book.time = null; }
    if (book.date && book.time && slotTaken(book.date, book.time)) book.time = null;
    renderCalendar(); renderSlots(); updateSummary();
  }

  $$("[data-g]").forEach((b) => b.addEventListener("click", () => {
    const y = FLEET.find((f) => f.id === book.yacht);
    book.guests = clamp(book.guests + +b.dataset.g, 1, y.guests);
    updateSummary();
  }));

  $$(".check input").forEach((c) => c.addEventListener("change", () => { book[c.name] = c.checked; updateSummary(); }));

  $(".promo__btn").addEventListener("click", () => {
    const v = $('[name="promo"]').value.trim().toUpperCase();
    const msg = $(".promo__msg");
    book.promo = v === "FIRSTWAVE";
    msg.textContent = book.promo ? t("promoOk") : t("promoBad");
    updateSummary();
  });

  function updateSummary() {
    const y = FLEET.find((f) => f.id === book.yacht);
    const charter = y.price * book.dur;
    const extras = (book.chef ? 45 * book.guests : 0) + (book.toys ? 150 : 0);
    const weekday = book.date && isDeal(book.date);
    const deal = (weekday ? charter * 0.2 : 0) + (book.promo ? charter * 0.1 : 0);
    const total = charter - deal + extras;

    $(".summary__yacht").textContent = y.name;
    $('[data-sum="date"]').textContent = book.date ? book.date.toLocaleDateString(t("locale"), { weekday: "short", day: "numeric", month: "short" }) : "—";
    $('[data-sum="time"]').textContent = book.time || "—";
    $('[data-sum="dur"]').textContent = t("hours")(book.dur);
    $('[data-sum="guests"]').textContent = t("guestsN")(book.guests);
    $('[data-sum="charter"]').textContent = money(charter);
    $('[data-sum="extras"]').textContent = extras ? money(extras) : t("none");

    const dealRow = $(".summary__deal");
    dealRow.hidden = !deal;
    $('[data-sum="dealLabel"]').textContent = [weekday && t("weekday"), book.promo && t("promo")].filter(Boolean).join(" + ");
    $('[data-sum="deal"]').textContent = "−" + money(deal);
    $(".summary__bonus").hidden = book.dur < 4;

    tweenNumber($('[data-sum="total"]'), total);
    $('[data-sum="deposit"]').textContent = money(total * 0.3);

    $(".stepper__val").textContent = book.guests;
    $(".stepper__max").textContent = t("max")(y.guests);
  }

  function tweenNumber(el, to) {
    const from = el._v ?? 0;
    el._v = to;
    if (reduced) { el.textContent = money(to); return; }
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / 600);
      el.textContent = money(lerp(from, to, 1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function bookYacht(id) {
    book.yacht = id;
    yachtSelect.value = id;
    onYachtChange();
    scrollToEl($("#booking"));
  }

  const form = $(".booker");
  const showError = (m) => { $(".form-error").textContent = m; };
  const clearError = () => { $(".form-error").textContent = ""; };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    $$(".field").forEach((f) => f.classList.remove("is-error"));
    if (!book.date) { showError(t("errDate")); scrollToEl($(".cal"), -100); return; }
    if (!book.time) { showError(t("errTime")); scrollToEl($(".slots"), -160); return; }
    const req = ["name", "email", "phone"].map((n) => form.elements[n]);
    const empty = req.filter((i) => !i.value.trim());
    if (empty.length) { empty.forEach((i) => i.parentElement.classList.add("is-error")); showError(t("errFields")); empty[0].focus(); return; }
    if (!/^\S+@\S+\.\S+$/.test(form.elements.email.value)) { form.elements.email.parentElement.classList.add("is-error"); showError(t("errEmail")); return; }
    clearError();
    const ref = "YCH-" + Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + String(book.date.getDate()).padStart(2, "0");
    $(".success__ref b").textContent = ref;
    $(".success").classList.add("is-open");
    $(".success").setAttribute("aria-hidden", "false");
    lockScroll(true);
  });
  $("[data-close-success]").addEventListener("click", () => {
    $(".success").classList.remove("is-open");
    $(".success").setAttribute("aria-hidden", "true");
    lockScroll(false);
  });

  /* ---------------------------------------------------------
     OFFERS — copy code
     --------------------------------------------------------- */
  const toast = $(".toast");
  let toastT;
  function showToast(m) {
    toast.textContent = m; toast.classList.add("is-on");
    clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove("is-on"), 2200);
  }
  $$("[data-copy]").forEach((b) => b.addEventListener("click", () => {
    navigator.clipboard?.writeText(b.dataset.copy).catch(() => {});
    $('[name="promo"]').value = b.dataset.copy;
    showToast(t("copied"));
  }));

  /* ---------------------------------------------------------
     SMOOTH SCROLL
     --------------------------------------------------------- */
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ duration: 1.7, wheelMultiplier: 0.7, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)) });
  }
  function lockScroll(on) {
    document.documentElement.classList.toggle("is-locked", on);
    navChecked = false;
    on ? lenis?.stop() : lenis?.start();
  }
  function scrollToY(y) { lenis ? lenis.scrollTo(y, { duration: 1.8 }) : window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" }); }
  function scrollToEl(el, offset = 0) { if (el) scrollToY(window.scrollY + el.getBoundingClientRect().top + offset); }

  $$("[data-scroll]").forEach((a) => a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || !id.startsWith("#")) return;
    e.preventDefault();
    document.body.classList.remove("menu-open");
    $(".menu").setAttribute("aria-hidden", "true");
    lockScroll(false);
    scrollToEl($(id));
  }));

  /* ---------------------------------------------------------
     MENU
     --------------------------------------------------------- */
  $(".nav__burger").addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    $(".menu").setAttribute("aria-hidden", String(!open));
    lockScroll(open);
    updateNav();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (drawer.classList.contains("is-open")) closeDrawer();
    if (document.body.classList.contains("menu-open")) $(".nav__burger").click();
  });

  /* ---------------------------------------------------------
     REVEAL ON SCROLL
     --------------------------------------------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      if (en.target.dataset.count) countUp(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });

  function countUp(el) {
    const to = parseFloat(el.dataset.count);
    const dec = +(el.dataset.decimals || 0);
    const suf = el.dataset.suffix || "";
    const fmt = (v) => (dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-US")) + suf;
    if (reduced) { el.textContent = fmt(to); return; }
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / 1800);
      el.textContent = fmt(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------------------------------------------------------
     CURSOR + MAGNETIC
     --------------------------------------------------------- */
  const cursor = $(".cursor");
  const dot = $(".cursor-dot");
  const label = $(".cursor__label");
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const cpos = { x: mouse.x, y: mouse.y };
  let mouseIn = false;
  let overInteractive = false;

  if (finePointer) {
    document.body.classList.add("has-cursor");
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      if (!mouseIn) { mouseIn = true; cpos.x = mouse.x; cpos.y = mouse.y; }
      dot.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0)`;
    });
    document.addEventListener("mouseover", (e) => {
      const lab = e.target.closest("[data-cursor]");
      const text = lab?.dataset.cursor;
      const inter = e.target.closest("a, button, label, select, input");
      overInteractive = !!inter || !!e.target.closest(".nav");
      if (text && !(inter && inter !== lab && lab.contains(inter))) {
        label.textContent = text;
        cursor.classList.add("is-label"); cursor.classList.remove("is-hover");
        dot.classList.add("is-hidden");
      } else {
        cursor.classList.remove("is-label");
        dot.classList.remove("is-hidden");
        cursor.classList.toggle("is-hover", !!inter);
      }
      const inRoute = !!e.target.closest(".route");
      cursor.classList.toggle("is-hidden", inRoute);
      dot.classList.toggle("is-hidden", inRoute || cursor.classList.contains("is-label"));
    });
    document.addEventListener("mouseleave", () => { mouseIn = false; cursor.classList.add("is-hidden"); dot.classList.add("is-hidden"); });
    document.addEventListener("mouseenter", () => { cursor.classList.remove("is-hidden"); dot.classList.remove("is-hidden"); });

    document.addEventListener("mousemove", (e) => {
      const m = e.target.closest?.(".magnetic");
      $$(".magnetic.is-mag").forEach((x) => { if (x !== m) { x.classList.remove("is-mag"); x.style.transform = ""; } });
      if (!m) return;
      const r = m.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      m.classList.add("is-mag");
      m.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
    });
    $$(".magnetic").forEach((m) => { m.style.transition = "transform .5s cubic-bezier(.16,1,.3,1), color .5s"; });
  }

  /* ---------------------------------------------------------
     HERO COLOR VIEWFINDER
     --------------------------------------------------------- */
  const hero = $(".hero");
  const heroColor = $(".hero__color");
  const colorImg = $(".hero__color img");
  const vf = $(".viewfinder");
  let lensS = 0, lensOn = false, shots = 1, nextAutoShot = 0;
  // on touch screens there is no cursor — the frame wanders over the photo by itself
  const wander = { x: 0, y: 0 };

  function takeShot() {
    vf.classList.remove("is-shot"); void vf.offsetWidth; vf.classList.add("is-shot");
    shots++;
    $(".vf-count", vf).textContent = "IMG_" + String(shots).padStart(4, "0");
    setTimeout(() => vf.classList.remove("is-shot"), 320);
  }

  function updateLens(time) {
    const r = hero.getBoundingClientRect();
    const ready = document.body.classList.contains("is-ready")
      && !document.body.classList.contains("menu-open")
      && !drawer.classList.contains("is-open");
    let px, py;
    if (finePointer) {
      lensOn = ready && mouseIn && !overInteractive && mouse.y > Math.max(r.top, 0) && mouse.y < r.bottom;
      px = cpos.x; py = cpos.y;
    } else {
      // slow Lissajous path across the upper part of the photo
      const ax = Math.min(0.32, Math.max(0, 0.5 - (vf.offsetWidth / 2 + 14) / r.width));
      const tx = r.left + r.width * (0.5 + ax * Math.sin(time * 0.00031));
      const ty = r.top + r.height * (0.42 + 0.16 * Math.sin(time * 0.00047 + 1.3));
      wander.x = wander.x ? lerp(wander.x, tx, 0.08) : tx;
      wander.y = wander.y ? lerp(wander.y, ty, 0.08) : ty;
      px = wander.x; py = wander.y;
      lensOn = ready && r.bottom > innerHeight * 0.35;
      if (lensOn && !reduced && time > nextAutoShot) {
        if (nextAutoShot) takeShot();
        nextAutoShot = time + 4200 + Math.random() * 2500;
      }
    }
    lensS = lerp(lensS, lensOn ? 1 : 0, 0.16);
    if (lensS < 0.01) {
      heroColor.style.clipPath = "inset(50% 50% 50% 50%)";
    } else {
      const w = (vf.offsetWidth * lensS) / 2, h = (vf.offsetHeight * lensS) / 2;
      const x = px - r.left, y = py - r.top;
      heroColor.style.clipPath = `inset(${y - h}px ${r.width - x - w}px ${r.height - y - h}px ${x - w}px)`;
    }
    vf.style.transform = `translate3d(${px}px,${py}px,0) scale(${0.6 + 0.4 * lensS})`;
    vf.classList.toggle("is-on", lensOn);
    document.body.classList.toggle("in-lens", lensOn);
  }

  hero.addEventListener(finePointer ? "mousedown" : "touchstart", (e) => {
    if (!lensOn || e.target.closest("a, button")) return;
    takeShot();
  }, { passive: true });

  /* ---------------------------------------------------------
     MAIN LOOP
     --------------------------------------------------------- */
  const heroImg = $(".hero__media img");
  const heroTitle = $(".hero__title");
  const marquee = $(".marquee__track");
  let lastY = window.scrollY;
  let mqX = 0;
  let mqDir = -1;
  let velocity = 0;

  function updateWords() {
    $$("[data-words]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const p = clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35), 0, 1);
      const words = el.children;
      const n = Math.round(p * words.length);
      for (let i = 0; i < words.length; i++) words[i].classList.toggle("on", i < n);
    });
  }

  /* nav: transparent (blend) over the hero, solid bar matching the section underneath elsewhere */
  const nav = $(".nav");
  let navChecked = false;
  function updateNav() {
    navChecked = true;
    const menuOpen = document.body.classList.contains("menu-open");
    const solid = menuOpen || window.scrollY > 40;
    let light = menuOpen;
    if (!menuOpen) {
      const probeY = nav.offsetHeight + 2;
      const under = document.elementsFromPoint(innerWidth / 2, probeY).find((el) => !el.closest(".nav, .viewfinder, .cursor, .cursor-dot, .route-float"));
      const sec = under?.closest(".s-light, .s-dark, .hero, .marquee");
      light = !!sec && (sec.classList.contains("s-light") || sec.classList.contains("marquee"));
    }
    nav.classList.toggle("is-solid", solid);
    nav.classList.toggle("on-light", solid && light);
  }

  /* touch screens have no hover — the element closest to the centre of the screen gets the hover look */
  function nearest(list, axis) {
    let best = null, bestD = Infinity;
    const cx = innerWidth / 2, cy = innerHeight / 2;
    for (const el of list) {
      const r = el.getBoundingClientRect();
      if (!r.width || r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth) continue;
      const d = axis === "x" ? Math.abs(r.left + r.width / 2 - cx) : Math.abs(r.top + r.height / 2 - cy);
      if (d < bestD) { bestD = d; best = el; }
    }
    return axis === "y" && bestD > innerHeight * 0.3 ? null : best;
  }
  function updateTouchActive() {
    const cards = $$(".yacht:not(.is-out):not(.yacht--more)", track);
    const activeCard = nearest(cards, "x");
    cards.forEach((c) => c.classList.toggle("is-active", c === activeCard));
    for (const sel of [".route", ".extra", ".step", ".offer"]) {
      const list = $$(sel);
      const a = nearest(list, "y");
      list.forEach((el) => el.classList.toggle("is-active", el === a));
    }
  }

  function loop(time) {
    lenis?.raf(time);
    const y = window.scrollY;
    const dy = y - lastY;
    velocity = lerp(velocity, dy, 0.1);
    lastY = y;

    // hero parallax
    if (y < innerHeight * 1.2 && document.body.classList.contains("is-ready") && !reduced) {
      heroImg.style.transform = colorImg.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(${1.06 + y * 0.0002})`;
      heroTitle.style.transform = `translate3d(0, ${y * -0.15}px, 0)`;
    }

    // marquee with scroll velocity
    if (!reduced) {
      if (Math.abs(velocity) > 0.5) mqDir = velocity > 0 ? -1 : 1;
      mqX += mqDir * (0.6 + Math.min(Math.abs(velocity) * 0.25, 12));
      const half = marquee.scrollWidth / 2;
      if (mqX <= -half) mqX += half;
      if (mqX > 0) mqX -= half;
      marquee.style.transform = `translate3d(${mqX}px,0,0)`;
    }

    updateFleet();
    updateWords();
    if (dy !== 0 || !navChecked) updateNav();
    if (coarse) updateTouchActive();

    // cursor + route image follow
    if (finePointer) {
      cpos.x = lerp(cpos.x, mouse.x, 0.18);
      cpos.y = lerp(cpos.y, mouse.y, 0.18);
      cursor.style.transform = `translate3d(${cpos.x}px,${cpos.y}px,0)`;
      fpos.tx = lerp(fpos.tx, mouse.x, 0.12);
      fpos.ty = lerp(fpos.ty, mouse.y, 0.12);
      const tilt = clamp((mouse.x - fpos.tx) * 0.05, -8, 8);
      float.style.transform = `translate3d(${fpos.tx}px,${fpos.ty}px,0) rotate(${tilt}deg)`;
    }
    updateLens(time);
    requestAnimationFrame(loop);
  }

  /* ---------------------------------------------------------
     PRELOADER
     --------------------------------------------------------- */
  function runPreloader() {
    const pre = $(".preloader");
    const count = $(".preloader__count");
    const bar = $(".preloader__bar i");
    const heroReady = new Promise((res) => {
      if (heroImg.complete) res(); else { heroImg.addEventListener("load", res); heroImg.addEventListener("error", res); }
      setTimeout(res, 4000);
    });
    const dur = reduced ? 10 : 1900;
    const start = performance.now();
    let loaded = false;
    heroReady.then(() => { loaded = true; });

    const tick = (now) => {
      let p = Math.min(1, (now - start) / dur);
      if (!loaded) p = Math.min(p, 0.86);
      const e = 1 - Math.pow(1 - p, 3);
      count.textContent = String(Math.round(e * 100)).padStart(3, "0");
      bar.style.width = e * 100 + "%";
      if (p < 1) return requestAnimationFrame(tick);
      setTimeout(() => {
        pre.classList.add("is-done");
        document.body.classList.remove("is-loading");
        setTimeout(() => document.body.classList.add("is-ready"), 250);
        setTimeout(() => pre.remove(), 1400);
      }, reduced ? 0 : 250);
    };
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------
     INIT
     --------------------------------------------------------- */
  applyLang(lang);
  $$(".reveal, [data-split], [data-count]").forEach((el) => {
    if (el.closest(".hero")) return;
    io.observe(el);
  });
  // hero lead reveals after the preloader
  const heroLead = $(".hero__lead");
  new MutationObserver(() => {
    if (document.body.classList.contains("is-ready")) setTimeout(() => heroLead.classList.add("is-in"), 500);
  }).observe(document.body, { attributes: true, attributeFilter: ["class"] });

  let lastW = innerWidth, lastH = innerHeight;
  window.addEventListener("resize", () => {
    const rotated = (innerWidth > innerHeight) !== (lastW > lastH);
    if (finePointer || innerWidth !== lastW || rotated) measureFleet();
    lastW = innerWidth; lastH = innerHeight;
    navChecked = false;
  });
  window.addEventListener("load", measureFleet);
  viewport.addEventListener("scroll", updateFleet, { passive: true });
  restartTimer();
  runPreloader();
  requestAnimationFrame(loop);
})();
