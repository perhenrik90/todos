import React, { useState, useEffect } from 'react';


const Button = ({label, handleClick}) => {
    let button_style = {background:"rgb(232, 94, 94)"};
    return (
	<div style={button_style} onClick={ ()=>{handleClick(this);}}>
	    <p>{label}</p>
	</div>
    );
}
export default Button;
