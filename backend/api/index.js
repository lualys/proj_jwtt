const express = require("express");
const cors = require("cors");

const routes = require("../routes");

const app = express();
const port = 8000;
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
routes(app);
app.listen(port, () => console.log("Servidor OK!"));
module.exports = app;