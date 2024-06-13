const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://zikri:asdfasdf@localhost:27017/eduwork-db?authSource=admin"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error Connection : "));
db.once("open", () => console.log("Connected to Database Server"));
