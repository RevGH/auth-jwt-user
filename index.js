const express = require('express');
const app = express();
const mongoose = require('mongoose');  // kommunicerar med mongodb
const pages = require('./routes/pages');
dotenv = require('dotenv'); // gör så att vi kan läsa '.env' filers innehåll
dotenv.config(); // skapar en instans av dotenv.

// Connect to databse:
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewURLParser: true }, () => {    // Tar bort extra varningar i CLI när man kör den (useUnifiedTopology)
    console.log('Connected to the database!');
 });

// Authenticates route(?): 
const authRoute = require ('./routes/auth');
const secureRoute = require('./routes/secure');

// Middleware:
 app.use(express.json()); // Gör så att vi kan använda JSON
 app.use(express.static('public'));

// Route middleware:
app.use('/api/user', authRoute); // Detta är för att logga in och signa upp users.
app.use('api/secure', secureRoute);
app.use('/', pages);

// Lyssnar på port 3000 och loggar när servern körs:
 app.listen(3000, () => {
     console.log('Server running');
 });