import http from 'http';
import { Server } from 'socket.io';
import products from "./products.json" assert { type: "json" };
import { addProduct } from './utils.js';
import { init } from './socket.js';

import app from './app.js';

const server = http.createServer(app);
const socketServer = new Server(server);
const PORT = 8080;

socketServer.on('connection', (socket) => {
  socket.emit("products", JSON.stringify(products));
});

socketServer.on('addProduct', (newProduct) => {
  addProduct(newProduct)
  socket.emit("products", JSON.stringify(products));
});

const httpServer = app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`);
});

init(httpServer)