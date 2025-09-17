const {initializeDatabase} = require("./db/db.connect");
initializeDatabase();

const tagRoutes = require("./routes/tag.routes");
const projectRoutes = require("./routes/project.routes");
const teamRoutes = require("./routes/team.routes");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessRate: 200,
};
app.use(cors(corsOptions));

//----------------------- user routes ----------------------------
app.use("/users", userRoutes);
//----------------------------------------------------------------


//----------------------- task routes ----------------------------
app.use("/tasks", taskRoutes);
//----------------------------------------------------------------


//----------------------- team routes ----------------------------
app.use("/teams", teamRoutes);
//----------------------------------------------------------------


//----------------------- project routes -------------------------
app.use("/projects", projectRoutes);
//----------------------------------------------------------------


//----------------------- tag routes -----------------------------
app.use("/tags", tagRoutes)
//----------------------------------------------------------------


//----------------------- home routes -----------------------------
//----------------------- home routes -----------------------------
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Workasana API",
        available_routes: {
            users: {
                base: "/users",
                description: "Manage users (CRUD)",
            },
            tasks: {
                base: "/tasks",
                description: "Manage tasks (CRUD)",
            },
            teams: {
                base: "/teams",
                description: "Manage teams (CRUD)",
            },
            projects: {
                base: "/projects",
                description: "Manage projects (CRUD)",
            },
            tags: {
                base: "/tags",
                description: "Manage tags (CRUD)",
            },
        },
        status: "API is running ✅"
    });
});
//----------------------------------------------------------------

//----------------------------------------------------------------


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
