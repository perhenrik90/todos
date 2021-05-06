import React, { useState, useEffect } from 'react';


const APISelect = ({setArmedAPI}) => {
    /**
     * API selector 
     * Sets the armed / API in use
     **/
    return (
	<div>
	    <p>Select API</p>
	    <select onChange={ (e) => { setArmedAPI(e.target.value);}}>
		<option value="api_python">Python API</option>
		<option value="api_nodejs">JavaScript / Node API</option>
		<option value="api_rust">Rust</option>
	    </select>
	</div>
    );
}

export default APISelect;
