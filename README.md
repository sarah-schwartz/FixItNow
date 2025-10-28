# FixItNow

This is a full-stack web application for managing and tracking customer support tickets.  
It uses React for the frontend, Node.js and Express for the backend, and MongoDB for the database.

## How to run the project locally

#### 1. Clone the repository:

git clone https://github.com/chani315/React-Node-MongoDB.git  
cd React-Node-MongoDB

#### 2. Create environment variable files:

Inside the server/ folder, create a file called .env with the following content:
### Google Sign-In Setup
To enable Google Sign-In, you need to create a project in the Google Cloud Console and obtain a Client ID and Client Secret.

PORT=8080
DB_URL="mongodb+srv://sari:gkJy2HMGETKEttxE@seminar.sjbkq.mongodb.net/FixItNow-db"
JWT_SECRET="vyENJMKgbuf56tey8145%^&#@ubIWVEVGN652r54%#&^om"
GOOGLE_CLIENT_ID=your-google-client-secret
GOOGLE_CLIENT_SECRET=your-google-client-secret

Inside the client/ folder, create a file called .env with the following content:

REACT_APP_API_URL=http://localhost:5000

#### 3. Install the dependencies:

Go into the server folder and run:  
npm install

Then go into the client folder and run:  
npm install

#### 4. Start the project:

To run the backend:  
In the server folder, run:  
npm run dev

To run the frontend:  
In the client folder, run:  
npm start

Now the backend will run on port 8080, and the React frontend will run on port 5173.

---

## Tech Used

React (frontend)
Node.js + Express (backend)
MongoDB (database)
Ant Design (UI)
JWT (authentication)

---

## License

This project is open source under the MIT license.

<img width="1920" height="886" alt="image" src="https://github.com/user-attachments/assets/e791a374-6f65-43e7-8595-5a074efc7e0c" />

<img width="1920" height="887" alt="image" src="https://github.com/user-attachments/assets/d4c05e12-4ba3-4065-ae49-0873e2b50091" />

<img width="1920" height="888" alt="image" src="https://github.com/user-attachments/assets/cf7fe52a-c797-4dde-a42e-8c52cae29487" />
