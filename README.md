
# 🏗 ConstructEdge – Construction Management System
## 📌 Project Overview

ConstructEdge is a full-stack Construction Project Management System developed to help construction companies digitally manage projects, employees, tasks, materials, and inventory efficiently.

The system provides role-based access control, dashboard analytics, and centralized management for all construction operations.

This project was developed as an academic major project using modern web technologies.

## 🚀 Features
🔐 Authentication & Authorization

- Secure login and registration
- Role-based access (Admin, Manager, Staff)
- Protected dashboard routes

📊 Project Management

- Create and manage construction projects
- Assign managers and employees
- Track project progress

👨‍💼 Employee Management

- Add and manage employee records
- Assign roles and responsibilities

✅ Task Management

- Task allocation to employees
- Task tracking and updates

📦 Inventory Management

- Material tracking
- Stock updates and monitoring

📈 Dashboard Analytics

- Project statistics
- Employee overview
- Inventory insights

## 🛠 Technology Stack
## Frontend

- React.js with TypeScript
- Vite build tool
- Tailwind CSS
- React Router
- Context API for authentication
- Axios for API communication

## Backend

- Java Spring Boot
- Spring Security
- RESTful API architecture

## Database

MySQL relational database


## 🏗 System Architecture

Frontend (React + TypeScript)
⬇ REST API Calls
Backend (Spring Boot)
⬇
MySQL Database

The project follows a layered architecture:

- Controller Layer – API endpoints
- Service Layer – Business logic
- Repository Layer – Database operations
- Database Layer – Data persistence

## 📂 Project Structure

```
ConstructEdge/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
└── README.md
```
## ⚙ Installation & Setup
### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ConstructEdge.git
cd ConstructEdge
```

## 2️⃣ Backend Setup (Spring Boot)

### Requirements

* Java 17+
* Maven
* MySQL Server

### Steps

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Update Database Configuration

Edit file:

```
src/main/resources/application.properties
```

### Example Configuration

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/construction_db
spring.datasource.username=root
spring.datasource.password=yourpassword
```

---

## 3️⃣ Frontend Setup (React)

### Requirements

* Node.js 16+

### Steps

```bash
cd frontend
npm install
npm run dev
```

### Frontend Runs On

```
http://localhost:5173
```

## 🎯 Future Improvements

* API documentation (Swagger)
* Advanced analytics dashboard
* Mobile responsive optimization
* Cloud deployment (AWS/Render)
* Notification system
* Real-time project tracking

---

## 👩‍💻 Author
```
Maheshwari Patil
BE in Computer Science Student
C-DAC Student
Specialization: Full Stack Development
```

---

## 📜 License

This project is developed for educational purposes.
You may use it for learning and academic reference.

---

## ⭐ Acknowledgment

Thanks to mentors, faculty, and online resources that supported the development of this project.
