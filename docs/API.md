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

Field

Type

Description

token

string

JWT authentication token

user

object

Authenticated user information

user._id

string

Unique user ID

user.name

string

User name

user.phone

string

User phone number

user.createdAt

string

User creation timestamp

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

Field

Type

Description

_id

string

Unique user ID

name

string

User name

phone

string

User phone number

createdAt

string

User creation timestamp

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

Parameter

Type

Required

Description

q

string

Yes

Search query

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

Field

Type

Description

_id

string

Unique user ID

name

string

User name

phone

string

User phone number

Conversations

Conversation-related REST endpoints will be documented here after they are verified from the provided API.

Messages

Message-related REST endpoints will be documented here after they are verified from the provided API.

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

Variable

Purpose

NEXT_PUBLIC_API_BASE_URL

Base URL for REST API requests

NEXT_PUBLIC_API_SOCKET_URL

Base URL for Socket.io connection

Notes

API URLs must not be hardcoded inside feature components.

REST API communication should go through the application's API/service layer.

Authentication state should be handled centrally.

Socket.io communication should be isolated from UI components.

API contracts should be updated here whenever a new endpoint or Socket.io event is verified.