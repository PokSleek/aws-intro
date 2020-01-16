import { DynamoDB } from 'aws-sdk';
import chunk from 'lodash/chunk';

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
        },

        load: async data => {
            const chunks = chunk(data, 25);
            let itemCount = 0;

            await chunks.reduce((acc, chunk) => {
                return acc.then(() => {
                    console.log('promise');
                    const params = {
                        RequestItems: {
                            [TableName]: chunk.map((consent) => ({
                                PutRequest: {
                                    Item: consent
                                }
                            }))
                        }
                    };
                    console.log('params', JSON.stringify(params));

                    return new Promise((resolve) => {
                        db.batchWrite(params, (err, data) => {
                            console.log('error', err);
                            console.log('data', data);
                            itemCount = itemCount + chunk.length;
                            resolve();
                        });
                    });
                });
            }, Promise.resolve());

            return ({
                itemCount
            });

            // for (const chunk of chunks) {
            //     console.log(chunk);
            //     const params = {
            //         RequestItems: {
            //             [TableName]: chunk.map((consent) => ({
            //                 PutRequest: {
            //                     Item: consent
            //                 }
            //             }))
            //         },
            //         ReturnConsumedCapacity : 'TOTAL'
            //     };
            //
            //     await db.batchWrite(params).promise();
            // }
            // return ({
            //     counterChunks
            // });
        }
    });
};

export default configureDB;
