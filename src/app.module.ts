import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigModule } from './confing/app/config.module';
import { AppConfigService } from './confing/app/config.service';
import { DatabaseModule } from './database/db.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService, AppConfigService],
      useFactory: (config: ConfigService, appConfigService: AppConfigService) =>
        config.get<TypeOrmModuleOptions>(
          appConfigService.get('TYPEORM_CONFIG'),
        ),
    }),
    DatabaseModule,
    AppConfigModule,
    AuthModule,
  ],

  providers: [AppConfigService],
})
export class AppModule {
}
