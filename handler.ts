import { DynamoDB } from 'aws-sdk';

import { createConsent, publishConsent } from './src/lib';
import {getRegionAndAccountId, response} from './src/lib/helpers/event';

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

export const propagateConsentHandler = async (dbEvent, context) => {
  try {
    console.log(context);
    const { SNS: { topicName } } = config;
    const { eventName, dynamodb: { NewImage } } = dbEvent.Records[0];


    const { region, accountId } = getRegionAndAccountId(context);

    const topicArn = `arn:aws:sns:${region}:${accountId}:${topicName}`;
    const consent = DynamoDB.Converter.unmarshall(NewImage);


    const result = await publishConsent(topicArn, eventName, consent, JSON.stringify(context));

    return response(200, result);

  } catch (error) {
    return response(500, error);
  }

};
