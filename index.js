const {initializeDatabase} = require("./db/db.connect");

const Tag = require("./models/tag.models");
const User = require("./models/user.models");
const Project = require("./models/project.models");
const Team = require("./models/team.models");
const Task = require("./models/task.models");

const tagRoutes = require("./routes/tag.routes");
const projectRoutes = require("./routes/project.routes");
const teamRoutes = require("./routes/team.routes");
const taskRoutes = require("./routes/task.routes");

const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());


initializeDatabase()


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



// -----------------------------------------------------------
// uncomment the following code for seeding data
// const {seedTagsCollection} = require("./seeders/seeder");
// seedTasksCollection();
// seedTagsCollection();
// seedUsersCollection();
// seedProjectsCollection();
// seedTeamsCollection();
// seedTasksCollection();
// -----------------------------------------------------------