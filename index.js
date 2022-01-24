const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const expressvalidator = require("express-validator");
const tutorial = require("./routes/tutorialroutes");
const swaggerUi = require("swagger-ui-express");
const swaggerjsdoc = require("swagger-jsdoc");
const dotEnv = require("dotenv");
dotEnv.config();

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Could not connect", err);
    process.exit();
  });

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "Tutorial express Api",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerjsdoc(options);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", tutorial);
app.use(expressvalidator());
app.use(express.json(), cors());

app.use("/users", require("./routes/userroutes"));


app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port number ${PORT}.`);
});
