import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from "uuid";
import productsJSON from "./products.json" assert { type: "json" };

//Agregar funciones para leer los archivos en formato json y escribirlos.

const getJSONFromFile = (path, callback) => {
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      // El archivo no existe, devuelve un array vacío
      callback(null, []);
    } else {
      // El archivo existe, intenta leerlo
      fs.readFile(path, 'utf8', (error, contenido) => {
        if (error) {
          callback(error, null); // Si hay un error al leer el archivo, devuelve el error
        } else {
          try {
            if (contenido.length === 0) {
              return []
            }
            const data = JSON.parse(contenido);
            callback(null, data); // Devuelve el contenido del archivo como un objeto JavaScript
          } catch (parseError) {
            callback(parseError, null); // Si no se puede analizar el JSON, devuelve un error
          }
        }
      });
    }
  });
}

const saveJSONToFile = (path, data) => {
  const content = JSON.stringify(data, null, "\t");
  try {
    fs.writeFile(path, content, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  } catch (error) {
    console.log(error)
    throw new Error(`El archivo no pudo ser escrito.`);
  }
};

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const addProduct = (productData) => {

  let products = productsJSON;

  const { title, description, code, price, status, stock, category } = productData;

  if (!title) {
    console.log("")
    console.log("El titulo es requerido!")
    return
  }
  if (!description) {
    console.log("")
    console.log("La descripcion es requerida!")
    return
  }
  if (!code) {
    console.log("")
    console.log("El codigo es requerido!")
    return
  }
  if (!price) {
    console.log("")
    console.log("El precio es requerido!")
    return
  }
  if (!status) {
    console.log("")
    console.log("El status es requerido!")
    return
  }
  if (!stock) {
    console.log("")
    console.log("El stock es requerido!")
    return
  }
  if (!category) {
    console.log("")
    console.log("La categoria es requerida!")
    return
  }

  const newProduct = {
    id: uuidv4(),
    title: title,
    description: description,
    code: code,
    price: price,
    status: status,
    stock: stock,
    category: category,
    thumbnails: [],
  };

  products.push(newProduct);

  saveJSONToFile("./src/products.json", products);
  console.log("")
  console.log(`Producto agregado exitosamente! ID: ${newProduct.id}`)
  console.log("")
}

const deleteProduct = (productId) => {
  if (!productId) {
    console.log("")
    console.log("El id no puede ser vacio!")
    return
  }
  let products = productsJSON;
  const product = products.find((p) => p.id === productId);
  if (!product) {
    console.log("")
    console.log("Producto no encontrado!");
    return
  }
  const newProducts = products.filter((p) => p.id !== productId);
  saveJSONToFile("./src/products.json", newProducts);
  console.log("")
  console.log(`Producto eliminado exitosamente! ID: ${productId}`)
}

export { deleteProduct, addProduct, __dirname, getJSONFromFile, saveJSONToFile };
