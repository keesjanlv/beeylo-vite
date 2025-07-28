# Styling Guide

This guide provides a quick overview of how to approach styling in this project. The goal is to maintain a consistent and maintainable CSS architecture.

## File Structure

Our styles are organized into several files within the `src/styles` directory:

-   `tokens.css`: Contains all CSS custom properties (variables) for design tokens, such as colors, spacing, font sizes, and border radii. This is the single source of truth for all design values.
-   `layout.css`: Defines the main layout structure of the application, including the sidebar and top navigation, as well as container classes and responsive grid utilities.
-   `utilities.css`: Provides a set of low-level utility classes for common styling needs, such as margins, padding, flexbox, and typography. These are inspired by Tailwind CSS.
-   `components.css`: Contains styles for specific, reusable UI components like buttons, cards, inputs, and modals.
-   `index.css`: The main entry point that imports all other CSS files in the correct order.

## How to Style a New Page or Component

When you need to style a new page or component, please follow these steps:

1.  **Use Utility Classes First**: Before writing any new CSS, try to achieve the desired look using the utility classes available in `utilities.css`. This is the preferred method for most styling needs.

2.  **Use Design Tokens**: Always use the design tokens defined in `tokens.css` for colors, spacing, fonts, etc. For example, instead of `color: #000;`, use `color: var(--text-primary);`.

3.  **Add Component-Specific Styles**: If you cannot achieve the desired style with utility classes alone, add new component-specific styles to `components.css`. Make sure to use a clear and consistent naming convention for your classes (e.g., `.new-component-name`).

4.  **Update Design Tokens if Necessary**: If you need a new color, font size, or spacing value that will be reused across the application, add it to `tokens.css` as a new design token.

## Viewport-Aware Image and Container System

We have implemented a comprehensive system to ensure that images and containers always fit within the available viewport space, preventing content from overflowing or being cut off.

### Key Classes and Usage

**For Pages with Image Content:**
- Add `viewport-constrained` class to the `.page-content` element
- Use `.feature-card` class for cards containing images
- Use `.feature-content` for the main content container
- Use `.feature-text` for text sections
- Use `.feature-image` for image containers
- Use `.feature-img` class on images for automatic scaling

**Example Implementation:**
```tsx
<div className="page-container">
  <div className="page-content content-scrollable viewport-constrained">
    <div className="layout-scroll">
      <Container size="lg">
        <Card variant="outline" className="feature-card">
          <CardContent>
            <Stack spacing={6} className="feature-content">
              <Stack spacing={4} className="feature-text">
                {/* Text content here */}
              </Stack>
              <div className="feature-image">
                <img 
                  src={imageSrc} 
                  alt={altText} 
                  className="feature-img" 
                />
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </div>
  </div>
</div>
```

**Utility Image Classes:**
- `.img-responsive`: Basic responsive image (maintains aspect ratio)
- `.img-fit-container`: Scales to fit container while maintaining aspect ratio
- `.img-cover-container`: Fills container completely (may crop image)

### How It Works

#### Percentage-Based Viewport Layout

To eliminate scrolling issues on mobile devices with top navigation, we've implemented a percentage-based layout system:

1. **Top Navigation**: Takes exactly 7% of the viewport height
   - Defined by `--nav-height-mobile-pct: 7%`
   - Has minimum/maximum height constraints to maintain consistency

2. **Page Content**: Takes exactly 93% of the viewport height
   - Defined by `--content-height-mobile-pct: 93%`
   - Ensures content fills remaining space perfectly

3. **Fallback System**: Maintains traditional pixel-based calculations as fallbacks
   - `calc(100vh - var(--nav-height-mobile))` for browsers with limited support

#### Content Scaling

1. **Viewport Constraints**: The system calculates available space using percentage-based heights
2. **Flexible Layout**: Content uses flexbox to distribute space between text and images
3. **Image Scaling**: Images automatically scale using `object-fit: contain` to prevent overflow
4. **Responsive Behavior**: Different layouts for mobile (vertical) and desktop (horizontal)

### Applying to New Pages

#### For Viewport-Constrained Images

To apply this system to any page with images:
1. Add `viewport-constrained` class to `.page-content`
2. Structure your content using the `.feature-*` classes
3. Use `.feature-img` class on images that need to scale
4. Test on both mobile and desktop to ensure proper scaling

#### For Percentage-Based Viewport Layout

To ensure your page uses the percentage-based layout system:

1. **Basic Page Structure**:
```tsx
<div className="page-container">
  <div className="page-content content-scrollable">
    {/* Your page content here */}
  </div>
</div>
```

2. **For Pages with Fixed Content** (no scrolling):
```tsx
<div className="page-container">
  <div className="page-content content-fit-screen">
    {/* Content will be constrained to exactly fit available height */}
  </div>
</div>
```

3. **For Pages with Centered Content**:
```tsx
<div className="page-container">
  <div className="page-content content-scrollable">
    <div className="content-center-scroll">
      {/* Content will be centered vertically with scrolling if needed */}
      <Container size="xl">
        {/* Your centered content here */}
      </Container>
    </div>
  </div>
</div>
```

### Vertical Centering Utilities

We've implemented a set of utility classes specifically for vertical centering that can be applied to any page:

1. **Basic Vertical Centering**:
   - `.content-center`: Centers content vertically with minimum height of 100%
   - Best for fixed-height content that needs to be centered

2. **Vertical Centering with Scrolling**:
   - `.content-center-scroll`: Centers content vertically but allows scrolling if content overflows
   - Perfect for pages like the Thank You page where content should be centered but might need scrolling on smaller screens

3. **Fixed Vertical Centering**:
   - `.content-center-fixed`: Centers content vertically with strict height constraint and no overflow
   - Use when content must stay within viewport without scrolling

**Example Implementation (Thank You Page)**:
```tsx
<div className="page-container">
  <div className="page-content content-scrollable">
    <div className="content-center-scroll">
      <Container size="xl">
        <Stack spacing={6} className="thank-you-content items-center text-center">
          {/* Cards and content here */}
        </Stack>
      </Container>
    </div>
  </div>
</div>
```

4. **Testing**: Always test on both mobile and desktop breakpoints to ensure:
   - No unwanted scrolling on mobile (top navigation + content = 100vh)
   - Content fits properly within available space
   - Images scale correctly without overflow

By following these guidelines, we can ensure that our codebase remains clean, consistent, and easy to maintain.
