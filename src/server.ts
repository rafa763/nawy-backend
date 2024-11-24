import express from 'express';
import helmet from 'helmet';
import router from './routes';
import cors from 'cors';
import globalErrorHandler from './error/globalHandler';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/api', router);
app.use(globalErrorHandler);

app.set('trust proxy', true);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
