import * as fs from 'fs';

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

export { getJSONFromFile, saveJSONToFile };
