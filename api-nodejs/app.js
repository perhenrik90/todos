const { Pool, Client } = require('pg')
const express = require('express');
const app = express();
const port = 3000;

app.get('/api_nodejs/todo', async (req,res) => {
    const c = new Client();
    await c.connect();

    if (req.method == "GET"){
	const res_pg = await c.query("SELECT id,label, app,x_pos,y_pos FROM todo;")
	res.json(res_pg.rows);
    }
    if (req.method == "POST"){
	console.log( req.body );
	res.json( req.body );
    }
});


app.listen(port, () =>{
    console.log(`Nodejs API listening at ${port}`);
});






