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

parser.on('end',() => {
    const UA = {consents: output.UA};
    const BY = {consents: output.BY};

    return new Promise(resolve => {
        request.post(url,
            {
                json: BY,
            },
            (err, res, body) => {
                console.log(`BY countries response
            Error: ${err}
            Body: ${JSON.stringify(body)}
            `);
            resolve();
            });
    }).then(() => {
        request.post(url,
            {
                json: UA,
            },
            (err, res, body) => {
                console.log(`UA countries response
            Error: ${err}
            Body: ${JSON.stringify(body)}
            `);
            }
        );
    })



});

rs.pipe(parser);
