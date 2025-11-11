# Design Guidelines: Web Application Diagnostic Dashboard

## Design Approach
**Reference-Based:** Inspired by Google PageSpeed Insights and GTmetrix diagnostic interfaces - clean, data-focused layouts with clear visual hierarchy and actionable insights presentation.

## Color System (User-Specified)
- Primary: #4285F4 (Google blue) - CTAs, links, active states
- Secondary: #34A853 (success green) - positive results, checkmarks
- Warning: #FBBC04 (amber) - needs attention indicators
- Error: #EA4335 (red) - critical issues, errors
- Background: #F8F9FA (light grey) - page background
- Text: #202124 (dark grey) - primary text
- White (#FFFFFF) - card backgrounds, clean surfaces

## Typography
**Fonts:** Google Sans for headings, Roboto for body (via Google Fonts)
- H1: 32px, font-weight 500, line-height 1.2
- H2: 24px, font-weight 500, line-height 1.3
- H3: 20px, font-weight 500, line-height 1.4
- Body: 16px, font-weight 400, line-height 1.6
- Small/Meta: 14px, font-weight 400
- Buttons: 14px, font-weight 500, uppercase tracking

## Layout System
**Spacing Units:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 for consistent rhythm
- Section padding: py-12 to py-20
- Card padding: p-6 to p-8
- Element gaps: gap-4 to gap-8
- Container: max-w-7xl with mx-auto

## Component Library

### Navigation Header
- Sticky top navigation with logo left, primary actions right
- Height: h-16, background white with subtle shadow
- Logo + app name, nav links (Dashboard, Tools, History, Settings)
- "Run Analysis" CTA button prominent in header

### Dashboard Layout
- **Main Analysis Section:** Full-width hero card with input field for URL/data
- Large input with "Analyze" button, shows progress indicator during API calls
- **Results Grid:** 3-column layout (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- Status cards with icon, metric, and score (0-100 scale with color coding)

### Analysis Cards
- White background with rounded corners (rounded-lg)
- Shadow: shadow-md on hover, shadow-sm default
- Header with icon + title, score badge in top-right
- Body with metrics list, recommendations section
- Footer with "View Details" link

### Tabbed Sections
- Horizontal tabs below main results
- Active tab: bottom border (3px) in primary color
- Tab content: p-8, min-height to prevent layout shift
- Tabs: Performance, SEO, Accessibility, Best Practices

### Status Indicators
- **Score Circles:** Circular progress (0-49 red, 50-89 amber, 90-100 green)
- **Metric Rows:** Icon + label + value + trend indicator
- **Pass/Fail Badges:** Rounded pills with icon, colored backgrounds (10% opacity)

### Progress Indicators
- Linear progress bar during API calls (indeterminate animation)
- Skeleton loaders for card content while fetching
- Toast notifications for success/error states (top-right corner)

### Action Buttons
- Primary: Solid primary color, white text, px-6 py-3
- Secondary: Border primary color, primary text, px-6 py-3
- Ghost: Text-only with hover background
- Blurred backgrounds when over images (backdrop-blur-sm bg-white/20)

### Data Visualization
- **Bar Charts:** Horizontal bars for metric comparisons (colored by status)
- **Lists:** Expandable accordion items for detailed recommendations
- **Timeline:** Vertical timeline for analysis history with timestamps

### Forms & Inputs
- Input height: h-12
- Border: 2px, rounded-md, focus ring in primary color
- Label above input, helper text below
- Error states: red border + error message text

### Footer
- Multi-column layout (4 columns on desktop)
- Quick links, documentation, API status, contact
- Copyright + social links at bottom
- Background slightly darker than page (#F1F3F4)

## Images
**Hero Analysis Section:** Optional background pattern/gradient (subtle, not distracting)
**No large hero image** - this is a tool-focused application prioritizing functionality

## Responsive Behavior
- Desktop (lg): 3-column grids, full dashboard layout
- Tablet (md): 2-column grids, condensed navigation
- Mobile: Single column, stack all elements, collapsible sections

## Interaction Patterns
- Instant feedback on input validation
- Loading states for all async operations
- Expandable/collapsible sections for detailed data
- Tooltips on hover for metric explanations
- Copy-to-clipboard functionality for shareable results

## Key Principles
1. **Data-First:** Analysis results are the hero, minimize decorative elements
2. **Clarity:** Use color coding consistently for status indication
3. **Actionability:** Every metric includes next steps/recommendations
4. **Speed:** Show progress, minimize wait perception with loaders
5. **Scanability:** Card-based layout enables quick overview of results