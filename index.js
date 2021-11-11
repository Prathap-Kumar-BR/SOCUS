require("dotenv").config();
const express = require("express");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./server/config/db");
const userRoute = require("./server/routes/userRoutes");

const app = express();
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("/*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
  );
}
PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  dbConnect()
    .then(() => {
      console.log(`server is running on ${process.env.PORT}`);
    })
    .catch((err) => {
      console.log(err);
    })
);
