import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../database/api/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '../confing/app/config.module';
import { AppConfigService } from '../confing/app/config.service';
import { UsersService } from '../database/api/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (_appConfigService: AppConfigService) => {
        console.log(_appConfigService);

        return {
          secret: _appConfigService.get('SECRET_JWT'),

          signOptions: {
            algorithm: 'HS512',
            expiresIn: _appConfigService.get('EXP_SECRET_JWT'),
          },
        };
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AuthService,
    JwtStrategy,
    UsersService,JwtAuthGuard
  ],
  exports: [AuthService, LocalStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
