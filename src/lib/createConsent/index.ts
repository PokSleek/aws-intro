import { dbSwitcher } from '../../services/db/utils';

export const createConsent = async consent => {
    const { uuid, channelType, channelValue, countryCody } = consent;

    const db = dbSwitcher(countryCody);

    if (db) {
        const item = await db.put({
            uuid,
            channelType,
            channelValue,
            countryCody,
            createdAt: Date.now(),
        });

        return ({ item });
    }
};
