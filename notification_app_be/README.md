# Notification App Backend

Notification service backend built with Node.js and Express.js. Uses in-memory storage and integrates the shared logging middleware for consistent observability.

## Setup
1. Ensure the logging middleware `.env` is configured (see [../logging_middleware/.env.example](../logging_middleware/.env.example)).
2. Optionally set `PORT` for this service.

## Installation
```bash
npm install
```

## Scripts
- `npm run start` - Starts the HTTP server.
- `npm run dev` - Starts the server with nodemon.

## Environment Variables
- `PORT` (optional, default: 3002)

## API Endpoints
- `POST /notifications`
- `GET /notifications`
- `PATCH /notifications/:id/read`

## Architecture
- `src/app.js` configures the Express app and routes.
- `src/server.js` starts the HTTP server.
- `src/routes` defines route wiring and route-level logging.
- `src/controllers` handles request orchestration and responses.
- `src/services` contains in-memory business operations.
- `src/middleware` provides logging, validation, and error handling.
- `src/utils` provides validation and response helpers.

## Logging Integration
All requests, controller actions, service operations, and errors use the shared `Log` function from the logging middleware package.
