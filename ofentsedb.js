const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());

const port = 2095;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tododb",
  password: "",
  port: 5432,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// SELECT TASK
app.get("/todo/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM todo_list WHERE todo_id = $1",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Task not found" });
  }
});

// EDIT TASK
app.put("/edittask/:id", async (req, res) => {
  const id = req.params.id;
  const todo_task  = req.body.todo_task;

  try {
    await pool.query("UPDATE todo_list SET todo_task = $1 WHERE todo_id = $2", [
      todo_task,
      id,
    ]);
    res.json({ success: "Task updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Couldn't update task" });
  }
});

// UPDATE STATUS OF TASK
app.put("/editstatus/:id", async (req, res) => {
  const id = req.params.id;
  const todo_status = req.body.todo_status;

  try {
    await pool.query(
      "UPDATE todo_list SET todo_status = $1 WHERE todo_id = $2",
      [todo_status, id]
    );
    res.json({ success: "Status updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Couldn't update status" });
  }
});

// INSERT TASK
app.post("/insert", async (req, res) => {
  const { todo_id, todo_task, todo_status } = req.body;

  try {
    await pool.query(
      "INSERT INTO todo_list (todo_id, todo_task, todo_status) VALUES ($1, $2, $3)",
      [todo_id, todo_task, todo_status]
    );
    res.json({ success: "Task inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Couldn't insert task" });
  }
});

// DELETE TASK
app.delete("/delete/:todo_id", async (req, res) => {
  const id = req.params.todo_id;

  try {
    await pool.query("DELETE FROM todo_list WHERE todo_id = $1", [id]);
    res.json({ success: "Task deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Couldn't delete task" });
  }
});
