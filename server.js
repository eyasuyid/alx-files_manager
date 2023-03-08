import express from 'express';
import routes from './routes/index';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(routes);


app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    console.error(`Error: ${err}`);
  } else {
    console.log(`listening on port ${process.env.PORT || 5000}`);
  }
})
