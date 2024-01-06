import http from "http";
import app from "./app.js";
import { init } from "./db/mongodb.js";
import dotenv from "dotenv";
dotenv.config();

init();

const server = http.createServer(app);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT} 🚀`);
});
