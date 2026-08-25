# PFC Solutions — Landing Page Master Prompt

> Paste this whole document into your AI builder (Claude Code, v0, Lovable, Cursor) as a single brief.
> It covers stack, i18n, section-by-section copy in UZ/RU/EN, functional behavior, and acceptance criteria.
>
> **Visual design is out of scope for this document.** Palette, typography, spacing, layout, motion and
> component styling come from the HTML design implementation in `download-version/`, not from here.

---

## 0. ROLE & GOAL

You are a senior front-end engineer. Build a **production-ready marketing landing page** for **PFC Solutions**, a software engineering company in Tashkent, Uzbekistan.

**Business goal of the page:** not to close a deal — to start a conversation. The single conversion action across the whole page is booking a **30-minute business conversation**.

**Secondary goal:** qualify. The page must actively repel bad-fit visitors (price shoppers, "just execute my spec" buyers) as clearly as it attracts good-fit ones.

**Tone:** confident, concrete, engineering-grade. No marketing fluff, no unverified numbers. Every claim on the page is backed by a proof line.

---

## 1. TECH REQUIREMENTS

- **Framework:** Next.js 14+ (App Router) + TypeScript
- **i18n:** `next-intl` with path-based locales — `/uz`, `/ru`, `/en`. Root `/` redirects to `/uz`.
- **Theme:** `next-themes`, `attribute="class"`, `defaultTheme="system"`, `enableSystem`, no flash on load (inline blocking script).
- **No localStorage/sessionStorage** if this renders in a sandboxed preview — use in-memory state; `next-themes` cookie/localStorage is fine in a real deployment.

**Deliverable structure:**
```
app/[locale]/page.tsx
app/[locale]/layout.tsx
components/          (one file per section + ui primitives)
messages/uz.json  ru.json  en.json
lib/theme.ts  lib/i18n.ts
app/globals.css
```

---

## 2. INTERNATIONALIZATION

- Locales: **`uz`** (default, Latin script), **`ru`**, **`en`**
- Route: `/uz/...`, `/ru/...`, `/en/...`; `/` → 302 → `/uz`
- Language switcher: `UZ · RU · EN` in the header, next to the theme toggle. Preserves the current path.
- All copy lives in `messages/{locale}.json`. **Zero hardcoded strings in components.**
- `<html lang="{locale}" dir="ltr">`
- `hreflang` alternates for all three locales + `x-default` → `uz`
- Uzbek uses the apostrophe form `o'`, `g'` (U+2018). Do not substitute ASCII `'`.

---

## 3. THEME TOGGLE

- Toggle in the header cycling light → dark → system
- Default: `system`
- No flash of wrong theme — inline script in `<head>` sets the class before paint
- `aria-label` localized in all three languages
- No layout shift when the theme changes

---

## 4. PAGE STRUCTURE & COPY

Build these sections in this exact order. Copy is given for all three languages — put it into the message files verbatim.

### 4.1 Header

- PFC logo, with a light variant and a dark variant swapped by theme
- Navigation: Services · Approach · Industries · Work · About
- Language switcher, theme toggle, and the primary CTA button
- Mobile: collapsible navigation containing the same items plus theme and language controls

**Nav labels**

| key | UZ | RU | EN |
|---|---|---|---|
| services | Xizmatlar | Услуги | Services |
| approach | Yondashuv | Подход | Approach |
| industries | Sohalar | Отрасли | Industries |
| work | Loyihalar | Проекты | Work |
| about | Biz haqimizda | О нас | About |
| cta | Suhbatga yozilish | Записаться на встречу | Book a call |

---

### 4.2 HERO

**Eyebrow**
- UZ: `Toshkent · O'zbekiston`
- RU: `Ташкент · Узбекистан`
- EN: `Tashkent · Uzbekistan`

**Headline** (two lines)
- UZ: `Biz kod yozadigan qo'l emasmiz.` / `Nima yozish kerakligini tushunadigan miyamiz.`
- RU: `Мы не руки, которые пишут код.` / `Мы мозг, который понимает, что писать.`
- EN: `We are not the hands that write code.` / `We are the mind that knows what to write.`

**Sub-headline**
- UZ: `O'zbekistondagi zavod, ombor, logistika, qurilish va savdo bizneslariga ichki boshqaruv tizimlari, jarayon avtomatlashtirish va sun'iy intellekt yechimlarini quramiz.`
- RU: `Мы строим внутренние системы управления, автоматизацию процессов и решения на базе искусственного интеллекта для заводов, складов, логистики, строительства и торговли в Узбекистане.`
- EN: `We build internal management systems, process automation and AI solutions for factories, warehouses, logistics, construction and retail businesses in Uzbekistan.`

**Primary CTA**
- UZ: `Biznesingizni muhokama qilamiz — 30 daqiqa`
- RU: `Обсудим ваш бизнес — 30 минут`
- EN: `Let's discuss your business — 30 minutes`

**Secondary CTA**
- UZ: `Discovery nima?` · RU: `Что такое Discovery?` · EN: `What is Discovery?`

**Trust strip**
- UZ: `12 ta yetkazilgan loyiha · Ishlab chiqarish · Qurilish · Moliya · Tibbiyot · Ta'lim`
- RU: `12 реализованных проектов · Производство · Строительство · Финансы · Медицина · Образование`
- EN: `12 delivered projects · Manufacturing · Construction · Finance · Healthcare · Education`

---

### 4.3 PROBLEM

Six items. Each pairs a line quoted in the customer's own voice with the real underlying pain beneath it.

**Section title**
- UZ: `Bu gaplar tanish tuyulsa — gaplashamiz`
- RU: `Если это звучит знакомо — давайте поговорим`
- EN: `If any of this sounds familiar — let's talk`

| # | Quote (UZ / RU / EN) | Real pain (UZ / RU / EN) |
|---|---|---|
| 1 | `"Bizga CRM kerak"` / `«Нам нужна CRM»` / `"We need a CRM"` | `Mijoz qayerda yo'qolayotganini bilmaysiz` / `Вы не знаете, где теряете клиентов` / `You don't know where you lose customers` |
| 2 | `"Ombor tizimi kerak"` / `«Нужна складская система»` / `"We need a warehouse system"` | `Qoldiq noto'g'ri, tovar yo'qoladi` / `Остатки неверны, товар теряется` / `Stock figures are wrong, goods go missing` |
| 3 | `"Hisobot kerak"` / `«Нужны отчёты»` / `"We need reports"` | `Har hisobot uch kun oladi, qaror ma'lumotsiz qabul qilinadi` / `Каждый отчёт — три дня, решения принимаются вслепую` / `Every report takes three days; decisions are made blind` |
| 4 | `"Excel ishlamayapti"` / `«Excel не справляется»` / `"Excel isn't working"` | `Bir xil raqam uch joyda uch xil` / `Одна цифра в трёх местах разная` / `The same number is different in three places` |
| 5 | `"Xodimlar sekin ishlaydi"` / `«Сотрудники работают медленно»` / `"Our staff is slow"` | `Jarayon noaniq — har kim o'zicha qiladi` / `Процесс не описан — каждый делает по-своему` / `The process is undefined — everyone does it their own way` |
| 6 | `"AI qo'shmoqchimiz"` / `«Хотим внедрить ИИ»` / `"We want to add AI"` | `Nima uchun kerakligi noma'lum — raqobatchida bor deb eshitilgan` / `Зачем — неясно; слышали, что есть у конкурента` / `Nobody knows what for — a competitor has it` |

**Closing line**
- UZ: `Biz so'ralgan narsani emas — haqiqiy og'riqni topamiz.`
- RU: `Мы находим не то, что просят, — а настоящую боль.`
- EN: `We don't build what's requested. We find what's actually wrong.`

---

### 4.4 DIFFERENTIATORS — five, each with proof

Every item carries a `PROOF` line. The proof is not optional — a differentiator without one does not ship.

**Section title**
- UZ: `Nega PFC Solutions?` · RU: `Почему PFC` · EN: `Why PFC`

| # | Title | Body | Proof |
|---|---|---|---|
| 1 | UZ `Avval biznesni o'rganamiz, keyin kod yozamiz` / RU `Сначала изучаем бизнес, потом пишем код` / EN `We study the business before we write code` | UZ `Har loyiha Discovery bilan boshlanadi — pullik, alohida bosqich. Texnik topshiriqni mijozdan olmaymiz, o'zimiz yozamiz.` / RU `Каждый проект начинается с Discovery — платного отдельного этапа. Мы не берём ТЗ у клиента, мы пишем его сами.` / EN `Every project starts with Discovery — a paid, standalone stage. We don't take a spec from the client; we write it.` | UZ `ISBOT — Discovery hisoboti: mijoz uni bizsiz ham ishlata oladi` / RU `ДОКАЗАТЕЛЬСТВО — отчёт Discovery: клиент может использовать его и без нас` / EN `PROOF — the Discovery report: usable even without us` |
| 2 | UZ `100% moslashtirilgan yechim` / RU `Решение на 100% под вас` / EN `A solution shaped to you` | UZ `Biz mijozni tizimga emas, tizimni mijozga moslaymiz. Tayyor ERP joriy etilganda biznes o'z jarayonini buzishga majbur bo'ladi — bizda aksincha.` / RU `Мы подстраиваем систему под клиента, а не клиента под систему. При внедрении готовой ERP бизнес ломает свои процессы — у нас наоборот.` / EN `We fit the system to the business, not the business to the system. Off-the-shelf ERP forces you to break your process — we do the opposite.` | UZ `ISBOT — yechim mijozning o'z atamalari va hisobot shakllari bilan ishlaydi` / RU `ДОКАЗАТЕЛЬСТВО — система говорит терминами клиента и его формами отчётности` / EN `PROOF — the system uses your terms and your report formats` |
| 3 | UZ `AI — bezak emas, natija` / RU `ИИ — не украшение, а результат` / EN `AI as an outcome, not decoration` | UZ `Har bir AI komponenti aniq og'riqni yechadi va natijasi o'lchanadi. Oddiy qoida bilan yechish mumkin bo'lsa — AI ishlatilmaydi.` / RU `Каждый ИИ-компонент решает конкретную боль, и результат измеряется. Если хватает простого правила — ИИ не применяется.` / EN `Every AI component solves a named pain and its result is measured. If a plain rule is enough, we don't use AI.` | UZ `ISBOT — har komponent uchun aniqlik ko'rsatkichi va oylik xarajat hisobi` / RU `ДОКАЗАТЕЛЬСТВО — метрика точности и расчёт стоимости по каждому компоненту` / EN `PROOF — an accuracy metric and a monthly cost figure per component` |
| 4 | UZ `Muhandislik sifati` / RU `Инженерное качество` / EN `Engineering quality` | UZ `Kod o'qiladigan, hujjatlashtirilgan va test qilingan bo'ladi. Tizim uch yildan keyin ham qo'llab-quvvatlanadi — hatto boshqa jamoa tomonidan.` / RU `Код читаемый, документированный и покрыт тестами. Систему можно поддерживать и через три года — даже другой командой.` / EN `Readable, documented, tested code. The system stays maintainable in three years — even by a different team.` | UZ `ISBOT — kod va hujjat mijozga tegishli, birga topshiriladi` / RU `ДОКАЗАТЕЛЬСТВО — код и документация принадлежат клиенту и передаются вместе` / EN `PROOF — the code and docs are yours, handed over together` |
| 5 | UZ `Yomon xabarni birinchi biz aytamiz` / RU `О плохих новостях вы узнаёте от нас первыми` / EN `You hear bad news from us first` | UZ `Muddat kechikayotgan bo'lsa yoki yechim ishlamayotgan bo'lsa, buni siz o'zingiz sezishdan oldin bizdan eshitasiz.` / RU `Если срок сдвигается или решение не работает — вы узнаете это от нас раньше, чем заметите сами.` / EN `If a deadline slips or an approach fails, you hear it from us before you notice it.` | UZ `ISBOT — haftalik holat hisoboti, muammo paydo bo'lgan kuni xabar` / RU `ДОКАЗАТЕЛЬСТВО — еженедельный статус-отчёт и сообщение в день возникновения проблемы` / EN `PROOF — a weekly status report and a same-day heads-up` |

---

### 4.5 APPROACH — how we operate

The most important section. Four blocks.

**Section title**
- UZ: `Qanday ishlaymiz` · RU: `Как мы работаем` · EN: `How we operate`

**Block A — Why Discovery is paid.** A four-point contrast between free analysis and paid Discovery.

| | Free analysis (UZ / RU / EN) | Paid Discovery (UZ / RU / EN) |
|---|---|---|
| 1 | `Mijoz jiddiy qaramaydi` / `Клиент не относится всерьёз` / `The client doesn't take it seriously` | `Mijoz vaqt va odam ajratadi` / `Клиент выделяет время и людей` / `The client commits time and people` |
| 2 | `Ma'lumotga kirish berilmaydi` / `Доступ к данным не дают` / `No real data access` | `Kirish beriladi` / `Доступ открыт` / `Access is granted` |
| 3 | `Biz taxmin qilamiz` / `Мы предполагаем` / `We guess` | `Biz bilamiz` / `Мы знаем` / `We know` |
| 4 | `Narx keyin o'zgaradi` / `Цена потом меняется` / `The price changes later` | `Narx aniq va o'zgarmaydi` / `Цена точная и не меняется` / `The price is fixed` |

**Block B — Discovery in four steps.**

| Step | UZ | RU | EN |
|---|---|---|---|
| 1 | `Biznes tahlili — biznes qanday pul topadi` | `Анализ бизнеса — как бизнес зарабатывает` | `Business analysis — how the business makes money` |
| 2 | `Jarayon tahlili — ish qanday bajariladi` | `Анализ процессов — как выполняется работа` | `Process analysis — how the work actually happens` |
| 3 | `Og'riq nuqtalari — qayerda pul yo'qoladi` | `Точки боли — где теряются деньги` | `Pain points — where the money leaks` |
| 4 | `Imkoniyat baholash — nimani avtomatlashtiramiz` | `Оценка возможностей — что автоматизируем` | `Opportunity assessment — what we automate` |

Caption for the four steps:
- UZ: `Maqsad — to'g'ri muammoni topish, yechim taklif qilish emas.`
- RU: `Цель — найти правильную проблему, а не предложить решение.`
- EN: `The goal is to find the right problem, not to pitch a solution.`

**Block C — Discovery pricing.** Three tiers.

| Tier | Duration | Price | When |
|---|---|---|---|
| `Express` | UZ `3–5 kun` / RU `3–5 дней` / EN `3–5 days` | `$500 – $800` | UZ `Bitta jarayon yoki modul` / RU `Один процесс или модуль` / EN `One process or module` |
| `To'liq` / `Полный` / `Full` | UZ `1.5–2 hafta` / RU `1.5–2 недели` / EN `1.5–2 weeks` | `$1,500 – $2,500` | UZ `Bir necha modul` / RU `Несколько модулей` / EN `Several modules` |
| `Chuqur` / `Глубокий` / `Deep` | UZ `3–4 hafta` / RU `3–4 недели` / EN `3–4 weeks` | `$3,500 – $5,000` | UZ `To'liq boshqaruv tizimi` / RU `Полная система управления` / EN `A full management system` |

Callout accompanying the tiers:
- UZ: `Agar birga ishlasak — tahlil bepul bo'lib chiqadi. Discovery narxi loyiha narxidan to'liq chegiriladi. Ishlamasak — hisobot sizda qoladi va uni istagan ijrochiga bera olasiz.`
- RU: `Если мы работаем дальше — анализ выходит бесплатным: стоимость Discovery полностью вычитается из цены проекта. Если нет — отчёт остаётся у вас, и вы можете отдать его любому исполнителю.`
- EN: `If we go ahead, the analysis is effectively free — the Discovery fee is fully credited against the project price. If we don't, the report is yours to take to anyone.`

Fine print:
- UZ: `30 kun ichida shartnoma imzolansa va loyiha narxi Discovery narxidan kamida 5 baravar katta bo'lsa.`
- RU: `При подписании договора в течение 30 дней и стоимости проекта не менее чем в 5 раз выше стоимости Discovery.`
- EN: `Applies when the contract is signed within 30 days and the project is at least 5× the Discovery fee.`

**Block D — The six delivery stages.**

> **Superseded.** The six one-word labels this block used to specify have been
> replaced by the full stage narrative, which is the single source of truth for
> the delivery pipeline. It lives in the **`workflow`** namespace of
> `messages/{uz,ru,en}.json` — six stages, each with a `title`, a `body` array of
> one or two paragraphs, and an `imageAlt`. Do not re-add `approach.blockD.stages`.
>
> It renders through one component, `components/sections/WorkflowTimelineList.tsx`,
> in two places: the homepage (wrapped by `WorkflowTimeline.tsx`, which supplies
> the `approach.title` heading) and `/approach`, where Block D's grid used to be
> and where the section's own h2 already carries that heading.

| # | UZ | RU | EN |
|---|---|---|---|
| 1 | `Discovery jarayoni` | `Discovery — этап исследования` | `Discovery Phase` |
| 2 | `Rejalashtirish jarayoni` | `Этап планирования` | `Planning Phase` |
| 3 | `Ishlab chiqish jarayoni` | `Этап разработки` | `Development Phase` |
| 4 | `Test jarayoni` | `Этап тестирования` | `Testing Phase` |
| 5 | `Joriy qilish jarayoni` | `Этап внедрения` | `Deployment Phase` |
| 6 | `Qo'llab-quvvatlash` | `Поддержка` | `Ongoing Support` |

Presented as a vertical timeline: a connector rail that draws itself on scroll,
a numbered dot per stage, and alternating text/image columns from `lg` up —
stage 1 text-left/image-right, stage 2 reversed, and so on. Stage imagery is
16:9, at `public/assets/img/workflow/workflow-{nn}-{slug}.webp`; until a file
exists its `STAGE_IMAGES` entry stays `null` and a placeholder of identical size
renders in its place.

The markup and CSS are authored in their **finished** state (rail drawn, dots
lit, text opaque); the animation opts *into* the hidden state via a `wt-js`
class. So no-JS and `prefers-reduced-motion` both degrade to a plain readable
timeline rather than an invisible section — see §5 and acceptance criterion 10.

Delivery rhythm:
- UZ: `Har hafta — yozma holat hisoboti · Har 2 hafta — ishlaydigan demo · Har bosqich oxirida — qabul`
- RU: `Каждую неделю — письменный статус · Каждые 2 недели — рабочее демо · В конце каждого этапа — приёмка`
- EN: `Weekly — a written status report · Every 2 weeks — a working demo · End of each stage — sign-off`

Guarantee line:
- UZ: `Kafolat 3 oy — topshirish aktidan boshlab.`
- RU: `Гарантия 3 месяца — с даты акта приёмки.`
- EN: `Three-month warranty from the handover date.`

---

### 4.6 SERVICES — six

**Section title:** UZ `Xizmatlar` · RU `Услуги` · EN `Services`

Each service carries a title, a one-line description, a typical duration, and an expandable "what's not included" list that is collapsed by default.

| Service | UZ | RU | EN | Duration |
|---|---|---|---|---|
| 1 | `Ichki boshqaruv tizimlari` | `Внутренние системы управления` | `Internal management systems` | 3–8 oy / мес / months |
| 2 | `Jarayonlarni avtomatlashtirish` | `Автоматизация процессов` | `Process automation` | 1–4 |
| 3 | `AI yechimlari va agentlar` | `ИИ-решения и агенты` | `AI solutions and agents` | 1–5 |
| 4 | `Integratsiya va ma'lumot` | `Интеграции и данные` | `Integration and data` | 1–3 |
| 5 | `Sayt va veb yechimlar` | `Сайты и веб-решения` | `Websites and web solutions` | 2–8 hafta / недели / weeks |
| 6 | `Qo'llab-quvvatlash va rivojlantirish` | `Поддержка и развитие` | `Support and evolution` | — |

---

### 4.7 INDUSTRIES — five, no ranking

**Section title:** UZ `Sohalar` · RU `Отрасли` · EN `Industries`
**Sub-line:** UZ `Umumiy belgi sohada emas, jarayonda.` / RU `Общее — не отрасль, а процесс.` / EN `What they share isn't the industry — it's the process.`

| Industry | Entry point |
|---|---|
| UZ `Ishlab chiqarish va zavodlar` / RU `Производство и заводы` / EN `Manufacturing and factories` | UZ `Ombor va qoldiq` / RU `Склад и остатки` / EN `Warehouse and stock` |
| UZ `Logistika va ombor` / RU `Логистика и склад` / EN `Logistics and warehousing` | UZ `Inventarizatsiya` / RU `Инвентаризация` / EN `Stock-taking` |
| UZ `Qurilish` / RU `Строительство` / EN `Construction` | UZ `Material va xarajat nazorati` / RU `Контроль материалов и затрат` / EN `Material and cost control` |
| UZ `HoReCa — restoran va mehmonxona` / RU `HoReCa — рестораны и отели` / EN `HoReCa — restaurants and hotels` | UZ `Tannarx va qoldiq` / RU `Себестоимость и остатки` / EN `Cost of goods and stock` |
| UZ `Savdo — chakana va ulgurji` / RU `Торговля — розница и опт` / EN `Retail and wholesale` | UZ `Ko'p filialli qoldiq va marja` / RU `Остатки и маржа по филиалам` / EN `Multi-branch stock and margin` |

---

### 4.8 WORK — portfolio

**Section title:** UZ `Loyihalar` · RU `Проекты` · EN `Work`

Two groups, switchable: **Management systems (8)** and **Web solutions (4)**.

Management systems: `Sut yig'ish tizimi` (food manufacturing) · `Qurilish boshqaruv tizimi` (construction) · `Faktoriya` (B2B SaaS ERP) · `Bekuz` (currency brokerage, Dubai) · `Fotima Medical Plaza` (healthcare) · `Mezon Akademiya` (education) · `WeAuto` (auto marketplace) · `Midrama` (media streaming).

Web solutions: `UstaBarber` (Korea) · `Ironex` (metalworking) · `Legal House` (legal) · `Tikoncha` (IT/education).

**Featured deep-dive — Bekuz.** Six requirements and how each was solved:

| Requirement | How it was solved |
|---|---|
| UZ `Ko'p valyutali, ko'p qismli hisob-kitob` / EN `Multi-currency, multi-leg settlement` | UZ `Bitta buyurtmada bir necha olish va to'lash qismi; tranzaksiyalar avtomatik biriktiriladi` / EN `One order carries several receive and pay legs; transactions auto-pair to legs` |
| UZ `Kursning butunligi` / EN `Rate integrity` | UZ `Har qismda kursning o'zgarmas oniy nusxasi — qiymati, manbasi, sanasi` / EN `An immutable rate snapshot per leg — value, source, timestamp` |
| UZ `"Nima bo'lardi" tahlili` / EN `What-if analysis` | UZ `Marjani qayta hisoblash tarixga tegmasdan ishlaydi` / EN `Margin recalculation runs without mutating history` |
| UZ `Ishonchli kassa` / EN `Trustworthy treasury` | UZ `Qoldiq saqlanmaydi — u operatsiyalar jurnalidan hisoblanadi` / EN `Balances are never stored — always derived from the ledger` |
| UZ `Xavfsiz vakolat berish` / EN `Safe delegation` | UZ `Modul bo'yicha huquqlar + "o'z / barcha" doirasi + o'chirilmaydigan audit jurnali` / EN `Per-module permissions, own/all data scope, append-only audit log` |
| UZ `Ko'p kanalli ish` / EN `Omnichannel` | UZ `Veb, mobil, WhatsApp va Telegram AI yordamchisi — bitta ma'lumot ustida` / EN `Web, mobile, WhatsApp and a Telegram AI agent over one data set` |

Note accompanying the portfolio:
- UZ: `Har bir loyihaning o'lchanadigan natijasi mijoz roziligi bilan alohida taqdim etiladi. Taklifda faqat tekshirilgan raqam ishlatiladi.`
- RU: `Измеримые результаты по каждому проекту предоставляются отдельно, с согласия клиента. В коммерческом предложении используются только проверенные цифры.`
- EN: `Measurable results per project are shared separately, with the client's consent. Only verified numbers go into a proposal.`

---

### 4.9 FIT — the qualifier

Deliberately blunt. This section filters.

**Title:** UZ `Biz kim uchunmiz` · RU `Для кого мы` · EN `Who we're for`

| ✅ Good fit | ❌ Not a fit |
|---|---|
| UZ `Fizik operatsiyaga ega biznes` / RU `Бизнес с физическими операциями` / EN `A business with physical operations` | UZ `Sof raqamli startap` / RU `Чисто цифровой стартап` / EN `A purely digital startup` |
| UZ `Jarayoni qo'lda yoki Excel'da` / RU `Процессы вручную или в Excel` / EN `Processes run on paper or Excel` | UZ `Zamonaviy ERP allaqachon o'rnatilgan` / RU `Современная ERP уже внедрена` / EN `A modern ERP is already in place` |
| UZ `Egasi yoki direktori qaror qabul qiladi` / RU `Решение принимает владелец или директор` / EN `The owner or director decides` | UZ `Qaror uzoq komitetlarda qoladi` / RU `Решение тонет в комитетах` / EN `Decisions get stuck in committees` |
| UZ `Muammoni biladi, yechimni bilmaydi` / RU `Знает проблему, но не решение` / EN `Knows the problem, not the solution` | UZ `Tayyor texnik topshiriq bilan keladi va faqat bajaruvchi qidiradi` / RU `Приходит с готовым ТЗ и ищет исполнителя` / EN `Arrives with a finished spec looking for hands` |
| UZ `Uzoq muddatli hamkorlik qidiradi` / RU `Ищет долгосрочное партнёрство` / EN `Wants a long-term partner` | UZ `Eng arzon narx qidiradi` / RU `Ищет самую низкую цену` / EN `Wants the lowest price` |

Closing line:
- UZ: `Mijoz "menga shunday tizim kerak" deganda, biz "nima uchun?" deb so'raymiz. Bu savolga javob bermoqchi bo'lmagan mijoz — bizning mijozimiz emas.`
- RU: `Когда клиент говорит «нам нужна такая система», мы спрашиваем «зачем?». Клиент, не готовый ответить, — не наш клиент.`
- EN: `When a client says "we need a system like this", we ask "what for?". A client unwilling to answer isn't our client.`

---

### 4.10 FAQ — 6 items

1. UZ `Nega Discovery pullik?` / RU `Почему Discovery платный?` / EN `Why is Discovery paid?`
2. UZ `Discovery'siz narx ayta olasizmi?` / RU `Можете назвать цену без Discovery?` / EN `Can you quote without Discovery?` → answer: no, and why
3. UZ `Kod bizniki bo'ladimi?` / RU `Код будет нашим?` / EN `Do we own the code?` → yes, transferred on full payment, with docs
4. UZ `Loyiha qancha vaqt oladi?` / RU `Сколько длится проект?` / EN `How long does a project take?`
5. UZ `To'lov qanday amalga oshiriladi?` / RU `Как устроена оплата?` / EN `How does payment work?` → 30% / 50% / 20%
6. UZ `Topshirgandan keyin nima bo'ladi?` / RU `Что происходит после сдачи?` / EN `What happens after handover?` → 3-month warranty, support contract, SLA

---

### 4.11 FINAL CTA

**Headline**
- UZ: `Muammoingizni tushunishdan boshlaymiz`
- RU: `Начнём с понимания вашей проблемы`
- EN: `We start by understanding your problem`

**Body**
- UZ: `30 daqiqalik suhbat. Sotuv emas — savol. Biznesingizni tushunamiz va sizga mos kelamizmi yoki yo'qmi, ochiq aytamiz.`
- RU: `30 минут разговора. Не продажа — вопросы. Мы разберёмся в вашем бизнесе и честно скажем, подходим мы вам или нет.`
- EN: `A 30-minute conversation. Not a pitch — questions. We'll understand your business and tell you honestly whether we're a fit.`

**Form — four fields only**

| Field | UZ | RU | EN |
|---|---|---|---|
| name | `Ismingiz` | `Ваше имя` | `Your name` |
| company | `Kompaniya` | `Компания` | `Company` |
| phone | `Telefon` | `Телефон` | `Phone` |
| problem | `Muammoingiz bir jumlada` | `Ваша задача в одном предложении` | `Your problem in one sentence` |

Submit button: same label as the primary CTA.
Privacy note under the form:
- UZ: `Ma'lumotlaringiz uchinchi tomonga berilmaydi.` / RU: `Мы не передаём ваши данные третьим лицам.` / EN: `We don't share your data with third parties.`

Validation: inline, localized, `aria-describedby`. On success the form is replaced by a confirmation message.

---

### 4.12 FOOTER

Contains: logo and a one-line positioning statement · navigation · services · contact details (address, phone, email, Telegram). Bottom bar: `© 2026 PFC Technologies` · privacy link · language switcher repeat.

---

## 5. ACCESSIBILITY

- Semantic landmarks: `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`
- One `h1` per page (the hero headline); heading levels never skip
- Full keyboard operation; visible focus everywhere; logical tab order
- Skip-to-content link, localized
- Decorative graphics `aria-hidden="true"`; meaningful diagrams get `role="img"` + `<title>`
- Form fields have real `<label>` elements, not placeholders as labels
- Text/background pairs meet WCAG AA (4.5:1 body, 3:1 large text) in both light and dark
- `prefers-reduced-motion` honored

---

## 6. SEO & METADATA

- Per-locale `<title>` and `<meta description>`
- Open Graph + Twitter card, per-locale OG image (1200×630)
- `hreflang` for uz/ru/en + `x-default`
- JSON-LD `Organization` and `ProfessionalService`: name PFC Technologies, address Tashkent Uzbekistan, `areaServed` UZ, `knowsAbout` [ERP, business process automation, AI agents, system integration]
- `sitemap.xml` and `robots.txt` covering all three locales
- Canonical URL per locale

**Meta titles**
- UZ: `PFC Solutions — Biznes uchun boshqaruv tizimlari va AI yechimlari`
- RU: `PFC Solutions — Системы управления и ИИ-решения для бизнеса`
- EN: `PFC Solutions — Management systems and AI for operating businesses`

---

## 7. PERFORMANCE BUDGET

- Lighthouse ≥ 95 in all four categories
- LCP < 2.0s on a simulated 4G connection
- CLS < 0.05 · no layout shift on theme or language switch
- First-load JS < 150 KB gzipped
- Fonts self-hosted, `font-display: swap`, preloaded

---

## 8. ACCEPTANCE CRITERIA

The build is done only when **all** of these hold:

1. All three locales render every string; no hardcoded text anywhere in `components/`
2. Every section renders correctly in both light and dark
3. No flash of incorrect theme on first paint
4. Contrast passes AA in both themes on every text/background pair
5. Fully keyboard-navigable with a visible focus indicator throughout
6. Verified on mobile, tablet and desktop
7. Exactly one primary CTA repeats through the page — no competing calls to action
8. The "not a fit" column is present and unsoftened
9. No unverified numbers or invented client results appear anywhere
10. `prefers-reduced-motion` disables all reveal animations

---

## 9. HARD CONSTRAINTS — do not violate

- **Do not invent metrics.** No "300% growth", no "99.9% uptime", no client counts beyond the twelve named projects.
- **Do not use client logos** without permission. The milk producer is referred to only as *"a large dairy producer in Namangan"* — never by brand name.
- **Do not name a project price** anywhere. Only Discovery tier prices are public.
- **Do not add a live-chat widget, popup, exit-intent modal, or cookie-banner theatre.**
- **Do not soften the "not a fit" column.** It is doing deliberate work.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
