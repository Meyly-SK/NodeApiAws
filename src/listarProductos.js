const AWS = require('aws-sdk');
const listarProductos = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    try {
        const result = await dynamodb.scan({
            TableName: 'Inventario'
        }).promise();

        const productos = result.Items;

        return {
            statusCode: 200,
            body: JSON.stringify(productos),
            headers: {
                'Content-Type': 'application/json',
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'No se pudieron listar los productos' }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
    }
};

module.exports = {
    listarProductos
};