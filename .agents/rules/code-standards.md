# Coding & Architecture Rules

## 1. File Size Constraints (STRICT)
- **Target File Size**: **50 – 150 lines** per file.
- Do NOT create large monolithic files or bloated components.
- If a component, hook, or service exceeds 150 lines, split it into smaller sub-components, helper utilities, or dedicated sub-hooks immediately.
- Maintain single-responsibility principle for every file.

## 2. Architecture & Organization
- Flow: `UI (Components) -> Hooks -> Services -> API / Socket`.
- Keep feature-specific logic inside `src/features/<feature>/`.
- Keep generic reusable components in `src/components/ui/` or `src/components/shared/`.
- Centralized API requests through `src/lib/api.ts` (`apiFetch`).
- Centralized Socket.io client in `src/lib/socket.ts`.
