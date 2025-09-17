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

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
