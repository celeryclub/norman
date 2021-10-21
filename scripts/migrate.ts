import { createConnection } from 'typeorm';

createConnection({
  type: 'mariadb',
  host: 'coffee.local',
  port: 3306,
  username: 'norman',
  password: 'norman',
  database: 'norman',
  entities: ['server/models/*.ts'],
  synchronize: true,
})
  .then(() => {
    console.log('Database has been migrated');
    process.exit();
  })
  .catch((error) => console.log(error));
