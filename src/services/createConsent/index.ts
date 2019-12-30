import isEmpty from 'lodash/isEmpty';

import { dbBY, dbUA } from '../db';
import { response } from '../../lib/helpers/event';

export const createConsent = async ({ consent }) => {
    const { uuid, channelType, channelValue, countryCody } = consent;

    const item = await dbBY.put({
        uuid,
        channelType,
        channelValue,
        countryCody,
        createdAt: Date.now(),
    });


    console.log(item);

    const data = await dbBY.get({
        uuid,
    });


    console.log(data);

    return data;

    // console.log(countryCody === 'UA');
    // let db;
    // switch (countryCody) {
    //     case 'BY':
    //         db = dbBY;
    //         break;
    //     case 'UA':
    //         db = dbUA;
    //         break;
    //     default:
    //         db = null;
    // }
    //
    // if (db) {
    //
    //
    //     if (data) {
    //         return ({
    //             error: {
    //                 code: 400,
    //                 message: `Bad request. Consent with current uuid: ${uuid} has already setted in db`,
    //             },
    //         });
    //     }
    //     // const data = await db.scan({
    //     //     FilterExpression: "#id = :val",
    //     //     ExpressionAttributeNames: {
    //     //         "#id": "uuid",
    //     //     },
    //     //     ExpressionAttributeValues: {
    //     //         ":val": uuid,
    //     //     }
    //     // }).promise();
    //
    //       if (data.Count) {
    //         return ({
    //             error: {
    //                 code: 400,
    //                 message: `Bad request. Consent with current uuid: ${uuid} has already setted in db`,
    //             },
    //         });
    //        }
    //
    //     const consent = await db.put({
    //         uuid,
    //         channelType,
    //         channelValue,
    //         countryCody,
    //         createdAt: Date.now(),
    //     });
    //
    //     return consent;
    //
    // }
    //
    // return ({
    //     error: {
    //         code: 400,
    //         message: 'Bad request. Invalid countryCody field',
    //     },
    // });
};
