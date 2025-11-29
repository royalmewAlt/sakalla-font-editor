# Font Showcase Website - Design Guidelines

## Design Approach
**System Selected**: Minimalist design system inspired by Google Fonts and typography showcases
**Rationale**: This utility-focused tool prioritizes clarity, readability, and showcasing typography itself. The interface should be clean and unobtrusive, letting the fonts be the star.

## Typography System

**Primary Font (UI)**: Inter or System UI stack
- Interface labels: 14px medium weight
- Input text: 16px regular
- Section headers: 20px semibold

**Display Fonts**: Curate 25-30 distinctive fonts including:
- Serif: Playfair Display, Merriweather, Lora
- Sans-serif: Poppins, Raleway, Montserrat, Work Sans
- Monospace: Space Mono, JetBrains Mono, Fira Code
- Display/Decorative: Righteous, Permanent Marker, Bebas Neue

**Font Display Sizes**:
- Random font showcase: 48px (mobile), 72px (desktop)
- Font menu grid items: 32px (mobile), 40px (desktop)

## Layout System

**Spacing Units**: Tailwind scale - primarily use 4, 6, 8, 12, 16, 24 units
**Container**: max-w-6xl centered with px-6 on mobile, px-8 on desktop

**Page Structure**:
1. Header (sticky): Logo/title + optional settings icon
2. Input Section: Prominent centered text input
3. Random Display: Large showcase area
4. Font Gallery: Grid of all fonts displaying user's text

**Grid System**:
- Font gallery: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Gap between items: gap-6 (mobile), gap-8 (desktop)

## Component Library

### Input Field
- Full-width with max-w-2xl constraint
- Height: h-14 (56px)
- Border: 2px solid with rounded-xl corners
- Placeholder: "Type your word here..."
- Large, legible text size (18px)
- Padding: px-6

### Random Font Display Card
- Prominent card with rounded-2xl corners
- Padding: py-16 px-8 (mobile), py-24 px-12 (desktop)
- Center-aligned text
- "Randomize" button below (w-40, h-12)
- Font name label above display (12px uppercase tracking-wide)

### Font Menu Grid Items
- Individual cards: rounded-xl with hover elevation
- Padding: py-8 px-6
- Each shows: font name (top, 11px uppercase) + user text (center) + "Copy" icon (top-right)
- Subtle border treatment
- Min-height: h-32 for consistency

### Buttons
- Primary (Randomize): rounded-lg, h-12, px-8, medium weight
- Icon buttons (Copy): w-8 h-8, rounded-md
- No hover states needed (component handles)

### Icons
**Library**: Heroicons (via CDN)
- Refresh/shuffle icon for randomize
- Copy icon for font cards
- Settings/menu icon for header
- Size: w-5 h-5 for standard icons

## Navigation & Header

**Header**: Sticky top bar (h-16)
- Left: App title "FontPlay" or similar (20px semibold)
- Right: Settings icon for future features
- Padding: px-6
- Subtle bottom border

## Interaction Patterns

**User Flow**:
1. User sees input field prominently on load
2. Types word → all displays update simultaneously
3. Random section shows one font with randomize button
4. Scroll down to see complete font gallery grid
5. Click copy icons to copy font names

**Responsive Behavior**:
- Mobile: Stack everything vertically, single column
- Tablet: 2-column font grid
- Desktop: 3-column font grid with generous spacing

## Performance Considerations

- Load Google Fonts via single CDN call with display=swap
- Limit initial font loading to 8-10, lazy load rest on scroll
- Use font-display: swap for all custom fonts

## Accessibility

- Maintain 4.5:1 contrast ratios for all UI text
- Input field has clear focus states (ring-2)
- All interactive elements min 44px tap targets
- Font display text can have lower contrast (it's showcase content)
- Keyboard navigation for all interactive elements

## Special Notes

**No Hero Image**: This utility doesn't need visual imagery - the typography IS the visual content

**Whitespace Strategy**: Generous breathing room around the random display (my-16 to my-24) to emphasize the showcased font. Font grid items have consistent internal padding but tighter external spacing for scanability.

**Copy Functionality**: Each font card includes subtle copy-to-clipboard for font name, appearing on hover with smooth transition.