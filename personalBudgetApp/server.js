const app = require("./backend/app");
const http = require("http");
const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});
