About the Project
The AffordMed URL Shortener is a full-stack web application developed as part of the AffordMed Campus Hiring Evaluation. It provides users with a streamlined way to shorten long URLs, generate custom shortcodes, set expiration durations, and retrieve analytics for each link.

Key Features:
Backend (Node.js + Express + MongoDB)
A RESTful API service that handles URL shortening, expiration logic, click tracking, and MongoDB-based persistence.

Frontend (React + Material UI)
A responsive React application that allows users to shorten up to five URLs at once. It supports input validation and displays shortened URLs along with their expiry times.

Logging Middleware
A custom logging middleware is implemented that logs every request to the specified external logging endpoint using a provided authorization token.

Expiration Handling
If no validity is provided, the shortened link expires after 30 minutes by default. Custom durations can be specified in minutes.

Analytics Endpoint
The backend supports statistics retrieval for each shortened URL, including total clicks, timestamps, source, and geo-location (if implemented).

Client-Side Validation
Ensures URLs are well-formed, validity is an integer, and limits input to five concurrent URLs.

