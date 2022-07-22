import React, { useDebugValue, useState } from 'react';

function AddFood()
{
    var foodName = 0;
    var foodProtein = 0;
    var foodCarbs = 0;
    var foodSugar = 0;
    var foodFat = 0;
    var foodSodium = 0;
    var foodCalorie = 0;

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;

    const [message,setMessage] = useState('');

    let bp = require('./Path.js');

    const doAddFood = async event => 
    {
        event.preventDefault();

        let obj = {userId:userId, foodName:foodName.value,foodProtein:foodProtein.value, foodCarbs:foodCarbs.value, foodSugar:foodSugar.value, foodFat:foodFat.value,foodSodium:foodSodium.value, foodCalorie:foodCalorie.value};
        let js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(bp.buildPath('api/addFood'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();    
            let res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage('API Error:' + res.error );
            }
            else
            {
                setMessage('New food has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }    
    };


    return(
        <div id="AddFoodDiv">
            <form onSubmit={doAddFood}>
            <span id="inner-title">ADD FOOD</span><br />
            <input type="text" id="foodName" placeholder="Food Name" 
            ref={(c) => foodName = c} /> <br />
            <input type="number" id="foodProtein" placeholder="Protein" 
            ref={(c) => foodProtein = c} /> <br />        
            <input type="number" id="foodCarbs" placeholder="Carbohydrates" 
            ref={(c) => foodCarbs = c} /> <br />
            <input type="number" id="foodSugar" placeholder="Sugar" 
            ref={(c) => foodSugar = c} /> <br />
            <input type="number" id="foodFat" placeholder="Fat" 
            ref={(c) => foodFat = c} /> <br />
            <input type="number" id="foodSodium" placeholder="Sodium" 
            ref={(c) => foodSodium = c} /> <br />
            <input type="number" id="foodCalorie" placeholder="Calories" 
            ref={(c) => foodCalorie = c} /> <br />
            <input type="submit" id="addFoodButton" class="buttons" value = "Do It"
            onClick={doAddFood} />
            </form>
            <span id="addFoodResult">{message}</span>
        </div>
    );
};

export default AddFood;