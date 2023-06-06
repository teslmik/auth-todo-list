/* eslint-disable no-console */
import { appDataSource } from './app-data-source';

const connectDB = async () => {
  try {
    await appDataSource.initialize();
    console.log('DB Connected...');
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
