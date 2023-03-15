const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.SECRET_KEY
const { body, validationResult } = require('express-validator')
router.post('/loginuser',[
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], 
    async (req, res) => {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email});  //{email:email} === {email}
            if (!user) {
                return res.status(400).json({error: "Try Logging in with correct credentials" });
            }
            const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
            if (!pwdCompare) 
            {
                return res.status(400).json({  error: "Try Logging in with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            const authToken = jwt.sign(data, jwtSecret);
            res.json({ success, authToken })
    
           }
     catch (error) {
                console.log(error);
                res.status(500).send('Error saving form data');
            }
        
    
        
        })

module.exports = router
