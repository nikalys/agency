# AXIS DENTAL & AESTHETICS — WordPress / Elementor Swiss-Style Setup

Use this for your real WordPress build on SiteGround. The static template in this folder is a visual reference only.

---

## 1. Elementor: Strict 12-Column Grid with Swiss Precision

**Goal:** Every section/container aligns to a 12-column grid with consistent column-gap and row-gap.

### Option A: Global grid (recommended)

1. **Elementor → Site Settings → Layout**
   - Set **Container width** to your max content width (e.g. `1200px` or `1400px`).
   - Set **Container padding** to match your “massive white space” (e.g. `100px` or `clamp(40px, 8vw, 100px)` for responsive).

2. **Use Elementor Containers (not legacy sections)**
   - Add a **Container** for each row.
   - Set the container to **Full width** or **Boxed** as needed.
   - Set **Columns gap** and **Rows gap** in the container’s **Layout** tab to one fixed value site-wide (e.g. `24px` or `32px`) so all grids share the same gap.

3. **12-column grid inside the container**
   - Add a **single Container** with **Direction: Row**.
   - Add **12 inner containers** as columns, each with **Width: 8.333%** (1/12) and **Flex grow: 0** so they don’t stretch.
   - Or use **CSS Grid** (see snippet below) for true 12-column behaviour.

### Option B: CSS Grid override (strict 12-col + gap)

Add this in **Elementor → Site Settings → Custom CSS** (or in Astra **Additional CSS**):

```css
/* Swiss grid: 12 columns, fixed gap. Apply to Elementor container that wraps homepage grid. */
.elementor-location-single .elementor-section .elementor-container,
.elementor-location-front_page .elementor-section .elementor-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;   /* or 32px for more air */
  row-gap: 32px;
  max-width: 1200px;   /* match your content width */
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(24px, 5vw, 100px);
  padding-right: clamp(24px, 5vw, 100px);
}

/* Child widgets/containers span columns as needed (e.g. 8 cols text, 4 cols image) */
.elementor-widget-wrap .elementor-element[data-col="8"] { grid-column: span 8; }
.elementor-widget-wrap .elementor-element[data-col="4"] { grid-column: span 4; }
```

Then in Elementor, give key widgets a **CSS Class** (e.g. `swiss-col-8` / `swiss-col-4`) and define:

```css
.swiss-col-8 { grid-column: span 8; }
.swiss-col-4 { grid-column: span 4; }
```

So: **one** container = 12 columns + one `column-gap` + one `row-gap` for Swiss consistency.

### Row-gap / column-gap summary

- Set **one** `column-gap` and **one** `row-gap` for the grid (e.g. `24px` / `32px`).
- Use the same values in every section that uses the grid so alignment is rigid and repeatable.

---

## 2. Minimalist Navigation — Vertical List, Top Right

**Goal:** Nav is a small, vertical list in the top-right corner.

Add this in **Astra → Customize → Additional CSS** (or Elementor Custom CSS):

```css
/* Minimalist nav: vertical list, top right, small type */
.ast-header-wrap .main-header-bar,
.elementor-location-header .elementor-section {
  padding-top: 40px;
  padding-bottom: 40px;
  padding-right: clamp(24px, 5vw, 100px);
}

/* If using a custom nav menu in a widget/section */
.swiss-nav-minimal {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.swiss-nav-minimal a {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #111;
  text-decoration: none;
}

.swiss-nav-minimal a:hover {
  text-decoration: underline;
}
```

**Structure in Elementor:**

1. Put the **header** section in a **Container** with **Direction: Row**, **Justify: space-between**, **Align: flex-start**.
2. Left: logo (or empty for asymmetry).
3. Right: **HTML widget** or **Nav Menu** widget. If Nav Menu, add **Menu** class `swiss-nav-minimal` in the widget’s **Advanced → CSS Classes** and style the menu (`.swiss-nav-minimal`) so its **list** is `display: flex; flex-direction: column; align-items: flex-end` (or use the snippet above on the theme’s menu wrapper and align the block to the right).

So: nav = small, vertical, top-right; headlines stay massive and left-aligned.

---

## 3. Swiss Font Stack for Astra

**Goal:** Clean sans-serif; prefer system fonts (San Francisco on Apple, Inter or similar elsewhere) for speed and readability.

In **Astra → Customize → Global → Typography**:

- **Body:**  
  Font family: **Custom** → paste this stack:
  ```text
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  ```
  Or, if you load **Inter** (e.g. Google Fonts):
  ```text
  "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  ```

- **Headings (H1–H4):**  
  Same family as body (or **Inter** first if you use it).  
  Weight: **300** or **400** for large headlines; **500** or **600** for subheads.  
  No italic for Swiss; keep letter-spacing tight or use a small value (e.g. `-0.02em` on big type).

**Performance:** Using only system fonts (`-apple-system`, `BlinkMacSystemFont`, etc.) avoids extra font files and helps stay under 1.5s load. If you add Inter, subset it (e.g. Latin only) and preload the main weight.

---

## Quick checklist

- [ ] One global **column-gap** and **row-gap** for all grid sections (e.g. 24px / 32px).
- [ ] Containers use **12-column** grid (Elementor columns or CSS Grid override).
- [ ] Nav: **vertical list, top right**, small uppercase type; no big horizontal bar.
- [ ] Typography: **Swiss stack** (system + Inter optional); headlines **massive**, **left-aligned**.
- [ ] No shadows, gradients, or textures; **100px+** padding where specified.
- [ ] Responsive: grid collapses logically (e.g. 12 → 6 → 1 column) and padding reduces on mobile (`clamp` or breakpoints).

Use the static template in this folder (`index.html` + `style.css`) as a visual reference for layout and spacing; implement the same structure in Elementor using the steps above.
