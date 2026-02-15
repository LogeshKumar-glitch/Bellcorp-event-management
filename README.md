# Bellcorp Event Management Application

A full-stack MERN application that allows users to browse events, register for events, and manage their registrations with authentication and protected routes.

---

## 🚀 Features

### Authentication

- User Signup
- User Login (JWT based)
- Protected routes for authenticated users

### Events

- Browse all available events
- View event details
- Register for events
- Prevent duplicate registrations
- Event capacity check

### Dashboard

- View registered events
- Upcoming & registered event listing

---

## 🛠️ Tech Stack

### Frontend

- React.js (Vite)
- React Router
- Axios
- Context API

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

---

## 📁 Project Structure

bellcorp-event-management/
├── client/
├── server/
├── README.md

---

## ⚙️ Environment Variables

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key

---

## ▶️ Running Locally

Backend:
cd server
npm install
npm start

Frontend:
cd client
npm install
npm run dev

---

## 📦 Deployment

Frontend: Vercel  
Backend: Render  
Database: MongoDB Atlas

---

## 👤 Author

Bellcorp Event Management Assignment
