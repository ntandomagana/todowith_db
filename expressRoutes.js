import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';



import pkg from 'pg';
const {Pool} = pkg;



const app = express();

app.use(cors());
app.use(bodyParser.json());


// app.disable('X-powered-by');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todolistdatabase",
  password: "Khetha100%",
  port: 5432,
});



app.get('/', async (req,res) => {
    try{
    const result = await pool.query('CREATE TABLE IF NOT EXISTS myTodoTable(id VARCHAR(40), task VARCHAR(255), isDone bool)');
    res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: "Server Error" });
    }
});

app.get('/tasks', async (req,res) => {
    try{

        const result = await pool.query(
          "SELECT * FROM myTodoTable ORDER BY isDone, id DESC"
        );
    res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: "Server Error" });
    }
});

app.post('/saveTask', async (req, res) => {
    const {id, task, isdone} = req.body;
    const result = await pool.query(
      `INSERT INTO myTodoTable(id, task, isDone) VALUES(\'${id}\', \'${task}\', \'${isdone}\') RETURNING task `
    );
    res.json(result.rows);
});

app.put('/updateTask', async (req, res) => {
    const { id, task, isdone } = req.body;
    const result = await pool.query(`UPDATE myTodoTable SET task='${task}', isDone='${isdone}' WHERE id='${id}'`);
    res.json(result.rows);
});

app.delete('/deleteTask', async (req, res) => {
    const { id } = req.body;
    const result = await pool.query(`DELETE FROM myTodoTable WHERE id='${id}'`);
    res.json(result.rows);
});

app.delete('/deleteAll', async (req, res) => {
    const result = await pool.query(`DELETE FROM myTodoTable`);
    res.json(result.rows);
});

export {app};