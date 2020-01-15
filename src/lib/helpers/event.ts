import isString from 'lodash/isString';

export const getBody = ({ body }) => {
    return isString(body) ? JSON.parse(body) : body;
};

export const response = (statusCode, body) => ({
    statusCode,
    body: JSON.stringify(body),
});
