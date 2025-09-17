# Workasana Backend

This is the backend for the **Workasana** project management app.  
It provides RESTful APIs for managing users, tasks, teams, projects, and tags.

## 🚀 Tech Stack
- **Node.js** with **Express.js** – REST API framework
- **MongoDB** with **Mongoose ODM** – Database
- **dotenv** – Environment variable management

## 📂 Project Structure
```

.
├── db/
│   └── db.connect.js        # Database connection logic
├── models/
│   ├── tag.models.js
│   ├── user.models.js
│   ├── project.models.js
│   ├── team.models.js
│   └── task.models.js
├── routes/
│   ├── tag.routes.js
│   ├── user.routes.js
│   ├── project.routes.js
│   ├── team.routes.js
│   └── task.routes.js
├── controllers/
│   ├── tag.controllers.js
│   ├── user.controllers.js
│   ├── project.controllers.js
│   ├── team.controllers.js
│   └── task.controllers.js
├── seeders/
│   └── seeder.js            # Data seeding (optional)
├── index.js                 # Main entry point
├── .env
├── README.md
├── package-lock.json
├── .gitignore
└── package.json

````

## ⚙️ Setup & Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/ravipatelctf/backend-workasana.git
    cd backend-workasana
    ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**
   Create a `.env` file in the root with:

   ```env
   PORT=5000
   MONGO_URL=<your_mongodb_connection_string>
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

   Server will run at:

   ```bash
   http://localhost:5000
   ```

5. **Seed Database**( optional ) → To populate the database with sample data, run:

   ```bash
   node seeders/seeder.js
   ```


## 📌 API References

>**baseURL:** `http://localhost:5000`

## Users

* **`POST /users`** → Create a new user<br>
    **Sample Request Body:**
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "securepassword123"
    }
    ```
    **Sample Response Body:**
    ```json
    {
        "message": "User created successfully."
    }
    ```

* **`GET /users`** → Get all users<br>
    **Sample Response Body:**
    ```json
    [
        {
            "_id": "68c999734974b8ae82dd80aa",
            "name": "John Doe",
            "email": "john@example.com",
            "password": "securepassword123",
            "createdAt": "2025-09-17T07:20:50.235Z",
            "updatedAt": "2025-09-17T07:20:50.235Z",
            "__v": 0
        },
        {
            "_id": "68c999924974b8ae82dd80ae",
            "name": "Jane Smith",
            "email": "jane@example.com",
            "password": "mypassword456",
            "createdAt": "2025-09-17T07:25:10.512Z",
            "updatedAt": "2025-09-17T07:25:10.512Z",
            "__v": 0
        }
    ]
    ```

* **`GET /users/:userEmail`** → Get a user by email<br>
    **Sample Response Body:**
    ```json
    {
        "_id": "68c999734974b8ae82dd80aa",
        "name": "John Doe",
        "email": "john@example.com",
        "password": "securepassword123",
        "createdAt": "2025-09-17T07:20:50.235Z",
        "updatedAt": "2025-09-17T07:20:50.235Z",
        "__v": 0
    }
    ```

* **`PUT /users/:userId`** → Update a user by ID<br>
    **Sample Request Body:**
    ```json
    {
        "name": "John Updated",
        "email": "johnupdated@example.com"
    }
    ```
    **Sample Response Body:**
    ```json
    {
        "message": "User updated successfully."
    }
    ```

* **`DELETE /users/:userId`** → Delete a user by ID<br>
    **Sample Response Body:**
    ```json
    {
        "message": "User deleted successfully."
    }
    ```


## Tasks

* **`POST /tasks`** → Create a new task<br>
    **Sample Request Body:**
    ```json
    {
        "name": "Build Authentication System",
        "project": "68c999734974b8ae82dd80aa",
        "team": "68c999924974b8ae82dd80ae",
        "teamMembers": ["68c99a024974b8ae82dd80b2", "68c99a184974b8ae82dd80b5"],
        "tags": ["68c99a324974b8ae82dd80b8"],
        "timeToComplete": 12,
        "status": "To Do"
    }
    ```
    **Sample Response Body:**
    ```json
    {
        "message": "Task created successfully."
    }
    ```

* **`GET /tasks`** → Get all tasks (supports query filters: `name`, `project`, `team`, `teamMembers`, `tags`, `status`)<br>
    **Sample Request URL:**  
    ```
    GET /tasks?project=ProjectA&status=In%20Progress
    ```
    **Sample Response Body:**
    ```json
    [
        {
            "_id": "68c99a524974b8ae82dd80bc",
            "name": "Build Authentication System",
            "project": "68c999734974b8ae82dd80aa",
            "team": "68c999924974b8ae82dd80ae",
            "teamMembers": [
                "68c99a024974b8ae82dd80b2",
                "68c99a184974b8ae82dd80b5"
            ],
            "tags": ["68c99a324974b8ae82dd80b8"],
            "timeToComplete": 12,
            "status": "In Progress",
            "createdAt": "2025-09-17T08:10:00.235Z",
            "updatedAt": "2025-09-17T08:10:00.235Z",
            "__v": 0
        }
    ]
    ```

* **`PUT /tasks/:taskId`** → Update a task by ID<br>
    **Sample Request Body:**
    ```json
    {
        "status": "Completed",
        "timeToComplete": 10
    }
    ```
    **Sample Response Body:**
    ```json
    {
        "message": "Task updated successfully."
    }
    ```

* **`DELETE /tasks/:taskId`** → Delete a task by ID<br>
    **Sample Response Body:**
    ```json
    {
        "message": "Task deleted successfully."
    }
    ```

## Projects

* **`POST /projects`** → Create a new project<br>
    **Sample Request Body:**
    ```json
    {
        "name": "Work Management System",
        "description": "Manages tasks, teams, and deadlines."
    }
    ```
    **Sample Response Body:**
    ```json
    {
        "message": "Project created successfully."
    }
    ```

* **`GET /projects`** → Get all projects<br>
    **Sample Response Body:**
    ```json
    [
        {
            "_id": "68c998734974b8ae82dd80aa",
            "name": "Work Management System",
            "description": "Manages tasks, teams, and deadlines.",
            "createdAt": "2025-09-17T07:20:50.235Z",
            "updatedAt": "2025-09-17T07:20:50.235Z",
            "__v": 0
        },
        {
            "_id": "68c998924974b8ae82dd80ae",
            "name": "E-Commerce Platform",
            "description": "Online store for electronics and clothing.",
            "createdAt": "2025-09-17T07:25:10.512Z",
            "updatedAt": "2025-09-17T07:25:10.512Z",
            "__v": 0
        }
    ]
    ```

* **`PUT /projects/:projectId`** → Update a project by ID<br>
    **Sample Request Body:**
    ```json
    {
        "name": "Updated Project Name",
        "description": "Updated project description."
    }
    ```
    **Sample Response Body:**
    ```json
    {
        "message": "Project updated successfully."
    }
    ```

* **`DELETE /projects/:projectId`** → Delete a project by ID<br>
    **Sample Response Body:**
    ```json
    {
        "message": "Project deleted successfully."
    }
    ```


## Teams

* **`POST /teams`** → Create a new team<br>
    **Sample Request Body:**
    ```json
    {
        "name": "Frontend Devs",
        "description": "Team handling all frontend work."
    }
    ```
    **Sample Response Body:**
    ```json
    {
        "message": "Team Created Successfully."
    }
    ```

* **`GET /teams`** → Get all teams<br>
    **Sample Response Body:**
    ```json
    [
        {
            "_id": "68c998734974b8ae82dd80aa",
            "name": "Frontend Devs",
            "description": "Team handling all frontend work.",
            "createdAt": "2025-09-17T07:20:50.235Z",
            "updatedAt": "2025-09-17T07:20:50.235Z",
            "__v": 0
        },
        {
            "_id": "68c998924974b8ae82dd80ae",
            "name": "Backend Devs",
            "description": "Responsible for APIs and database.",
            "createdAt": "2025-09-17T07:25:10.512Z",
            "updatedAt": "2025-09-17T07:25:10.512Z",
            "__v": 0
        }
    ]
    ```

* **`PUT /teams/:teamId`** → Update a team by ID<br>
    **Sample Request Body:**
    ```json
    {
        "name": "Fullstack Team",
        "description": "Handles both frontend and backend."
    }
    ```
    **Sample Response Body:**
    ```json
    {
        "message": "Team updated successfully."
    }
    ```

* **`DELETE /teams/:teamId`** → Delete a team by ID<br>
    **Sample Response Body:**
    ```json
    {
        "message": "Team deleted successfully."
    }
    ```

## Tags

* **`POST /tags`** → Create a new tag<br>
    **Sample Request Body:**
    ```json
    {
        "name": "wireframes"
    }
    ```
    **Sample Response Body:**
    ```json
    {
        "message": "Tag created successfully."
    }
    ```
* **`GET /tags`** → Get all tags<br>
    **Sample Response Body:**
    ```json
    [
        {
            "_id": "68c998734974b8ae82dd80aa",
            "name": "wireframes",
            "__v": 0
        },
        {
            "_id": "68c998924974b8ae82dd80ae",
            "name": "bug",
            "__v": 0
        }
    ]
    ```
* **`DELETE /tags/:tagId`** → Delete a tag by ID<br>
    **Sample Response Body:**
    ```json
    {
        "message": "Tag deleted successfully."
    }
    ```