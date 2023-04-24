const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "jwt_secret";

// ROUTE 1: Create a User using: POST "/api/auth/createuser" - login not needed
router.post('/createuser', [ check('name').isLength({min : 3}), check('email').isEmail(), check('password').isLength({min : 5})], async (req,res)=>{
    
    
    try{
        let success = false;
        // check for errors
        const error = validationResult(req);
        if (!error.isEmpty()) { 
          return res.status(400).json({success, errors: error.array()});
        } 
        
        // check whether user email lready exists
        let user = await User.findOne({email:req.body.email}); 
        if(user){
            return res.status(400).json({success,error: "Sorry, a user with this email already exists"})
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
        
        success = true;        
        res.json({success, authToken});

    } catch(error){
     
        console.error(error.message);
        res.status(500).send({error:error.message});
    }
})




// ROUTE 2: Create a User using: POST "/api/auth/login" - login needed
router.post('/login',[check('email', 'Enter a valid Email').isEmail(), check('password', 'Password can not be blank').exists()],async (req,res) => {
    
    
    try{
        let success = false;
        // Validating user input for login
        const errors = validationResult(req);
        // if error array id not empty respond with error  
        if(!errors.isEmpty()){
            res.status(400).json({errors : "Invalid email or password!"});
        }
    
        // After validation, extract user email and password from body
        const {email, password} = req.body;
        
        // check if user exists
        let user = await User.findOne({email});
        
        // if email isn't in database respond with error
        if(!user){
            success = false;
            return res.status(400).json({success, error: "Please use correct credentials to login!"});
        }

        // if email found, verify the password
        const passwordCheck = await bcrypt.compare(password, user.password); //creates the hash of input nad matches the hash with the one stored in database
        if(!passwordCheck){
            success = false;
            return res.status(400).json({success, error: "Please use correct credentials to login!"});
        }

        // if password is also correct, extract user id
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        // if everything went fine respond with jwt token of user's id
        success=true;
        res.json({success, authToken});

    } catch(error){
        // respond with error for internal server anomaly
        console.error(error.message);
        res.status(500).send('Internal Server: Some error occured!');
    }
})



// Router 3: Get logged in user details using: POST "/auth/api/getuser" - login needed

router.post('/getuser', fetchuser, async (req, res)=>{
    try{
            let userId = req.user.id;
            const user = await User.findById(userId).select("-password") // select all the fields of the match(except the password)
            
            res.send(user);

        } catch(error) {      
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
})
module.exports = router;