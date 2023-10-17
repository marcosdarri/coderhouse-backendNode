(function () {
  const socket = io();

  const productList = document.getElementById("productList");

  socket.on('products', (data) => {
    productList.innerHTML = "";
    const products = JSON.parse(data)
    products.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${product.title} - Precio: $${parseInt(product.price).toFixed(2)}`;
      productList.appendChild(listItem);
    });
  });

  document.getElementById("realTimeForm").addEventListener('submit', (event) => {
    event.preventDefault();

    const newProduct = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      code: document.getElementById("code").value,
      price: document.getElementById("price").value,
      stock: document.getElementById("stock").value,
      status: document.getElementById("status").value,
      category: document.getElementById("category").value
    }

    socket.emit('addProduct', newProduct)
  })
  
})();