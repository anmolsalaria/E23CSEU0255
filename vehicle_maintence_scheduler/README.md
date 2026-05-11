# Vehicle Maintence Scheduler

Backend microservices project for vehicle management, maintenance scheduling, and notifications. This service focuses on vehicle and maintenance APIs and integrates the shared logging middleware for consistent observability across the system.

## Project Overview
This repository contains four components:
- Vehicle Management Service
- Maintenance Scheduling Service
- Notification Service
- Shared Logging Middleware

## Features
- In-memory CRUD APIs for vehicles.
- Maintenance scheduling and status updates.
- Structured responses with centralized validation and error handling.
- Request, route, service, and error logging via shared middleware.

## Tech Stack
- Node.js
- Express.js
- JavaScript
- Postman

## Setup
1. Ensure the logging middleware `.env` is configured (see [../logging_middleware/.env.example](../logging_middleware/.env.example)).
2. Optionally set `PORT` for this service (default: 3001).

## Installation
```bash
npm install
```

## Run Instructions
```bash
npm start
```

## Scripts
- `npm run start` - Starts the HTTP server.
- `npm run dev` - Starts the server with nodemon.

## Environment Variables
- `PORT` (optional, default: 3001)

## API Endpoints
### Vehicles
- `POST /vehicles` - Create a vehicle.
- `GET /vehicles` - List all vehicles.
- `GET /vehicles/:id` - Fetch a vehicle by id.
- `PUT /vehicles/:id` - Update a vehicle by id.
- `DELETE /vehicles/:id` - Delete a vehicle by id.

### Maintenance
- `POST /maintenance` - Schedule maintenance for a vehicle.
- `GET /maintenance/upcoming` - List upcoming maintenance.
- `PUT /maintenance/:id/status` - Update maintenance status.

## Folder Structure
```
src/
	app.js
	server.js
	routes/
	controllers/
	services/
	middleware/
	utils/
```

## Architecture
- `src/app.js` configures the Express app and routes.
- `src/server.js` starts the HTTP server.
- `src/routes` defines route wiring and route-level logging.
- `src/controllers` handles request orchestration and responses.
- `src/services` contains in-memory business operations.
- `src/middleware` provides logging, validation, and error handling.
- `src/utils` provides validation and response helpers.

## Logging Middleware
All requests, controller actions, service operations, and errors use the shared `Log` function from the logging middleware package for centralized observability.

## Error Handling and Validation
- Request bodies are validated via reusable middleware.
- Centralized error handling returns consistent error responses.

## Postman Testing
Use Postman to validate the endpoints. Include collections or environment files if required by your reviewer.

## Screenshots
Add API screenshots in a `screenshots/` folder for quick review during evaluations.

## Future Improvements
- Add persistent storage and migrations.
- Add pagination, filtering, and sorting to list endpoints.
- Add authentication and role-based access control.

## Author
Affordmed campus hiring submission.
