import logo from './logo.svg';
import './App.css';

import TodoPostit from './components/TodoPostit.js';

function App() {

    let todo_test = {"label":"Test todo","x_pos":10, "y_pos":10}
  return (
	  <div className="App">
	  <div className="AppCanvas">
	  <TodoPostit todo_item={todo_test} />
	  </div>
    </div>
  );
}

export default App;
