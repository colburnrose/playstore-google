// import express and morgan
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("common"));

// require list of apps
const apps = require("./playstore");

app.get("/apps", (req, res) => {
  // code here
  res.json(apps);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
