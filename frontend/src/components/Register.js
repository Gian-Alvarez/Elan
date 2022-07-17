import React, { useDebugValue, useState } from 'react';

function Register()
{
    var username = '';
    var password = '';
    var firstName = '';
    var lastName = '';
    var email = '';

    const [message,setMessage] = useState('');

    let bp = require('./Path.js');

    const doRegister = async event => 
    {
        event.preventDefault();

        let obj = {username:username.value,password:password.value, firstName:firstName.value, lastName:lastName.value, email:email.value};
        let js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(bp.buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();    
            let res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage('API Error:' + res.error );
            }
            else
            {
                setMessage('New User has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }    
    };


    return(
        <div id="RegisterDiv">
            <form onSubmit={doRegister}>
            <span id="inner-title">REGISTER</span><br />
            <input type="text" id="username" placeholder="Username" 
            ref={(c) => username = c} /> <br />
            <input type="password" id="password" placeholder="Password" 
            ref={(c) => password = c} /> <br />        
            <input type="text" id="firstName" placeholder="First Name" 
            ref={(c) => firstName = c} /> <br />
            <input type="text" id="lastName" placeholder="Last Name" 
            ref={(c) => lastName = c} /> <br />
            <input type="text" id="email" placeholder="Email" 
            ref={(c) => email = c} /> <br />
            <input type="submit" id="registerButton" class="buttons" value = "Do It"
            onClick={doRegister} />
            </form>
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;
