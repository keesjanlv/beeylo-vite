# Beeylo Technical Architecture Documentation

## Document Information
- **Version**: 1.0
- **Date**: December 2024
- **Author**: BMAD Architecture Team
- **Status**: Current Implementation Analysis

## Architecture Overview

Beeylo is built as a modern Single Page Application (SPA) with a React frontend communicating with a Laravel backend API. The architecture prioritizes performance, user experience, and scalability while maintaining a premium feel across all devices.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT TIER                              │
├─────────────────────────────────────────────────────────────┤
│  React 18 + TypeScript + Vite                              │
│  ├── Components (UI Layer)                                 │
│  ├── Pages (Route Components)                              │
│  ├── Contexts (State Management)                           │
│  ├── Services (API Communication)                          │
│  └── Assets (Images, Icons, Styles)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY                               │
├─────────────────────────────────────────────────────────────┤
│  Laravel API (api.beeylo.com)                              │
│  ├── Authentication & Authorization                        │
│  ├── Rate Limiting & Security                              │
│  ├── Request Validation                                    │
│  └── Response Formatting                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 APPLICATION TIER                            │
├─────────────────────────────────────────────────────────────┤
│  Laravel Application                                        │
│  ├── Waitlist Management                                   │
│  ├── Social Follow Tracking                                │
│  ├── Leaderboard System                                    │
│  ├── Referral Engine                                       │
│  ├── Email Integration (Brevo)                             │
│  └── OAuth Providers                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA TIER                                │
├─────────────────────────────────────────────────────────────┤
│  SQLite Database + Redis Cache                             │
│  ├── Users & Waitlist Data                                 │
│  ├── Referral Tracking                                     │
│  ├── Social Follow Status                                  │
│  ├── Leaderboard Rankings                                  │
│  └── Session Management                                    │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Technology Stack
- **Framework**: React 18.2+ with TypeScript 5.0+
- **Build Tool**: Vite 5.0+ for fast development and optimized builds
- **Styling**: CSS Modules with CSS Custom Properties
- **State Management**: React Context API + useReducer hooks
- **HTTP Client**: Native Fetch API with custom service layer
- **SEO**: React Helmet Async for dynamic meta tags

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── Sidebar.tsx      # Main navigation
│   ├── TopNavigation.tsx # Mobile navigation
│   ├── SEO.tsx          # SEO meta management
│   └── index.ts         # Component exports
├── pages/               # Route-level components
│   ├── HomePage.tsx     # Landing page with slides
│   ├── DashboardPage.tsx # User dashboard
│   ├── GiveawayPage.tsx # Competition interface
│   └── [other pages]
├── contexts/            # React Context providers
│   └── UserContext.tsx  # User state management
├── services/            # API communication layer
│   ├── api.ts          # Production API client
│   └── mockApi.ts      # Development mock data
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces
├── assets/             # Static assets
│   ├── images/         # Optimized images (WebP)
│   └── icons/          # SVG icons
└── App.tsx             # Main application component
```

### Component Architecture

#### Design Principles
1. **Composition over Inheritance**: Small, focused components
2. **Props Interface**: Strict TypeScript interfaces
3. **Single Responsibility**: Each component has one clear purpose
4. **Reusability**: Components designed for multiple contexts
5. **Performance**: Lazy loading and memoization where appropriate

#### Key Components

##### Sidebar Navigation
```typescript
interface SidebarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  isLoggedIn: boolean
}
```
- Responsive design (desktop sidebar, mobile hidden)
- Active state management
- Conditional rendering based on auth status

##### Page Components
```typescript
interface PageProps {
  onTabChange?: (tab: TabType) => void
  userData?: UserData
  onBack?: () => void
}
```
- Consistent interface across all pages
- Navigation callback for inter-page communication
- Optional user data for personalization

### State Management

#### UserContext Pattern
```typescript
interface UserContextType {
  isLoggedIn: boolean
  userData: UserData | null
  login: (email: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}
```

**Benefits**:
- Centralized user state
- Automatic persistence to localStorage
- Type-safe state updates
- Loading and error state management

#### Local State Strategy
- Component-level state for UI interactions
- Form state managed locally with controlled components
- Global state only for cross-component data

### Routing & Navigation

#### SPA Routing Strategy
- Client-side routing via state management
- No external router dependency
- Tab-based navigation system
- Deep linking support via URL parameters

#### Navigation Flow
```typescript
type TabType = 
  | 'home' | 'dashboard' | 'benefits' | 'giveaway'
  | 'how-it-works' | 'actions' | 'leaderboard'
  | 'personal-settings' | 'about' | 'faq'
  | 'learn-more' | 'thank-you' | 'menu' | 'feedback'
```

**Navigation Rules**:
- Unauthenticated users redirected to home with email highlight
- Authenticated users auto-navigate to thank-you page
- Protected routes require authentication
- Smooth transitions between all pages

## Backend Integration

### API Architecture

#### Base Configuration
```typescript
const API_BASE_URL = 'https://api.beeylo.com/api'
const ENDPOINTS = {
  WAITLIST_REGISTER: '/waitlist/register',
  WAITLIST_STATUS: '/waitlist/status',
  LEADERBOARD: '/leaderboard',
  SOCIAL_FOLLOW: '/social-follow',
  PLATFORMS: '/social-follow/platforms'
}
```

#### Request/Response Pattern
```typescript
interface APIResponse<T> {
  success: boolean
  message: string
  data: T
}
```

### Data Models

#### User Data Structure
```typescript
interface UserData {
  user_id: number
  email: string
  position: number
  estimated_position: string
  referral_code: string
  referral_url: string
  referral_count: number
  total_users: number
  points_system: {
    total_points: number
    social_follow_points: number
    referral_points: number
    early_access_eligible: boolean
    points_needed_for_early_access: number
  }
  leaderboard_rank: number
  security_score: number
}
```

#### Social Platform Integration
```typescript
interface SocialPlatform {
  follow_url: string
  oauth_url: string
  display_name: string
  icon: string
  points: number
  oauth_available: boolean
}
```

## Performance Architecture

### Frontend Optimization

#### Build Optimization
- **Vite Configuration**: Optimized for production builds
- **Code Splitting**: Lazy loading for non-critical components
- **Asset Optimization**: WebP images, SVG icons, minified CSS
- **Bundle Analysis**: Regular bundle size monitoring

#### Runtime Performance
- **React Optimization**: useMemo, useCallback for expensive operations
- **Image Loading**: Lazy loading with intersection observer
- **Animation Performance**: CSS transforms and GPU acceleration
- **Memory Management**: Proper cleanup of event listeners

#### Caching Strategy
```typescript
// Service Worker for static asset caching
// API response caching for leaderboard data
// LocalStorage for user preferences and session data
```

### Backend Performance

#### Caching Layers
- **Redis Cache**: Session data, leaderboard rankings
- **Database Optimization**: Indexed queries, connection pooling
- **API Rate Limiting**: Prevent abuse and ensure stability

#### Monitoring & Analytics
- **Performance Metrics**: Response times, error rates
- **User Analytics**: Engagement tracking, conversion funnels
- **System Health**: Server monitoring, database performance

## Security Architecture

### Frontend Security

#### Data Protection
- **Input Validation**: Client-side validation with server-side verification
- **XSS Prevention**: Sanitized user inputs, CSP headers
- **CSRF Protection**: Token-based request validation
- **Secure Storage**: Sensitive data encrypted in localStorage

#### Authentication Flow
```typescript
// 1. User submits email
// 2. Server validates and creates session
// 3. Client receives user data and stores locally
// 4. Subsequent requests include session validation
// 5. Logout clears all local data
```

### API Security

#### Protection Mechanisms
- **Turnstile CAPTCHA**: Bot protection on registration
- **Rate Limiting**: Prevent API abuse
- **Input Sanitization**: SQL injection prevention
- **HTTPS Only**: Encrypted data transmission

#### OAuth Integration
- **Platform Authentication**: Secure social media verification
- **Token Management**: Secure storage and refresh handling
- **Scope Limitation**: Minimal required permissions

## Deployment Architecture

### Development Environment
```bash
# Local development server
npm run dev          # Vite dev server on localhost:5173
npm run build        # Production build
npm run preview      # Preview production build
```

### Production Environment
- **Frontend Hosting**: Static site deployment (Vercel/Netlify recommended)
- **API Server**: VPS hosting at 217.154.218.85
- **Domain Configuration**: 
  - Frontend: www.beeylo.com
  - API: api.beeylo.com
- **SSL Certificates**: Let's Encrypt for HTTPS

### CI/CD Pipeline
```yaml
# Recommended GitHub Actions workflow
Build → Test → Deploy to Staging → Deploy to Production
```

## Scalability Considerations

### Frontend Scalability
- **Component Library**: Reusable components for consistency
- **Micro-Frontend Ready**: Architecture supports future splitting
- **CDN Integration**: Global asset distribution
- **Progressive Loading**: Incremental feature loading

### Backend Scalability
- **Database Migration**: SQLite → PostgreSQL for scale
- **Caching Strategy**: Redis cluster for distributed caching
- **Load Balancing**: Multiple API server instances
- **Microservices**: Service separation for specific domains

## Monitoring & Observability

### Frontend Monitoring
- **Error Tracking**: Sentry or similar for error reporting
- **Performance Monitoring**: Web Vitals tracking
- **User Analytics**: Google Analytics or privacy-focused alternative
- **A/B Testing**: Feature flag system for experiments

### Backend Monitoring
- **API Monitoring**: Response time and error rate tracking
- **Database Monitoring**: Query performance and connection health
- **Server Monitoring**: CPU, memory, and disk usage
- **Log Aggregation**: Centralized logging for debugging

## Technical Debt & Improvements

### Current Technical Debt
1. **No Automated Testing**: Missing unit and integration tests
2. **Manual Deployment**: No CI/CD pipeline
3. **Limited Error Handling**: Basic error states
4. **No Performance Monitoring**: Missing observability tools

### Recommended Improvements
1. **Testing Strategy**: Jest + React Testing Library
2. **CI/CD Implementation**: GitHub Actions workflow
3. **Error Boundaries**: React error boundary components
4. **Performance Monitoring**: Lighthouse CI integration
5. **Type Safety**: Stricter TypeScript configuration
6. **Documentation**: Component documentation with Storybook

## Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration with React rules
- **Prettier**: Consistent code formatting
- **Naming Conventions**: PascalCase for components, camelCase for functions

### Git Workflow
```bash
main                    # Production-ready code
├── develop            # Integration branch
├── feature/[name]     # Feature development
├── hotfix/[name]      # Production fixes
└── release/[version]  # Release preparation
```

### Component Development
```typescript
// Component template
interface ComponentProps {
  // Props interface
}

export const Component: FC<ComponentProps> = ({ prop }) => {
  // Component implementation
}

// Export with proper typing
export type { ComponentProps }
```

---

**Next Steps**: This architecture documentation should be reviewed with the development team and updated based on specific requirements and constraints. Consider implementing the recommended improvements in priority order based on business impact.