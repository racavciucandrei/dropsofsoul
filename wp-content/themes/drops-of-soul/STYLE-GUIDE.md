
# Drops of Soul - Style Guide & Design Documentation

This document provides comprehensive design specifications, color codes, and animation details for the Drops of Soul theme.

## Table of Contents
- [Color Palette](#color-palette)
- [Typography](#typography)
- [CSS Variables](#css-variables)
- [Animations & Transitions](#animations--transitions)
- [UI Components](#ui-components)
- [Theme Modes](#theme-modes)

## Color Palette

### Light Mode Colors
| Element | HSL Value | Hex Approximation | Usage |
|---------|-----------|-------------------|-------|
| Background | `hsl(30, 25%, 98%)` | `#fefcf8` | Main page background |
| Foreground | `hsl(30, 10%, 15%)` | `#2b2719` | General text color |
| Card | `hsl(0, 0%, 100%)` | `#ffffff` | Card backgrounds |
| Primary | `hsl(30, 95%, 35%)` | `#d97706` | Buttons, accents, branding |
| Primary Foreground | `hsl(30, 10%, 98%)` | `#faf9f6` | Text on primary elements |
| Secondary | `hsl(12, 75%, 95%)` | `#fef3c7` | Secondary UI elements |
| Secondary Foreground | `hsl(20, 30%, 20%)` | `#4d3319` | Text on secondary elements |
| Muted | `hsl(30, 5%, 96%)` | `#f7f6f5` | Subdued UI elements |
| Muted Foreground | `hsl(30, 10%, 40%)` | `#73665a` | Subdued text elements |
| Accent | `hsl(340, 50%, 30%)` | `#8b1951` | Highlighting, emphasis |
| Accent Foreground | `hsl(0, 0%, 100%)` | `#ffffff` | Text on accent elements |
| Border | `hsl(30, 10%, 90%)` | `#e8e4e0` | Borders, dividers |
| Input | `hsl(30, 10%, 90%)` | `#e8e4e0` | Form input backgrounds |
| Ring | `hsl(30, 95%, 35%)` | `#d97706` | Focus rings |

### Dark Mode Colors
| Element | HSL Value | Hex Approximation | Usage |
|---------|-----------|-------------------|-------|
| Background | `hsl(30, 15%, 10%)` | `#231f1a` | Main page background |
| Foreground | `hsl(30, 10%, 95%)` | `#f5f2f0` | General text color |
| Card | `hsl(30, 15%, 12%)` | `#28231e` | Card backgrounds |
| Primary | `hsl(30, 95%, 40%)` | `#f59e0b` | Buttons, accents, branding |
| Secondary | `hsl(12, 30%, 15%)` | `#3d261f` | Secondary UI elements |
| Muted | `hsl(30, 15%, 20%)` | `#423831` | Subdued UI elements |
| Accent | `hsl(340, 50%, 35%)` | `#a22161` | Highlighting, emphasis |

### "Lights Off" Mode Colors
| Element | HSL Value | Hex Approximation | Usage |
|---------|-----------|-------------------|-------|
| Background | `hsl(30, 15%, 5%)` | `#19140f` | Main page background |
| Foreground | `hsl(30, 10%, 95%)` | `#f5f2f0` | General text color |
| Card | `hsl(30, 15%, 7%)` | `#1e1912` | Card backgrounds |
| Primary | `hsl(30, 95%, 40%)` | `#f59e0b` | Buttons, accents, branding |
| Secondary | `hsl(12, 30%, 10%)` | `#291a15` | Secondary UI elements |
| Muted | `hsl(30, 15%, 15%)` | `#332b25` | Subdued UI elements |

## Typography

### Font Families
The theme uses a combination of serif and sans-serif typefaces for contrast and readability:

```css
/* Import statement in index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');
```

| Element | Font Family | Font Weights | Usage |
|---------|-------------|--------------|-------|
| Headings | 'Playfair Display', serif | 400, 500, 600, 700 | All headings (h1-h6) |
| Body | 'Inter', sans-serif | 300, 400, 500, 600, 700 | General text, paragraphs, buttons |

### Tailwind CSS Configuration
Font families are configured in Tailwind:

```js
// In tailwind.config.ts
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  serif: ['Playfair Display', 'serif'],
},
```

### Usage in Components

```html
<!-- Heading example -->
<h2 className="font-serif text-3xl font-semibold">Artisanal Cocktail Ingredients</h2>

<!-- Body text example -->
<p className="font-sans text-base text-foreground/80">Craft the perfect cocktail with our bitters and shrubs.</p>
```

## CSS Variables

### Root Variables
These variables control the theme's appearance and are defined in `src/index.css`:

```css
:root {
  --background: 30 25% 98%;
  --foreground: 30 10% 15%;
  --card: 0 0% 100%;
  --card-foreground: 30 10% 15%;
  --popover: 0 0% 100%;
  --popover-foreground: 30 10% 15%;
  --primary: 30 95% 35%;
  --primary-foreground: 30 10% 98%;
  --secondary: 12 75% 95%;
  --secondary-foreground: 20 30% 20%;
  --muted: 30 5% 96%;
  --muted-foreground: 30 10% 40%;
  --accent: 340 50% 30%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 30 10% 90%;
  --input: 30 10% 90%;
  --ring: 30 95% 35%;
  --radius: 0.5rem;
  /* Sidebar-specific variables also defined */
}
```

### Custom Utility Classes

```css
/* Container with max-width and consistent padding */
.container-custom {
  @apply w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Animated link underline effect */
.link-underline {
  @apply relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full;
}

/* Button hover/press effect */
.button-effect {
  @apply relative overflow-hidden transition-all duration-300 before:absolute before:inset-0 before:z-0 before:opacity-0 before:transition-opacity hover:before:opacity-10 active:scale-[0.98];
}

/* Image fade-in animation */
.image-fade-in {
  @apply opacity-0 transition-opacity duration-500;
}
.image-fade-in.loaded {
  @apply opacity-100;
}
```

### Border Radius
The theme uses consistent border radius across components:

```css
--radius: 0.5rem; /* Base radius value */

/* Usage in components via Tailwind */
rounded-md /* Default for most elements */
rounded-full /* For circular elements like avatars */
rounded-lg /* For larger components */
```

## Animations & Transitions

### Light Switch Effects

The signature light switch effect includes:

- Ultra-fast toggle animation: `transition-duration: 5ms !important`
- Content visibility transitions:
  ```css
  .lights-off .content-visibility {
    opacity: 0.05;
    filter: blur(2px);
    transition: opacity 0.5s ease, filter 0.5s ease;
  }
  ```
- Company name glow in dark mode:
  ```css
  .lights-off .company-name {
    text-shadow: 0 0 15px rgba(255, 191, 36, 0.9), 0 0 25px rgba(255, 150, 0, 0.7);
    color: rgba(255, 191, 36, 0.9);
    transition: text-shadow 0.5s ease, color 0.5s ease;
    opacity: 1 !important;
    filter: none !important;
  }
  ```

### Keyframe Animations

| Animation | Description | Usage |
|-----------|-------------|-------|
| `accordion-down` | Expand accordion content | In Accordion components |
| `accordion-up` | Collapse accordion content | In Accordion components |
| `fade-in` | Fade and slide up elements | Content reveal |
| `fade-out` | Fade and slide down elements | Content hide |
| `scale-in` | Scale and fade in | Modals, popovers |
| `scale-out` | Scale and fade out | Modals, popovers |
| `slide-in-right` | Slide in from right edge | Drawers, sidebars |
| `slide-out-right` | Slide out to right edge | Drawers, sidebars |
| `pullString` | Vertical bobbing motion | UI interaction feedback |
| `sway` | Slight horizontal movement | Contact tab hover |
| `shimmer` | Loading state gradient animation | Skeleton loaders |

### Product Card Hover Effects

```css
.product-card {
  @apply transition-all duration-500;
}

.product-card:hover .product-image {
  @apply scale-105;
}

.product-image {
  @apply transition-transform duration-700;
}
```

### Page Transitions

```css
.page-transition-enter {
  @apply opacity-0;
}

.page-transition-enter-active {
  @apply opacity-100 transition-opacity duration-300;
}

.page-transition-exit {
  @apply opacity-100;
}

.page-transition-exit-active {
  @apply opacity-0 transition-opacity duration-300;
}
```

## UI Components

### Buttons
The theme includes several button variants:

- Default: Primary color, white text, hover darkens
- Destructive: Red background for destructive actions
- Outline: Transparent with border, hover fills
- Secondary: Softer background color
- Ghost: Transparent, hover shows light background
- Link: Underline text style

### Cards

Cards use subtle shadows and borders:

```css
.card {
  @apply bg-card text-card-foreground rounded-lg border border-border shadow-sm;
}
```

### Modals & Dialogs

Modal components include backdrop blur and centered positioning:

```css
.modal-backdrop {
  @apply fixed inset-0 z-50 bg-black/80 backdrop-blur-sm;
}

.modal-content {
  @apply fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg;
}
```

## Theme Modes

### Light Mode (Default)
The default light appearance with warm off-white backgrounds and dark text.

### Dark Mode
Activated by adding `.dark` class to the root element. Creates a warm dark theme with amber accents.

### "Lights Off" Mode
A special ultra-dark mode activated by the light switch component, providing dramatic constrast with spotlight effects.

```css
.lights-off {
  --background: 30 15% 5%;
  --foreground: 30 10% 95%;
  /* Additional variables for the darkest theme mode */
}
```

---

## Implementation Notes

- All color values are implemented using HSL values in CSS variables
- Transitions use consistent timing functions (primarily ease, ease-in-out)
- Shadow usage is minimal and consistent throughout
- Responsive design principles applied to all components
- Animation timings balanced for smoothness without being distracting

---

## WordPress Integration

For WordPress theme integration, these styles are packaged into the theme's stylesheet with appropriate namespacing to avoid conflicts.

```php
// In functions.php
function drops_of_soul_enqueue_scripts() {
    wp_enqueue_style('drops-of-soul-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'drops_of_soul_enqueue_scripts');
```
