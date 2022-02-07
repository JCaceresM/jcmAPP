import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function dbConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DB_CONNECTION,
    port: parseInt(`${process.env.DB_PORT}`, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
    autoLoadEntities: true,

    // Implementaremos Migrations.
    /** Recursos
     *  * https://typeorm.io/#/migrations
     */
    // migrationsRun: false,
    // migrations: [join(__dirname, '../db/migration/**/*{.ts,.js}')],
    // migrationsTableName: 'migrations_typeorm',
    // cli: {
    //   migrationsDir: 'src/db/migration',
    // },

    //  ssl: {
    //   rejectUnauthorized: false
    // },

    // Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
    synchronize: false,
    logging: true,
    logger: 'file',
  };
}
