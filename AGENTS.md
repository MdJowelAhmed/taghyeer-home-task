<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Guidelines & Rules

## 1. File Size Constraints (CRITICAL RULE)
- **Every file must be between 50 to 150 lines max.**
- Never write huge bloated files.
- Break down larger components into smaller sub-components (e.g. `MessageBubble`, `MessageList`, `ChatHeader`, `MessageComposer`).
- Separate business logic into custom hooks and services.

## 2. Architecture Flow
- `UI Components -> Custom Hooks -> Services -> apiFetch / Socket`
- Feature modularity: Chat logic in `src/features/chat/`, Auth logic in `src/features/auth/`.

