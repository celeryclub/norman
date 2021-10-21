import express from 'express';
import { createConnection } from 'typeorm';
import CoffeesController from './controllers/CoffeesController';
import RoastsController from './controllers/RoastsController';

(async () => {
  await createConnection({
    type: 'mariadb',
    host: 'coffee.local',
    port: 3306,
    username: 'norman',
    password: 'norman',
    database: 'norman',
    entities: ['src/models/*.ts'],
  });

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
