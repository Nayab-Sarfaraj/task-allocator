# 🚀 MERN Stack Task Management App


## Overview
This is a MERN stack-based application that allows an admin user to log in, create and manage agents, upload CSV/XLSX files, and distribute tasks among agents equally.

---

## Features

### 1. Admin User Login
- Admin can log in using email and password.
- Secure authentication with JWT.
- Tokens are stored as HTTP-only cookies.

### 2. Agent Management
- Create agents by providing:
  - Name
  - Email
  - Mobile number (with country code)
  - Password
- Manage agents from the dashboard.


### 3. CSV/XLSX Upload and Task Distribution
- Upload CSV/XLSX files containing:
  - First Name (Text)
  - Phone (Number)
  - Notes (Text)
- Distributes tasks equally among  agents.



## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js , Bcrypt , Cors
- **Database**: MongoDB
- **Authentication**: JWT
- **File Handling**: Multer, xlsx, csvtojson


---

## 📦 Installation

1.  **Clone the repository:** `git clone https://github.com/Nayab-Sarfaraj/task-allocator/`
2.  **Install dependencies:**
    *   Frontend: `cd client && npm install`
    *   Backend: `cd server && npm install`
3.  **Configure MongoDB:** Ensure MongoDB is running and update the connection string in the backend configuration.
4.  **Run the application:**
    *   Frontend: `cd client && npm run dev`
    *   Backend: `cd server && npm start`
5.  **Access the application:** Open your browser and navigate to the frontend URL (usually `http://localhost:5173`).
---

## ⚙️ Creating the Admin Account
(This endpoint is specifically designed to facilitate the evaluation of the application by allowing evaluators to create an admin account.It is just for testing purpose )
- Start the backend by executing npm run dev or npm start in terminal.
- Go to the post and make a post request to the end point (`http://localhost:8080/api/v1/test/admin`).
- You will need to provide name , email , phone , countryCode , password in the body.

---
## API Endpoints

*   `POST /api/v1/login`: To Login.
*   `POST /api/v1/add-agent`: To add new agent.
*   `GET /api/v1/get-all-agent`: To get all the agents.
*   `GET /api/v1/me`: To get user profile credentials.
*   `GET /api/v1/logout`: To Logout.
*   `POST /api/v1/task/upload`:To upload csv and distribute task. 
  

