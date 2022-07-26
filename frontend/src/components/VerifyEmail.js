import React, {useState} from 'react';
import {useLocation} from 'react-router-dom'
import axios from 'axios';

function VerifyEmail()
{
	let bp = require('./Path.js');

	const search = useLocation().search;
	const ahjst = new URLSearchParams(search).get('ahjst');

	const [message, setMessage] = useState('');

	const doVerifyEmail = async event => 
	{
		event.preventDefault();

		let obj = {ahjst:ahjst};
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
		<div id="verifyEmailDiv">
			<form onSubmit={doVerifyEmail}>
			<span id="inner-title">PLEASE VERIFY EMAIL</span><br />
			<input type="submit" id="verifyEmailButton" class="buttons" value = "Do It"
				onClick={doVerifyEmail} />
			</form>
			<span id="verifyEmailResult">{message}</span>
		</div>
	);
};

export default VerifyEmail;