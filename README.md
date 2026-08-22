# Taghyeer Real-Time Chat Application

A production-oriented real-time chat application built as a take-home assignment for **Taghyeer Digital Systems**.

The project implements the required chat experience from **Part 1** and a dedicated creative landing page from **Part 2**, with particular focus on real-time messaging, message history, pagination, scroll behavior, responsive UI, and a polished user experience.

---

## 🔗 Project Links

- **Part 1 — Chat Application (Live Demo):** [https://taghyeer-home-task.vercel.app/chat](https://taghyeer-home-task.vercel.app/chat)
- **Part 2 — Creative Landing Page (Live Demo):** [https://taghyeer-home-task.vercel.app](https://taghyeer-home-task.vercel.app)
- **GitHub Repository:** [https://github.com/MdJowelAhmed/taghyeer-home-task](https://github.com/MdJowelAhmed/taghyeer-home-task)
- **API Documentation:** [docs/API.md](./docs/API.md)

---

## Part 1 — API Documentation & Feature Implementation

### Overview
The first part of the assignment was implemented using the provided API and Socket.io infrastructure.
The application supports authentication, direct conversations, group conversations, complete message history, message sending, real-time updates, loading/empty/error states, and context-aware auto-scrolling.

The API was inspected and documented separately in:  
👉 **[docs/API.md](./docs/API.md)**

---

## ✨ Implemented Features

### Authentication
- Login using phone number and name
- Automatic user creation when the phone number is new
- Strict real-time phone input sanitization (allows only numeric digits and phone symbols)
- JWT-based authentication
- Session persistence across reloads via cookies & localStorage
- Protected chat route with Next.js middleware proxy
- Profile dropdown menu with navigation to Landing Page and Logout

### Conversations
- Global search for registered users by name or phone prefix
- Start a new 1-to-1 direct conversation
- View and switch between active conversations seamlessly
- Sync active conversation with URL search parameters (`?conversationId=<id>`)
- Persistent chat state and bookmarks

### Group Conversations
- Create group conversations with custom names and initial members
- Add members (restricted to group admins)
- Remove members (admins only)
- Leave group (individual participants)
- Promote members to group admin (admins only)
- Rename group conversation title (admins only)
- Member list modal with admin badges and creator identification
- Role-based UI permission guards (non-admins cannot see privileged action buttons)

### Messaging
- Complete conversation message history
- Sender/receiver visual distinction
- Message timestamps placed neatly underneath message bubbles
- Send new messages via Enter or Send button
- Prevent empty/whitespace message submission
- Real-time incoming messages via Socket.io
- Duplicate message prevention
- Message history restoration after page reload

### Pagination
- Cursor-based message pagination (`before=<oldestId>&limit=20`)
- Automatically load older messages when scrolling upward
- Prepend older messages to the existing message list
- Preserve scroll position seamlessly (`useLayoutEffect` + `overflowAnchor: "none"`)
- Prevent viewport jumps and screen flashes during pagination

### Real-Time Communication (Socket.io)
- Socket.io client integration with JWT handshake authentication
- Real-time `message:new` updates for incoming messages
- Real-time `conversation:updated` synchronization (member additions, removals, admin promotions, group renames)
- Automatic reconnection and fallback handling

### UX States & Feedback
- Custom dual-tone animated rotating loader
- Empty state with grace settling timer to prevent single-frame flash
- Real-time error handling with Shadcn Sonner toast notifications
- Interactive modal dialogs with React portals escaping stacking contexts
- Responsive layout: desktop dual-pane and mobile slide-in conversation view

---

## 🌟 Thoughtful UX Extras

Beyond the core assignment requirements, several interaction improvements were added to make group and 1-on-1 conversations significantly easier to use:

- **Private Chat directly from Group Members:** Users can click any participant avatar in a group chat to immediately start a private 1-to-1 conversation without navigating away or manually searching.
- **Sender Identification in Groups:** Sender names are clearly displayed above message bubbles in group chats, while kept hidden in 1-on-1 direct chats to maintain clean aesthetics.
- **User Identity Tooltips:** Hovering over another user's avatar displays their **full name and phone number** in a floating tooltip. This helps distinguish users when multiple participants share the same or similar names.
- **Persistent Message-Input Focus:** The composer remains focused after sending a message, allowing users to type subsequent messages without interruption.
- **Auto-Focus on Conversation Switch:** Selecting any conversation automatically shifts keyboard cursor focus directly into the message input field.
- **Context-Aware Auto-Scroll:** Prevents interrupting users who are reading previous messages.
- **New-Message Indicator Badge:** Displays unread message count and a scroll-to-bottom action button when messages arrive while the user is scrolled up.

---

## 💬 Smart Chat Experience

The chat panel received the most attention because it is the core requirement of the assignment.

### Smart Auto-Scroll
The application does not blindly scroll to the bottom whenever a new message arrives. Instead, it checks the user's current viewport position:

1. **Initial Conversation Load:**
   - When a conversation is opened or switched:
     - Existing messages are loaded.
     - View jumps directly to the latest message.
     - The message input automatically receives focus.

2. **User Near the Bottom:**
   - If the user is within the visible screen area (`dist < ~75% viewport / 350px`) and a new message arrives (or the user sends a message):
     - The view automatically and smoothly scrolls to the latest message.

3. **User Reading Older Messages:**
   - If the user has scrolled significantly upward (>1 screen height):
     - The current reading position is preserved.
     - Auto-scroll is suppressed so the user's reading flow is not interrupted.
     - A floating **"X new messages"** button appears.
     - Clicking the indicator smoothly scrolls to the bottom and dismisses the badge.

4. **Returning to the Bottom:**
   - When the user manually scrolls back to the bottom, the indicator disappears automatically.

### 📐 Screen-Aware Scroll Threshold
The scroll indicator does not appear after small accidental scrolls (e.g., 20–50px). The implementation uses a viewport-aware threshold (`Math.max(350, clientHeight * 0.75)`) so that users can move slightly without triggering unwanted buttons. Only when the user moves sufficiently far away from the latest messages does the indicator appear.

### 🔄 Message History Restoration
**Problem:** After reloading the page or switching chats, previous messages could disappear because relying solely on the conversation list's `lastMessage` was insufficient.  
**Solution:** The message service and `useConversationMessages` hook were integrated with `GET /conversations/:id/messages`. Messages remain persistently available after reloads, and switching chats reliably restores full message history.

### 🛡️ Duplicate Message Prevention
**Problem:** Sending messages through both `POST /messages` and `socket.emit("message:send")` caused duplicate messages to be created by the backend and rendered in the UI.  
**Solution:** The architecture separates responsibilities: the REST API creates the message, while Socket.io delivers real-time broadcasts. Incoming messages are deduplicated using unique `_id` filters.

### 🕐 Empty State Flash Fix
**Problem:** When switching conversations, the message list briefly showed "No messages yet" for a single frame before the loader appeared because `isLoading` was initialized to false while `messages` was empty.  
**Solution:** Loading state is synchronized immediately (`Boolean(conversationId)`), and a 200ms grace settling timer is used so the empty state only appears if the API confirms zero messages exist.

### 🎯 Input Focus UX
- Selecting any conversation automatically focuses the input.
- Pressing Enter or clicking Send keeps the input enabled and uses `requestAnimationFrame` to restore focus, eliminating interaction pauses.

---

## 🧩 Part 2 — Creative Landing Page

The landing page was designed as a product showcase communicating the speed, reliability, and architecture of Taghyeer Chat.

### Design Direction
- **Taghyeer Dark Palette:** Deep space background (`#020618`), card surfaces (`#0b102b`), and vibrant gradients (`#8926fe` to `#d72dfc`).
- **Glassmorphism & Lighting:** Ambient background glows and cyber mesh gradients.
- **High-Contrast Typography:** Clean typography using Inter, IBM Plex Mono, and Geist.
- **Motion & Micro-interactions:** Powered by Framer Motion.

### Landing Page Features
- **Hero Section:** Animated copywriting, staggered titles, and animated background nodes.
- **Real-Time Visualizer:** Live animated network packet simulation demonstrating WebSocket communication.
- **Instant Discovery & Group Showcase:** Interactive UI previews for contact search and group admin controls.
- **How It Works:** 3-step visual workflow explaining instant real-time messaging.
- **Interactive Live Sandbox:** Functional interactive chat demo directly on the landing page where visitors can type messages and test instant response delivery.
- **Responsive Mobile Navigation:** Hamburger menu drawer with quick navigation links and chat CTA.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Language** | TypeScript (Strict mode) |
| **Styling** | Tailwind CSS + Custom Design Tokens |
| **Server State** | TanStack Query v5 (React Query) |
| **Real-Time** | Socket.io Client v4 |
| **UI Primitives** | Radix UI Primitives + Lucide Icons |
| **Notifications** | Sonner Toast |
| **Animations** | Framer Motion + Tailwind CSS Animations |
| **Testing** | Jest / Vitest + React Testing Library |
| **Deployment** | Vercel |

---

## 🏗️ Architecture

The project follows a **Feature-Driven Architecture**:

```
src/
├── app/                        # Next.js App Router (pages, layout, loading)
│   ├── chat/page.tsx           # Main chat interface route
│   ├── login/page.tsx          # Login authentication route
│   ├── globals.css             # Design tokens & dark variables
│   ├── layout.tsx              # Root layout with Query & Toast providers
│   └── loading.tsx             # Global loading fallback with brand loader
├── components/
│   ├── ui/                     # Reusable UI primitives (Button, Dialog, Loader, etc.)
│   └── providers/              # TanStack Query client provider
├── features/
│   ├── auth/                   # Authentication module (LoginForm, hooks, services, types)
│   ├── chat/                   # Core Chat module (ChatLayout, Sidebar, MessageList, hooks, services, types)
│   └── landing/                # Product landing page components (Hero, Features, Visualizer, Demo)
├── lib/                        # Shared utilities (apiFetch, socket instance, cn helper)
└── types/                      # Global type definitions
```

### Data Flow Pattern
```
UI Components ──▶ Custom Hooks ──▶ Services Layer ──▶ REST API / Socket.io
```

---

## 🔍 API Integration & Observations

The application directly integrates with the backend API as documented in [`docs/API.md`](./docs/API.md).

### Handled API Inconsistencies & Observations:
1. **Timestamp Normalization:** REST API returns `createdAt` as an **ISO 8601 string** (`"2026-08-21T13:20:32.757Z"`), while Socket.io `message:new` returns a **numeric Unix millisecond timestamp** (`1787328315263`). The client parses all timestamps with `new Date(createdAt)`.
2. **Identifier Shape Differences:** Normalizes `_id` and `id` keys across REST responses and socket payloads.
3. **Sender Data Resolution:** Handles both string sender IDs and populated sender objects gracefully.
4. **Health Check Routing:** Verified that `GET /health` is hosted at the host root (`200 OK {"status":"ok"}`), whereas `/api/health` returns 404.

---

## 🤖 AI Usage Transparency

AI tools were used during development, as permitted by the assignment guidelines.

### Primary Areas of AI Assistance:
- Exploring modular folder structure and architectural separation.
- Inspecting and formalizing Swagger API documentation into `docs/API.md`.
- Debugging critical integration issues (such as resolving duplicate message creation between REST and Socket.io).
- Investigating `useLayoutEffect` scroll restoration strategies for cursor-based pagination.
- Refining auto-scroll threshold logic and eliminating empty-state flashing.
- Validating TypeScript strict types and optimizing build performance.

All AI-suggested code was critically reviewed, adapted to the live API behavior, and tested manually.

---

## 🧪 Testing & Verification

### Automated Checks
- **TypeScript:** `npx tsc --noEmit` — 100% clean, 0 type errors.
- **Production Build:** `npm run build` — Optimized production bundle passed successfully.
- **Linting:** 0 ESLint errors or warnings.

### Manual Verification Checklist
- [x] Login and user profile creation
- [x] Global user search by name and phone number
- [x] 1-on-1 conversation creation and switching
- [x] Group conversation creation
- [x] Group member addition (admin only)
- [x] Group member removal and self-leave
- [x] Admin promotion and group renaming
- [x] Message sending via REST and real-time receiving via Socket.io
- [x] Duplicate message prevention
- [x] Message history persistence after reload
- [x] Cursor pagination with zero viewport jump
- [x] Smart auto-scroll and unread messages indicator
- [x] Phone input sanitization (blocking non-numeric characters)
- [x] Responsive desktop and mobile layouts

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18.x
- npm ≥ 9.x

### Installation
```bash
git clone https://github.com/MdJowelAhmed/taghyeer-home-task.git
cd taghyeer-home-task
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=https://frontend-task-chatapp.onrender.com/api
NEXT_PUBLIC_API_SOCKET_URL=https://frontend-task-chatapp.onrender.com
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 🔮 What I Would Improve With More Time

Given additional development time, the following enhancements would be prioritized:
- **Typing Indicators:** Real-time `typing:start` and `typing:stop` socket event handling.
- **Read Receipts & Delivery Status:** Visual checkmarks for sent, delivered, and read states.
- **File & Media Attachments:** Support for images, voice notes, and file sharing.
- **Virtualized Message List:** Virtualized rendering (e.g. TanStack Virtual) for conversations with thousands of messages.
- **Message Reactions & Replies:** Rich message interaction threads and emoji reactions.
- **End-to-End Test Suite:** Playwright tests covering critical chat flows across multiple browser tabs.

---

## 📝 Part 3 — Thought Process Summary

### Part 1 Approach
The primary focus was building a dependable chat panel. Next.js with TypeScript was chosen for strict type safety and structured routing. TanStack Query manages server state, while Socket.io handles real-time events. Separating REST mutations from Socket.io delivery was key to resolving duplicate messages and ensuring predictable data synchronization. For history, cursor-based pagination was implemented with `useLayoutEffect` to achieve seamless, zero-flash scroll restoration.

### Part 2 Approach
The landing page was created as an authentic product showcase rather than a generic SaaS template. The Taghyeer dark theme, glowing gradients, animated visualizer, and interactive live demo allow visitors to experience real-time messaging directly on the landing page.

### AI Usage
AI assistance was used effectively for architectural exploration, debugging the REST/Socket duplication conflict, tuning scroll thresholds, and build verification. All implementations were tested and verified against the live API.

### Madagascar
Madagascar was not relevant to the application itself, but is included here because it was explicitly required by the assignment instructions.

---

## 📄 License

Developed for the **Taghyeer Digital Systems** home assignment. All rights reserved.
