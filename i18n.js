/* =========================================================
   YACHTUU — content & translations
   English lives in index.html; Ukrainian overrides below.
   ========================================================= */

const AVATAR = (id) => `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&crop=faces&q=80&auto=format`;
const IMG = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const UK = {
  "meta.title": "Оренда яхти в Маямі з капітаном | Yachtuu",
  "meta.desc": "Оренда приватної яхти в Маямі з ліцензованим капітаном. 18 яхт від $190 на годину, 6 маршрутів затокою Біскейн і онлайн-бронювання.",
  "pre.tag": "Оренда яхт у Маямі",
  "nav.fleet": "Флот",
  "nav.exp": "Формати",
  "nav.routes": "Маршрути",
  "nav.offers": "Акції",
  "nav.book": "Забронювати",

  "hero.loc": "Маямі, Флорида",
  "hero.lead": "Оренда яхт у Маямі.<br><em>Капітан уже на борту.</em>",
  "hero.cta": "Обрати дату",
  "hero.cta2": "Переглянути яхти",
  "hero.scroll": "Далі",

  "man.label": "(—) Наш підхід",
  "man.text": "Оренда яхти має бути простою: жодних прихованих платежів, договорів на сорок сторінок і нудних бежевих салонів. Обираєте яхту, обираєте дату — і вся затока Біскейн на день ваша.",
  "stat.1": "Яхт у флоті",
  "stat.2": "Середній рейтинг",
  "stat.3": "Прогулянок з 2019 року",
  "stat.4": "Авторських маршрутів",

  "fleet.label": "(02) Флот",
  "fleet.title": "Оберіть<br><em>свою яхту.</em>",
  "fleet.sub": "Яхти, які бронюють найчастіше. Наведіть курсор — і побачите їх у кольорі, як у морі.",
  "fleet.sub.touch": "Яхти, які бронюють найчастіше. Гортайте — і кожна оживає в кольорі, як у морі.",
  "f.all": "Усі",
  "f.motor": "Моторні",
  "f.sail": "Вітрильні",
  "f.sport": "Катери",
  "f.super": "Суперяхти",

  "exp.label": "(03) Формати",
  "exp.title": "Кожному —<br><em>своє</em> море.",
  "exp.1.tag": "Для двох",
  "exp.1.title": "Захід сонця удвох",
  "exp.1.text": "Дві години, пляшка шампанського і Маямі, яке за вашою спиною повільно рожевіє.",
  "exp.1.price": "від $380 · 2 год",
  "exp.2.tag": "Для компанії",
  "exp.2.title": "Вечірка на мілині",
  "exp.2.text": "Стаємо на якір на мілині Хауловер, вмикаємо музику, дістаємо водні розваги. До 13 друзів на борту.",
  "exp.2.price": "від $760 · 4 год",
  "exp.3.tag": "Вперше в Маямі",
  "exp.3.title": "Маямі з води",
  "exp.3.text": "Особняки на Стар-Айленд, вілли мільйонерів і хмарочоси — а капітан розповість історію кожного будинку.",
  "exp.3.price": "від $570 · 3 год",

  "how.label": "(04) Як це працює",
  "how.title": "Чотири кроки<br>до <em>відкритого моря.</em>",
  "how.1.t": "Оберіть яхту",
  "how.1.p": "Підберіть за розміром, стилем і бюджетом. Ціна фінальна: капітан і пальне для прогулянок затокою вже включені.",
  "how.2.t": "Оберіть дату",
  "how.2.p": "Календар показує реальні вільні дати. З понеділка по четвер — на 20% дешевше.",
  "how.3.t": "Підтвердіть",
  "how.3.p": "Внесіть передоплату 30%. Скасувати можна безкоштовно за 72 години до виходу в море.",
  "how.4.t": "Ласкаво просимо на борт",
  "how.4.p": "Капітан чекатиме вас у Bayside Marina, причал 7. Взуття — зняти, телефон — у режим польоту.",

  "routes.label": "(05) Маршрути",
  "routes.title": "Куди<br><em>пливемо сьогодні?</em>",
  "routes.sub": "Усі маршрути починаються в Bayside Marina. Ціни вказані для нашої базової 52-футової яхти.",

  "offers.label": "(06) Акції та доповнення",
  "offers.title": "Платите менше —<br><em>плаваєте більше.</em>",
  "off.1.t": "Знижка в будні",
  "off.1.p": "З понеділка по четвер — на будь-яку яхту й будь-який маршрут. Знижка додається в календарі автоматично.",
  "off.2.big": "+1 год",
  "off.2.t": "Захід сонця в подарунок",
  "off.2.p": "Бронюєте від 4 годин — ще одна година на заході сонця безкоштовно.",
  "off.3.t": "Перша прогулянка",
  "off.3.p": "Введіть цей промокод під час першого бронювання.",
  "off.auto": "Діє автоматично",
  "off.copy": "Скопіювати",
  "extras.label": "Доповнення",
  "ex.1.t": "Шеф-кухар і бар",
  "ex.1.p": "Севіче, суші, шампанське в льоду й бармен, який робить найкращий мохіто в затоці.",
  "ex.1.price": "$45 <small>/ гість</small>",
  "ex.2.t": "Водні розваги",
  "ex.2.p": "Сібоб, дві SUP-дошки, маски для снорклінгу й величезний надувний мат для всієї компанії.",
  "ex.2.price": "$150 <small>/ прогулянка</small>",

  "rev.label": "(07) Відгуки",
  "rev.count": "1 180 перевірених відгуків",

  "faq.label": "(08) Питання",
  "faq.title": "Часті<br><em>питання.</em>",
  "faq.aside": "Не знайшли відповіді? Напишіть нашому консьєржу у WhatsApp — відповімо за 10 хвилин.",

  "book.label": "(09) Бронювання",
  "book.title": "Оберіть свій<br><em>день у морі.</em>",
  "lg.free": "Вільно",
  "lg.few": "Майже зайнято",
  "lg.booked": "Зайнято",
  "lg.deal": "Будні −20%",
  "bk.time": "Час відправлення",
  "bk.dur": "Тривалість",
  "bk.yacht": "Яхта",
  "bk.guests": "Гості",
  "bk.extras": "Доповнення",
  "bk.chef": "Шеф-кухар і бар — $45 / гість",
  "bk.toys": "Водні розваги — $150",
  "sum.title": "Ваша прогулянка",
  "sum.date": "Дата",
  "sum.time": "Відправлення",
  "sum.dur": "Тривалість",
  "sum.guests": "Гості",
  "sum.charter": "Оренда",
  "sum.extras": "Доповнення",
  "sum.bonus": "Година на заході",
  "sum.free": "У подарунок",
  "sum.total": "Разом",
  "sum.deposit": "Передоплата (30%)",
  "fm.name": "Ім'я та прізвище",
  "fm.phone": "Телефон",
  "fm.promo": "Промокод",
  "fm.apply": "Застосувати",
  "fm.submit": "Забронювати",
  "fm.note": "Це концепт-проєкт — гроші не списуються.",
  "ok.label": "Заявку отримано",
  "ok.title": "Чекаємо вас<br><em>на борту.</em>",
  "ok.ref": "Номер бронювання",
  "ok.text": "Консьєрж підтвердить бронювання протягом 15 хвилин — напишемо на email і у WhatsApp.",
  "ok.close": "Повернутися на сайт",

  "ft.cta": "Море чекає.<br><em>А ви?</em>",
  "ft.btn": "Забронювати",
  "ft.where": "Де нас знайти",
  "ft.contact": "Контакти",
  "ft.hours": "Графік",
  "ft.hours.v": "Щодня з 8:00 до 21:00<br>Консьєрж — цілодобово",
  "ft.social": "Соцмережі",
  "ft.concept": "Концепт-проєкт · компанія вигадана",
  "ft.top": "Нагору ↑",

  "dr.onboard": "На борту",
  "dr.book": "Забронювати цю яхту"
};

/* Ukrainian plural: 1 гість, 2 гості, 5 гостей, 21 гість */
function ukPlural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

/* Strings used from JS (both languages) */
const UI = {
  en: {
    length: "Length", guests: "Guests", cabins: "Cabins", crew: "Crew",
    perHour: "/h", book: "Book", details: "Details",
    moreTitle: "Ten more yachts in the harbor.",
    moreText: "Catamarans, a fishing sportfisher and our 120-ft flagship. Our concierge will match you with the right one.",
    moreCta: "Ask the concierge",
    pickDate: "Pick a date first", sunset: "Sunset", left: "left", full: "Full",
    deal: "−20%", few: "Few", booked: "Booked",
    hours: (n) => `${n} hours`, guestsN: (n) => `${n} guests`, max: (n) => `max ${n}`,
    weekday: "Weekday −20%", promo: "Code FIRSTWAVE −10%",
    promoOk: "Code applied: −10% on the charter.", promoBad: "This code doesn't exist. Try FIRSTWAVE.",
    errDate: "Pick a date in the calendar.", errTime: "Choose a departure time.",
    errFields: "Fill in your name, email and phone.", errEmail: "That email looks off.",
    copied: "Copied: FIRSTWAVE", none: "None",
    dow: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    locale: "en-US",
    perGuest: "/ guest", perTrip: "/ trip", from: "from", days: "2 days", h: "h"
  },
  uk: {
    length: "Довжина", guests: "Гостей", cabins: "Кают", crew: "Екіпаж",
    perHour: "/год", book: "Забронювати", details: "Детальніше",
    moreTitle: "У гавані ще десять яхт.",
    moreText: "Катамарани, катер для рибалки й наш 120-футовий флагман. Консьєрж допоможе обрати.",
    moreCta: "Написати консьєржу",
    pickDate: "Спершу оберіть дату", sunset: "Захід", left: "залишилось", full: "Зайнято",
    deal: "−20%", few: "Мало", booked: "Зайнято",
    hours: (n) => `${n} ${ukPlural(n, "година", "години", "годин")}`,
    guestsN: (n) => `${n} ${ukPlural(n, "гість", "гості", "гостей")}`,
    max: (n) => `до ${n}`,
    weekday: "Будній день −20%", promo: "Промокод −10%",
    promoOk: "Промокод діє: −10% на оренду.", promoBad: "Такого промокоду немає. Спробуйте FIRSTWAVE.",
    errDate: "Оберіть дату в календарі.", errTime: "Оберіть час відправлення.",
    errFields: "Вкажіть ім'я, email і телефон.", errEmail: "Схоже, в email помилка.",
    copied: "Скопійовано: FIRSTWAVE", none: "Немає",
    dow: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    locale: "uk-UA",
    perGuest: "/ гість", perTrip: "/ прогулянка", from: "від", days: "2 дні", h: "год"
  }
};

/* ---------- FLEET (8 shown of 18) ---------- */
const FLEET = [
  {
    id: "noir52", type: "motor", name: "Noir 52", ft: 52, guests: 12, cabins: 3, crew: 2, price: 190,
    img: "1605281317010-fe5ffe798166",
    typeLabel: { en: "Motor yacht", uk: "Моторна яхта" },
    desc: {
      en: "Our most-booked yacht. A flybridge for sunsets, a swim platform for the sandbar and a sound system that will not embarrass you.",
      uk: "Найпопулярніша яхта нашого флоту. Флайбрідж, щоб зустрічати захід, платформа для купання й музика, яка звучить як слід."
    },
    amen: { en: ["Flybridge", "Bluetooth audio", "Swim platform", "Fresh-water shower", "Cooler & ice"], uk: ["Флайбрідж", "Bluetooth-аудіо", "Платформа для купання", "Прісний душ", "Кулер з льодом"] }
  },
  {
    id: "mono78", type: "motor", name: "Monochrome 78", ft: 78, guests: 13, cabins: 4, crew: 3, price: 640,
    img: "1569263979104-865ab7cd8d13",
    typeLabel: { en: "Motor yacht", uk: "Моторна яхта" },
    desc: {
      en: "Four cabins, a full-beam master and a sundeck that fits all thirteen of you. The one people book for birthdays.",
      uk: "Чотири каюти, простора майстер-каюта й сандек, де вистачить місця всім тринадцятьом. Її найчастіше беруть на дні народження."
    },
    amen: { en: ["Sundeck", "Jacuzzi", "4 cabins", "Wet bar", "Underwater lights"], uk: ["Сандек", "Джакузі", "4 каюти", "Бар", "Підводне підсвічування"] }
  },
  {
    id: "velvet", type: "sail", name: "Velvet Wind", ft: 46, guests: 8, cabins: 3, crew: 1, price: 220,
    img: "1540946485063-a40da27545f8",
    typeLabel: { en: "Sailing yacht", uk: "Вітрильна яхта" },
    desc: {
      en: "No engine noise, just wind and water. Our captain will happily let you take the helm.",
      uk: "Жодного шуму мотора — лише вітер і хвилі. Капітан охоче дасть вам покермувати."
    },
    amen: { en: ["Helm lessons", "Bow nets", "Snorkel gear", "Galley"], uk: ["Можна покермувати", "Сітки на носі", "Маски для снорклінгу", "Камбуз"] }
  },
  {
    id: "bolt38", type: "sport", name: "Bolt 38", ft: 38, guests: 10, cabins: 1, crew: 1, price: 190,
    img: "1593351415075-3bac9f45c877",
    typeLabel: { en: "Sport boat", uk: "Швидкісний катер" },
    desc: {
      en: "Fast, loud in the right way, and perfect for a sandbar afternoon. 50 knots if you ask nicely.",
      uk: "Швидкий, гучний — у хорошому сенсі — і створений для дня на мілині. Попросіть — і він розженеться до 50 вузлів."
    },
    amen: { en: ["Twin 450hp", "Sun pad", "Bimini top", "Tow tube"], uk: ["Два мотори по 450 к.с.", "Лежак для засмаги", "Тент від сонця", "Надувний «бублик»"] }
  },
  {
    id: "sil65", type: "motor", name: "Silhouette 65", ft: 65, guests: 13, cabins: 4, crew: 2, price: 480,
    img: "1621277224630-81d9af65e40c",
    typeLabel: { en: "Motor yacht", uk: "Моторна яхта" },
    desc: {
      en: "Clean lines, white leather and the quietest engines in the fleet. Built for long days and longer sunsets.",
      uk: "Чисті лінії, біла шкіра й найтихіші двигуни у флоті. Для довгих днів і ще довших заходів сонця."
    },
    amen: { en: ["Hardtop", "Stabilizers", "Seabob-ready", "Indoor salon"], uk: ["Хардтоп", "Стабілізатори", "Можна взяти сібоб", "Закритий салон"] }
  },
  {
    id: "oldsalt", type: "sail", name: "Old Salt", ft: 82, guests: 20, cabins: 0, crew: 3, price: 420,
    img: "1563296291-14f26f10c20f",
    typeLabel: { en: "Classic schooner", uk: "Класична шхуна" },
    desc: {
      en: "A 1930s-style schooner and our only yacht licensed for 20 guests. Big groups, big sails, big photos.",
      uk: "Шхуна в стилі 1930-х — єдина яхта у флоті, на яку можна взяти 20 гостей. Велика компанія, великі вітрила, найкращі фото."
    },
    amen: { en: ["20 guests", "Wooden deck", "Sail raising", "Shaded lounge"], uk: ["20 гостей", "Дерев'яна палуба", "Піднімаємо вітрила разом", "Зона в тіні"] }
  },
  {
    id: "graph100", type: "super", name: "Graphite 100", ft: 100, guests: 12, cabins: 5, crew: 5, price: 1150,
    img: "1567899378494-47b22a2ae96a",
    typeLabel: { en: "Superyacht", uk: "Суперяхта" },
    desc: {
      en: "Five crew, five cabins and a beach club at the stern. If you are going to do it once, do it on this one.",
      uk: "П'ятеро членів екіпажу, п'ять кают і пляжний клуб на кормі. Якщо робити це раз у житті — то саме тут."
    },
    amen: { en: ["Beach club", "Chef on board", "Jet ski", "Cinema salon", "5 crew"], uk: ["Пляжний клуб", "Шеф-кухар на борту", "Гідроцикл", "Кінозал", "Екіпаж з 5 осіб"] }
  },
  {
    id: "harbor60", type: "super", name: "Harbor Line 60", ft: 60, guests: 12, cabins: 3, crew: 2, price: 420,
    img: "1562281302-809108fd533c",
    typeLabel: { en: "Superyacht", uk: "Суперяхта" },
    desc: {
      en: "A compact superyacht with a raised pilothouse and a huge aft deck — evening cocktails in the marina are a specialty.",
      uk: "Компактна суперяхта з високою рубкою і просторою кормовою палубою — ідеальна для вечірніх коктейлів у марині."
    },
    amen: { en: ["Aft deck lounge", "Pilothouse", "Ice maker", "Paddleboards"], uk: ["Лаунж на кормі", "Рубка", "Генератор льоду", "SUP-дошки"] }
  }
];

/* ---------- ROUTES ---------- */
const ROUTES = [
  { dur: 2, price: 380, img: "1535498730771-e735b998cd64",
    name: { en: "Biscayne Sunset", uk: "Захід сонця в Біскейн" },
    desc: { en: "Golden-hour loop past Brickell and the Venetian Islands.", uk: "Прогулянка в золоту годину повз Брікелл і Венеціанські острови." } },
  { dur: 3, price: 570, img: "1506966953602-c20cc11f75e3",
    name: { en: "Star Island & Millionaire's Row", uk: "Стар-Айленд і вілли мільйонерів" },
    desc: { en: "Celebrity mansions from the only angle that matters — the water.", uk: "Особняки зірок — з найкращого ракурсу, з води." } },
  { dur: 4, price: 760, img: "1504681869696-d977211a5f4c",
    name: { en: "Stiltsville & Key Biscayne", uk: "Стілтсвілл і Кі-Біскейн" },
    desc: { en: "Houses on stilts in the open sea, Cape Florida lighthouse and a swim stop.", uk: "Будиночки на палях посеред моря, маяк Кейп-Флорида й зупинка, щоб поплавати." } },
  { dur: 4, price: 760, img: "1519046904884-53103b34b206",
    name: { en: "Haulover Sandbar", uk: "Мілина Хауловер" },
    desc: { en: "Waist-deep crystal water and the liveliest party afloat.", uk: "Прозора вода по пояс і найгучніша вечірка на воді." } },
  { dur: 8, price: 1520, img: "1507525428034-b723cf961d3e",
    name: { en: "Fort Lauderdale Day", uk: "Форт-Лодердейл на весь день" },
    desc: { en: "Up the coast to the Venice of America, lunch at a dockside restaurant.", uk: "Вздовж узбережжя до «американської Венеції» з обідом у ресторані на причалі." } },
  { dur: 0, price: 4900, img: "1500514966906-fe245eea9344",
    name: { en: "Bimini, Bahamas", uk: "Біміні, Багами" },
    desc: { en: "50 miles across the Gulf Stream to impossibly clear water. Passport required.", uk: "80 км через Гольфстрім до неймовірно прозорої води. Потрібен закордонний паспорт." } }
];

/* ---------- REVIEWS ---------- */
const REVIEWS = [
  { name: "Emma & Jake", img: "1516589178581-6cd7833ae3b2", meta: { en: "London · Noir 52 · Sunset", uk: "Лондон · Noir 52 · Захід сонця" },
    text: { en: "We booked two hours and stayed for four. The captain found us a quiet spot by Stiltsville and the sky did the rest.", uk: "Забронювали дві години, а лишилися на чотири. Капітан знайшов тихе місце біля Стілтсвілла — решту зробив захід сонця." } },
  { name: "Olena K.", img: "1494790108377-be9c29b29330", meta: { en: "Kyiv · Monochrome 78 · Birthday", uk: "Київ · Monochrome 78 · День народження" },
    text: { en: "Twelve friends, one jacuzzi, zero stress. Booking took three minutes and the price was exactly what the site said.", uk: "Дванадцять друзів, джакузі й жодного стресу. Бронювання зайняло три хвилини, а ціна була саме така, як на сайті." } },
  { name: "Marco R.", img: "1506794778202-cad84cf45f1d", meta: { en: "Milan · Velvet Wind · Sail", uk: "Мілан · Velvet Wind · Під вітрилом" },
    text: { en: "I have sailed in Sardinia and Croatia. This was the best-kept boat I have ever stepped on.", uk: "Я ходив під вітрилом на Сардинії й у Хорватії, але доглянутішої яхти ще не бачив." } },
  { name: "The Patel crew", img: "1529156069898-49953e39b3ac", meta: { en: "Toronto · Bolt 38 · Sandbar", uk: "Торонто · Bolt 38 · Мілина" },
    text: { en: "Fastest boat at the sandbar, best playlist at the sandbar. The water toys pack is non-negotiable.", uk: "Найшвидший катер на мілині й найкращий плейлист. Без водних розваг — навіть не думайте." } },
  { name: "Sofia L.", img: "1580489944761-15a19d654956", meta: { en: "Madrid · Old Salt · Team trip", uk: "Мадрид · Old Salt · Тимбілдинг" },
    text: { en: "Twenty colleagues on a classic schooner. Everybody helped raise the sails. Nobody checked Slack.", uk: "Двадцять колег на старовинній шхуні. Усі разом піднімали вітрила, і ніхто не заглядав у Slack." } },
  { name: "Daniel W.", img: "1500648767791-00dcc994a43e", meta: { en: "Chicago · Graphite 100 · Proposal", uk: "Чикаго · Graphite 100 · Освідчення" },
    text: { en: "The crew hid the ring in a champagne bucket and timed it to the sunset. She said yes. Five stars is not enough.", uk: "Екіпаж сховав каблучку у відерці з шампанським і підгадав момент до заходу сонця. Вона сказала «так». П'яти зірок тут замало." } }
];

/* ---------- FAQ ---------- */
const FAQ = [
  { q: { en: "Is a captain included?", uk: "Чи входить капітан у вартість?" },
    a: { en: "Yes. Every charter includes a licensed US Coast Guard captain and fuel for bay routes. Longer trips (Fort Lauderdale, Bimini) carry a fuel surcharge that is shown before you pay.", uk: "Так. У кожну оренду входять ліцензований капітан і пальне для прогулянок затокою. Для далеких поїздок (Форт-Лодердейл, Біміні) є доплата за пальне — ви побачите її ще до оплати." } },
  { q: { en: "How many guests can I bring?", uk: "Скільки гостей можна взяти?" },
    a: { en: "Up to 12–13 on most yachts — that is the US Coast Guard limit for private charters. Our schooner Old Salt is licensed for 20.", uk: "На більшості яхт — до 12–13 осіб: такий ліміт для приватної оренди встановлює Берегова охорона США. На шхуну Old Salt можна взяти до 20." } },
  { q: { en: "Can we bring our own food and drinks?", uk: "Чи можна взяти свою їжу й напої?" },
    a: { en: "Absolutely. No corkage fee — just no glass on deck. Or add our private chef & open bar and arrive empty-handed.", uk: "Звісно, і без жодних доплат. Єдине прохання — без скляного посуду на палубі. Або замовте шеф-кухаря з баром і приходьте з порожніми руками." } },
  { q: { en: "What happens if the weather is bad?", uk: "А якщо буде погана погода?" },
    a: { en: "If the captain cancels for safety, you choose: a full refund or a free reschedule. You never pay for a storm.", uk: "Якщо капітан скасує вихід з міркувань безпеки, ви самі вирішуєте: повернути всі гроші чи безкоштовно перенести дату. За шторм ви не платите." } },
  { q: { en: "What is the cancellation policy?", uk: "Які умови скасування?" },
    a: { en: "Free cancellation up to 72 hours before departure. After that, the 30% deposit is non-refundable but can be moved to another date once.", uk: "Скасувати можна безкоштовно за 72 години до відправлення. Пізніше передоплата 30% не повертається, але один раз її можна перенести на іншу дату." } },
  { q: { en: "Do I need a passport?", uk: "Чи потрібен паспорт?" },
    a: { en: "Only for Bimini, Bahamas. Every other route stays in US waters.", uk: "Лише для поїздки на Біміні (Багами). Усі інші маршрути не виходять за межі вод США." } },
  { q: { en: "Is there an age limit?", uk: "Чи є вікові обмеження?" },
    a: { en: "Kids are very welcome — we carry life jackets in every size. The person booking must be 21 or older.", uk: "Діти — бажані гості: у нас є рятувальні жилети всіх розмірів. Бронювати можна з 21 року." } }
];
