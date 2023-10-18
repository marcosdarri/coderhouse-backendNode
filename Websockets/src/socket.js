import { Server } from "socket.io";
import { addProduct } from "./utils.js";
import products from "./products.json" assert { type: "json" };
import { deleteProduct } from "./utils.js";

let io;

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on("connection", (socketClient) => {
        socketClient.emit("products", JSON.stringify(products));
        socketClient.on('addProduct', (newProduct) => {
            addProduct(newProduct)
        });
        socketClient.on('deleteProduct', (productId) => {
            deleteProduct(productId)
        });
    });
}