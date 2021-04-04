import React, {useState} from 'react';

const TodoPostit = ({todo_item}) => {

    let postit_style = {'position':'fixed', 'background-color':'yellow', padding:"20px", "left":todo_item.x_pos, "top":todo_item.y_pos, border:"1px solid black", color:"#000"}
    return (
	<div style={postit_style}>
	    <p>{todo_item.label}</p>
	</div>
    );
}

export default TodoPostit;
