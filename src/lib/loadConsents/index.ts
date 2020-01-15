import {dbSwitcher} from '../../services/db/utils';

export const loadConsents = async (consents, countryCode) => {
    const createdAt = Date.now();
    const updatedConsents = consents.map(item => {
        item.createdAt = createdAt;
        return item;
    });
    const db = dbSwitcher(countryCode);
    return db.load(updatedConsents);
};
