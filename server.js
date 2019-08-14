const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const path = require("path")

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//body parser middleware
app.use(bodyParser.json());

//cors middleware
app.use(cors());

app.use(express.static(path.join(__dirname, "/client/build")))

//route files
const buildings = require('./routes/building');
app.use('/buildings', buildings);
const failures = require('./routes/failure');
app.use('/failures', failures);
const users = require('./routes/user');
app.use('/users', users);

const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});


app.listen(port, () => {
    console.log('====================================');
    console.log(`Server is running on port ${port}`);
    console.log('====================================');
});