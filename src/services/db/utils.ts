import { dbBY, dbUA } from './index';

export const dbSwitcher = countryCody => {
    switch (countryCody) {
        case 'BY':
            return  dbBY;
        case 'UA':
            return  dbUA;
        default:
            return  null;
    }
};
