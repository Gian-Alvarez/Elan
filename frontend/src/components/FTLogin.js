import React, {useDebugValue, useState} from 'react';
import axios from 'axios';

function FTLogin()
{
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;

	const [message, setMessage] = useState('');

	let bp = require('./Path.js');
	var storage = require('../tokenStorage.js');

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
                setMessage('User/Password combination incorrect');
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


		/*
		try
		{    
			const response = await fetch(bp.buildPath('api/login'),	{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());

			if( res.id <= 0 )
			{
				setMessage('User/Password combination incorrect');
			}
			else
			{
				// New
				storage.storeToken(res);

				let userId = res.id;
                let firstName = res.fn;
                let lastName = res.ln;


				let user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
				localStorage.setItem('user_data', JSON.stringify(user));

				setMessage('');
				window.location.href = '/cards';
			}
		}
		catch(e)
		{
			alert(e.toString());
			return;
		}
		*/    
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
