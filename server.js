import express from 'express';
import routes from './routes/index';

const app = express();

app.use(routes);

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    console.error(`Error: ${err}`);
  } else {
    console.log(`listening on port ${process.env.PORT || 5000}`);
  }
});
