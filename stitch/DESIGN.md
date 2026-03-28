# Design System Specification: Editorial Authority & Trusted Landscapes

## 1. Overview & Creative North Star: "The Sovereign Archive"
This design system is built to reflect the prestige and stability of a high-level Moroccan land management and legal firm. We are moving away from the "generic corporate portal" and toward an **Editorial Authority** aesthetic. 

The Creative North Star is **"The Sovereign Archive."** Imagine a digital space that feels like a private legal library—heavy with history but light with modern precision. We achieve this through "The Golden Ratio of Negative Space": using expansive margins and intentional asymmetry to let the typography breathe, creating a sense of calm reassurance and absolute discretion. 

### Signature Design Principles:
*   **Intentional Asymmetry:** Overlap images and text containers by 20-30px to break the rigid grid and create a custom, "bespoke" feel.
*   **The Breath of Discretion:** Use the upper end of our spacing scale (Scale 16, 20, 24) for section margins to signal luxury.
*   **Depth through Tonal Layering:** No hard lines. No harsh borders. Only shifts in light and texture.

---

## 2. Color Architecture
Our palette is rooted in the deep blues of institutional trust and the sun-bleached golds of the Moroccan landscape.

### Palette Strategy
*   **Primary (`#001430` to `#002855`):** Reserved for high-level navigation and primary calls to action. It represents the "Ink of the Law."
*   **Tertiary/Gold Accents (`#f5a623` / `tertiary_fixed_dim`):** Used sparingly as a "Guidance Light." Never for large backgrounds; only for critical focus points, such as active states or legal signatures.
*   **Surface Hierarchy:** We utilize `surface_container` tiers to create depth without borders.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to separate sections. Transition from `surface` to `surface_container_low` to define content blocks. A visual boundary should be felt through color shifts, not seen through lines.

### Signature Textures & Gradients
To add "soul," apply a subtle linear gradient to Hero backgrounds:
`Linear-Gradient(135deg, #001430 0%, #002855 100%)`. This prevents the "flat-template" look and adds a premium sheen.

---

## 3. Typography: The Voice of Counsel
We pair the historical weight of **Noto Serif** with the modern clarity of **Inter**.

*   **Display & Headlines (Noto Serif):** Used for key messaging. This typeface carries the "Sovereign" tone. Use `display-lg` for hero statements with a negative letter-spacing of `-0.02em` to increase authority.
*   **Body & Titles (Inter):** High legibility for legal documents and advisory text. Use `body-lg` (1rem) for general reading to ensure accessibility for all client demographics.
*   **Hierarchy as Narrative:** Every page must start with a `display` heading, followed by a wide `body-lg` paragraph. This editorial lead-in mimics a premium legal brief.

---

## 4. Elevation & Depth: The Layering Principle
We reject the standard "Material" shadow in favor of **Ambient Tonal Layering**.

### Tonal Stacking
Instead of shadows, stack containers:
1.  **Base Layer:** `surface` (#f9f9fb)
2.  **Section Layer:** `surface_container_low` (#f3f3f5)
3.  **Actionable Card:** `surface_container_lowest` (#ffffff)

### Ambient Shadows
Where floating elements (like Modals or Floating Action Buttons) are required, use a "Tinted Ambient Shadow":
*   **Blur:** 40px to 60px.
*   **Opacity:** 4% - 6%.
*   **Color:** Use `primary` (#001430) as the shadow color rather than pure black. This creates a natural, atmospheric lift.

### The "Ghost Border" Fallback
If an element requires a boundary for accessibility (e.g., a text input), use a **Ghost Border**: `outline_variant` at **15% opacity**.

---

## 5. Components: Refined Interaction

### Buttons: The "Seal of Approval"
*   **Primary:** `primary_container` background, `on_primary` text. Shape: `md` (0.75rem). Transition: Subtle scale up (1.02x) on hover.
*   **Secondary:** `surface_container_highest` background. No border.
*   **Tertiary:** Text-only in `primary`, using a `tertiary_fixed_dim` (Gold) underline of 2px for focus.

### Cards: The "Bespoke Portfolio"
*   **Construction:** Use `xl` (1.5rem) corner radius for a "soft luxury" feel. 
*   **Rule:** Forbid divider lines within cards. Separate header and body text using `spacing-5` (1.7rem) of vertical whitespace.
*   **Glassmorphism:** For overlays on imagery, use `surface_container_lowest` with 70% opacity and a `backdrop-blur` of 12px.

### Input Fields: "Discreet Entry"
*   **Style:** Minimalist. No background color. Only a bottom border of `outline_variant` at 20% opacity. Upon focus, the bottom border transitions to `tertiary_fixed_dim` (Gold).

### Signature Component: The "Legal Milestone Map"
A custom vertical progress tracker for land management cases. Use `primary` for completed steps and a pulsing `tertiary` (Gold) dot for the "Current Status." Background tracks should be `surface_container_high`.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** embrace extreme white space. If you think there is enough space, add 20% more.
*   **Do** use `notoSerif` for numbers in data visualizations to make them feel like "Official Records."
*   **Do** use the `lg` (1rem) and `xl` (1.5rem) rounding scales to soften the "serious" nature of the content.

### Don’t:
*   **Don't** use pure black (#000000). Use `primary` (#001430) for maximum depth.
*   **Don't** use standard "Success Green." Use a muted version or rely on the `primary` blue to indicate completion to maintain the serious tone.
*   **Don't** use "Drop Shadows." Use Tonal Layering first, and Ambient Shadows only when necessary.
*   **Don't** use icons that are too "playful" or "bubbly." Use thin-stroke, sharp-cornered icons to maintain professional rigor.