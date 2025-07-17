/* CSS Structuur Plan voor Beeylo */

/**
 * VOORGESTELDE CSS STRUCTUUR:
 * 
 * 1. styles/
 *    ├── base/
 *    │   ├── variables.css      - CSS custom properties (themes, colors)
 *    │   ├── reset.css          - CSS reset/normalize
 *    │   └── typography.css     - Font families, sizes, weights
 *    │
 *    ├── layout/
 *    │   ├── grid.css          - App grid system, responsive layout
 *    │   ├── sidebar.css       - Sidebar styling
 *    │   └── navigation.css    - Top navigation, mobile nav
 *    │
 *    ├── components/
 *    │   ├── buttons.css       - All button styles
 *    │   ├── cards.css         - Card components
 *    │   ├── forms.css         - Form elements, inputs
 *    │   ├── modals.css        - Modal overlays
 *    │   └── stats.css         - Statistics displays
 *    │
 *    ├── pages/
 *    │   ├── dashboard.css     - Dashboard specific styles
 *    │   ├── giveaway.css      - Giveaway page styles
 *    │   ├── faq.css           - FAQ page styles
 *    │   ├── benefits.css      - Benefits page styles
 *    │   └── thank-you.css     - Thank you page styles
 *    │
 *    └── utilities/
 *        ├── animations.css    - Keyframes, transitions
 *        ├── responsive.css    - Media queries, breakpoints
 *        └── utilities.css     - Helper classes
 * 
 * VOORDELEN:
 * - Modulair en onderhoudbaar
 * - Makkelijk te vinden en bewerken
 * - Betere performance (alleen laden wat nodig is)
 * - Minder merge conflicts
 * - Duidelijke scheiding van verantwoordelijkheden
 * 
 * IMPLEMENTATIE STAPPEN:
 * 1. Eerst duplicaten verwijderen uit huidige App.css
 * 2. Groeperen van gerelateerde CSS regels
 * 3. Geleidelijk splitsen in logische bestanden
 * 4. Import statements toevoegen aan main CSS
 */