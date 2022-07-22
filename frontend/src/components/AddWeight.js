import React, { useDebugValue, useState } from 'react';

function AddWeight()
{
    var date = '';
    var weight = 0;

    const [message,setMessage] = useState('');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;

    let bp = require('./Path.js');

    const doAddWeight = async event => 
    {
        event.preventDefault();

        let obj = {date:date.value, weight:weight.value, userId:userId};
        let js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(bp.buildPath('api/addWeight'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();    
            let res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage('API Error:' + res.error );
            }
            else
            {
                setMessage('Weight has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }    
    };


    return(
        <div id="AddWeightDiv">
            <form onSubmit={doAddWeight}>
            <span id="inner-title">ADD WEIGHT</span><br />
            <input type="date" id="date" placeholder="Type In Date" 
            ref={(c) => date = c} /> <br />      
            <input type="number" id="weight" placeholder="Weight" 
            ref={(c) => weight = c} /> <br />        
            <input type="submit" id="addWeightButton" class="buttons" value = "Do It"
            onClick={doAddWeight} />
            </form>
            <span id="addWeightResult">{message}</span>
        </div>
    );
};

export default AddWeight;
