import { SNS } from 'aws-sdk';

const sns = new SNS();

export const publishConsent = async (topicName, eventName, consent) => {

    const { TopicArn } = await sns.createTopic({ Name: topicName }).promise();

    return await sns.publish({
        Message: `Consent with given data was subscribed \r ${JSON.stringify(consent)}`,
        Subject: `${consent.countryCode} publishing -- ${eventName}`,
        TopicArn,
        MessageAttributes: {
            'countryCode': {
                DataType: 'String',
                StringValue: consent.countryCode,
            }
        },
    }).promise();
};
