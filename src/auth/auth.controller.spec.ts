import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  const mockCanActivate: CanActivate = {
    canActivate: jest.fn().mockReturnValue(true),
  };
  const mockAuthService ={
    login: jest.fn().mockReturnValue(true)
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{provide: AuthService, useValue: mockAuthService}],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue(mockCanActivate)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should log in', async () => {
    expect(await controller.login({user:{username:'user'}})).toBeTruthy()
  });
});
