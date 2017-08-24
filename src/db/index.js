import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const dbURL = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL
  : process.env.DATABASE_URL_DEV;

export default new Sequelize(dbURL);
