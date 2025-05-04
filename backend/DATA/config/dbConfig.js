import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, {
    dialect: 'mssql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialectOptions: {
      options: {
        instanceName: process.env.DB_INSTANCE,
        encrypt: false,
        trustServerCertificate: true,
      }
    },
    logging: false
  }
);

export default sequelize;
