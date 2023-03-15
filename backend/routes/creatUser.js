const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
router.post('/createuser',[
    body('email','Incorrect email format').isEmail(),
    body('password','Incorrect password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
        const user = await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: securePass
        }) 
            await user.save();
            res.send(' form data saved successfully!');
          } catch (error) {
            console.error(error);
            res.status(500).send('Error saving form data');
          }
        
})

module.exports = router