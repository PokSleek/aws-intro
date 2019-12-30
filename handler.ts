import { createConsent, publishConsent } from './src/services';
import { response, bodyParse } from './src/lib/helpers/event';

export const createConsentHandler = async (event) => {
  try {

    const result = await createConsent(event);

    const error = result;
    if ( error ) {
      return response(error.code, error.message)
    }

    return response(200, result);

  } catch (error) {
    return response(500, error);
  }

};

export const publishConsentHandler = async (event) => {
  try {

    const result = await publishConsent(event);

    return response(200, result);

  } catch (error) {
    return response(500, error);
  }

};
