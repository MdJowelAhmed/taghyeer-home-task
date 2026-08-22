# Taghyeer Real-Time Chat Application

An enterprise-grade, high-performance real-time messaging application built for **Taghyeer Digital Systems** using Next.js 16 (App Router), TypeScript, Tailwind CSS, TanStack Query, and Socket.io.

🌐 **Live Deployment:** [https://taghyeer-home-task.vercel.app](https://taghyeer-home-task.vercel.app)  
📖 **API Documentation:** [docs/API.md](./docs/API.md)  
📦 **Repository:** [https://github.com/MdJowelAhmed/taghyeer-home-task](https://github.com/MdJowelAhmed/taghyeer-home-task)

---

## 🌟 Highlights & Features

### 1. Authentication & Session Management
- **Phone & Name Authentication:** Frictionless sign-in creating or fetching the user profile via `POST /auth/login`.
- **JWT Persistence & Route Protection:** Token saved in cookies and localStorage, protected by Next.js middleware routing (`/chat` vs `/login`).
- **Profile Modal & Logout:** Anchored profile dropdown menu with direct navigation to Home and safe session logout.

### 2. Direct (1-to-1) & Group Conversations
- **1-on-1 Direct Chat:** Start conversations by searching any user or clicking a participant avatar in group chats.
- **Group Conversations:** Create groups, view member lists with admin badges, and manage groups.
- **Role-based Permissions:**
  - **Add Members:** Restricted to group admins only.
  - **Promote Admins:** Admins can promote other members.
  - **Rename Group:** Admins can rename group titles.
  - **Leave Group:** Any participant can leave; admins can remove non-admin members.

### 3. Real-Time Communication (Socket.io)
- **Bidirectional Events:**
  - `message:send`: Real-time message dispatch with optimistic/ack handling.
  - `message:new`: Instant cross-client broadcast for 1-to-1 and group chats.
  - `conversation:updated`: Live sync for group membership, admin promotions, and renaming.
- **Connection Reliability:** Automatic fallback to polling if WebSockets are interrupted, complete with reconnection handling.

### 4. Advanced Message Pagination & Auto-Scroll UX
- **Cursor-based Pagination:** Seamlessly fetches older messages using `before=<oldestId>&limit=20`.
- **Zero-Jump Scroll Restoration:** Uses `useLayoutEffect` and `overflowAnchor: "none"` so prepending older messages never jumps or flashes the viewport.
- **Smart Auto-Scroll & Unread Pill:**
  - **Chat Open / Switch:** Instantly scrolls to the latest message on open.
  - **Reading at Bottom:** Smoothly auto-scrolls down when new messages arrive or are sent.
  - **Scrolled Up (>1 screen height):** Preserves reading position, prevents jarring auto-scrolls, and displays a floating **"X new messages"** button with scroll-to-bottom action.

### 5. Premium Dark Theme & Design System
- **Taghyeer Cyber Dark Aesthetic:** Rich palette with `#020618` deep space background, `#8926fe` to `#d72dfc` vibrant gradients, and glassmorphic card overlays.
- **Custom Dual-Tone Loader:** Custom animated rotating dual-color ring loader matching the brand colors.
- **Responsive Layout:** Responsive layout with desktop dual-pane and mobile slide-in conversation view.

### 6. Interactive Landing Page
- Modern marketing and showcase overview featuring interactive demo, visual architecture pipelines, feature grids, and real-time statistics.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Language** | TypeScript (Strict mode) |
| **Styling** | Tailwind CSS + Custom Design Tokens |
| **Server State** | TanStack Query v5 (React Query) |
| **Real-time** | Socket.io Client v4 |
| **UI Components** | Radix UI Primitives + Lucide Icons + Sonner Toasts |
| **Animations** | Framer Motion + Tailwind CSS Animations |

---

## 🏗️ Architecture & Project Structure

The project follows a **Feature-Driven Architecture** with strict modularity and separation of concerns:
```
UI Components ──▶ Custom Hooks ──▶ Services Layer ──▶ apiFetch / Socket.io
```

```
src/
├── app/                        # Next.js App Router (pages, layout, loading)
│   ├── chat/page.tsx           # Main chat interface route
│   ├── login/page.tsx          # Login authentication route
│   ├── globals.css             # Design tokens, variables & animations
│   ├── layout.tsx              # Root layout with Query & Toast providers
│   └── loading.tsx             # Route fallback with custom brand loader
├── components/
│   ├── ui/                     # Reusable UI primitives (Button, Dialog, Loader, Toaster)
│   └── providers/              # TanStack Query client provider
├── features/
│   ├── auth/                   # Authentication module
│   │   ├── components/         # LoginForm, Card
│   │   ├── hooks/              # useAuth, useLogin, useLogout
│   │   ├── services/           # authService (login, getMe)
│   │   └── types/              # User, AuthState, LoginPayload
│   ├── chat/                   # Core Chat module
│   │   ├── components/         # ChatLayout, Sidebar, ChatWindow, MessageList, etc.
│   │   ├── hooks/              # useConversations, useConversationMessages, useSocket
│   │   ├── services/           # chatService, socketService
│   │   ├── types/              # Conversation, Message, Participant
│   │   └── utils/              # Chat formatting and search helpers
│   └── landing/                # Interactive landing page overview components
├── lib/                        # Shared utilities (apiFetch, socket instance, cn helper)
└── types/                      # Global type definitions
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://frontend-task-chatapp.onrender.com/api
NEXT_PUBLIC_API_SOCKET_URL=https://frontend-task-chatapp.onrender.com
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js ≥ 18.x
- npm ≥ 9.x

### 2. Installation
```bash
git clone https://github.com/MdJowelAhmed/taghyeer-home-task.git
cd taghyeer-home-task
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

### 5. Type-Check
```bash
npx tsc --noEmit
```

---

## 📖 API Documentation & Observations

All backend endpoints, request/response schemas, Socket.io event payloads, and observed status codes are documented in:
👉 **[docs/API.md](./docs/API.md)**

### Key Client-Side Normalizations Handled:
1. **Timestamp Normalization:** REST endpoints return `createdAt` as an **ISO 8601 string**, while Socket.io `message:new` broadcasts return a **numeric Unix millisecond timestamp**. The frontend safely parses all dates with `new Date(createdAt)`.
2. **ID Mapping:** Normalizes `_id` and `id` keys between REST responses and socket event payloads.
3. **Sender Resolution:** Robust handling for both string user IDs and populated sender objects.
4. **Health Check Route:** Verified that `GET /health` is hosted at the server root origin (`200 OK {"status":"ok"}`).

---

## 📄 License

Developed for the **Taghyeer Digital Systems** home assignment. All rights reserved.
