import React, {useDebugValue, useState} from 'react';
import {useLocation} from 'react-router-dom'
import axios from 'axios';

function VerifyEmail()
{
	var storage = require('../tokenStorage.js');
	let bp = require('./Path.js');

	const search = useLocation().search;
	const ahjst = new URLSearchParams(search).get('ahjst');

	const [message, setMessage] = useState('');

	const doVerifyEmail = async event => 
	{
		event.preventDefault();

		var tok = storage.retrieveToken();
		let obj = {ahjst:ahjst, jwtToken:tok};
		let js = JSON.stringify(obj);

		var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/verifyemail'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };

		axios(config).then(function (response) 
        {
            var res = response.data;

            if (res.error) 
            {
                setMessage('User/Password combination incorrect');
            }
            else 
            {	
				setMessage('Click to Login');
			
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
	};

	return (
		<div id="loginDiv">
			<form onSubmit={doVerifyEmail}>
			<span id="inner-title">PLEASE VERIFY EMAIL</span><br />
			<input type="submit" id="loginButton" class="buttons" value = "Do It"
				onClick={doVerifyEmail} />
			</form>
			<span id="loginResult">{message}</span>
		</div>
	);
};

export default VerifyEmail;
