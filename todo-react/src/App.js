import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import TodoPostit from './components/TodoPostit.js';
import APISelect from './components/APISelect.js';
import Button from './components/Button.js';


function App() {
    const [todos, setTodos] = useState( [] );
    const [loaded, setLoaded] = useState(false);
    const [armedAPI, setArmedAPI] = useState(null);
    
    useEffect( () => {
	setArmedAPI('api_python');
	fetch('/'+armedAPI+'/todo').then( res => res.json()).then( (data) => {setTodos(data); setLoaded(true);})
    }, [loaded,armedAPI]);


    const savePost = (post) =>{
	setLoaded(false)
	let context = {
	    method: 'POST', // *GET, POST, PUT, DELETE, etc.
	    mode: 'cors', // no-cors, *cors, same-origin
	    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	    credentials: 'same-origin', // include, *same-origin, omit
	    headers: {
		'Content-Type': 'application/json'
		// 'Content-Type': 'application/x-www-form-urlencoded',
	    },
	    body: JSON.stringify(post)
	}
	fetch('/'+armedAPI+'/todo', context).then( res => res.json()).then( () => {setLoaded(true);})
    }
    

  return (
      <div className="App">
	  <div className="AppCanvas">
	      <Button label="+" handleClick={()=>{
			  const newpost = {'label':'','x_pos':20,'y_pos':20, 'is_new':true};
			  setTodos(todos.concat(newpost));
	      }}/>
	      { todos.map( x => <TodoPostit todo_item={x} savePost={savePost}/> )}
	  </div>

	  <APISelect setArmedAPI={setArmedAPI}/>   
    </div>
  );
}

export default App;
