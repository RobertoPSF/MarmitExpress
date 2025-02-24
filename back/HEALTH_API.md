# HEALTH API Documentation

## Authentication
This endpoint does not require authentication as it is used for health monitoring.

## 1. Health
- **HTTP Method:** GET
- **Endpoint:** `/health`
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "status": "Ok",
    "timestamp": "2023-10-15T12:00:00Z"
  }
