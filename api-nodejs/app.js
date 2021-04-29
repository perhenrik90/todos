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

    const c = new Client();
    await c.connect();
    sql = "INSERT INTO todo (label, app, x_pos,y_pos) VALUES ('"+req.body["label"]+"', 'JavaScript/Node', 1,1) RETURNING *;"
    console.log( sql );
    const res_pg = await c.query(sql)
    res.json( req.body );
});



app.listen(port, () =>{
    console.log(`Nodejs API listening at ${port}`);
});






