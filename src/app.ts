import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Controllers (route handlers)
import * as bookController from './controllers/book';
import * as crimeController from './controllers/crime';

const app = express();

mongoose
  .connect('mongodb://localhost:27017/checkr', {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {})
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err,
    );
    // process.exit();
  });

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/book', bookController.getBooks);
app.get('/crime', crimeController.getData);

export default app;
