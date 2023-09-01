const express = require('express'); //express here is function
const bodyParser = require('body-parser'); //middleware

const placesRouter = require('./routes/places-routes')

const app = express();

app.use(placesRouter)



app.listen(5000)