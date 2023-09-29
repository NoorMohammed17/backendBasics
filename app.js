const express = require("express"); //express here is function
const bodyParser = require("body-parser"); //middleware for parsing
const mongoose = require('mongoose'); //database

const placesRoutes = require("./routes/places-routes"); //imported from routes folder
const userRoutes = require('./routes/users-routes'); 
const HttpError = require('./models/http-error');


const app = express();

app.use(bodyParser.json()); //

app.use("/api/places", placesRoutes); // => /api/places..
app.use("/api/users",userRoutes);
 
//if route not found
app.use((req,res,next) => {
  const error = new HttpError('Could not find this route.', 404) ;
  throw error;
})

app.use((error, req, res, next) => {
  // this special middleware with 4 arguments runs only when had an error
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message:error.message || "A unkonwn error occurred!"})
});


const MONGO_PASSWORD = "B6v4ulrV42iEen4D"
const MONGO_URL = `mongodb+srv://noorshaik1798:${MONGO_PASSWORD}@cluster0.kwms7cp.mongodb.net/Places?retryWrites=true&w=majority`

mongoose.connect(
  MONGO_URL
).then(
  () => {app.listen(5000) })
.catch(
  err => console.log(err)
);
 



