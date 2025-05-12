import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet'; // set HTTP response
import morgan from 'morgan'; // request logger
import cookieParser from 'cookie-parser'; // get cookir from request
import qs from 'qs'

import Connect from './connection/connect.ts'; // Import the Connect function
import Router from './routes/router.ts';
import setupSwagger from './swaggerConfig.js';

const app = express();
// Setup Swagger documentation
setupSwagger(app);

// query string parser qs
app.set('query parser', function (str:string) {
  return qs.parse(str, { /* custom options */ })
})

// Initialize MongoDB connection
Connect();
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
app.use(express.json());



app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/auth', Router.SigninRouter);
app.use('/job', Router.jobRouter);

export default app;


// demo pour utiliser Oauth avec express https://github.com/node-oauth/node-oauth2-server-examples/tree/main/server2server
// fait par des ancêtres ...