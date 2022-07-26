import React, {useState} from 'react';
import axios from 'axios';

function FTLogin()
{
	let bp = require('./Path.js');
	var storage = require('../tokenStorage.js');

	let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;

	const [message, setMessage] = useState('');

	const doFTLogin = async event => 
	{
		event.preventDefault();

        var tok = storage.retrieveToken();
		let obj = {userId:userId, jwtToken:tok};
		let js = JSON.stringify(obj);

		var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/ftlogin'),	
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
                setMessage('Login Failed.');
            }
            else 
            {	
                storage.storeToken(res.jwtToken);

				setMessage('');
				window.location.href = '/cards';
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });   
	};

	return (
		<div id="ftLoginDiv">
			<form onSubmit={doFTLogin}>
			<span id="inner-title">LOG IN</span><br />
			<input type="submit" id="loginButton" class="buttons" value = "Do It"
				onClick={doFTLogin} />
			</form>
			<span id="ftLoginResult">{message}</span>
		</div>
	);
};

export default FTLogin;
