import express from 'express';
import bodyParser from 'body-parser';

// Controllers (route handlers)
import * as bookController from './controllers/book';

const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/book', bookController.getBooks);

export default app;
