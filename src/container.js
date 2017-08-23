import dotenv from 'dotenv';

import getModels from './models';
import connect from './db';

dotenv.config();

export default ({ ...getModels(connect) });
