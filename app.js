const express = require('express'); //express here is function
const bodyParser = require('body-parser'); //middleware for parsing

const placesRouter = require('./routes/places-routes') //imported from routes folder

const app = express();

app.use('/api/places',placesRouter) ; // => /api/places...



app.listen(5000)