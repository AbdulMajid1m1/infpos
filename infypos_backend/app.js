const express = require("express");
const cors = require("cors");
const router = require("./routes");

process.on("uncaughtException", (e) => {
  console.log(e);
});

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

app.use(function (req, res, next) {

  res.success = async (data, status = 200) => {
    return res.status(status).send({ success: true, error: null, body: data });
  };

  res.internalError = async (error) => {
    return res.status(error.status || 500).send({
      success: false,
      error: error.message || "Internal Server Error",
      body: null,
    });
  };
  next();
});

app.use("/", router);

app.use((req, res) => {
  return res.status(404).send("Error 404, Route does not exist");
});

module.exports = app;