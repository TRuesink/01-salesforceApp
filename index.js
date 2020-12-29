// Third party packages
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const cors = require("cors");

// imported files
const keys = require("./config/keys");
const errorHandler = require("./middlewares/error");

// Routes
const sobjectRoutes = require("./routes/sobjectRoutes");
const authRoutes = require("./routes/authRoutes");
const chatterRoutes = require("./routes/chatterRoutes");
const metadataRoutes = require("./routes/metadataRoutes");

const bodyParser = require("body-parser");

// env vars
dotenv.config({ path: "./config/config.env" });

// create app
const app = express();

// middlewares
app.use(
  cookieSession({
    name: "salesforceSession",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// mount routers
app.use("/api/v1/sobjects", sobjectRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chatter", chatterRoutes);
app.use("/api/v1/metadata", metadataRoutes);

// custom error handling middleware
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  // Express will serve production assets like our main.js file or main.css file
  app.use(express.static("client/build"));
  // Express will serve the index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow
  );
});
