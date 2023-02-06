const express = require ('express');
const mongoose = require ('mongoose');
mongoose.set("strictQuery", true);
const cors = require("cors");
const logIn = require('./middlewares/auth');

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/ImpactStudio")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("couldnt connect");
  });

// middlewares

  app.use(express.json());
  app.use(cors());
  app.use(logIn(req,res,next));

// routes




const port = process.env.PORT || 3500; 
app.listen(port, () => console.log(`active on ${port}`))
