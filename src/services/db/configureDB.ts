import { DynamoDB } from 'aws-sdk';
import async from 'async';
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

            await async.each(chunks, async (arr, cb) => {
                console.log('bla');
                const params = {
                    RequestItems: {
                        [TableName]: arr.map((consent) => ({
                            PutRequest: {
                                Item: consent
                            }
                        }))
                    }
                };
                console.log('bla2');
                return db.batchWrite(params, () => cb());
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
            return ({
                itemsCount: data.length
            });
        }
    });
};

export default configureDB;
