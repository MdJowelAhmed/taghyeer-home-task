


API Documentation
REST API and Socket.io contract used by the Chat Application.

Base URLs
REST API
All REST endpoints are relative to:

NEXT_PUBLIC_API_BASE_URL
Current value:

https://frontend-task-chatapp.onrender.com/api
Socket.io
Socket.io connection URL:

NEXT_PUBLIC_API_SOCKET_URL
Current value:

https://frontend-task-chatapp.onrender.com
Authentication
POST /auth/login
Authenticates a user using their phone number and name.

Request
Method: POST

Endpoint:

/auth/login
Request Body:

{
  "phone": "01478523698",
  "name": "Jowel"
}
Response
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "6a883f82e5d6aac975220e70",
    "name": "Jowel",
    "phone": "01478523698",
    "createdAt": "2026-08-21T12:07:30.838Z"
  }
}
Response Fields
Field	Type	Description
token	string	JWT authentication token
user	object	Authenticated user information
user._id	string	Unique user ID
user.name	string	User name
user.phone	string	User phone number
user.createdAt	string	User creation timestamp
GET /auth/me
Returns the currently authenticated user's information.

Request
Method: GET

Endpoint:

/auth/me
Authentication
This endpoint requires a JWT Bearer token.

Authorization: Bearer <JWT_TOKEN>
Response
{
  "_id": "6a883f82e5d6aac975220e70",
  "name": "Jowel",
  "phone": "01478523698",
  "createdAt": "2026-08-21T12:07:30.838Z"
}
Response Fields
Field	Type	Description
_id	string	Unique user ID
name	string	User name
phone	string	User phone number
createdAt	string	User creation timestamp
Error Response — No Token
Status: 400

{
  "error": {
    "message": "No token provided",
    "code": "NO_TOKEN"
  }
}
Users
GET /users/search
Searches for users by name or supported search query.

Request
Method: GET

Endpoint:

/users/search
Query Parameters
Parameter	Type	Required	Description
q	string	Yes	Search query
Example
/users/search?q=Jow
Response
[
  {
    "_id": "6a883f82e5d6aac975220e70",
    "name": "Jowel",
    "phone": "01478523698"
  }
]
Response Fields
Field	Type	Description
_id	string	Unique user ID
name	string	User name
phone	string	User phone number
Conversations
GET /conversations
Returns the conversations available to the authenticated user.

Request
Method: GET

Endpoint:

/conversations
Authentication
This endpoint requires a JWT Bearer token.

Authorization: Bearer <JWT_TOKEN>
Response
{
  "data": [
    {
      "_id": "6a88503fe5d6aac975223f88",
      "type": "direct",
      "lastMessage": {},
      "updatedAt": "2026-08-21T13:18:55.986Z",
      "participant": {
        "_id": "6a8833dae5d6aac97521f016",
        "name": "Kyle Reese",
        "phone": "+12025550103"
      }
    }
  ]
}
Response Fields
Field	Type	Description
data	array	List of conversations
data[]._id	string	Unique conversation ID
data[].type	string	Conversation type, currently direct
data[].lastMessage	object	Last message in the conversation
data[].updatedAt	string	Last conversation update timestamp
data[].participant	object	Other participant in a direct conversation
data[].participant._id	string	Participant user ID
data[].participant.name	string	Participant name
data[].participant.phone	string	Participant phone number
POST /conversations
Creates a direct conversation with another user.

Request
Method: POST

Endpoint:

/conversations
Authentication
This endpoint requires a JWT Bearer token.

Authorization: Bearer <JWT_TOKEN>
Request Body
{
  "userId": "6a8833dae5d6aac97521f016"
}
Response
{
  "_id": "6a88503fe5d6aac975223f88",
  "participants": [
    "6a8844fce5d6aac975221b2c",
    "6a8833dae5d6aac97521f016"
  ],
  "createdAt": "2026-08-21T13:18:55.986Z"
}
Response Fields
Field	Type	Description
_id	string	Unique conversation ID
participants	string[]	User IDs participating in the conversation
createdAt	string	Conversation creation timestamp

POST /conversations/group
Creates a group conversation with multiple participants.

Request
Method: POST

Endpoint:
/conversations/group

Authentication
This endpoint requires a JWT Bearer token.
Authorization: Bearer <JWT_TOKEN>

Request Body:
```json
{
  "name": "Project 3 Team",
  "participantIds": [
    "6a8836c4e5d6aac97521f774",
    "6a882e06e5d6aac97521e841",
    "6a883edbe5d6aac975220d2a"
  ]
}
```

Response:
```json
{
  "_id": "6a885fcce5d6aac975228715",
  "type": "group",
  "name": "Project 3 Team",
  "createdBy": "6a8844fce5d6aac975221b2c",
  "admins": [
    "6a8844fce5d6aac975221b2c"
  ],
  "participants": [
    {
      "_id": "6a8844fce5d6aac975221b2c",
      "name": "Jowel",
      "phone": "0107852398"
    }
  ],
  "createdAt": "2026-08-21T14:25:16.314Z",
  "updatedAt": "2026-08-21T14:25:16.314Z"
}
```

Response Fields
Field	Type	Description
_id	string	Unique group conversation ID
type	string	Conversation type, "group"
name	string	Group name
createdBy	string	User ID of the creator
admins	string[]	List of admin user IDs
participants	object[]	List of participant user objects
createdAt	string	Creation timestamp
updatedAt	string	Last update timestamp

POST /conversations/{id}/participants
Adds one or more members to an existing group conversation (admins only).

Request
Method: POST

Endpoint:
/conversations/{id}/participants

Authentication
This endpoint requires a JWT Bearer token.
Authorization: Bearer <JWT_TOKEN>

Path Parameters:
Parameter	Type	Required	Description
id	string	Yes	The group conversation ID

Request Body:
```json
{
  "userIds": [
    "6a882e06e5d6aac97521e841"
  ]
}
```

Response:
```json
{
  "_id": "6a885fcce5d6aac975228715",
  "type": "group",
  "name": "Project 3 Team",
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
      "name": "shariful alam",
      "phone": "+8801700000000"
    },
    {
      "_id": "6a882e06e5d6aac97521e841",
      "name": "kabita",
      "phone": "654564564565"
    },
    {
      "_id": "6a883edbe5d6aac975220d2a",
      "name": "kamrul islam",
      "phone": "+8801709678345"
    }
  ],
  "createdAt": "2026-08-21T14:25:16.314Z",
  "updatedAt": "2026-08-21T14:26:52.934Z"
}
```

Response Fields
Field	Type	Description
_id	string	Unique group conversation ID
type	string	Conversation type, "group"
name	string	Group name
createdBy	string	User ID of the creator
admins	string[]	List of admin user IDs
participants	object[]	List of updated participant user objects
createdAt	string	Creation timestamp
updatedAt	string	Last update timestamp

DELETE /conversations/{id}/participants/{userId}
Removes a member from a group (admins only), or allows a user to leave a group by passing their own user ID.

Request
Method: DELETE

Endpoint:
/conversations/{id}/participants/{userId}

Authentication
This endpoint requires a JWT Bearer token.
Authorization: Bearer <JWT_TOKEN>

Path Parameters:
Parameter	Type	Required	Description
id	string	Yes	The group conversation ID
userId	string	Yes	The ID of the user to remove (or own ID to leave)

Response:
```json
{
  "_id": "6a885fcce5d6aac975228715",
  "type": "group",
  "name": "Project 3 Team",
  "createdBy": "6a8844fce5d6aac975221b2c",
  "admins": [
    "6a8844fce5d6aac975221b2c"
  ],
  "participants": [
    {
      "_id": "6a8844fce5d6aac975221b2c",
      "name": "Jowel",
      "phone": "0107852398"
    }
  ],
  "createdAt": "2026-08-21T14:25:16.314Z",
  "updatedAt": "2026-08-21T14:26:52.934Z"
}
```

Response Fields
Field	Type	Description
_id	string	Unique group conversation ID
type	string	Conversation type, "group"
name	string	Group name
createdBy	string	User ID of the creator
admins	string[]	List of admin user IDs
participants	object[]	List of remaining participant user objects
createdAt	string	Creation timestamp
updatedAt	string	Last update timestamp

POST /conversations/{id}/admins
Promotes an existing group member to admin (admins only).

Request
Method: POST

Endpoint:
/conversations/{id}/admins

Authentication
This endpoint requires a JWT Bearer token.
Authorization: Bearer <JWT_TOKEN>

Path Parameters:
Parameter	Type	Required	Description
id	string	Yes	The group conversation ID

Request Body:
```json
{
  "userId": "6a8836c4e5d6aac97521f774"
}
```

Response:
```json
{
  "_id": "6a885fcce5d6aac975228715",
  "type": "group",
  "name": "Project 3 Team",
  "createdBy": "6a8844fce5d6aac975221b2c",
  "admins": [
    "6a8844fce5d6aac975221b2c",
    "6a8836c4e5d6aac97521f774"
  ],
  "participants": [
    {
      "_id": "6a8844fce5d6aac975221b2c",
      "name": "Jowel",
      "phone": "0107852398"
    },
    {
      "_id": "6a8836c4e5d6aac97521f774",
      "name": "shariful alam",
      "phone": "+8801700000000"
    },
    {
      "_id": "6a883edbe5d6aac975220d2a",
      "name": "kamrul islam",
      "phone": "+8801709678345"
    }
  ],
  "createdAt": "2026-08-21T14:25:16.314Z",
  "updatedAt": "2026-08-21T14:49:11.275Z"
}
```

Response Fields
Field	Type	Description
_id	string	Unique group conversation ID
type	string	Conversation type, "group"
name	string	Group name
createdBy	string	User ID of the creator
admins	string[]	List of admin user IDs
participants	object[]	List of participant user objects
createdAt	string	Creation timestamp
updatedAt	string	Last update timestamp

PATCH /conversations/{id}
Renames a group conversation (admins only).

Request
Method: PATCH

Endpoint:
/conversations/{id}

Authentication
This endpoint requires a JWT Bearer token.
Authorization: Bearer <JWT_TOKEN>

Path Parameters:
Parameter	Type	Required	Description
id	string	Yes	The group conversation ID

Request Body:
```json
{
  "name": "Renamed Team"
}
```

Response:
```json
{
  "_id": "6a885fcce5d6aac975228715",
  "type": "group",
  "name": "Renamed Team",
  "createdBy": "6a8844fce5d6aac975221b2c",
  "admins": [
    "6a8844fce5d6aac975221b2c"
  ],
  "participants": [
    {
      "_id": "6a8844fce5d6aac975221b2c",
      "name": "Jowel",
      "phone": "0107852398"
    }
  ],
  "createdAt": "2026-08-21T14:25:16.314Z",
  "updatedAt": "2026-08-21T14:55:00.000Z"
}
```

Response Fields
Field	Type	Description
_id	string	Unique group conversation ID
type	string	Conversation type, "group"
name	string	Updated group name
createdBy	string	User ID of the creator
admins	string[]	List of admin user IDs
participants	object[]	List of participant user objects
createdAt	string	Creation timestamp
updatedAt	string	Last update timestamp

Messages
POST /messages
Sends a message to a conversation.

Request
Method: POST

Endpoint:

/messages
Authentication
This endpoint requires a JWT Bearer token.

Authorization: Bearer <JWT_TOKEN>
Request Body
{
  "conversationId": "6a88503fe5d6aac975223f88",
  "text": "Hi!"
}
Response
{
  "_id": "6a8850a0e5d6aac975224077",
  "conversation": "6a88503fe5d6aac975223f88",
  "sender": "6a8844fce5d6aac975221b2c",
  "text": "Hi!",
  "createdAt": "2026-08-21T13:20:32.757Z"
}
Response Fields
GET /conversations/{id}/messages
Fetches the message history of a specific conversation (1-to-1 or group).

Request
Method: GET

Endpoint:
/conversations/{id}/messages

Authentication
This endpoint requires a JWT Bearer token.
Authorization: Bearer <JWT_TOKEN>

Path Parameters:
Parameter	Type	Required	Description
id	string	Yes	Conversation ID

Query Parameters:
Parameter	Type	Required	Description
limit	number	No	Maximum messages to return (default 50)
before	string	No	Cursor pagination timestamp/ID

Response
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

Response Fields
Field	Type	Description
messages	array	List of message objects (sorted newest first)
hasMore	boolean	Whether older messages exist for pagination

Socket.io


Connection Handshake
Connect to the server's root origin (NOT the `/api` base used for REST). The socket lives at the host root (`NEXT_PUBLIC_API_SOCKET_URL`):

```typescript
const socket = io("https://frontend-task-chatapp.onrender.com", {
  auth: { token: "<JWT_TOKEN>" },
  transports: ["websocket", "polling"],
});
```

Authentication is required during the handshake. An invalid or missing token is rejected by the server (`Socket connect error: No token provided`).

Client-to-Server Events

`message:send`
Sends a message to a conversation.
- Payload:
```json
{
  "conversationId": "6a88503fe5d6aac975223f88",
  "text": "Hello world!"
}
```
- Optional Ack Callback: receives `{ ok: true }` upon success.

Server-to-Client Events

`message:new`
Fires when a new message arrives in a conversation the user is part of (1-to-1 or group).
- Payload:
```json
{
  "id": "6a88773be5d6aac975231b34",
  "conversation": "6a887738e5d6aac975231b0a",
  "sender": "6a883f82e5d6aac975220e70",
  "text": "Hello world!",
  "createdAt": 1787328315263
}
```

`conversation:updated`
Fires when a group conversation you're in changes (created, renamed, or members/admins changed).
- Payload: The updated `GroupConversation` object containing current members, admins, and metadata.


Environment Variables
The application uses the following environment variables:

NEXT_PUBLIC_API_BASE_URL=https://frontend-task-chatapp.onrender.com/api
NEXT_PUBLIC_API_SOCKET_URL=https://frontend-task-chatapp.onrender.com
Variable	Purpose
NEXT_PUBLIC_API_BASE_URL	Base URL for REST API requests
NEXT_PUBLIC_API_SOCKET_URL	Base URL for Socket.io connection
Notes
API URLs must not be hardcoded inside feature components.

REST API communication should go through the application's API/service layer.

Authentication state should be handled centrally.

Socket.io communication should be isolated from UI components.

API contracts should be updated here whenever a new endpoint or Socket.io event is verified.