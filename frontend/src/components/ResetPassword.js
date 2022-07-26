import React, {useState} from 'react';
import {useLocation} from 'react-router-dom'
import axios from 'axios';

function ResetPassword()
{
    let bp = require('./Path.js');
    
    var password = '';
	const search = useLocation().search;
	const ahjst = new URLSearchParams(search).get('ahjst');

	const [message, setMessage] = useState('');

	const doResetPassword = async event => 
    {
        event.preventDefault();

		let obj = {ahjst:ahjst, password:password.value};
		let js = JSON.stringify(obj);

		var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/resetpassword'),	
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
				setMessage('Password Reset');
                window.location.href = '/';
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    };

    return (
		<div id="resetPasswordDiv">
			<form onSubmit={doResetPassword}>
			<span id="inner-title">TYPE IN NEW PASSWORD</span><br />
            <input type="text" id="password" placeholder="New Password" 
				ref={(c) => password = c} /> <br />
			<input type="submit" id="resetPasswordButton" class="buttons" value = "Do It"
				onClick={doResetPassword} />
			</form>
			<span id="loginResult">{message}</span>
		</div>
	);
};

export default ResetPassword;