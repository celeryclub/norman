import express from 'express';
import { createConnection } from 'typeorm';
import CoffeesController from './controllers/CoffeesController';

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

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Started at http://localhost:${port}`);
  });
})();
