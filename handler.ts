import { DynamoDB } from 'aws-sdk';

import { createConsent, publishConsent } from './src/lib';
import { response } from './src/lib/helpers/event';

import config from  './src/config';

export const createConsentHandler = async (event) => {
  try {
    const { consent } = event;
    const result = await createConsent(consent);

    return response(200, result);

  } catch (error) {
    return response(500, error);
  }
};

export const propagateConsentHandler = async (dbEvent) => {
  try {
    const { SNS: { topicName } } = config;
    const { eventName, dynamodb: { NewImage } } = dbEvent.Records[0];

    const consent = DynamoDB.Converter.unmarshall(NewImage);

    const result = await publishConsent(topicName, eventName, consent);

    return response(200, result);

  } catch (error) {
    return response(500, error);
  }
};
