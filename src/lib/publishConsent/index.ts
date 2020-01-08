import { SNS } from 'aws-sdk';

const sns = new SNS();

export const publishConsent = async (topicArn, eventName, consent, data) =>
    await sns.publish({
        Message: `Consent with given data was subscribed \r ${JSON.stringify(consent)} \r Context \r ${data}`,
        Subject: `${consent.countryCody} publishing -- ${eventName}`,
        TopicArn: topicArn,
        MessageAttributes: {
            'countryCody': {
                DataType: 'String',
                StringValue: consent.countryCody,
            }
        },
    }).promise();

