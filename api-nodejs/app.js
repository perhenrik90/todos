const express = require('express');
const app = express();
const port = 3000;

app.get('/api_nodejs/todo', (req,res) => {
    todos = [{"label":"API not implemented yet!"}]
    res.json(todos);
});


app.listen(port, () =>{
    console.log(`Nodejs API listening at ${port}`);
});






