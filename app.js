import * as express from 'express';
import * as bodyParser from 'body-parser';
import { routes as proverbRoutes } from './src/proverbs/index';

const app = express();
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET');
  next();
});
app.use(bodyParser.json());
app.use(proverbRoutes);

export default app;
