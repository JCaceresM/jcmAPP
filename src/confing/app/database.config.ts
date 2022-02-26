import { registerAs } from '@nestjs/config';
import { join } from 'path';

export function dbConfig() {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(`${process.env.DB_PORT}`, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '../../**/**/*entity{.ts,.js}')],
    autoLoadEntities: true,

    // Implementaremos Migrations.
    /** Recursos
     *  * https://typeorm.io/#/migrations
     */
    migrationsRun: true,
    migrations: [join(__dirname, '../../db/migration/**/*{.ts,.js}')],
    migrationsTableName: 'migrations_typeorm',
    cli: {
      migrationsDir: 'src/database/migration',
    },

    //  ssl: {
    //   rejectUnauthorized: false
    // },

    // Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
    synchronize: true,
    logging: true,
    logger: 'file',
  };
}
export default registerAs('database', () => ({
  config: dbConfig()
}));