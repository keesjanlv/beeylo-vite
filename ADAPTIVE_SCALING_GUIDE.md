# Adaptive Scaling System Documentation

## Overview
The adaptive scaling system automatically scales page content to fit any viewport size, eliminating scrolling on constrained screens while maintaining design integrity and readability.

## Implementation Steps

### Step 1: Update Page Component Structure
Replace the scrollable layout with adaptive layout:

```tsx
// BEFORE
<div className="page-container smart-container">
  <div className="page-content content-scrollable">
    <div className="content-center-scroll adaptive-content">

// AFTER  
<div className="page-container smart-container">
  <div className="page-content layout-fit [page-name]-adaptive">
    <div className="content-center-scroll adaptive-content">
```

**Key Changes:**
- Replace `content-scrollable` with `layout-fit`
- Add `[page-name]-adaptive` class (e.g., `home-adaptive`, `waitlist-adaptive`, `about-adaptive`)

### Step 2: Add Base Adaptive Class to CSS
Add the adaptive class definition in `src/styles/adaptive-scaling.css`:

```css
.[page-name]-adaptive {
  --page-scale: var(--scale-factor);
  transform: scale(var(--page-scale));
  transform-origin: center center;
  /* Override any overflow when scaling is active */
  overflow: hidden !important;
  max-height: 100vh;
  max-height: calc(100 * var(--vh));
  /* Center content vertically when scaled */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

### Step 3: Add Smart Container Integration
Update the smart container rules to include the new adaptive class:

```css
.smart-container:has(.waitlist-adaptive),
.smart-container:has(.home-adaptive),
.smart-container:has(.giveaway-adaptive),
.smart-container:has(.[page-name]-adaptive) {
  overflow: hidden !important;
  height: 100vh;
  height: calc(100 * var(--vh));
}
```

### Step 4: Add Responsive Scaling Rules
Add progressive scaling rules for different viewport constraints:

```css
/* Standard scaling progression */
@media (max-height: 700px) and (min-width: 1024px) {
  .[page-name]-adaptive {
    --page-scale: 0.9;
  }
}

@media (max-height: 600px) {
  .[page-name]-adaptive {
    --page-scale: 0.85;
  }
}

@media (max-height: 500px) {
  .[page-name]-adaptive {
    --page-scale: 0.8;
  }
}

/* Wide screen optimizations */
@media (min-aspect-ratio: 16/9) and (max-height: 600px) {
  .[page-name]-adaptive {
    --page-scale: 0.75;
  }
}

/* Ultra-wide screen optimizations */
@media (min-aspect-ratio: 2/1) and (max-height: 500px) {
  .[page-name]-adaptive {
    --page-scale: 0.65;
    overflow: hidden !important;
  }
}

@media (min-width: 1400px) and (max-height: 450px) {
  .[page-name]-adaptive {
    --page-scale: 0.6;
  }
}
```

### Step 5: Add Content-Specific Optimizations
Add scaling rules for page-specific elements:

```css
@media (max-height: 600px) {
  /* Scale specific elements */
  .[page-specific-element] {
    padding: calc(var(--space-3) * var(--spacing-scale));
  }
  
  /* Adjust spacing */
  .grid.gap-8 {
    gap: calc(var(--space-4) * var(--spacing-scale));
  }
}
```

## Technical Features

### Viewport Detection
- **Aspect ratio detection**: Identifies wide vs tall screens
- **Height constraints**: Detects when vertical space is limited
- **Device optimization**: Different strategies for mobile vs desktop

### Scaling Strategy
- **Progressive scaling**: Gradual reduction from 100% to 60% based on constraints
- **Content preservation**: Maintains readability with minimum font sizes
- **Smooth transitions**: CSS transitions for scaling changes

### Vertical Centering
- **Flexbox centering**: Uses `justify-content: center` and `align-items: center`
- **Transform origin**: Centers scaling from `center center`
- **Overflow prevention**: Eliminates scrolling with `overflow: hidden`

## Scaling Breakpoints

| Viewport Condition | Scale Factor | Use Case |
|-------------------|--------------|----------|
| Normal screens | 100% | Default state |
| Height < 700px (desktop) | 90% | Slightly constrained |
| Height < 600px | 85% | Moderately constrained |
| Height < 500px | 80% | Highly constrained |
| 16:9 + Height < 600px | 75% | Wide laptops |
| 2:1 + Height < 500px | 65% | Ultra-wide monitors |
| 1400px+ width + Height < 450px | 60% | Extreme cases |

## Pages with Adaptive Scaling
- ✅ HomePage (`home-adaptive`)
- ✅ GiveawayPage (`giveaway-adaptive`)
- ✅ WaitlistPage (`waitlist-adaptive`)
- ✅ AboutPage (`about-adaptive`)
- ✅ ThankYouPage (`thankyou-adaptive`)
- ✅ MenuPage (`menu-adaptive`)
- ✅ FAQPage (uses existing system)

## Benefits
- **No scrolling**: Content always fits viewport
- **Design integrity**: Maintains visual hierarchy
- **Accessibility**: Respects motion preferences
- **Performance**: CSS-only solution with hardware acceleration
- **Responsive**: Works across all devices and orientations