const router = require('express').Router();
const User = require('../model/User');      // User Schema ("blueprint-grejen")
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');         // hashar våra lösenord, krypterar lösenorden.
const jwt = require('jsonwebtoken');        // importerar jsonwebtoken

router.post('/register', async (req, res) => {      // **** api/user/register
    
    // Validate user:
    const { error } = registerValidation(req.body);     // Måsvingarna här kallas för 'destructuring', googla om du vill veta mer. l0l

    if(error) {
        return res.status(400).json({error: error.details[0].message});
    }

    // if existing user:
    const emailExists = await User.findOne({email: req.body.email});

    if(emailExists) {
        return res.status(400).json({error: 'Email already in use'});
    }

    // Hash password (make it secure):
    const salt = await bcrypt.genSalt(10); // Här skapar vi en algorythm för hur mycket security våra lösenord ska ha.
    const hashPassword = await bcrypt.hash(req.body.password, salt); // Skapar ett supersecret password!

    // Create user!:
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();        // Detta skapar User i databasen.
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);      // Detta skapar ett token.
        res.json({user: user._id, redirecet: 'batcave', token});        // Skickar denna information till frontend
    } catch (error) {
        res.status(400).json(error);        // Om error, skicka till frontend
    }

});


router.post('/login', async (req, res) => {
    // Validate user
    const { error } = loginValidation(req.body);

    if(error) {
        return res.status(400).json({error: error.details[0].message});
    }

    // om emailen finns:
    const user = await User.findOne({email: req.body.email});

    // om det inte finns någon likadan email:
    if(!user) {
        return res.status(400).json({error: 'Email not found!'});
    }

    // Password correct?
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    // incorrect password:
    if(!validPassword) {
        return res.status(400).json({error: 'Invalid password'});
    }

    // Create and assign token:
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);      // Skapar ett token för att skicka till frontend
    res.header('auth-token', token).json({token, redirect:'batcave'});      // Här sätter vi token i headern på vår /login POST

});

module.exports = router;

