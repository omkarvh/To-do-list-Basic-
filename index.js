import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "Omkar",
    port: 5000,
  });
  db.connect();

  app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Assuming you have already imported necessary modules and configured your app and database connection

async function getTask(){
    const tasks = await db.query("SELECT id, task, task_date FROM task_manager");
    return  tasks.rows;
}

app.get("/" ,async (req, res) => {

    try {
        const allTasks = await getTask();
        res.render("index.ejs", { allTasks: allTasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send("Error fetching tasks");
    }

} );

// insert new task 
app.post("/add", async (req, res) => {
  const newTask = req.body["task"];

  try {
      await db.query("INSERT INTO task_manager (task) VALUES ($1)", [newTask]);
      res.redirect("/");
  } catch (error) {
      console.error("Error inserting new task:", error);
      res.status(500).send("Error inserting new task");
  }
});

// delete task 
// Route to delete a task by ID
app.post("/del", async (req, res) => {
  const taskId = req.body.delTask;
  console.log("Task ID to delete:", taskId);

  try {
    await db.query("DELETE FROM task_manager WHERE id = $1", [taskId]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});
  // Add your deletion logic here, e.g., remove the task from the database


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });