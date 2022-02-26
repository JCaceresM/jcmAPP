import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './confing/app/config.service';
import generateTypeormConfigFile from './confing/app/generateTypeormFile';
import setDefaultUser from './scripts/setDefaultUser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const appConfig = app.get(AppConfigService);
   generateTypeormConfigFile(config, appConfig);
  await setDefaultUser( appConfig);
  const logger = new Logger('Bootstrap');
  await app.listen(process.env.port || 8080);
  logger.log(`Server is running at ${await app.getUrl()}`);

}
bootstrap();
