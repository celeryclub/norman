import path from 'path';
import express from 'express';
import cors from 'cors';
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

  // If the requesting IP isn't in the allowlist, send back a 403.
  if (process.env.NODE_ENV === 'production') {
    app.use(function (req, res, next) {
      const xForwardedFor = req.headers['x-forwarded-for'];
      let requestIp;

      if (xForwardedFor) {
        requestIp = Array.isArray(xForwardedFor)
          ? xForwardedFor[0]
          : xForwardedFor;
      } else {
        requestIp = req.socket.remoteAddress;
      }

      if (process.env.IP_ALLOWLIST.split(',').includes(requestIp)) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied' });
      }
    });
  }

  app.use(cors());
  app.use(express.json());

  app.use('/coffees', CoffeesController);
  app.use('/roasts', RoastsController);

  app.use((req, res) => res.status(404).json({ message: 'Not found' }));

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Started at http://localhost:${port}`);
  });
})();
