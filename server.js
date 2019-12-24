const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;
const app = express();

if (process.env.NODE_ENV === "development") {
  console.log("testing dev mode");
}

app.use("/api", require("./routes/api"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/build"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/build/index.html"));
}

app.listen(port, () => {
  console.log(`app started on ${process.env.NODE_ENV} mode on port ${port}`);
});
