import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();

const app: Express = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/', (req: Request, res: Response, next) => {
  req.body = req.query;
  next();
})

// routing
app.use('/api', router);

// create the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});