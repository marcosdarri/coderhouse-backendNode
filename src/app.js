import express from "express";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', productsRouter, cartsRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor esuchando en puerto ${PORT}`);
});


/*
POST A PRODUCT:

{
    "title": "product title",
    "description": "product description",
    "code": "1234",
    "price": 99.99,
    "status": true,
    "stock": 456,
    "category": "dawg",
    "thumbnails": ["asdasdasdas.jpg", "asdasdasdas2.png"]
 }

 UPDATE A PRODUCT
 {
  "title": "product title updated"
 }

 GET ALL PRODUCTS WITH LIMIT

 http://localhost:8080/api/products?limit=1

 CREATE A CART:

 {
    "products": [
        {
            "id": "1",
            "quantity": 500
        },
        {
            "id": "2",
            "quantity": 300
        }
    ]
}
*/
