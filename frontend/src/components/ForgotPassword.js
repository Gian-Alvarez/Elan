import React, {useState} from 'react';
import axios from 'axios';

function ForgotPassword()
{
	let bp = require('./Path.js');

    var email = '';
	const [message, setMessage] = useState('');

	const doForgotPassword = async event => 
	{
		event.preventDefault();

		let obj = {email:email.value};
		let js = JSON.stringify(obj);

		var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/forgotpassword'),	
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
                setMessage('Email Sent');
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
		<div id="forgotPasswordDiv">
			<form onSubmit={doForgotPassword}>
			<span id="inner-title">PLEASE ENTER THE NEEDED INFORMATION</span><br />
            <input type="text" id="email" placeholder="Email" 
				ref={(c) => email = c} /> <br />
			<input type="submit" id="forgotPasswordButton" class="buttons" value = "Do It"
				onClick={doForgotPassword} />
			</form>
			<span id="forgotPasswordResult">{message}</span>
		</div>
	);
};

export default ForgotPassword;