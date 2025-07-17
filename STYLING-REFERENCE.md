# Beeylo Styling Reference Guide

## 📁 **Overzicht van de CSS Structuur**

Dit document beschrijft de complete styling architectuur van het Beeylo project, inclusief de nieuwe 3D card implementatie en alle styling conventies.

## 🗂️ **Folder Structuur**

```
src/styles/
├── base/                    # Basis styling en variabelen
├── components/              # Component-specifieke styling
├── layout/                  # Layout en grid systemen
├── pages/                   # Pagina-specifieke styling
└── utility.css             # Utility classes
```

## 📋 **Belangrijkste Bestanden**

### **Basis Styling**
- `src/index.css` - **HOOFDBESTAND** - Importeert alle andere CSS bestanden in de juiste volgorde
- `src/App.css` - Legacy styling (wordt geleidelijk uitgefaseerd)

### **Design System**
- `src/styles/base/design-system.css` - CSS variabelen, kleuren, spacing, typography
- `src/styles/base/reset.css` - CSS reset en normalisatie

### **Component Styling**
- `src/styles/components/card-3d.css` - **NIEUWE 3D CARDS** - Alle card varianten en animaties
- `src/styles/components/page-cards.css` - Pagina-specifieke card styling
- `src/styles/components/navigation.css` - Navigatie styling
- `src/styles/components/buttons.css` - Button styling
- `src/styles/components/forms.css` - Form styling

### **Layout**
- `src/styles/layout/grid.css` - Grid systemen
- `src/styles/layout/responsive.css` - Responsive breakpoints

### **Pagina Styling**
- `src/styles/pages/faq.css` - FAQ pagina (gebruikt nieuwe cards)
- `src/styles/pages/homepage.css` - Homepage styling
- `src/styles/pages/benefits.css` - Benefits pagina styling

## 🎨 **3D Card Systeem**

### **Componenten**
Locatie: `src/components/Card3D.tsx`

#### **Card3D Component**
```tsx
<Card3D variant="default|elevated|subtle" interactive={boolean}>
  {children}
</Card3D>
```

**Varianten:**
- `default` - Standaard card met subtiele 3D effecten
- `elevated` - Verhoogde card met meer shadow
- `subtle` - Minimale styling voor subtiele content

**Props:**
- `variant` - Visuele variant van de card
- `interactive` - Voegt hover animaties toe
- `className` - Extra CSS classes

#### **Gespecialiseerde Cards**
- `TaskRow` - Voor taak lijsten
- `TaskCard` - Voor taak containers
- `IntegrationCard` - Voor integratie displays

### **Styling Bestanden**
- `src/styles/components/card-3d.css` - Basis card styling
- `src/styles/components/page-cards.css` - Pagina-specifieke card aanpassingen

### **Belangrijke CSS Classes**
```css
.card-3d                    /* Basis card styling */
.card-3d-default           /* Standaard variant */
.card-3d-elevated          /* Verhoogde variant */
.card-3d-subtle           /* Subtiele variant */
.card-3d-interactive      /* Interactieve states */
```

## 🎯 **Design System Variabelen**

Locatie: `src/styles/base/design-system.css`

### **Kleuren**
```css
--color-primary: #007bff;
--color-secondary: #6c757d;
--color-success: #28a745;
--color-danger: #dc3545;
--color-warning: #ffc107;
--color-info: #17a2b8;

/* Background colors */
--bg-primary: #ffffff;
--bg-secondary: #f8f9fa;
--bg-dark: #1a1a1a;

/* Text colors */
--text-primary: #212529;
--text-secondary: #6c757d;
--text-muted: #868e96;
```

### **Spacing**
```css
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-xxl: 3rem;      /* 48px */
```

### **Typography**
```css
--font-family-primary: 'Inter', sans-serif;
--font-family-secondary: 'Roboto', sans-serif;

--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-md: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
--font-size-xxl: 1.5rem;
```

### **Shadows & Effects**
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

--border-radius-sm: 0.25rem;
--border-radius-md: 0.5rem;
--border-radius-lg: 0.75rem;
--border-radius-xl: 1rem;
```

## 📱 **Responsive Design**

### **Breakpoints**
```css
/* Mobile First Approach */
@media (min-width: 576px) { /* Small devices */ }
@media (min-width: 768px) { /* Medium devices */ }
@media (min-width: 992px) { /* Large devices */ }
@media (min-width: 1200px) { /* Extra large devices */ }
```

### **Grid System**
Locatie: `src/styles/layout/grid.css`

```css
.container { /* Responsive container */ }
.row { /* Flex row */ }
.col { /* Flex column */ }
.grid-2 { /* 2 column grid */ }
.grid-3 { /* 3 column grid */ }
```

## 🔧 **Implementatie Voorbeelden**

### **FAQ Pagina met Cards**
```tsx
// src/pages/FAQPage.tsx
import { Card3D } from '../components/Card3D'

<Card3D variant="default" interactive>
  <button onClick={toggleFAQ}>
    {question}
  </button>
  {isOpen && <div>{answer}</div>}
</Card3D>
```

### **Homepage met Cards**
```tsx
// src/pages/HomePage.tsx
<Card3D variant="default" className="homepage-hero-card">
  <h1>Title</h1>
</Card3D>

<Card3D variant="elevated" className="homepage-form-card">
  <form>...</form>
</Card3D>
```

### **Benefits Pagina met Cards**
```tsx
// src/pages/BenefitsPage.tsx
<Card3D variant="default" className="feature-text-card">
  <div className="feature-text">...</div>
</Card3D>

<Card3D variant="elevated" className="feature-image-card">
  <div className="feature-image">...</div>
</Card3D>
```

## 🎨 **Styling Conventies**

### **CSS Naming Convention**
- **BEM Methodology**: `.block__element--modifier`
- **Component prefix**: `.card-3d`, `.nav-`, `.btn-`
- **State classes**: `.active`, `.open`, `.disabled`
- **Utility classes**: `.text-center`, `.mb-lg`, `.d-flex`

### **CSS Organisatie**
1. **Imports** - Andere CSS bestanden
2. **Variables** - CSS custom properties
3. **Base styles** - Element selectors
4. **Components** - Class-based styling
5. **Utilities** - Helper classes
6. **Media queries** - Responsive styling

### **Framer Motion Integratie**
```tsx
// 3D Cards gebruiken Framer Motion voor animaties
import { motion } from 'framer-motion'

const cardVariants = {
  default: { scale: 1, rotateY: 0 },
  hover: { scale: 1.02, rotateY: 2 }
}
```

## 📋 **Import Volgorde in index.css**

```css
/* 1. Reset & Base */
@import './styles/base/reset.css';
@import './styles/base/design-system.css';

/* 2. Layout */
@import './styles/layout/grid.css';
@import './styles/layout/responsive.css';

/* 3. Components */
@import './styles/components/card-3d.css';
@import './styles/components/page-cards.css';
@import './styles/components/buttons.css';
@import './styles/components/forms.css';
@import './styles/components/navigation.css';

/* 4. Pages */
@import './styles/pages/homepage.css';
@import './styles/pages/faq.css';
@import './styles/pages/benefits.css';

/* 5. Utilities */
@import './styles/utility.css';

/* 6. Legacy (wordt uitgefaseerd) */
@import './App.css';
```

## 🚀 **Toekomstige Uitbreidingen**

### **Geplande Verbeteringen**
1. **Dark Mode Support** - Uitgebreide dark mode variabelen
2. **Animation Library** - Meer Framer Motion presets
3. **Component Library** - Uitgebreide component set
4. **Theme System** - Meerdere kleurthema's

### **Best Practices**
1. **Mobile First** - Altijd beginnen met mobile styling
2. **CSS Variables** - Gebruik design system variabelen
3. **Component Isolation** - Elke component heeft eigen CSS bestand
4. **Performance** - Minimale CSS, geen onnodige selectors
5. **Accessibility** - Focus states, contrast ratios, semantic HTML

## 🔍 **Debugging & Troubleshooting**

### **Veelvoorkomende Problemen**
1. **Duplicate CSS** - Check voor dubbele definities in App.css
2. **Import Order** - Zorg voor juiste volgorde in index.css
3. **Specificity** - Gebruik !important spaarzaam
4. **Mobile Issues** - Test altijd op verschillende schermgroottes

### **Development Tools**
- **Browser DevTools** - Inspect element styling
- **CSS Grid Inspector** - Voor layout debugging
- **Lighthouse** - Performance en accessibility checks

---

**Laatste Update:** December 2024  
**Versie:** 2.0 (Met 3D Cards)  
**Maintainer:** Development Team