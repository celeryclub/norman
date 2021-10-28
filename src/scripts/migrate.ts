import path from 'path';
import { createConnection, ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [path.join(__dirname, '../entities/*')],
  synchronize: true,
};

if (process.env.NODE_ENV === 'production') {
  // @ts-ignore
  connectionOptions.extra = {
    ssl: true,
  };
}

createConnection(connectionOptions)
  .then(() => {
    console.log('Database has been migrated');
    process.exit();
  })
  .catch((error) => console.log(error));
