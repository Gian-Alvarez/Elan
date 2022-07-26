require('express');
require('mongodb');

const User = require("./models/User.js");
const Card = require("./models/Card.js");
const Food = require("./models/Food.js");
const Meal = require("./models/Meal.js");
const Weight = require("./models/Weight.js");
const Health = require("./models/Health.js");
const Diary = require("./models/Diary.js");

exports.setApp = function ( app, client )
{
    app.post('/api/login', async (req, res, next) => 
    {
        // incoming: Login, Password.
        // outgoing: UserId, First_Name, Last_Name, First_Time_Login, Email_Verify, Error.

        const {login, password} = req.body;
        const results = await User.find({$or:[{Username: login}, {Email:login}], Password: password});

        let id = -1;
        let fn = '';
        let ln = '';
        let ev = -1;
        let ftl = -1;
        var ret;

        if( results.length > 0 )
        {
            id = results[0]._id.toString();
            fn = results[0].First_Name;
            ln = results[0].Last_Name;
            ftl = results[0].First_Time_Login;
            ev = results[0].Email_Verify;

            try
            {
                const token = require("./createJWT.js");
                tok = token.createToken(fn, ln, id);
                ret = {ev:ev, ftl:ftl, token:tok};
            }
            catch(e)
            {
                ret = {error:e.message};
            }
        }
        else
        {
            ret = {error:"Login/Password incorrect"};
        }

        res.status(200).json(ret);
    });

    app.post('/api/ftlogin', async (req, res, next) => 
    {
        // incoming: Login, Password.
        // outgoing: UserId, First_Name, Last_Name, First_Time_Login, Email_Verify, Error.

        let token = require('./createJWT.js');

        let error = '';

        const {userId, jwtToken} = req.body;
        
        try
        {
            if(token.isExpired(jwtToken))
            {
                var r = {error:'The JWT is no longer valid', jwtToken: ''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }

        const results = await User.findByIdAndUpdate(userId, {First_Time_Login:1});

        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwtToken);
            console.log(refreshedToken);
        }
        catch(e)
        {
            console.log(e.message);
        }
        
        var ret = {error: error, jwtToken: refreshedToken};
        res.status(200).json(ret);
    });

    app.post('/api/forgotpassword', async (req, res, next) =>
    {
        // incoming: Email.
        // outgoing: Error.
            
        let error = '';

        const {email} = req.body;

        try
        {
            const token = require("./createJWT.js");
            var tok = token.createToken(email, "123", "123");
        }
        catch(e)
        {
            ret = {error:e.message};
        }

        try{
            let userEmail = {Email:email};
            const result = await User.findOneAndUpdate(userEmail, {FP_Token: tok.accessToken});
            // using Twilio SendGrid's v3 Node.js Library
            // https://github.com/sendgrid/sendgrid-nodejs
            //javascript
            const sgMail = require('@sendgrid/mail')
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                to: email,
                from: 'cop43318@gmail.com',
                template_id: 'd-21b5e99f9c6f45d9b2cfc0f918162475',
                dynamic_template_data: {
                    ahjst: tok.accessToken
                }
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        catch(e)
        {
            error = e.toString();
        }

        let ret = {error:error};
        res.status(200).json(ret);
    });

    app.post('/api/resetpassword', async(req, res, next) =>
    {
        // incoming: JWTToken, Password.
        // outgoing: Error.

        let error = '';

        const {ahjst, password} = req.body;

        try
        {
            let resetPassword = {FP_Token:ahjst};
            const result = await User.findOneAndUpdate(resetPassword, {Password:password});
            const result2 = await User.findOneAndUpdate(resetPassword, {FP_Token:"0"});
        }
        catch(e)
        {
            error = e.toString();
        }

        let ret = {error:error};
        res.status(200).json(ret);
    });


    app.post('/api/register', async (req, res, next) =>
    {
        // incoming: Username, Password, First_Name, Last_Name, Email.
        // outgoing: Error.
            
        let error = '';

        const {username, password, firstName, lastName, email, firstTimeLogin, emailVerify, forgotPasswordToken} = req.body;
        const newUser = User({Username:username, Password:password, First_Name:firstName, Last_Name:lastName, Email:email, First_Time_Login:firstTimeLogin, Email_Verify:emailVerify, Email_Token:tok.accessToken, FP_Token:forgotPasswordToken});

        try
        {
            const token = require("./createJWT.js");
            var tok = token.createToken(username, firstName, lastName);
        }
        catch(e)
        {
            ret = {error:e.message};
        }

        try
        {
            newUser.save();
        
            // using Twilio SendGrid's v3 Node.js Library
            // https://github.com/sendgrid/sendgrid-nodejs
            //javascript
            const sgMail = require('@sendgrid/mail')
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                to: email,
                from: 'cop43318@gmail.com',
                template_id: 'd-32c150b4de8043edba973cd21ace99f5',
                dynamic_template_data: {
                    firstName: firstName,
                    ahjst: tok.accessToken
                }
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        catch(e)
        {
            error = e.toString();
        }

        let ret = {error:error};
        res.status(200).json(ret);
    });

    app.post('/api/verifyemail', async(req, res, next) =>
    {
        // incoming: JWTToken.
        // outgoing: Error.

        let error = '';

        const {ahjst} = req.body;

        try{
            let userEmail = {Email_Token:ahjst};
            const result = await User.findOneAndUpdate(userEmail, {Email_Verify:1});
            const result2 = await User.findOneAndUpdate(userEmail, {Email_Token:"0"});
        }
        catch(e)
        {
            error = e.toString();
        }

        let ret = {error:error};
        res.status(200).json(ret);
    });


    app.post('/api/addFood', async (req, res, next) =>
    {
        // incoming: Name, Protein, Carbohydrates, Sugar, Fat, Sodium, Calories, jwtToken.
        // outgoing: Error.

        let token = require('./createJWT.js');

        let error = '';

        const {userId, foodName, foodProtein, foodCarbs, foodSugar, foodFat, foodSodium, foodCalorie, foodServeSize, foodType, ssType, foodPhase, jwtToken} = req.body;
        const newFood = Food({UserID:userId, Name:foodName, Protein:foodProtein, Carbohydrates:foodCarbs, Sugar:foodSugar, Fat:foodFat, Sodium:foodSodium, Calories:foodCalorie, Food_Type:foodType, Serving_Size:foodServeSize, SS_Type:ssType, Phase:foodPhase});

        try
        {
            if(token.isExpired(jwtToken))
            {
                var r = {error:'The JWT is no longer valid', jwtToken: ''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }

        try
        {
            newFood.save();
        }
        catch(e)
        {
            error = e.toString();
        }

        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
            console.log(e.message);
        }
        
        var ret = {error: error, jwtToken: refreshedToken};
        res.status(200).json(ret);
    });

    app.post('/api/addWeight', async (req, res, next) =>
    {
        // incoming: UserID, Weight, Date.
        // outgoing: Error.

        let token = require('./createJWT.js');

        let error = '';
        
        const {date, weight, userId, jwtToken} = req.body;
        const newWeight = Weight({UserID:userId, Date:date, Weight:weight});

        try
        {
            if(token.isExpired(jwtToken))
            {
                var r = {error:'The JWT is no longer valid', jwtToken: ''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }

        try
        {
            newWeight.save();
        }
        catch(e)
        {
            error = e.toString();
        }

        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
            console.log(e.message);
        }
        
        var ret = {error: error, jwtToken: refreshedToken};
        res.status(200).json(ret);
    });



    app.post('/api/addcard', async (req, res, next) =>
    {
        // incoming: UserID, Card.
        // outgoing: error.

        let error = '';
        
        // New
        let token = require('./createJWT.js');
        const {userId, card, jwtToken} = req.body;
        console.log(jwtToken);

        try
        {
            if(token.isExpired(jwtToken))
            {
                var r = {error:'The JWT is no longer valid', jwtToken: ''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }

        // const {userId, card} = req.body;
        const newCard = new Card({UserID:userId, Card:card});

        try
        {
            newCard.save();
        }
        catch(e)
        {
            error = e.toString();
        }

        // New
        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwtToken);
            console.log(refreshedToken);
        }
        catch(e)
        {
            console.log(e.message);
        }
        
        var ret = {error: error, jwtToken: refreshedToken};
        res.status(200).json(ret);

        // let ret = {error:error};
        // res.status(200).json(ret);
    });

    app.post('/api/searchcards', async (req, res, next) => 
    {
        // incoming: UserID, Search.
        // outgoing: Results[], Error.

        let error = '';

        // New
        let token = require('./createJWT.js');
        const {userId, search, jwtToken} = req.body;

        try
        {
            if(token.isExpired(jwtToken))
            {
                var r = {error:'The JWT is no longer valid', jwtToken: ''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }

        // const {userId, search} = req.body;
        let _search = search.trim();
        const results = await Card.find({"Card": { $regex: _search + '.*', $options: 'r'}});

        let _ret = [];
        for(var i=0; i<results.length; i++)
        {
            _ret.push(results[i].Card);
        }
        
        // New
        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
            console.log(e.message);
        }
    
        var ret = {results:_ret, error: error, jwtToken: refreshedToken};

        // let ret = {results:_ret, error:error};
        res.status(200).json(ret);
    });
}