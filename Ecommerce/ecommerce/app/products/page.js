import Image from "next/image";

const buildResponse = (data) => {
  return {
    status: "success",
    payload: data.docs.map((product) => product.toJSON()),
    totalPages: data.totalPages,
    page: data.page,
    pagingCounter: 1,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    prevLink: data.hasPrevPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.prevPage
        }${data.category ? `&category=${data.category}` : ""}`
      : "",
    nextLink: data.hasNextPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.nextPage
        }${data.category ? `&category=${data.category}` : ""}`
      : "",
  };
};

console.log(buildResponse);

export default function Products({
  payload,
  page,
  hasPrevPage,
  hasNextPage,
  prevLink,
  nextLink,
}) {
  return (
    <article>
      <header>
        <a href="/api/sessions/logout" role="button">
          Logout
        </a>
      </header>
      <h1>Productos</h1>
      <table id="main">
        <tr>
          <th>
            <b>Title</b>
          </th>
          <th>
            <b>Description</b>
          </th>
          <th>
            <b>Code</b>
          </th>
          <th>
            <b>Price</b>
          </th>
          <th>
            <b>Status</b>
          </th>
          <th>
            <b>Stock</b>
          </th>
          <th>
            <b>Category</b>
          </th>
          <th>
            <b>Agregar al carrito</b>
          </th>
        </tr>
        {/*   {payload.map((product) => {
          return (
            <tr>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.code}</td>
              <td>{product.price}</td>
              <td>{product.status}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <button>Agregar</button>
              </td>
            </tr>
          );
        })} */}
      </table>
      {/*   <p>Pagina actual: {{ page }}</p>
      <a href={prevLink} role="button" disabled={!hasPrevPage ? true : false}>
        Anterior
      </a>
      <a href={nextLink} role="button" disabled={!hasNextPage ? true : false}>
        Siguiente
      </a> */}
    </article>
  );
}
