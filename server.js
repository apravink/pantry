const express = require("express");
const bodyParser = require("body-parser");

const router = require("./src/router/router");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use("/api", router);

app.listen(port, () => console.log("Server Started"));
