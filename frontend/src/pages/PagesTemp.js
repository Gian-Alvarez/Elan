// Login API
app.post('/api/login', async (req, res, next) => 
    {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error

        let error = '';

        const { login, password } = req.body;

        const db = client.db("Database");
        const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

        let id = -1;
        let fn = '';
        let ln = '';

        if( results.length > 0 )
        {
            id = results[0].UserId;
            fn = results[0].FirstName;
            ln = results[0].LastName;
        }

        let ret = { id:id, firstName:fn, lastName:ln, error:''};
        res.status(200).json(ret);
    });

// API for AddCard
app.post('/api/addcard', async (req, res, next) =>
    {
        // incoming: userId, color
        // outgoing: error
            
        const { userId, card } = req.body;

        const newCard = {Card:card,UserId:userId};
        let error = '';

        try
        {
            const db = client.db("Database");
            const result = db.collection('Cards').insertOne(newCard);
        }
        catch(e)
        {
            error = e.toString();
        }

        let ret = { error: error };
        res.status(200).json(ret);
    });

// API for SearchCard
app.post('/api/searchcards', async (req, res, next) => 
    {
        // incoming: userId, search
        // outgoing: results[], error

        let error = '';

        const { userId, search } = req.body;

        let _search = search.trim();
        
        const db = client.db("Database");
        const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
        
        let _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push( results[i].Card );
        }
        
        let ret = {results:_ret, error:error};
        res.status(200).json(ret);
    });

// C Login
import React, { useDebugValue, useState } from 'react';

function Login()
{
  var loginName;
  var loginPassword;

  const [message,setMessage] = useState('');

  let bp = require('./Path.js');

  const doLogin = async event => 
  {
      event.preventDefault();

      let obj = {login:loginName.value,password:loginPassword.value};
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
        <input type="text" id="loginName" placeholder="Username" 
          ref={(c) => loginName = c} /> <br />
        <input type="password" id="loginPassword" placeholder="Password" 
          ref={(c) => loginPassword = c} /> <br />
        <input type="submit" id="loginButton" class="buttons" value = "Do It"
          onClick={doLogin} />
        </form>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;


// C CardUI
import React, { useState } from 'react';

function CardUI()
{
    let card = '';
    let search = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let firstName = ud.firstName;
    let lastName = ud.lastName;

    let bp = require('./Path.js');

    const addCard = async event => 
    {
	    event.preventDefault();

        let obj = {userId:userId,card:card.value};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(bp.buildPath('api/addcard'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Card has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }

	};

    const searchCard = async event => 
    {
        event.preventDefault();
        		
        let obj = {userId:userId,search:search.value};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(bp.buildPath('api/searchcards'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for( var i=0; i<_results.length; i++ )
            {
                resultText += _results[i];
                if( i < _results.length - 1 )
                {
                    resultText += ', ';
                }
            }
            setResults('Card(s) have been retrieved');
            setCardList(resultText);
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }
    };

    return(
        <div id="cardUIDiv">
            <br />
            <input type="text" id="searchText" placeholder="Card To Search For" 
            ref={(c) => search = c} />
            <button type="button" id="searchCardButton" class="buttons" 
            onClick={searchCard}> Search Card</button><br />
            <span id="cardSearchResult">{searchResults}</span>
            <p id="cardList">{cardList}</p><br /><br />
            <input type="text" id="cardText" placeholder="Card To Add" 
            ref={(c) => card = c} />
            <button type="button" id="addCardButton" class="buttons" 
            onClick={addCard}> Add Card </button><br />
            <span id="cardAddResult">{message}</span>
        </div>
      
    );
}

export default CardUI;
