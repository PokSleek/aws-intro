import { DynamoDB } from 'aws-sdk';
import { DynamoDBStreamEvent } from 'aws-lambda';

import { createConsent, publishConsent, loadConsents } from './src/lib';
import { getBody, response } from './src/lib/helpers/event';

import config from './src/config';

export const createConsentHandler = async (event): Promise<any> => {
  try {
    const body = getBody(event);
    const isLoading = !body.consent;

    let result;
    if (isLoading) {
      console.log(body);
      result = await loadConsents(body.consents, body.consents[0].countryCode);
    } else {
      result = await createConsent(body.consent);
    }
    return response(200, result);

  } catch (error) {
    return response(500, error);
  }
};

export const propagateConsentHandler = async (dbEvent: DynamoDBStreamEvent): Promise<any> => {
  try {
    const { SNS: { topicName } } = config;
    const { eventName, dynamodb: { NewImage } } = dbEvent.Records[0];

    const consent = DynamoDB.Converter.unmarshall(NewImage);

    const result = await publishConsent(topicName, eventName, consent, dbEvent);

    return response(200, result);

  } catch (error) {
    return response(500, error);
  }
};
