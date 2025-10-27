# Planning Guide

A simple React application for testing Contentful CMS integration that displays fetched content in an elegant, organized interface with setup guidance for creating content models.

**Experience Qualities**:
1. **Intuitive** - Clear visual feedback for connection status and content display with helpful setup instructions
2. **Professional** - Clean, organized layout that presents CMS content in a structured, readable format
3. **Developer-friendly** - Easy configuration with visible API status and helpful error messages

**Complexity Level**: Light Application (multiple features with basic state)
- Manages Contentful API credentials, fetches and displays content entries, provides setup instructions for content model creation

## Essential Features

### Contentful Configuration
- **Functionality**: Store and manage Contentful API credentials (Space ID, Access Token, Environment)
- **Purpose**: Enable secure connection to user's Contentful space
- **Trigger**: User clicks "Configure Contentful" button or app detects missing credentials
- **Progression**: Open settings dialog → User enters Space ID, Access Token, Environment → Save credentials → Auto-fetch content
- **Success criteria**: Credentials persist between sessions, connection status displayed

### Content Fetching & Display
- **Functionality**: Fetch all entries from Contentful space and display in organized card layout
- **Purpose**: Verify CMS connection and visualize content structure
- **Trigger**: Automatic on app load (if configured) or manual refresh button
- **Progression**: Show loading state → Fetch from Contentful API → Parse entries → Display in cards with field details
- **Success criteria**: All entries visible with content type, fields, and values clearly organized

### Content Model Setup Guide
- **Functionality**: Provide instructions and example content model structure for Contentful
- **Purpose**: Help users who don't have a content model yet
- **Trigger**: User clicks "Setup Guide" button or when no content exists
- **Progression**: Open guide dialog → Display step-by-step Contentful setup → Show example content models → Provide field configuration examples
- **Success criteria**: Clear instructions visible with copyable content model JSON

### Connection Status Indicator
- **Functionality**: Visual indicator showing Contentful connection health
- **Purpose**: Immediate feedback on API connectivity
- **Trigger**: Automatic on every fetch attempt
- **Progression**: Show loading → API request → Display success/error state with details
- **Success criteria**: Clear visual distinction between connected, loading, and error states

## Edge Case Handling
- **Missing Credentials**: Show prominent setup prompt with configuration button when credentials not set
- **API Errors**: Display specific error messages (network issues, invalid credentials, rate limits) with resolution suggestions
- **Empty Content**: Show helpful empty state with link to setup guide when no entries exist
- **Malformed Content**: Gracefully handle entries with unexpected field structures
- **Long Content Values**: Truncate long text fields with expand option to prevent layout breaks

## Design Direction
The design should feel professional and developer-focused with a clean, technical aesthetic that emphasizes clarity and information hierarchy - minimal interface with purposeful data visualization that makes CMS content structure immediately understandable.

## Color Selection
Analogous blue-purple scheme creating a professional, technical feeling appropriate for developer tools

- **Primary Color**: Deep Blue (oklch(0.45 0.15 250)) - Communicates trust, stability, and technical proficiency for primary actions
- **Secondary Colors**: Soft Purple (oklch(0.75 0.10 280)) for accents and hover states, Light Gray (oklch(0.95 0.01 250)) for backgrounds
- **Accent Color**: Bright Cyan (oklch(0.70 0.15 210)) - Attention-grabbing highlight for status indicators and important CTAs
- **Foreground/Background Pairings**:
  - Background (White oklch(1 0 0)): Dark text (oklch(0.20 0 0)) - Ratio 14.5:1 ✓
  - Card (Light Blue oklch(0.98 0.01 250)): Dark text (oklch(0.20 0 0)) - Ratio 14.0:1 ✓
  - Primary (Deep Blue oklch(0.45 0.15 250)): White text (oklch(1 0 0)) - Ratio 7.2:1 ✓
  - Secondary (Soft Purple oklch(0.75 0.10 280)): Dark text (oklch(0.20 0 0)) - Ratio 8.5:1 ✓
  - Accent (Bright Cyan oklch(0.70 0.15 210)): White text (oklch(1 0 0)) - Ratio 5.1:1 ✓
  - Muted (Light Gray oklch(0.95 0.01 250)): Muted text (oklch(0.50 0 0)) - Ratio 6.8:1 ✓

## Font Selection
Inter for its technical clarity and excellent readability at all sizes, providing a modern, professional feel perfect for developer-focused interfaces

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter SemiBold/24px/normal spacing
  - H3 (Card Titles): Inter Medium/18px/normal spacing
  - Body (Content): Inter Regular/14px/relaxed line height (1.6)
  - Labels: Inter Medium/12px/uppercase/wide letter spacing
  - Code/IDs: JetBrains Mono/13px/monospace for technical identifiers

## Animations
Minimal, functional animations that provide feedback without distraction - subtle transitions communicate state changes and guide attention to loading states and new content appearing

- **Purposeful Meaning**: Quick, snappy transitions reinforce the technical, efficient nature of the tool while smooth loading states prevent jarring content appearance
- **Hierarchy of Movement**: Status indicators and connection state get priority animation attention, content cards fade in gracefully on load

## Component Selection
- **Components**: 
  - Dialog for settings and setup guide with clear form inputs
  - Card for content entry display with organized field layout
  - Badge for content type indicators and status chips
  - Button with loading states for actions
  - Alert for error messages and helpful tips
  - Scroll Area for long content lists
  - Separator for visual field grouping
  - Skeleton for loading states
  
- **Customizations**: 
  - Custom ContentEntry component with expandable fields
  - StatusBadge component with color-coded states (connected/loading/error)
  - Code block display for JSON field values
  
- **States**: 
  - Buttons show loading spinners during API calls
  - Cards have subtle hover elevation
  - Inputs show focus states with accent color ring
  - Status badges pulse during loading
  
- **Icon Selection**: 
  - Gear (settings configuration)
  - CloudArrowDown (fetch/refresh content)
  - CheckCircle (success status)
  - WarningCircle (error status)
  - Question (help/guide)
  - CaretDown (expand fields)
  
- **Spacing**: 
  - Container max-width of 1200px with p-6
  - Card grid gap-4 with p-4 internal padding
  - Form fields gap-4
  - Section spacing mb-6
  
- **Mobile**: 
  - Single column card layout on mobile (<768px)
  - Full-width dialogs on mobile
  - Collapsible header with menu for mobile settings access
  - Touch-friendly button sizes (min 44px)
