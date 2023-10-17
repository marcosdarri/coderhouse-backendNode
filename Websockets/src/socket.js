import { Server } from "socket.io";
import { addProductFunction } from "./utils.js";
import products from "./products.json" assert { type: "json" };

let io;

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on("connection", (socketClient) => {
        socketClient.emit("products", JSON.stringify(products));

        socketClient.on('addProduct', (newProduct) => {
            console.log("Socket product", newProduct)
            addProductFunction(newProduct)
          
            //io.emit("products", JSON.stringify(products));
          });
      });
}