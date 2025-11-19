# Project Structure Documentation

## 📁 Complete Folder Structure

```
src/
├── App.tsx                          # Main application component with routing
├── index.css                        # Global styles
├── main.tsx                         # Application entry point
├── vite-env.d.ts                    # Vite type definitions
│
├── assets/                          # Static assets (images, icons, etc.)
│
├── components/                      # Global reusable components
│   ├── layout/
│   │   ├── Navbar/
│   │   │   └── index.tsx           # Main navigation component
│   │   └── Footer/
│   │       └── index.tsx           # Footer with links and branding
│   │
│   ├── ui/                         # UI building blocks
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── Loader/
│   │
│   ├── shared/                     # Shared components
│   │   ├── ProfileDropdown/
│   │   │   └── index.tsx          # User profile dropdown menu
│   │   └── SearchBar/
│   │       └── index.tsx
│   │
│   └── forms/                      # Form-related components
│       └── ProjectPostingWizard/
│           └── index.tsx          # Multi-step project posting form
│
├── pages/                          # Page components (each has own folder)
│   ├── LandingPage/               # Home page
│   │   ├── index.tsx              # Main landing page component
│   │   └── components/            # Landing page-specific components
│   │       ├── HeroSection.tsx
│   │       ├── SearchSection.tsx
│   │       ├── TrustedBySection.tsx
│   │       ├── PlatformStatsSection.tsx
│   │       ├── ProblemSection.tsx
│   │       ├── SolutionSection.tsx
│   │       ├── HowItWorksSection.tsx
│   │       ├── WhyChooseUsSection.tsx
│   │       ├── SuccessStoriesSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       ├── CTASection.tsx
│   │       └── SearchResultsSection.tsx
│   │
│   ├── Auth/                      # Authentication pages
│   │   ├── LoginPage/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   └── SignupPage/
│   │       ├── index.tsx
│   │       └── components/
│   │
│   ├── Dashboard/                 # Dashboard pages
│   │   ├── Client/
│   │   │   ├── index.tsx         # Client dashboard
│   │   │   └── components/
│   │   │       ├── DashboardOverview.tsx
│   │   │       ├── OverviewCards.tsx
│   │   │       ├── ActiveProjectsList.tsx
│   │   │       ├── RecentBids.tsx
│   │   │       └── StatsGraph.tsx
│   │   │
│   │   ├── Researcher/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │
│   │   └── Admin/
│   │       ├── index.tsx         # Admin dashboard
│   │       └── components/
│   │           ├── UserStats.tsx
│   │           ├── ManageProjects.tsx
│   │           ├── ManageUsers.tsx
│   │           └── PlatformAnalytics.tsx
│   │
│   ├── AboutPage/
│   │   ├── index.tsx
│   │   └── components/
│   │
│   ├── BlogPage/
│   │   ├── index.tsx
│   │   └── components/
│   │
│   ├── PricingPage/
│   │   ├── index.tsx
│   │   └── components/
│   │
│   ├── BiddingPage/
│   │   ├── index.tsx
│   │   └── components/
│   │
│   ├── MessagingPage/
│   │   ├── index.tsx
│   │   └── components/
│   │
│   ├── EscrowPaymentPage/
│   │   ├── index.tsx
│   │   └── components/
│   │
│   └── VerificationCertificationPage/
│       ├── index.tsx
│       └── components/
│
├── hooks/                         # Custom React hooks
│   ├── useAuth.ts
│   ├── useFetch.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
│
├── utils/                         # Utility functions
│   ├── api.ts
│   ├── formatDate.ts
│   ├── validations.ts
│   ├── constants.ts              # App-wide constants and data
│   └── helpers.ts
│
├── services/                      # API service layers
│   ├── authService.ts
│   ├── projectService.ts
│   ├── userService.ts
│   ├── paymentService.ts
│   └── messageService.ts
│
├── context/                       # React Context providers
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── NotificationContext.tsx
│
└── types/                         # TypeScript type definitions
    └── index.ts                  # Shared types and interfaces
```

## 🎯 Key Principles

### 1. **Component Organization**
- **Global components** (`src/components/`) - Reusable across the entire app
- **Page-specific components** (`src/pages/[PageName]/components/`) - Used only within that page
- Each component in its own folder with an `index.tsx` file

### 2. **Page Structure**
- Each page has its own dedicated folder under `src/pages/`
- Page components are exported from `index.tsx`
- Related components stay in the page's `components/` subfolder

### 3. **Import Paths**
```tsx
// Global components
import Footer from '../../components/layout/Footer';
import { PrimaryButton } from '../../components/ui/Button';

// Page components
import HeroSection from './components/HeroSection';

// Utils and hooks
import { formatDate } from '../../utils/formatDate';
import { useDebounce } from '../../hooks/useDebounce';

// Types
import type { PageType, Freelancer } from '../../types';

// Constants
import { PLATFORM_STATS, TESTIMONIALS } from '../../utils/constants';
```

## 📦 What's Been Refactored

### ✅ Landing Page
- **Before**: 988 lines in a single file
- **After**: Split into 13 focused components:
  - HeroSection
  - SearchSection
  - TrustedBySection
  - PlatformStatsSection
  - ProblemSection
  - SolutionSection
  - HowItWorksSection
  - WhyChooseUsSection
  - SuccessStoriesSection
  - TestimonialsSection
  - CTASection
  - SearchResultsSection
  - Footer (global component)

### ✅ Auth Pages
- Moved to `src/pages/Auth/`
- LoginPage → `Auth/LoginPage/index.tsx`
- SignupPage → `Auth/SignupPage/index.tsx`

### ✅ Dashboard Pages
- Grouped under `src/pages/Dashboard/`
- ClientDashboard → `Dashboard/Client/index.tsx`
- AdminDashboard → `Dashboard/Admin/index.tsx`

### ✅ Other Pages
- Each page now has its own folder with `index.tsx`
- Ready for component extraction as features grow

### ✅ Shared Resources
- **Types**: All TypeScript interfaces in `src/types/index.ts`
- **Constants**: Static data in `src/utils/constants.ts`
- **Utilities**: Helper functions organized by purpose
- **Hooks**: Custom React hooks for common patterns

## 🚀 Benefits

1. **Better Code Organization**: Easy to find and update specific features
2. **Improved Maintainability**: Smaller, focused components are easier to test and debug
3. **Enhanced Reusability**: Clear separation between global and page-specific components
4. **Scalability**: Easy to add new pages and features
5. **Team Collaboration**: Multiple developers can work on different sections simultaneously
6. **Performance**: Enables code splitting and lazy loading

## 📝 Next Steps

To continue improving the structure:

1. **Extract more UI components** from existing pages (buttons, cards, badges)
2. **Create API services** for backend communication
3. **Add proper routing** using React Router
4. **Implement state management** if needed (Context API or Redux)
5. **Add unit tests** for individual components
6. **Create Storybook** for component documentation

## 🔧 Development Guidelines

### Adding a New Page
```bash
1. Create folder: src/pages/NewPage/
2. Create index.tsx in that folder
3. Create components/ subfolder for page-specific components
4. Import in App.tsx and add to routing
```

### Adding a New Component
```bash
1. Decide if it's global or page-specific
2. Create appropriate folder structure
3. Export from index.tsx
4. Add TypeScript types if needed
```

### Adding Utilities
```bash
1. Create in src/utils/ with descriptive name
2. Export individual functions
3. Add TypeScript types
4. Import where needed
```

## 📚 File Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.tsx`, `PrimaryButton.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `validations.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useDebounce.ts`)
- **Types**: camelCase (e.g., `index.ts` in types folder)
- **Constants**: SCREAMING_SNAKE_CASE in files (e.g., `PLATFORM_STATS`)
