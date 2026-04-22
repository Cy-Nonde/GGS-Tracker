// server/server.js
//These are my CRUD declarations

const express = require("express");
const cors = require("cors");
const app = express();
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");
const collaboratorRoutes = require("./routes/collaborators");
const commentRoutes = require("./routes/comments");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/collaborators", collaboratorRoutes);
app.use("/api/comments", commentRoutes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log(`
======================================================        
    CS4035 Final Project Server    
    Running at http://localhost:3000
======================================================        
    `);
});

//Helmet (header security)
const express = require("express");
const helmet = require("helmet");
const app = express();

app.use(helmet()); // adds secure HTTP headers
app.use(express.json());