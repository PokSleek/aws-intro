export const getBody = event => JSON.parse(event.body);

export const response = (statusCode, body) => ({
    statusCode,
    body: JSON.stringify(body),
});

export const getRegionAndAccountId = context => {
    // const functionArnCols = context.invokedFunctionArn.split(':');
    // console.log(functionArnCols);
    // const region = functionArnCols[3];
    // const accountId = functionArnCols[4];

    return ({
        region: 'region',
        accountId: 'id',
    });
};
