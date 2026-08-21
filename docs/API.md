


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
Field	Type	Description
_id	string	Unique message ID
conversation	string	Conversation ID
sender	string	User ID of the sender
text	string	Message text
createdAt	string	Message creation timestamp
Socket.io
Socket.io connection details and events will be documented here after they are verified from the provided server specification.

The following information is still pending:

Connection/authentication mechanism

Client-to-server events

Server-to-client events

Room/conversation events

Message events

Typing events

Read/delivery events

Online/offline presence events

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