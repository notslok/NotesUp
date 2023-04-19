const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "jwt_secret";

// Create a User using: POST "/api/auth/createuser" - login not needed
router.post('/createuser', [ check('name').isLength({min : 3}), check('email').isEmail(), check('password').isLength({min : 5})], async (req,res)=>{
    
    // check for errors
    const error = validationResult(req);
    if (!error.isEmpty()) { 
      return res.status(400).json({errors: error.array()});
    } 

    // check whether user email lready exists
    try{
    let user = await User.findOne({email:req.body.email}); 
    if(user){
        return res.status(400).json({error: "Sorry, a user with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    securePassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    user = await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email
    })

    const data = {
        user:{
            id: user.id
        }
    }
    console.log(data);
    
    const authToken = jwt.sign(data, JWT_SECRET);
    console.log(authToken);

    res.json({authToken});

    } catch(error){
     
        console.error(error.message);
        res.status(500).send("Uh-oh! Some error occured");
    }
})

module.exports = router;