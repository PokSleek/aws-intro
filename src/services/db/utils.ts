import { dbBY, dbUA } from './index';

export const dbSwitcher = countryCode => {
    switch (countryCode) {
        case 'BY':
            return  dbBY;
        case 'UA':
            return  dbUA;
        default:
            return  null;
    }
};
