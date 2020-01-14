export const getBody = event => JSON.parse(event.body);

export const response = (statusCode, body) => ({
    statusCode,
    body: JSON.stringify(body),
});