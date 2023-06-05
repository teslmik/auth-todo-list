/* eslint-disable no-console */

import { DataSource, DataSourceOptions } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/User';

function getSSLConfig(env: string) {
  const configs: { [key: string]: boolean | { [key: string]: boolean } } = {
    production: { rejectUnauthorized: true },
    local: false,
    deploy: { rejectUnauthorized: false }
  };
  if (!configs[env] === undefined) {
    throw new Error('Set network in your .env file');
  }
  return configs[env];
}

const options: DataSourceOptions = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  logging: ['query', 'error'],
  type: 'postgres',
  entities: [Todo, User],
  migrations: ['dist/migrations/**/*.{ts,js}'],
  subscribers: ['src/subscriber/**/*.ts'],
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: getSSLConfig(process.env.SERVER_MODE as string),
  synchronize: true
};

export const myDataSource = new DataSource(options);

const connectDB = async () => {
  try {
    await myDataSource.initialize();
    console.log('DB Connected...');
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
