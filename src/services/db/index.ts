import configureDB from './configureDB';

import config from '../../config';

const { DB: { UA, BY } } = config;


export const dbBY = configureDB(BY);
export const dbUA = configureDB(UA);
