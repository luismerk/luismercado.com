# Rails + Vite + React Fast Refresh — How & Why This Finally Works

This document explains **what was broken**, **what pieces are actually required**, and **why this specific combination works**, after a *lot* of false starts and contradictory guidance.

If you ever have to revisit this setup (or explain it to Future You), this is the mental model that matters.

---

## The Core Problem

Rails + Vite + React has **three separate responsibilities** that *must* line up:

1. **Rails ↔ Vite integration** (HTML helpers, dev server proxying, entrypoints)
2. **Vite ↔ React integration** (JSX transform + Fast Refresh runtime)
3. **Runtime wiring** (where assets are requested from, and who owns the dev server)

Most guides accidentally mix **two incompatible integration strategies**, which is why things kept breaking in non-obvious ways.

---

## The Two Mutually Exclusive Worlds

### ❌ World A: “Pure Vite” (Node-only)
- Vite serves `/@vite/client`
- Vite controls entrypoints
- Rails is just a backend

This works **only** if you do *not* use `vite_rails` helpers.

---

### ❌ World B: “Rails-aware Vite without React runtime”
- Rails knows about Vite entrypoints
- Assets resolve correctly
- **React Fast Refresh breaks** because the runtime is missing

This is where the infamous **"preamble error"** comes from.

---

### ✅ World C (The One That Works): Rails-aware Vite **with React runtime injected correctly**

This setup accepts one truth:

> **Rails must remain aware of Vite, AND React Fast Refresh must be explicitly wired in.**

That requires *both Ruby gems and Vite plugins*, even though that feels redundant.

---

## Why `vite_rails` Must Exist

The `vite_rails` gem is **not optional** if you want:

- `vite_javascript_tag`
- `vite_react_refresh_tag`
- `/vite-dev/*` routing in development
- Correct entrypoint resolution

Without it:
- Rails looks for files that Vite never serves
- URLs like `/vite-dev/entrypoints/application.jsx` 404

`vite_rails` owns:
- Entry point mapping
- Rails helpers
- Dev vs build behavior

---

## Why the React Preamble Error Happened

The error:

> React Refresh preamble was not loaded before the app

Means exactly this:

- JSX was transformed
- React HMR runtime was **not injected early enough**

Causes:
- Using `@vitejs/plugin-react` **without** Rails injecting the refresh runtime
- Or using the wrong JSX runtime (`classic` vs `automatic`)
- Or missing the Rails-side helper entirely

React Fast Refresh is **not automatic in Rails**.

---

## The Final, Working Stack (And Why Each Piece Exists)

### Ruby Gems

```ruby
gem 'vite_rails'
```

**Why:**
- Rails ↔ Vite contract
- Provides `vite_react_refresh_tag`

---

### NPM Packages

```json
"vite": "^5.x",
"@vitejs/plugin-react-swc": "^3.x",
"vite-plugin-ruby": "^4.x",
"vite-plugin-rails": "^0.x"
```

#### Why each one exists:

- **vite** — the dev server
- **@vitejs/plugin-react-swc** — JSX + Fast Refresh (faster + fewer edge cases)
- **vite-plugin-ruby** — makes Vite understand Rails entrypoints
- **vite-plugin-rails** — bridges Rails helpers ↔ Vite runtime

Yes, this looks redundant.
No, it is not.

Each plugin solves a *different boundary*.

---

## The Correct `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import RubyPlugin from 'vite-plugin-ruby'
import RailsPlugin from 'vite-plugin-rails'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    RailsPlugin(),
    react(),
  ],
})
```

### Why this order matters

1. **RubyPlugin** — resolves Rails entrypoints
2. **RailsPlugin** — wires helpers + dev URLs
3. **React plugin last** — ensures preamble injection

Wrong order = preamble error.

---

## The Missing Piece Everyone Forgets: The Layout Tag

In your Rails layout:

```erb
<%= vite_react_refresh_tag %>
<%= vite_javascript_tag 'application' %>
```

### Why this is critical

- `vite_react_refresh_tag` injects the **React HMR runtime BEFORE your app code**
- Without it, Fast Refresh *cannot* work, no matter how perfect Vite is

This is the single most common failure point.

---

## Why Fast Refresh Now Works Reliably

Because now:

- Rails knows where Vite is
- Vite knows where Rails entrypoints are
- React runtime loads **before** application code
- JSX is compiled consistently via SWC
- Dev server URLs resolve correctly

Nothing is fighting anything else anymore.

---

## Mental Model to Keep Forever

> **Rails owns HTML and entrypoints**
> **Vite owns JS and HMR**
> **React Fast Refresh must be explicitly injected**

If any guide violates that model — it will break.

---

## Final Advice

Do **not** remove gems or plugins once this works unless you can answer:

- *Which boundary does this piece serve?*

If the answer is unclear, leave it.

This setup is correct, stable, and production-safe.

