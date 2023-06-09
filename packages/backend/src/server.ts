import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'dotenv/config';

import AppRouter from './routes';
import connectDB from './config/database';

const app = express();
const router = new AppRouter(app);
// Connect to DB
connectDB();

// Express configuration
app.set('port', process.env.PORT || 5003);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

const port = app.get('port');
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
