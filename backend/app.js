const express = require("express");
const bodyParser = require("body-parser");
const trackingIdMiddleware = require("./middleware/trackingIdMiddleware");
const db = require("./config/database");
const dotenv = require("dotenv");
const errorMiddleWare = require("./middleware/error");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swagger");
const cors = require("cors");

const app = express();
db();

// Swagger integration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(trackingIdMiddleware);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET",
    credentials: true,
  })
);

// Route Imports
const user = require("./routes/users");
const loan = require("./routes/loans");
const account = require("./routes/account");
const balance = require("./routes/balance");
const branches = require("./routes/branches");
const bank = require("./routes/bank.js");
const loanOfficer = require("./routes/loanOfficer.js");
const transactions = require("./routes/transactions.js");
const cardType = require("./routes/cardType.js");

app.use("/api/v1", user);
app.use("/api/v1", loan);
app.use("/api/v1", loanOfficer);
app.use("/api/v1", account);
app.use("/api/v1", balance);
app.use("/api/v1", branches);
app.use("/api/v1", bank);
app.use("/api/v1", transactions);

const test = "test";

app.get("/123", (req, res) => {
  res.cookie("cookie", `${test}`, { maxAge: 1800000 });
  res.status(200).send({ message: "kaif" });
});

// Middleware for Error
app.use(errorMiddleWare);
dotenv.config();

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server listening on port ${port}`));
