 # Agent Distributor API
 ## Setup
 1. Copy `.env.example` to `.env` and set values.
 2. Install deps and run:
 ```bash
 cd server
 npm install
 npm run dev
Server runs on 
http://localhost:5000 . A default admin will be seeded from 
ADMIN_PASSWORD).
 Endpoints
 • 
• 
• 
.env (ADMIN_EMAIL/
 POST /api/auth/login → { email, password } returns { token }
 GET /api/agents (admin) → list agents
 POST /api/agents (admin) → create agent { name, email, mobile, password }
 • 
• 
POST /api/upload (admin, multipart) → field 
file (.csv/.xlsx/.xls). Distributes equally among
 f
 irst 5 agents, sequential remainder.
 GET /api/upload/:batchId (admin) → fetch distribution for a batch
  File Format
 Columns required (case-insensitive): - FirstName (text) - Phone (number/text) - Notes (text, optional)
 Accepts 
.csv , 
.xlsx , 
.xls . 
### Root README (to include in main repo)
 ```md
 # MERN Agent Distributor
 A MERN stack app with Admin login, Agent creation, and CSV/XLS(X) upload & equal 
distribution to 5 agents with saved results in MongoDB.
 ## Tech- MongoDB, Mongoose- Express.js + JWT + Multer- React (Vite) + Tailwind
 ## Quick Start
 ```bash
 # Backend
 cd server
 cp .env.example .env
 npm install
 npm run dev
 # Frontend (in new terminal)
 cd ../client
 cp .env.example .env
 npm install
 npm run dev
 Login with the seeded admin in 
server/.env .
## 5) Sample Data
 Create `sample.csv` to test:
 --
## 6) Linting & Extras (Optional)- Add ESLint/Prettier for style consistency- Add pagination for agents and items- Add search/filter on distribution list- Replace localStorage with httpOnly cookies if needed