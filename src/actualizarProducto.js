const AWS = require('aws-sdk');

const actualizarProducto = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    try {
        const { nombreProducto, descripcion, precio, stock } = JSON.parse(event.body);

        console.log('ID del producto:', id);

        await dynamodb.update({
            TableName: 'Inventario',
            Key: { id },
            UpdateExpression: 'set nombreProducto = :nombreProducto, descripcion = :descripcion, precio = :precio, stock = :stock',
            ExpressionAttributeValues: {
                ':nombreProducto': nombreProducto,
                ':descripcion': descripcion,
                ':precio': precio,
                ':stock': stock
            },
            ReturnValues: 'ALL_NEW'
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Producto Actualizado'
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
    } catch (error) {
        console.error('Error al actualizar el producto:', error);

        // Añade más detalles sobre el error para depuración
        console.log('Detalles del error:', error.message);
        console.log('Código de error:', error.code);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'No se pudo actualizar el producto' }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
    }
};

module.exports = {
    actualizarProducto
};