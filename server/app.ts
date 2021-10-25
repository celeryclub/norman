import path from 'path';
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
    entities: [path.join(__dirname, './entities/*')],
  });

  const app = express();

  app.use(express.json());

  app.use('/api/coffees', CoffeesController);
  app.use('/api/roasts', RoastsController);

  // This is for real files like JS
  app.use(express.static(path.join(__dirname, '../public')));

  // This is for routes handled by React Router
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Started at http://localhost:${port}`);
  });
})();
