const express = require("express");
const bodyParser = require("body-parser");

const router = require("./src/router/router");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use("/api", router);
app.all("*", (req, res) => {
  res.json({
    message:
      "Welcome to the pantry api. Please refer to the official documentation for usage"
  });
});

app.listen(port, () => console.log("Server Started"));
