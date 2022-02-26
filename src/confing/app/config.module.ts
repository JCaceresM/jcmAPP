import { Module } from '@nestjs/common';

import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      cache: true,  
      load:[configuration]   

    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
