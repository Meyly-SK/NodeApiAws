const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const agregarProducto = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  try {
    console.log('Evento recibido:', event);

    const { nombreProducto, descripcion, precio, stock } = JSON.parse(event.body);

    if (!nombreProducto || !descripcion || !precio || !stock) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Todos los campos son requeridos' })
      };
    }

    // Convertir precio y stock a números
    const precioNumber = parseFloat(precio);
    const stockNumber = parseInt(stock, 10);

    if (isNaN(precioNumber) || isNaN(stockNumber)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Precio y stock deben ser números válidos' })
      };
    }

    const id = v4();

    const nuevoProducto = {
      id,
      nombreProducto,
      descripcion,
      precio: precioNumber,
      stock: stockNumber
    };

    await dynamodb.put({
      TableName: 'Inventario',
      Item: nuevoProducto
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(nuevoProducto)
    };
  } catch (error) {
    console.error('Error al agregar producto:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ocurrió un error al agregar el producto', detalles: error.message })
    };
  }
};

module.exports = {
  agregarProducto,
};