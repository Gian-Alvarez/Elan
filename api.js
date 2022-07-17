require('express');
require('mongodb');

const User = require("./models/User.js");
const Card = require("./models/Card.js");

exports.setApp = function ( app, client )
{
    app.post('/api/login', async (req, res, next) => 
    {
        // incoming: Login, Password.
        // outgoing: UserId, First_Name, Last_Name, Error.

        let error = '';

        const { login, password } = req.body;
        
        const results = await User.find({ $or: [{Username: login}, {Email:login}], Password: password });

        let id = -1;
        let fn = '';
        let ln = '';

        if( results.length > 0 )
        {
            id = results[0]._id;
            fn = results[0].First_Name;
            ln = results[0].Last_Name;
        }

        let ret = { id:id, firstName:fn, lastName:ln, error:''};
        res.status(200).json(ret);
    });

    app.post('/api/register', async (req, res, next) =>
    {
        // incoming: Username, Password, First_Name, Last_Name, Email.
        // outgoing: Error.
            
        let error = '';

        const { username, password, firstName, lastName, email } = req.body;
        const newUser = User({Username:username, Password:password, First_Name:firstName, Last_Name:lastName, Email:email});

        try
        {
            newUser.save();
        }
        catch(e)
        {
            error = e.toString();
        }

        let ret = { error: error };
        res.status(200).json(ret);
    });

    app.post('/api/addFood', async (req, res, next) =>
    {
        // incoming: userId, color
        // outgoing: error
            
        const { foodName, foodProtein, foodCarbs, foodSugar, foodFat, foodSodium } = req.body;

        const newFood = {Name:foodName, Protein:foodProtein, Carbohydrates:foodCarbs, Sugar:foodSugar, Fat:foodFat, Sodium:foodSodium};
        let error = '';

        try
        {
            const db = client.db("Database");
            const result = db.collection('Food').insertOne(newFood);
        }
        catch(e)
        {
            error = e.toString();
        }

        let ret = { error: error };
        res.status(200).json(ret);
    });

    app.post('/api/addWeight', async (req, res, next) =>
    {
        // incoming: userId, color
        // outgoing: error
            
        const { date, weight } = req.body;

        const newWeight = {Date:date, Weight:weight};
        let error = '';

        try
        {
            const db = client.db("Database");
            const result = db.collection('Weight').insertOne(newWeight);
        }
        catch(e)
        {
            error = e.toString();
        }

        let ret = { error: error };
        res.status(200).json(ret);
    });

    app.post('/api/addcard', async (req, res, next) =>
    {
        // incoming: userId, color
        // outgoing: error
            
        const { userId, card } = req.body;

        // const newCard = {Card:card,UserId:userId};
        const newCard = new Card({ Card: card, UserId: userId });
        let error = '';

        try
        {
            // const db = client.db("Database");
            // const result = db.collection('Cards').insertOne(newCard);
            newCard.save();
        }
        catch(e)
        {
            error = e.toString();
        }

        let ret = { error: error };
        res.status(200).json(ret);
    });

    app.post('/api/searchcards', async (req, res, next) => 
    {
        // incoming: userId, search
        // outgoing: results[], error

        let error = '';

        const { userId, search } = req.body;

        let _search = search.trim();
        
        // const db = client.db("Database");
        // const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
        
        const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' }});

        let _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push( results[i].Card );
        }
        
        let ret = {results:_ret, error:error};
        res.status(200).json(ret);
    });

}