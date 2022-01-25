import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (request, response) => {
  return response.json({
    message: 'Delivery app is working'
  });
});

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof Error) {
    return response.status(400).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error 🆘 '
  })
});

app.listen(3000, () => console.log('Server is running on port 3000 ✅'));