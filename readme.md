# Full Stack Todo App with Authentication

This project is a full-stack Todo application with user authentication. It consists of a frontend built with React, TypeScript, and Vite, and a backend built with Express and Prisma. The application allows users to sign up, sign in, create, update, and delete todos, and manage categories for their todos.

## Features

- User authentication (sign up, sign in, sign out, change password, delete account)
- Create, update, and delete todos
- Manage categories for todos
- Dark and light theme support
- Persistent state with React Query and local storage

## Technologies Used

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- Axios
- Radix UI
- Zod

### Backend

- Express
- TypeScript
- Prisma
- PostgreSQL
- Better Auth
- Dotenv

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/full-stack-todo-app.git
cd full-stack-todo-app
```

2. Install frontend dependencies
   cd client
   npm install

3. Install backend dependencies
   cd ../server
   npm install

4. Set up environment variables

Create a `.env` file in the `server` directory and add the following:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/tododb
PORT=5000
VITE_API_URL=http://localhost:5000/api
```

5. Start the backend server
   cd server
   npm start

6. Start the frontend development server
   cd client
   npm run dev

The application should now be running at [http://localhost:5173](http://localhost:5173).

## Project Structure

### Frontend

- `components`: React components
- `hooks`: Custom hooks
- `services`: API service functions
- `lib`: Utility functions and authentication library
- `main.tsx`: Entry point for the React application

### Backend

- `app`: Application logic (controllers and routes)
- `lib`: Authentication library
- `middleware`: Middleware functions
- `routes`: API routes
- `index.ts`: Entry point for the Express server

## Scripts

### Frontend

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run lint`: Run ESLint

### Backend

- `npm start`: Start the backend server
- `npm run migrate`: Run Prisma migrations

```

```
