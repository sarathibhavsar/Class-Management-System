const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());
//------------------------------------------------------------------------------------------------------------
//Connect to Database
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to DB");
});


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//Import Routes
const userRoter = require('./Routers/Users');
const classRoter = require('./Routers/Classes');
const classProfile = require('./Routers/Profiles');

//Middlewares
app.use('/user',userRoter);
app.use('/class',classRoter);
app.use('/profile',classProfile);

//Server Listening Port
app.listen(process.env.PORT || 3000)