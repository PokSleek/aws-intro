const path = require('path');
const fs = require('fs');
const parse = require('csv-parse');
const request = require('request');
const chunk = require('lodash/chunk');
const filter = require('lodash/filter');
// import async from 'async'

const csv_filename = 'initial_data.csv';

const url = 'https://kzgrsdolz5.execute-api.us-east-2.amazonaws.com/dev/create-consent';
const rs = fs.createReadStream(csv_filename);

const output = {};

const parser = parse({
    delimiter: '|'
});

parser.on('data', (data) => {
    const countryCode = data[3];
    const consent = {
        uuid: data[0],
        channelType: data[1],
        channelValue: data[2],
        countryCode
    };

    output[countryCode] ?
        output[countryCode].push(consent) :
        output[countryCode] = [consent];
});

parser.on('end',async () => {
    const UA = {consents: [output.UA[0]]};
    const BY = {consents: [output.BY[0]]};

   //  request.post(url,
   //      {
   //          json: UA,
   //      },
   //     (err, res, body) => {
   //         console.log(err, body);
   //     }
   // );

    await request.post(url,
        {
            json: UA,
        },
        (err, res, body) => {
            console.log(err, body);
        }
    );
});

//
// const parser = parse({
//     columns : true,
//     delimiter : ','
// }, function(err, data) {
//     const split_arrays = [], size = 25;
//
//     // while (data.length > 0) {
//     //
//     //     //split_arrays.push(data.splice(0, size));
//     //     const cur25 = data.splice(0, size)
//     //     const item_data = []
//     //
//     //     for (let i = cur25.length - 1; i >= 0; i--) {
//     //         const this_item = {
//     //             "PutRequest" : {
//     //                 "Item": {
//     //                     // your column names here will vary, but you'll need do define the type
//     //                     "Title": {
//     //                         "S": cur25[i].Title
//     //                     },
//     //                     "Col2": {
//     //                         "N": cur25[i].Col2
//     //                     },
//     //                     "Col3": {
//     //                         "N": cur25[i].Col3
//     //                     }
//     //                 }
//     //             }
//     //         };
//     //         item_data.push(this_item)
//     //     }
//     //     split_arrays.push(item_data);
//     // }
//     // let data_imported = false;
//     // let chunk_no = 1;
//     // async.each(split_arrays, (item_data, callback) => {
//     //     const params = {
//     //         RequestItems: {
//     //             "tagPerformance" : item_data
//     //         }
//     //     }
//     //     db.batchWriteItem(params, function(err, res, cap) {
//     //         if (err === null) {
//     //             console.log('Success chunk #' + chunk_no);
//     //             data_imported = true;
//     //         } else {
//     //             console.log(err);
//     //             console.log('Fail chunk #' + chunk_no);
//     //             data_imported = false;
//     //         }
//     //         chunk_no++;
//     //         callback();
//     //     });
//
//     }, () => {
//         // run after loops
//         console.log('all data imported....');
// });
rs.pipe(parser);
