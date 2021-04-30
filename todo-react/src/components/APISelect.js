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
		<option value="api-python">Python API</option>
		<option value="api-python">JavaScript / Node API</option>
	    </select>
	</div>
    );
}

export default APISelect;
