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


    
  return (
      <div className="App">
	  <div className="AppCanvas">
	      <Button label="+" handleClick={()=>{
			  const newpost = {'label':'','x_pos':20,'y_pos':20, 'is_new':true};
			  setTodos( (l) => { l.push(newpost) });
	      }}/>
	      { todos.map( x => <TodoPostit todo_item={x}/> )}
	  </div>

	  <APISelect setArmedAPI={setArmedAPI}/>   
    </div>
  );
}

export default App;
