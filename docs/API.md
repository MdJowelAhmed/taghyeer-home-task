# Chat API Documentation

API contract and real-time Socket.io specification for the Taghyeer Chat frontend application.

## Table of Contents
- [Base URLs](#base-urls)
- [Authentication](#authentication)
- [Health Check](#health-check)
- [Auth Endpoints](#auth-endpoints)
- [Users Search](#users-search)
- [Conversations](#conversations)
- [Group Management](#group-management)
- [Messages & Pagination](#messages--pagination)
- [Socket.io Real-Time Events](#socketio-real-time-events)
- [HTTP Status Codes & Errors](#http-status-codes--errors)
- [Client Integration Notes](#client-integration-notes)
- [Environment Variables](#environment-variables)

---

## Base URLs

- **REST API Base:** `https://frontend-task-chatapp.onrender.com/api`
- **Socket.io Host:** `https://frontend-task-chatapp.onrender.com`

---

## Authentication

Protected endpoints require a JWT Bearer token in the `Authorization` header:

```http
Authorization: Bearer <token>
```

For real-time connections, the same token is passed in the Socket.io handshake `auth` object:

```js
const socket = io("https://frontend-task-chatapp.onrender.com", {
  auth: { token: "<token>" },
  transports: ["websocket", "polling"],
});
```

---

## Health Check

### `GET /health`
Checks backend service availability and connectivity.

> **Observed Route Behavior:**  
> The health check route is mounted at the host root origin (`https://frontend-task-chatapp.onrender.com/health`), returning `200 OK {"status":"ok"}`. Requesting `/api/health` returns `404 {"error": {"message": "Route not found", "code": "NOT_FOUND"}}`.

**Request:**
```http
GET /health
```

**Response (200 OK):**
```json
{
  "status": "ok"
}
```

---

## Auth Endpoints

### `POST /auth/login`
Authenticates an existing user or registers a new user with phone and name.

**Request:**
```http
POST /auth/login
Content-Type: application/json

{
  "phone": "01478523698",
  "name": "Jowel"
}
```

**Response (200 OK / 201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6a883f82e5d6aac975220e70",
    "name": "Jowel",
    "phone": "01478523698",
    "createdAt": "2026-08-21T12:07:30.838Z"
  }
}
```

---

### `GET /auth/me`
Fetches the profile of the currently authenticated user.

**Request:**
```http
GET /auth/me
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "_id": "6a883f82e5d6aac975220e70",
  "name": "Jowel",
  "phone": "01478523698",
  "createdAt": "2026-08-21T12:07:30.838Z"
}
```

**Error (400 / 401 when token is missing):**
```json
{
  "error": {
    "message": "No token provided",
    "code": "NO_TOKEN"
  }
}
```

---

## Users Search

### `GET /users/search?q=<query>`
Searches registered users by name or phone prefix.

**Request:**
```http
GET /users/search?q=Jow
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "_id": "6a883f82e5d6aac975220e70",
    "name": "Jowel",
    "phone": "01478523698"
  }
]
```

---

## Conversations

### `GET /conversations`
Retrieves all direct and group conversations for the logged-in user.

**Request:**
```http
GET /conversations
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "_id": "6a88503fe5d6aac975223f88",
      "type": "direct",
      "lastMessage": {
        "_id": "6a8850a0e5d6aac975224077",
        "text": "Hi!",
        "sender": "6a8844fce5d6aac975221b2c",
        "createdAt": "2026-08-21T13:20:32.757Z"
      },
      "updatedAt": "2026-08-21T13:20:32.757Z",
      "participant": {
        "_id": "6a8833dae5d6aac97521f016",
        "name": "Kyle Reese",
        "phone": "+12025550103"
      }
    }
  ]
}
```

---

### `POST /conversations`
Starts a 1-on-1 direct conversation with another user (or returns the existing one).

**Request:**
```http
POST /conversations
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "6a8833dae5d6aac97521f016"
}
```

**Response (200 OK / 201 Created):**
```json
{
  "_id": "6a88503fe5d6aac975223f88",
  "type": "direct",
  "participants": [
    "6a8844fce5d6aac975221b2c",
    "6a8833dae5d6aac97521f016"
  ],
  "createdAt": "2026-08-21T13:18:55.986Z"
}
```

---

## Group Management

### `POST /conversations/group`
Creates a new group conversation. The creator is automatically added as admin.

**Request:**
```http
POST /conversations/group
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Product Engineering",
  "participantIds": [
    "6a8836c4e5d6aac97521f774",
    "6a882e06e5d6aac97521e841"
  ]
}
```

**Response (201 Created):**
```json
{
  "_id": "6a885fcce5d6aac975228715",
  "type": "group",
  "name": "Product Engineering",
  "createdBy": "6a8844fce5d6aac975221b2c",
  "admins": [
    "6a8844fce5d6aac975221b2c"
  ],
  "participants": [
    {
      "_id": "6a8844fce5d6aac975221b2c",
      "name": "Jowel",
      "phone": "0107852398"
    },
    {
      "_id": "6a8836c4e5d6aac97521f774",
      "name": "Shariful Alam",
      "phone": "+8801700000000"
    }
  ],
  "createdAt": "2026-08-21T14:25:16.314Z",
  "updatedAt": "2026-08-21T14:25:16.314Z"
}
```

---

### `POST /conversations/:id/participants`
Adds members to a group (admin only).

**Request:**
```http
POST /conversations/6a885fcce5d6aac975228715/participants
Authorization: Bearer <token>
Content-Type: application/json

{
  "userIds": ["6a882e06e5d6aac97521e841"]
}
```

**Response (200 OK):** Returns the updated group conversation object.

---

### `DELETE /conversations/:id/participants/:userId`
Removes a member from a group (admin only), or leaves the group when `userId` is own ID.

**Request:**
```http
DELETE /conversations/6a885fcce5d6aac975228715/participants/6a882e06e5d6aac97521e841
Authorization: Bearer <token>
```

**Response (200 OK):** Returns the updated group conversation object.

---

### `POST /conversations/:id/admins`
Promotes a member to group admin (admin only).

**Request:**
```http
POST /conversations/6a885fcce5d6aac975228715/admins
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "6a8836c4e5d6aac97521f774"
}
```

**Response (200 OK):** Returns the updated group conversation object with target user added to `admins`.

---

### `PATCH /conversations/:id`
Renames a group conversation (admin only).

**Request:**
```http
PATCH /conversations/6a885fcce5d6aac975228715
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Core Platform Team"
}
```

**Response (200 OK):** Returns the updated group conversation object with new name.

---

## Messages & Pagination

### `POST /messages`
Sends a message to any conversation (direct or group).

**Request:**
```http
POST /messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "conversationId": "6a88503fe5d6aac975223f88",
  "text": "Hello team!"
}
```

**Response (201 Created):**
```json
{
  "_id": "6a8850a0e5d6aac975224077",
  "conversation": "6a88503fe5d6aac975223f88",
  "sender": "6a8844fce5d6aac975221b2c",
  "text": "Hello team!",
  "createdAt": "2026-08-21T13:20:32.757Z"
}
```

| Field | Type | Description |
|---|---|---|
| `_id` | string | Unique message ID |
| `conversation` | string | Target conversation ID |
| `sender` | string | Sender user ID |
| `text` | string | Message text content |
| `createdAt` | string | ISO timestamp of message creation |

---

### `GET /conversations/:id/messages`
Fetches conversation message history with cursor pagination.

**Request:**
```http
GET /conversations/6a887630e5d6aac975231069/messages?limit=20&before=6a8879a2e5d6aac9752332a5
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` *(optional, default 50)*: Number of messages to return per batch.
- `before` *(optional)*: Cursor ID/timestamp of the oldest loaded message to fetch older items.

**Response (200 OK):**
```json
{
  "messages": [
    {
      "_id": "6a8879a2e5d6aac9752332a5",
      "conversation": "6a887630e5d6aac975231069",
      "sender": "6a88759ce5d6aac975230868",
      "text": "Hello there!",
      "createdAt": "2026-08-21T16:15:30.940Z"
    }
  ],
  "hasMore": false
}
```

### Cursor Pagination Workflow
1. **Initial load:** Client calls `GET /conversations/:id/messages?limit=20` without cursor.
2. **Scroll to top:** When user scrolls near top, client grabs the oldest message ID and requests `GET /conversations/:id/messages?limit=20&before=<oldestId>`.
3. **Prepend & Preserve Scroll:** Client prepends older records while adjusting `scrollTop` so the user's reading position doesn't jump.
4. **End of history:** When `hasMore: false`, further requests are stopped.

---

## Socket.io Real-Time Events

### Connection Handshake
Client authenticates during connection handshake:

```typescript
const socket = io(process.env.NEXT_PUBLIC_API_SOCKET_URL, {
  auth: { token: "<jwt_token>" },
  transports: ["websocket", "polling"],
});
```

### Client -> Server Events

#### `message:send`
Dispatches a real-time message to a conversation.
```typescript
socket.emit("message:send", {
  conversationId: "6a88503fe5d6aac975223f88",
  text: "Hello!"
}, (ack) => {
  // Callback status: { ok: true }
});
```

### Server -> Client Events

#### `message:new`
Broadcasted when a new message is sent in any conversation the user belongs to.
```json
{
  "id": "6a88773be5d6aac975231b34",
  "conversation": "6a887738e5d6aac975231b0a",
  "sender": "6a883f82e5d6aac975220e70",
  "text": "Hello world!",
  "createdAt": 1787328315263
}
```

#### `conversation:updated`
Broadcasted when a group is modified (renamed, members added/removed, admin promoted).
- **Payload:** Full updated `GroupConversation` object.

---

## HTTP Status Codes & Errors

| Status | Meaning | Typical Scenario |
|---|---|---|
| **200 OK** | Success | Fetching data, updates, deletions |
| **201 Created** | Created | User login/signup, new conversation, new message |
| **400 Bad Request** | Validation Error | Missing required fields, invalid phone/name |
| **401 Unauthorized** | Auth Failed | Missing or invalid Bearer token |
| **403 Forbidden** | Permission Denied | Non-admin trying to add/remove members or rename group |
| **404 Not Found** | Not Found | Target user or conversation does not exist |
| **500 Server Error** | Server Error | Internal backend failure |

**Standard Error Payload:**
```json
{
  "error": {
    "message": "Only group admins can add participants",
    "code": "FORBIDDEN"
  }
}
```

---

## Client Integration Notes

1. **`createdAt` Format Normalization:**
   - REST responses return `createdAt` as an **ISO 8601 string** (`"2026-08-21T13:20:32.757Z"`).
   - Socket.io `message:new` event returns `createdAt` as a **Unix timestamp number** (`1787328315263`).
   - *Frontend Handling:* Client passes all timestamps through `new Date(createdAt)` to handle both formats seamlessly.

2. **Message ID Field Mapping:**
   - REST returns `_id`, while some Socket payloads use `id`.
   - *Frontend Handling:* Client maps `_id: msg._id || msg.id` upon receiving socket events.

3. **Sender Resolution:**
   - In direct messages or certain event payloads, `sender` may be a string ID or populated user object.
   - *Frontend Handling:* Resolved safely using `typeof sender === "object" ? sender._id : sender`.

---

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://frontend-task-chatapp.onrender.com/api
NEXT_PUBLIC_API_SOCKET_URL=https://frontend-task-chatapp.onrender.com
```