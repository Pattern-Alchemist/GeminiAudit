# AstroKalki Design Guidelines

## Design Approach
**Reference-Based + Custom Brand Identity**: Drawing inspiration from mystical/spiritual platforms (Co-Star, The Pattern) combined with premium fintech polish (Stripe, Revolut) for the billing sections. The cosmic, otherworldly aesthetic is central to the brand experience.

## Core Design Principles
1. **Mystical Minimalism**: Clean interfaces with purposeful cosmic flourishes
2. **Trust Through Polish**: High-end visual treatment builds credibility for spiritual services
3. **Calculated Wonder**: Strategic use of animation for impact, not distraction
4. **Data as Art**: Present numerological scores and karma analysis as beautiful visualizations

---

## Typography System

**Primary Font**: Playfair Display (700-900 weight)
- Use for: Brand name, page headings, section titles, hero statements
- Creates elegant, mystical authority

**Secondary Font**: Inter (400-800 weight)
- Use for: Body text, UI labels, form inputs, data displays
- Ensures readability and modern professionalism

**Hierarchy**:
- Hero/H1: Playfair Display, 48-64px, weight 800
- Section Headers/H2: Playfair Display, 32-40px, weight 700
- Card Titles/H3: Inter, 20-24px, weight 700
- Body: Inter, 15px, weight 400-500
- UI Labels: Inter, 13-14px, weight 500

---

## Layout System

**Spacing Scale**: Tailwind units of **4, 8, 12, 16, 24, 32**
- Micro spacing (gaps, padding): 4, 8
- Component spacing: 12, 16
- Section spacing: 24, 32

**Container**: Max-width 1240px, horizontal padding 24px

**Grid Patterns**:
- Score displays: 3-column grid on desktop (flex-wrap on mobile)
- Feature cards: 2-column grid
- Forms: Single column, max-width 540px centered

---

## Component Library

### Navigation
- **Sticky header** with blur backdrop (backdrop-filter: blur(10px))
- Horizontal tab navigation showing current page in primary teal
- Pro badge (pill-shaped, gold accent) appears after payment verification
- Height: 56px

### Cards
- **Glass-morphism style**: Semi-transparent dark background (#121821)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 16px
- Box-shadow: 0 10px 30px rgba(0,0,0,0.35)
- Backdrop-filter: blur(12px)

### Score Rings (Karma DNA Display)
- **SVG circular progress** indicators
- Color-coded thresholds:
  - 70-100: Ritual Teal (#00C9A7)
  - 40-69: Starlight Gold (#FFD700)
  - 0-39: Warning Rose (#FF4F81)
- Ring thickness: 8px stroke
- Center displays numeric value (12-14px)
- Label below in muted text

### Buttons
- **Default**: Transparent with border, hover lifts 1px with shadow
- **Primary**: Teal tinted background (rgba(0,201,167,0.15))
- Border-radius: 12px
- Padding: 10px 14px
- Transition: transform + box-shadow + background (0.25s ease)

### Forms
- **Input fields**: Dark background (rgba(0,0,0,0.25))
- Border: 1px solid border color
- Border-radius: 8px
- Padding: 10px 12px
- Full-width within containers

### Modals
- **Dark overlay**: rgba(0,0,0,0.6)
- **Panel**: Surface color with border, max-width 540px
- Centered vertically and horizontally
- Border-radius: 16px

### Badges
- **Pill-shaped** (border-radius: 999px)
- Gold treatment for Pro: background rgba(255,215,0,0.12), border rgba(255,215,0,0.35)
- Padding: 4px 8px
- Font-size: 12px

---

## Special Effects

### Starfield Background (Hero Sections)
- **Dual radial gradients** creating nebula-like glow
- **Animated star field**: Repeating radial-gradient pattern
- Animation: Slow 60s infinite drift
- Border-radius: 24px for hero cards

### Gradient Accents
- **Aurora gradient**: linear-gradient(135deg, #00F0FF 0%, #FF00C8 100%)
- Use for: Gradient text effects, decorative borders
- Apply with background-clip: text for titles

### Toasts
- **Fixed bottom-center** positioning
- Appear with message, auto-dismiss after 2.6s
- Surface color with border and shadow
- Border-radius: 12px

---

## Page-Specific Layouts

### Home
- **Hero section** with starfield background, gradient headline
- Large value proposition statement (Playfair Display)
- CTA buttons for "Start Your Karma DNA" and "Explore Plans"

### Dashboard
- **Stats overview** grid (3-4 metrics)
- Quick access cards to Karma tools, upcoming consultations
- Recent activity feed

### Karma DNA
- **Form section**: Name, date, time, place inputs
- **Results display**: Three score rings side-by-side
- **Insights cards**: Core principle, Shadow pattern, Boundary rule
- **Action window** dates prominently displayed

### Radio
- **Zeno.FM embed**: 768px width × 300px height (responsive)
- Card container with subtle padding
- "Open in new tab" link below player

### Billing
- **Two-column layout** on desktop: UPI left, PayPal right
- UPI: Display number with copy button, "Submit Proof" CTA
- PayPal: External link button
- Pro plan benefits list with checkmarks

### Payment Proof Modal
- **UTR input field** (full-width)
- "Mark Paid & Unlock Pro" primary button
- Success: Toast notification + Pro badge appears in header

---

## Images

**Hero Section**: Use a cosmic/space-themed image (deep space, nebula, star clusters in purple/teal tones) as background for homepage hero. Apply dark overlay (rgba(11,15,20,0.7)) to ensure text readability.

**No other images required** - the application relies on iconography, score visualizations, and the embedded radio widget. Keep the design content-focused and data-driven.

---

## Animations

**Use sparingly**:
- Starfield drift (60s subtle movement)
- Button hover lift (1px translateY, 0.25s ease)
- Score ring draw-on (optional, 0.8s ease-out on mount)
- Toast fade in/out

**Avoid**: Page transitions, excessive micro-interactions, parallax scrolling

---

## Accessibility
- Maintain 4.5:1 contrast ratio (light text on dark backgrounds)
- Focus states: 2px teal outline on interactive elements
- Semantic HTML throughout (proper heading hierarchy)
- ARIA labels on score rings and form inputs