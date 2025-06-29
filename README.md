# Plant Watery

Plant Watery is an application designed to help you track and manage the watering habits of your plants. With this tool, you will never forget to water your plants or risk overwatering them again. The app allows you to log each watering event, monitor your plants' needs, and receive reminders to ensure optimal plant health.

## Architecture

Plant Watery is built with a modern, modular architecture:

- **Backend:**
  - Developed in C# using ASP.NET Core.
  - Provides a RESTful API for managing plants, watering events, and user data.
  - Uses PostgreSQL as the primary database for storing all application data.
  - Organized in a clean solution structure with separate projects for API, Application logic, Domain models, and Infrastructure.

- **Frontend:**
  - Built with Angular for a responsive and user-friendly interface.
  - Communicates with the backend API to display plant data and manage watering schedules.
  - Uses modern web technologies and best practices for maintainability and scalability.

- **Authentication & Security:**
  - Auth0 is used as the Identity Provider for secure authentication and authorization.
  - Communication between the client and API is secured using JWT access tokens, ensuring that only authorized users can access and modify data.

- **Folder Structure:**
  - `api/` — Contains the .NET backend projects (API, Application, Domain, Infrastructure).
  - `client/` — Contains the Angular frontend application.

This separation of concerns ensures that each part of the application is easy to maintain, test, and extend. The backend and frontend communicate via HTTP, making it possible to deploy them independently or together as needed.
