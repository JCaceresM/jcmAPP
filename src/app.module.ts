import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './confing/app/database.config';
import { DatabaseModule } from './db/db.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig(),
    } as TypeOrmModuleOptions),
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
