(function () {
  const socket = io();

  const productList = document.getElementById("productList");

  socket.on('products', (data) => {
    const products = JSON.parse(data)
    products.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${product.title} - Precio: $${parseInt(product.price).toFixed(2)}`;
      productList.appendChild(listItem);
    });
  });

})();