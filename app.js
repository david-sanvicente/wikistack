const express = require('express');
const morgan = require('morgan');
const main = require('./views/main');
const layout = require('./views/layout');
const { Page, User, db } = require('./models');
const app = express();

// parses data received from user into a format usable by the server
app.use(express.urlencoded({ extended: false }));
// makes this directory available to the user
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.get("/", (req, res) => {
    console.log("Hello, World!");
    res.send(layout(''));
})

const PORT = 1337;

const init = async () => {
  await db.sync()
  console.log('db sync confirmed!');
  
  // this should fall under the await db.sync() to avoid having our page
  // load before our server is ready.
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();

