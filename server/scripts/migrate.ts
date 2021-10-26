import path from 'path';
import { createConnection } from 'typeorm';

createConnection({
  type: 'mariadb',
  url: process.env.DATABASE_URL,
  entities: [path.join(__dirname, '../entities/*')],
  synchronize: true,
})
  .then(() => {
    console.log('Database has been migrated');
    process.exit();
  })
  .catch((error) => console.log(error));
