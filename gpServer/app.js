// import express and morgan
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(morgan("common"));
app.use(cors());

// require list of apps
const apps = require("./playstore");

app.get("/apps", (req, res) => {
  // code here
  const { search = "", genres = "", sort } = req.query;

  if (sort) {
    if (!["app", "raiting"].includes(sort)) {
      return res.status(400).send("Sort must be app or rating.");
    }
  }

  let results = apps.filter((app) =>
    app.App.toLowerCase().includes(search.toLowerCase())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  if (genres) {
    if (!["action", "puzzle", "strategy", "casual", "arcade", "card"]) {
      return res
        .status(400)
        .send(
          "Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, Card"
        );
    }
    results = results.filter((app) => {
      return app.Genres.toLowerCase() === genres.toLowerCase;
    });
  }

  res.json(results);
});

module.exports = app;
