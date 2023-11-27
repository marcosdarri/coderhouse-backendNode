import Image from "next/image";
import styles from "./page.module.css";

export default function Carts({ cartId, products }) {
  return (
    <article>
      <h1>Carts</h1>
      <table id="main">
        <tr>
          <th>
            <b>Cart Id</b>
          </th>
          <th>
            <b>Product Id</b>
          </th>
          <th>
            <b>Quantity</b>
          </th>
        </tr>
        <tr>
          <td>{cartId}</td>
          <td></td>
          <td></td>
        </tr>
        {products.map((product) => {
          return (
            <tr>
              <td></td>
              <td>{product.pid}</td>
              <td>{product.quantity}</td>
            </tr>
          );
        })}
      </table>
    </article>
  );
}
