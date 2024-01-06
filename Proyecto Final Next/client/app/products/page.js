"use client";
import React, { useState, useEffect } from "react";
import style from "./page.module.css";

const page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products").then((response) => {
      response.json().then((data) => {
        setProducts(data);
      });
    });
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th className={style.th}>Título</th>
            <th className={style.th}>Descripción</th>
            <th className={style.th}>Código</th>
            <th className={style.th}>Precio</th>
            <th className={style.th}>Stock</th>
            <th className={style.th}>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.code}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <button className={style.button}>Agregar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
