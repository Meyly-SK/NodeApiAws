const AWS = require('aws-sdk');

const obtenerProducto = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    try {
        const result = await dynamodb.get({
            TableName: 'Inventario',
            Key: { id }
        }).promise();

        const producto = result.Item;

        if (!producto) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Producto no encontrado' }),
                headers: {
                    'Content-Type': 'application/json',
                }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json',
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'No se pudo obtener el producto' }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
    }
};

module.exports = {
    obtenerProducto
};