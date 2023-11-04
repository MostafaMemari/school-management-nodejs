require("dotenv").config();
const http = require("http");

require("./config/dbConnect");

const { app } = require("./app/app");

const PORT = process.env.PORT || 3030;

const server = http.createServer(app);
server.listen(PORT, console.log("server is running"));
