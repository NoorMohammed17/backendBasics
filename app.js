const express = require("express"); //express here is function
const bodyParser = require("body-parser"); //middleware for parsing
const mongoose = require("mongoose"); //database

const placesRoutes = require("./routes/places-routes"); //imported from routes folder
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json()); //

app.use("/api/places", placesRoutes); // => /api/places..
app.use("/api/users", userRoutes);

//if route not found
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  // this special middleware with 4 arguments runs only when had an error
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkonwn error occurred!" });
});

// app.listen(5000)


// const MONGO_URL = `mongodb+srv://noor_mernapp:N00rmernapp@cluster0.kwms7cp.mongodb.net/Places?retryWrites=true&w=majority`;
//mongodb+srv://<username>:<password>@cluster0.kwms7cp.mongodb.net/?retryWrites=true&w=majority


mongoose
  .connect(`mongodb+srv://noorshaik1798:noor123@cluster0.kwms7cp.mongodb.net/PlaceData?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(5000);
    console.log('connected')
  })
  .catch((err) => console.log(err));
