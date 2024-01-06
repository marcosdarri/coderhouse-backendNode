"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import style from "../page.module.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/carts/${params.id}`).then((response) => {
      response.json().then((data) => {
        setCart(data);
      });
    });
  }, []);

  console.log("cart", cart);
  cart.map((product) => {
    console.log("product", product.product);
  });

  return (
    <div>
      <h2>Mi cart:</h2>
      <table>
        <thead>
          <tr>
            <th className={style.th}>Cart</th>
            <th className={style.th}>Título</th>
            <th className={style.th}>Descripción</th>
            <th className={style.th}>Código</th>
            <th className={style.th}>Precio</th>
            <th className={style.th}>Stock</th>
            <th className={style.th}>Categoría</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{params.id}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {cart.map((prod) => {
            const product = prod.product;
            return (
              <tr key={product.id}>
                <td></td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.code}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
