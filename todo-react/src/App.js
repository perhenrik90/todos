import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import TodoPostit from './components/TodoPostit.js';

function App() {
   const [todos, setTodos] = useState( [] );
    const [loaded, setLoaded] = useState(false);
    useEffect( () => {
	fetch('/api_python/todo').then( res => res.json()).then( (data) => {setTodos(data); setLoaded(true);})
    }, [loaded]);



    
  return (
	  <div className="App">
	  <div className="AppCanvas">
	      { todos.map( x => <TodoPostit todo_item={x}/> )}
	  </div>
    </div>
  );
}

export default App;
