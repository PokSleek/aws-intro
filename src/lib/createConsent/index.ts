import { Consent } from '../../interfaces';

import { dbSwitcher } from '../../services/db/utils';

export const createConsent = async (consent: Consent) => {
    const { uuid, channelType, channelValue, countryCode } = consent;
    const db = dbSwitcher(countryCode);

    if (db) {
        const item = await db.put({
            uuid,
            channelType,
            channelValue,
            countryCode,
            createdAt: Date.now(),
        });

        return ({ item });
    }
    throw new Error('Bad country code');
};
