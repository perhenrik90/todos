const { Pool, Client } = require('pg')

const express = require('express');
const app = express();

const port = 3000;

const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.get('/api_nodejs/todo', async (req,res) => {
    const c = new Client();
    await c.connect();
    const res_pg = await c.query("SELECT id,label, app,x_pos,y_pos FROM todo;")
    res.json(res_pg.rows);
});

app.post('/api_nodejs/todo', async (req,res) => {
    // must have Content-type: application/json
    const c = new Client();
    await c.connect();

    let x = parseInt(Math.random()*1200);
    let y = parseInt(Math.random()*800);
    
    sql = "INSERT INTO todo (label, app, x_pos,y_pos) VALUES ('"+req.body["label"]+"', 'JavaScript/Node', "+x+","+y+") RETURNING *;"
    const res_pg = await c.query(sql)
});



app.listen(port, () =>{
    console.log(`Nodejs API listening at ${port}`);
});






