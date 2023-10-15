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
            "id": "538ca4e1-0548-4841-b293-18ff59e39aa5",
            "title": "product title",
            "description": "product description",
            "code": "1234",
            "price": 99.99,
            "status": true,
            "stock": 456,
            "category": "dawg",
            "thumbnails": [
                "asdasdasdas.jpg",
                "asdasdasdas2.png"
            ]
        },
        {
            "id": "a8499716-f378-4b9b-89a6-3c8c0f275abe",
            "title": "product title2",
            "description": "product description",
            "code": "1234",
            "price": 99.99,
            "status": true,
            "stock": 456,
            "category": "dawg",
            "thumbnails": [
                "asdasdasdas.jpg",
                "asdasdasdas2.png"
            ]
        }
    ]
}
*/
