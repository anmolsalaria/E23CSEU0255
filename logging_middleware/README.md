# Logging Middleware

Reusable logging client for the Affordmed backend assignment. It authenticates with the Affordmed auth API, caches the bearer token in memory, and sends structured logs to the remote logging API.

## Setup
1. Copy `.env.example` to `.env`.
2. Fill in the Affordmed credentials and base URL.

## Installation
```bash
npm install
```

## Scripts
- `npm run start` - Runs the module entry (no server).
- `npm run dev` - Runs the entry with nodemon.

## Environment Variables
- `CLIENT_ID`
- `CLIENT_SECRET`
- `ACCESS_CODE`
- `EMAIL`
- `NAME`
- `ROLL_NO`
- `BASE_URL`

## API Endpoints
This package is a client library. It does not expose HTTP endpoints.

## Architecture
- `src/services/authService.js` handles authentication and token caching.
- `src/services/loggingService.js` validates input and sends logs.
- `src/config/affordmed.js` loads environment configuration.
- `src/utils/validators.js` enforces allowed values for log fields.

## Logging Integration
Import and call the shared `Log` function from other services:
```js
const { Log } = require("../logging_middleware/src");

await Log("backend", "info", "service", "Service started.");
```
