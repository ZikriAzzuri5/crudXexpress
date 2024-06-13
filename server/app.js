require("./config/mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const productRouter = require("./app/product/routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", productRouter);
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "failed",
    message: `Resource ${req.originalUrl} not found`,
  });
});
app.listen(3003, () => console.log("Server : http://localhost:3003"));
