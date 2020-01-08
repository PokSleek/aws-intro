import { DynamoDB } from 'aws-sdk';

const configureDB = ({ TableName, region }) => {
    const db = new DynamoDB.DocumentClient({
        region,
    });

    return ({
        get: async keys => {

            const params = {
                TableName,
                Key: keys,
            };

            const res = await db.get(params).promise();
            return res.Item;
        },

        put: async data => {

            const params = {
                TableName,
                Item: data,
            };

            await db.put(params).promise();
            return data;
        }
    });
};

export default configureDB;
