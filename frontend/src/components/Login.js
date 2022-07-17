import React, { useDebugValue, useState } from 'react';

function Login()
{
  var login;
  var password;

  const [message,setMessage] = useState('');

  let bp = require('./Path.js');

  const doLogin = async event => 
  {
      event.preventDefault();

      let obj = {login:login.value,password:password.value};
      let js = JSON.stringify(obj);

      try
      {    
          const response = await fetch(bp.buildPath('api/login'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          let res = JSON.parse(await response.text());

          if( res.id <= 0 )
          {
              setMessage('User/Password combination incorrect');
          }
          else
          {
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
  };


    return(
      <div id="loginDiv">
        <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="login" placeholder="Login" 
          ref={(c) => login = c} /> <br />
        <input type="password" id="loginPassword" placeholder="Password" 
          ref={(c) => password = c} /> <br />
        <input type="submit" id="loginButton" class="buttons" value = "Do It"
          onClick={doLogin} />
        </form>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
