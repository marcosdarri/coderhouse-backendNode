import express from "express";
import handlebars from 'express-handlebars';
import path from 'path';

import homeRouter from './routers/home.router.js';
import RTPRouter from './routers/realtimeproducts.router.js';

import { __dirname } from './utils.js';

const app = express();

/* const PORT = 8080; */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

//app.use('/api', productsRouter, cartsRouter);
app.use('/', homeRouter);
app.use('/realtimeproducts', RTPRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use((error, req, res, next) => {
    const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
});

export default app;

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
