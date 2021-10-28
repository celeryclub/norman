import path from 'path';
import express from 'express';
import { createConnection, ConnectionOptions } from 'typeorm';
import CoffeesController from './controllers/CoffeesController';
import RoastsController from './controllers/RoastsController';

(async () => {
  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [path.join(__dirname, './entities/*')],
  };

  if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    connectionOptions.extra = {
      ssl: true,
    };
  }

  await createConnection(connectionOptions);

  const app = express();

  app.use(express.json());

  app.use('/coffees', CoffeesController);
  app.use('/roasts', RoastsController);

  app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Started at http://localhost:${port}`);
  });
})();
