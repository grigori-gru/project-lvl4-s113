import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
let dbUrl;

switch (process.env.NODE_ENV) {
  case 'production':
    dbUrl = process.env.DATABASE_URL;
    break;
  case 'test':
    dbUrl = process.env.DATABASE_URL_TEST;
    break;
  default:
    dbUrl = process.env.DATABASE_URL_DEV;
}

export default new Sequelize(dbUrl);
