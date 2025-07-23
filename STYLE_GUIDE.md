# Beeylo UI Component & Styling Reference Guide

## 1. Component System Overview

The Beeylo application uses a modular component system with theme-aware UI primitives. These components follow consistent patterns and are designed to work with the application's theming system.

### Core UI Components

Located in: `src/components/ui/index.ts`

| Component | Description | Common Props |
|-----------|-------------|--------------|
| `Button` | Multi-variant button | `variant`: 'primary', 'secondary', 'ghost', 'outline'<br>`size`: 'sm', 'md', 'lg'<br>`disabled`, `loading` |
| `NumberedButton` | Numeric navigation button | `number`: number<br>`active`: boolean<br>`onClick`: function |
| `Input` | Form input field | `value`, `onChange`, `placeholder`<br>`disabled`, `readOnly` |
| `Card` | Container with consistent styling | `variant`: 'default', 'outline'<br>`className` |
| `CardContent` | Inner padding for Card | `className` |
| `Container` | Width-constrained wrapper | `size`: 'sm', 'md', 'lg', 'xl'<br>`className` |
| `Stack` | Flexbox layout with spacing | `spacing`: number (1-12)<br>`direction`: 'row', 'column'<br>`className` |

## 2. CSS Architecture

The CSS system is organized into modular files with specific purposes:

### Main CSS Files

- `src/styles/tokens.css`: Design tokens (colors, spacing, typography)
- `src/styles/layout.css`: Layout-specific styles
- `src/styles/components.css`: Component-specific styles
- `src/App.css`: Legacy styles (being gradually migrated)

### Theme System

The application uses CSS custom properties for theming with light and dark modes:

```css
:root {
  /* Base theme variables */
  --text-primary: #000;
  --text-secondary: #555;
  --surface: #fff;
  --surface-hover: #f5f5f5;
  --border: #ddd;
  --border-hover: #bbb;
  /* ... other variables */
}

.dark-theme {
  --text-primary: #fff;
  --text-secondary: #aaa;
  --surface: #121212;
  --surface-hover: #1e1e1e;
  --border: #333;
  --border-hover: #444;
  /* ... other variables */
}
```

## 3. Utility Classes

The application includes utility classes for common styling needs:

### Typography

- Text size: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`
- Font weight: `font-normal`, `font-medium`, `font-bold`
- Text color: `text-primary`, `text-secondary`, `text-accent`
- Text alignment: `text-left`, `text-center`, `text-right`

### Spacing

- Margin: `m-1` through `m-12`, `mx-auto`, `my-4`, etc.
- Padding: `p-1` through `p-12`, `px-4`, `py-2`, etc.
- Gap: `gap-1` through `gap-12`

### Layout

- Flex: `flex`, `flex-row`, `flex-col`, `items-center`, `justify-between`
- Width: `w-full`, `max-w-sm`, `max-w-md`, `max-w-lg`, `max-w-xl`

## 4. Page Structure Pattern

When refactoring or creating new pages, follow this structure:

```tsx
import { Container, Stack, Card, CardContent, Button } from '../components/ui'

export const ExamplePage: FC<ExamplePageProps> = ({ /* props */ }) => {
  return (
    <div className="page-content example-page">
      <Container size="lg">
        <Stack spacing={6}>
          {/* Page header */}
          <h1 className="text-3xl font-bold">Page Title</h1>
          
          {/* Main content */}
          <Card variant="outline">
            <CardContent>
              <Stack spacing={4}>
                {/* Content sections */}
              </Stack>
            </CardContent>
          </Card>
          
          {/* Additional sections */}
          <Card variant="outline">
            <CardContent>
              {/* More content */}
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </div>
  )
}
```

## 5. Responsive Design

- Mobile-first approach with breakpoints at 768px (tablet) and 1024px (desktop)
- Top navigation on mobile, sidebar on desktop
- Use utility classes for responsive adjustments: `md:flex-row`, `lg:max-w-xl`
- Viewport constraint: on breakpoints with top navigation, the top navigation + main-content should always equal one screen (100vh)

## 6. Accessibility Guidelines

- Use semantic HTML elements (`button` instead of `div` for clickable elements)
- Include proper ARIA attributes (`aria-label`, `aria-expanded`, etc.)
- Ensure keyboard navigation works with proper focus states
- Maintain sufficient color contrast for text readability

## 7. Implementation Examples

### Button Example
```tsx
<Button 
  variant="primary"
  size="md"
  onClick={handleAction}
  disabled={isLoading}
>
  Submit
</Button>
```

### Card with Content Example
```tsx
<Card variant="outline">
  <CardContent>
    <Stack spacing={4}>
      <h3 className="text-xl font-medium">Card Title</h3>
      <p className="text-secondary">Card description text goes here.</p>
      <Button variant="secondary">Learn More</Button>
    </Stack>
  </CardContent>
</Card>
```

### Layout Example
```tsx
<Container size="lg">
  <Stack spacing={6}>
    <h1 className="text-3xl font-bold">Page Title</h1>
    <div className="flex items-center gap-4">
      <div className="flex-1">Left content</div>
      <div className="flex-1">Right content</div>
    </div>
  </Stack>
</Container>
```

## 8. Migration Strategy

When refactoring legacy pages:
1. Add imports for new UI components
2. Replace legacy divs with appropriate UI components
3. Use utility classes for typography and spacing
4. Maintain existing functionality and event handlers
5. Test for theme consistency in both light and dark modes

## 9. Completed Refactoring

The following pages have been refactored to use the new UI component system:

- AboutPage
- BenefitsPage
- HowItWorksPage
- FeaturesPage
- ActionsPage
- FAQPage
- GiveawayPage
- ThankYouPage

## 10. Animation Standards

### Transitions

All interactive elements should use consistent transition timing:

```css
/* Standard transition for most elements */
transition: all 0.2s ease-in-out;

/* For hover effects */
transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;

/* For transform animations */
transition: transform 0.2s ease-in-out;
```

### Hover Effects

- **Buttons**: Background color change with subtle scale (1.02x) for primary actions
- **Cards**: Subtle shadow increase and border color change
- **Links**: Color change with underline animation
- **Icons**: Color change with slight scale (1.1x)

### Loading States

```tsx
// Button loading state
<Button loading={isLoading} disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>

// Skeleton loading for content
<div className="animate-pulse bg-surface-hover h-4 w-full rounded" />
```

## 11. Form Validation

### Error Handling

```tsx
// Input with error state
<Input
  value={email}
  onChange={setEmail}
  error={emailError}
  placeholder="Enter your email"
/>

// Error message styling
<p className="text-error text-sm mt-1">{emailError}</p>
```

### Validation States

- **Error**: Red border, red text, error icon
- **Success**: Green border, green text, checkmark icon
- **Warning**: Yellow border, yellow text, warning icon
- **Disabled**: Muted colors, no interaction

### Form Layout

```tsx
<Stack spacing={4}>
  <div className="form-field">
    <label className="form-label">Email</label>
    <Input type="email" required />
    <span className="form-error">Please enter a valid email</span>
  </div>
</Stack>
```

## 12. Icon System

### Available Icons

Icons are located in `src/components/Icons.tsx` and include:

- **Navigation**: HomeIcon, DashboardIcon, MenuIcon, ThreeDotsIcon
- **Features**: FeaturesIcon, AboutIcon, GiveawayIcon, ActionsIcon
- **Social**: InstagramIcon, TikTokIcon, TwitterIcon, LinkedinIcon
- **UI**: SettingsIcon, LeaderboardIcon

### Icon Usage

```tsx
import { HomeIcon, InstagramIcon } from '../components/Icons'

// Standard icon usage
<HomeIcon />

// Icon with custom styling
<div className="text-primary hover:text-accent transition-colors">
  <InstagramIcon />
</div>
```

### Icon Guidelines

- All icons are 20x20px by default
- Use `currentColor` for stroke to inherit text color
- Icons should be semantic and consistent with the overall design
- Use `stroke-width="2"` for consistency

## 13. Image Handling

### Responsive Images

```tsx
// Standard responsive image
<img 
  src={imageSrc} 
  alt="Descriptive alt text"
  className="w-full h-auto object-cover rounded-lg"
/>

// Image with aspect ratio
<div className="aspect-video w-full overflow-hidden rounded-lg">
  <img 
    src={imageSrc} 
    alt="Descriptive alt text"
    className="w-full h-full object-cover"
  />
</div>
```

### Image Optimization

- Use WebP format when possible
- Provide multiple sizes for different screen densities
- Always include descriptive alt text for accessibility
- Use lazy loading for images below the fold

### Image Variants

- **Hero Images**: Full width, aspect-video (16:9)
- **Feature Images**: Square or 4:3 aspect ratio
- **Avatars**: Circular, consistent sizing (32px, 48px, 64px)
- **Thumbnails**: Square, small sizes (64px, 96px, 128px)

## 14. Complex Components

### Navigation Components

```tsx
// Sidebar navigation (desktop)
<nav className="sidebar">
  <Stack spacing={2}>
    {navItems.map(item => (
      <Button 
        key={item.id}
        variant={activeTab === item.id ? 'primary' : 'ghost'}
        onClick={() => setActiveTab(item.id)}
        className="w-full justify-start"
      >
        <item.icon />
        {item.label}
      </Button>
    ))}
  </Stack>
</nav>

// Top navigation (mobile)
<nav className="top-nav">
  <div className="flex overflow-x-auto">
    {navItems.map(item => (
      <button 
        key={item.id}
        className={`top-nav-tab ${activeTab === item.id ? 'active' : ''}`}
        onClick={() => setActiveTab(item.id)}
      >
        {item.label}
      </button>
    ))}
  </div>
</nav>
```

### Modal/Dialog Pattern

```tsx
// Modal wrapper
<div className="modal-overlay" onClick={onClose}>
  <Card className="modal-content" onClick={e => e.stopPropagation()}>
    <CardContent>
      <Stack spacing={4}>
        <h2 className="text-xl font-bold">Modal Title</h2>
        <p className="text-secondary">Modal content goes here</p>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onConfirm}>Confirm</Button>
        </div>
      </Stack>
    </CardContent>
  </Card>
</div>
```

### Numbered Navigation

```tsx
// For multi-step processes
<div className="numbered-nav">
  {steps.map((step, index) => (
    <NumberedButton
      key={index}
      number={index + 1}
      active={currentStep === index}
      onClick={() => setCurrentStep(index)}
    />
  ))}
</div>
```

## 15. State Management Integration

### Context Usage

```tsx
// Using UserContext in components
const { userData, isLoading, error } = useUser()

// Conditional rendering based on state
{userData ? (
  <Card variant="outline">
    <CardContent>
      <p>Welcome, {userData.name}!</p>
    </CardContent>
  </Card>
) : (
  <Card variant="outline">
    <CardContent>
      <p className="text-secondary">Please log in to continue</p>
      <Button variant="primary" onClick={handleLogin}>
        Log In
      </Button>
    </CardContent>
  </Card>
)}
```

### Loading States

```tsx
// Component-level loading
if (isLoading) {
  return (
    <Container size="lg">
      <Stack spacing={4}>
        <div className="animate-pulse bg-surface-hover h-8 w-48 rounded" />
        <div className="animate-pulse bg-surface-hover h-32 w-full rounded" />
      </Stack>
    </Container>
  )
}

// Error states
if (error) {
  return (
    <Card variant="outline" className="border-error">
      <CardContent>
        <p className="text-error">Error: {error.message}</p>
        <Button variant="secondary" onClick={retry}>
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Form State Management

```tsx
// Form with validation state
const [formData, setFormData] = useState({ email: '', password: '' })
const [errors, setErrors] = useState({})
const [isSubmitting, setIsSubmitting] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  try {
    await submitForm(formData)
    // Handle success
  } catch (error) {
    setErrors(error.fieldErrors)
  } finally {
    setIsSubmitting(false)
  }
}
```

## 16. Performance Guidelines

### Component Optimization

- Use `React.memo()` for components that receive stable props
- Implement proper key props for list items
- Avoid inline object/function creation in render
- Use `useMemo()` and `useCallback()` for expensive calculations

### CSS Performance

- Minimize CSS bundle size by removing unused styles
- Use CSS custom properties for dynamic theming
- Prefer CSS transforms over changing layout properties
- Use `will-change` property sparingly for animations

## 17. Testing Guidelines

### Component Testing

```tsx
// Test component rendering
test('renders button with correct variant', () => {
  render(<Button variant="primary">Click me</Button>)
  const button = screen.getByRole('button')
  expect(button).toHaveClass('btn-primary')
})

// Test user interactions
test('calls onClick when button is clicked', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

## 18. Known Issues

The legacy.css file (moved from App.css) has syntax errors around line 4285 - likely unclosed braces or malformed CSS rules. These should be addressed as part of the ongoing CSS refactoring.
