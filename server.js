if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
const express = require("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')
// const d3 = require('d3')
// const mongoose = require("mongoose");


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to Mongoose"));

const indexRouter = require('./routes/index')
app.use('/', indexRouter)

// Works for testing with hardcoded variables, but need to make adjustable from browser, probably something to do with local storage
// https://stackoverflow.com/questions/16452123/how-to-create-global-variables-accessible-in-all-views-using-express-node-js
// global.globalModeClass = 'mode-theme_light';
global.globalModeClass = 'mode-theme_dark';

app.listen(3000, () => console.log('Server started on Port 3000.'))