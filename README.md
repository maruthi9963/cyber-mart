# ⚡ CYBER<MART> — Next-Gen Quantum E-Commerce Platform

> A production-grade, unique e-commerce web application inspired by Amazon’s high-utility architecture, re-imagined with a **Cyber-Glass (frosted glassmorphism)** aesthetic, zero plagiarism, and modern frontend best practices. Built to showcase full-stack and frontend engineering skills on resumes and portfolio sites.

---

## 🚀 Key Highlights & Resume Value

| Dimension | Amazon Traditional UX | **CYBER<MART> Implementation** |
| :--- | :--- | :--- |
| **Aesthetic & Style** | Cluttered, 2010s boxy gray borders, heavy ad clutter | **Cyber-Glass**: Dark slate frosted glass (`backdrop-blur-xl`), luminous neon accents, and smooth micro-interactions |
| **Search Experience** | Full page redirects with latency | **Omnibar with Instant Autocomplete**: Real-time fuzzy dropdown with category prefixes and price previews |
| **Flash Deals** | Static discount badges | **Live Flash Deal Matrix**: Real-time ticker countdown clock (`HH : MM : SS`) with dynamic claimed inventory progress bar |
| **Catalog Browsing** | Boxy flat lists | **Asymmetric Bento Grid**: Rating stars, instant discount tags, stock counters, and 1-click `Quick Add` |
| **Cart Experience** | Page redirect to `/gp/cart` | **Slide-Out Frosted Glass Drawer**: Live free-shipping threshold tier meter, promo codes (`CYBER20`), and quantity controls |
| **Checkout Flow** | Multi-page reload checkout | **Interactive 3-Step Modal**: Simulated payment card, instant order ID dispatch, and confetti celebration |
| **State & Persistence** | Cookies / server sessions | **Zustand with LocalStorage Sync**: Cart, Wishlist, and Location persist across browser reloads |

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [React 18 / 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode with `verbatimModuleSyntax`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom glassmorphic blur filters, custom neon color palette, and bespoke glow shadows
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with `persist` middleware for LocalStorage synchronization
- **Icons**: [Lucide React](https://lucide.dev/)
- **FX / Delight**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for checkout celebrations
- **Typography**: Inter & JetBrains Mono

---

## 📦 Core Feature Modules

### 1. Unified Omnibar Search & Mega Navigation
- Instant predictive autocomplete dropdown with thumbnail previews and live department filters (`Audio`, `Wearables`, `Gaming`, `Laptops`, `Accessories`, `⚡ Flash Deals`).
- Delivery Location Selector modal calculating localized quantum transit times.
- Real-time Wishlist and Cart pill counters with notification badges.

### 2. Live Flash Deals & Urgency Engine
- Real-time countdown clock updating every second.
- Dynamic inventory progress bar (e.g., *82% claimed — Only 8 units left*).
- 1-click "Claim Deal Now" action directly syncing to cart.

### 3. Multi-Faceted Filter Engine
- Dynamic department switcher with live product count badges.
- Interactive price range slider ($0 – $2,500).
- Amazon-style Customer Review filters (4★ & Up, 4.5★ & Up).
- Priority 1-Day Delivery and In-Stock toggles.

### 4. Bento-Box Product Cards
- Frosted glass cards with neon border hover animations.
- Verified review count and star ratings.
- Quick View modal trigger with multi-image gallery switcher, detailed technical specifications table, and Amazon-style **"Frequently Bought Together"** bundle builder with a 15% discount.

### 5. Frosted Glass Cart Drawer
- Slide-out panel with animated backdrop blur.
- Dynamic **Free Express Delivery** threshold meter (*"Add $X more to unlock FREE Quantum Priority"*).
- Quantity modifiers (`+` / `-`) and instant item deletion.
- Promo discount validator (e.g. promo code `CYBER20` for 20% off).

### 6. Simulated Secure Checkout Modal
- Stepper: `Shipping Address` ➔ `Payment Simulation` ➔ `Order Dispatched`.
- Auto-generated Order ID, live delivery estimation, and confetti celebration.

---

## 💻 Getting Started Locally

```bash
# 1. Navigate to the project directory
cd C:\Users\marut\.gemini\antigravity\scratch\cyber-mart

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev
```

Open your browser at `http://localhost:5173` to interact with the store!

---

## 🚢 Building for Production & Portfolio Deployment

```bash
# Create an optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

### One-Click Deploy:
- **Vercel**: Import the GitHub repository, framework preset `Vite`, build command `npm run build`, output directory `dist`.
- **Netlify**: Set publish directory to `dist` and build command to `npm run build`.
