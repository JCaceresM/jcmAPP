import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../database/api/users/users.service';
import { CreateUserDto } from '../database/api/users/dto/create-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  const data: CreateUserDto = {
    username: 'user',
    password: 'password',
    email: 'jcm@mc.es',
    lastName: 'cm',
    name: 'j',
    createAt: new Date(),
    updatedAt: new Date(),
    id: 0
  };
  const mockUsersService = {
    findByUsernane: jest.fn().mockImplementation(async () => {
      const pass = await bcrypt.hash('password', 10);
      return [{ ...data, password: pass }];
    }),
  };
  const mockjwtService = {
    verifyAsync: jest.fn().mockReturnValue({exp: 1, iat:1}),
    signAsync: jest.fn().mockReturnValue('token')
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockjwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should validate user', async () => {
    const res = {...data}
    delete res.password
    expect(await service.validateUser('username', 'password')).toStrictEqual(res);
  });
  it('should login', async () => {
    expect(await service.login(data)).toStrictEqual({
      accessToke: expect.any(String),
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });
});
