const http = require("http");
const { app } = require("./app/app");

const PORT = process.env.PORT || 3030;

const server = http.createServer(app);
server.listen(PORT, console.log("server is running"));
