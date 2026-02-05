# Rails + Vite + React (Fast Refresh) on AWS

This repository documents a **production‑proven Rails + Vite + React setup with reliable Fast Refresh**, deployed on **AWS Elastic Beanstalk** and fronted by **CloudFront**.

The goal of this architecture is to:

- Keep Rails firmly in control of rendering and deployment
- Use Vite for a best‑in‑class modern frontend DX (HMR + Fast Refresh)
- Avoid fragile, implicit magic between Ruby and JavaScript
- Run cleanly in development *and* production without environment hacks

If you have ever seen React’s dreaded **“preamble not detected”** error and wondered why everything *looked* correct — this README explains exactly what was missing and why this setup works.

---

## Tech Stack

### Backend
- Ruby on Rails
- Ruby 3.3+
- Deployed on AWS Elastic Beanstalk

### Frontend
- Vite
- React
- `@vitejs/plugin-react-swc`

### Ruby / Rails Integration
- `vite_rails`
- `vite-plugin-rails`

> ⚠️ **Important:**
> `vite-plugin-ruby` is installed as a dependency but **not imported in `vite.config.ts`**. Its presence satisfies internal expectations of the ecosystem but does not participate directly in configuration.

---

## Why This Setup Works (The Short Version)

Fast Refresh requires **three things to agree**:

1. Vite must inject the React Fast Refresh *runtime preamble*
2. React must detect that preamble before any module executes
3. Rails must place the correct script tags **before application code**

Most broken setups fail at #3.

This repository works because:

- `vite_rails` owns the Rails ↔ Vite contract
- `vite_react_refresh_tag` injects the preamble at the correct time
- Vite handles HMR, React handles Fast Refresh, Rails stays out of the way

No guessing. No race conditions. No hidden globals.

---

## Development Setup

### Required Gems

```ruby
# Gemfile

gem "vite_rails"
```

### Required NPM Packages

```bash
npm install \
  vite \
  react react-dom \
  @vitejs/plugin-react-swc \
  vite-plugin-rails \
  vite-plugin-ruby
```

---

## Vite Configuration

```ts
// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import Rails from "vite-plugin-rails"

export default defineConfig({
  plugins: [
    Rails(),
    react(),
  ],
})
```

### Why this matters

- `vite-plugin-rails` wires entrypoints + manifests
- `@vitejs/plugin-react-swc` enables Fast Refresh
- **No Ruby plugin imports are required**

---

## Rails Layout Configuration

This is the single most important piece.

```erb
<!-- app/views/layouts/application.html.erb -->

<%= vite_client_tag %>
<%= vite_react_refresh_tag %>
<%= vite_javascript_tag "application" %>
```

### What these tags do

| Tag | Purpose |
|----|-------|
| `vite_client_tag` | Connects to Vite dev server |
| `vite_react_refresh_tag` | Injects React Fast Refresh preamble |
| `vite_javascript_tag` | Loads your application entrypoint |

Without `vite_react_refresh_tag`, React Fast Refresh **cannot work**, even if everything else is correct.

---

## Common Failure Mode Explained

### ❌ "React refresh preamble was not loaded"

This happens when:

- Vite runs correctly
- React plugin is enabled
- But Rails loads application JS **before** the preamble

Result: runtime crash, misleading error, endless frustration.

### ✅ Why this repo avoids it

- Preamble injected explicitly
- Ordering guaranteed by Rails helpers
- No reliance on undocumented side effects

---

## Production Build

In production:

```bash
bin/vite build
```

- Assets are compiled during deployment
- Served by the Rails app itself
- CloudFront caches responses in front of the load balancer

No live Vite server runs in production.

---

## AWS Architecture

### Components

- **GitHub Actions** – CI/CD pipeline
- **Elastic Beanstalk** – Application orchestration
- **Application Load Balancer** – Traffic distribution
- **EC2 (1–2 instances)** – Rails app servers
- **CloudFront** – CDN in front of ALB

### Architecture Diagram

```
┌──────────────┐
│   Developer  │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ GitHub Actions   │
│ (CI / Deploy)    │
└──────┬───────────┘
       │
       ▼
┌────────────────────────┐
│ Elastic Beanstalk      │
│                        │
│  ┌──────────────────┐ │
│  │ Load Balancer    │ │
│  └──────┬───────────┘ │
│         │             │
│  ┌───────────────┐   │
│  │ Rails App     │   │
│  │ EC2 Instance  │   │
│  └───────────────┘   │
│                        │
└──────────┬────────────┘
           │
           ▼
┌──────────────────┐
│ CloudFront CDN   │
└──────────────────┘
```

### Asset Strategy

- JavaScript & CSS served by Rails
- Cached at CloudFront
- No S3 asset bucket required

---

## Why This Approach

This setup favors:

- Explicit contracts over magic
- Fewer moving parts in production
- Excellent developer experience
- Predictable AWS costs

It avoids:

- Webpacker‑style abstraction leaks
- Mixed responsibility between Ruby and JS
- Fragile environment‑specific hacks

---

## Final Notes

This configuration has been battle‑tested after multiple failed attempts using partial or unofficial setups.

If you are:
- Using Rails
- Shipping React
- Wanting **real** Fast Refresh

This approach works — and more importantly, explains *why*.

---

**Questions, improvements, or battle stories welcome.**

