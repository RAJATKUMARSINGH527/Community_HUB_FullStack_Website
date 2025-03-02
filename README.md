# 🌐 Community Collaboration Platform  

## 🚀 Project Overview  
This platform enables users to **share ideas, collaborate, and interact** in a social community. Users can **sign up, create posts, like/comment on posts, and engage** with others.  

Built with **React (frontend), Node.js/Express (backend), and MongoDB (database)**, this project showcases full-stack development.  

🔗 **Live Demo:** [Click on the given link to view the deployed application](#) *(https://community-hub-full-stack-website.vercel.app/)*  

---

## ✨ Key Features & Technologies  

### 🌟 Features  
✅ User Authentication (Signup/Login with JWT)  
✅ Secure API with JWT-based authentication  
✅ CRUD operations for posts (Create, Read, Update, Delete)  
✅ Like and Comment on posts  
✅ Responsive UI  

### 🛠️ Tech Stack  
#### **Frontend (React + Vite)**
- React.js (UI framework)
- React Router (Navigation)
- Cascading Style Sheets 3 (Styling)
- Axios (API calls)

#### **Backend (Node.js + Express)**
- Node.js (Server-side runtime)
- Express.js (API framework)
- MongoDB + Mongoose (Database)
- JWT (Authentication)
- Bcrypt (Password encryption)

#### **Deployment**
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas  

---

## ⚙️ Setup Instructions  

### 🔹 1. Clone the Repository  
```bash
git clone https://github.com/RAJATKUMARSINGH527/Community_HUB_FullStack_Website.git

cd Community_HUB_FullStack_Website
```
🔹 2. Setup Backend

1️⃣ Navigate to the backend folder:

```bash
cd Backend

```

2️⃣ Install dependencies:

```bash
npm install

```
**3️⃣ Create a .env file and add your MongoDB URI & JWT Secret:**

```ini
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**4️⃣ Start the backend server:**

```bash
npm start

```
Backend runs on http://localhost:5000

**🔹 3. Setup Frontend**

1️⃣ Navigate to the frontend folder:

```bash
cd ../Frontend

```

**2️⃣ Install dependencies:**

```bash
npm install

```

**3️⃣ Start the frontend:**

```bash
npm run dev

```
Frontend runs on http://localhost:5173

## 🛠️ API Endpoints  

### 🔹 Authentication Routes
| Method | Endpoint | Description | Request Body |
|--------|---------|-------------|--------------|
| POST | `/auth/register` | Register a new user | `{ "name": "John", "email": "john@example.com", "password": "123456" }` |
| POST | `/auth/login` | Login user | `{ "email": "john@example.com", "password": "123456" }` |

### 🔹 Post Routes
| Method | Endpoint | Description | Request Body |
|--------|---------|-------------|--------------|
| POST | `/posts` | Create a post | `{ "title": "Post Title", "content": "Post Content" }` |
| GET | `/posts` | Get all posts | N/A |
| GET | `/posts/:id` | Get a single post by ID | N/A |
| PUT | `/posts/:id` | Update a post | `{ "title": "Updated Title", "content": "Updated Content" }` |
| DELETE | `/posts/:id` | Delete a post | N/A |

### 🔹 User Routes
| Method | Endpoint | Description | Request Body |
|--------|---------|-------------|--------------|
| GET | `/users/:id` | Get user profile by ID | N/A |


### 🌍 Deployment Links

Frontend (Vercel): Live App *(https://community-hub-full-stack-website.vercel.app/)* 

Backend (Render): Live API *()* 


### 📹 Video Presentation

🎥 Watch the project demo here: Google Drive Link *(https://drive.google.com/drive/folders/1Gd93ch_Zgfd7XiPbXOqnorz1NJjSyv4q?usp=drive_link)* 

