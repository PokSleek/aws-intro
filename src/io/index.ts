export const handler = {
    input: event => JSON.parse(event.body),

    returnSuccess: body => ({
        statusCode: 200,
        body: JSON.stringify(body),
    })
};

export default {
    handler,
    db: {}
};
