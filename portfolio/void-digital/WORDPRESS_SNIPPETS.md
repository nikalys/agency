# VOID DIGITAL – WordPress / Elementor / Astra Snippets

Use these in your Astra theme (Customize → Additional CSS) or in Elementor’s Custom CSS / Site Settings.

---

## 1. Global 2px black border (Brutalist grid)

Apply to all Elementor sections and columns so every block has a visible black border:

```css
/* VOID DIGITAL – Global Brutalist border (Elementor) */
.elementor-section,
.elementor-column > .elementor-element-populated,
.elementor-widget-wrap {
  border: 2px solid #000 !important;
  border-radius: 0 !important;
}

.elementor-container {
  border-radius: 0 !important;
}
```

On mobile, borders stack with the columns; no extra work needed if your columns are full-width when stacked.

---

## 2. Glitch effect on H1 (CSS only, on hover)

Give your hero H1 a class like `glitch-title` and add `data-text="Your Headline Here"` (same text as inside the tag). Then add:

```css
/* VOID DIGITAL – Glitch H1 (hover) */
.glitch-title {
  position: relative;
  display: inline-block;
}

.glitch-title::before,
.glitch-title::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.glitch-title:hover::before {
  animation: void-glitch-1 0.15s ease-in-out infinite;
  color: #39FF14;
  z-index: -2;
  clip-path: inset(35% 0 65% 0);
  transform: translate(-2px, 2px);
}

.glitch-title:hover::after {
  animation: void-glitch-2 0.2s ease-in-out infinite;
  color: #39FF14;
  z-index: -1;
  clip-path: inset(65% 0 35% 0);
  transform: translate(2px, -2px);
}

@keyframes void-glitch-1 {
  0% { transform: translate(-2px, 2px); }
  25% { transform: translate(2px, -2px); }
  50% { transform: translate(-2px, -2px); }
  75% { transform: translate(2px, 2px); }
  100% { transform: translate(-2px, 2px); }
}

@keyframes void-glitch-2 {
  0% { transform: translate(2px, -2px); }
  25% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, 2px); }
  75% { transform: translate(-2px, -2px); }
  100% { transform: translate(2px, -2px); }
}
```

**In Elementor:**  
- Add a Heading widget for the hero title.  
- In the HTML tag / Advanced, add class `glitch-title` and attribute `data-text="VOID DIGITAL"` (or whatever the headline text is).

---

## 3. System / code-editor font stack in Astra

**Option A – Additional CSS (recommended)**  
Astra → Customize → Additional CSS:

```css
/* VOID DIGITAL – Monospace / system font everywhere */
body,
.ast-body,
input,
textarea,
select,
button,
h1, h2, h3, h4, h5, h6,
.elementor-heading-title {
  font-family: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "Liberation Mono", monospace !important;
}
```

**Option B – Astra Typography**  
- Customize → Global → Typography.  
- Body: set Font Family to **Custom** (if available) and paste:  
  `ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace`  
- Headings: same stack so the whole site matches.

**Option C – Courier only**  
If you want a single fallback:  
`font-family: "Courier New", Courier, monospace !important;`

---

Last updated: 2026-01-29
