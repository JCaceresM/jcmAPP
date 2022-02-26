import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const data = {
    username: 'user',
    password: 'password',
    email: 'jcm@mc.es',
    lastname: 'cm',
    name: 'j',
  };
  const mockUserService = {
    find: jest.fn().mockImplementation((id) => [{ id: id }]),
    findAll: jest.fn().mockImplementation(() => [{ id: 1 }]),
    findOne: jest.fn().mockImplementation((id) => ({ id: id })),
    update: jest.fn().mockImplementation((id) => ({ id, ...data })),
    create: jest.fn().mockImplementation((data) => ({ id: 1, ...data })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should get a user by id', () => {
    expect(controller.findOne({id: 1})).toStrictEqual({ id: expect.any(Number) });
  });
  it('should get all user ', () => {
    expect(controller.findAll()).toStrictEqual(
      expect.arrayContaining([{ id: expect.any(Number) }]),
    );
  });
  it('should update an user by id ', () => {
    expect(controller.update({id: 1}, data)).toStrictEqual({ id: 1, ...data });
  });
  it('should create an user ', () => {
    expect(controller.create(data as unknown as CreateUserDto)).toStrictEqual({
      id: expect.any(Number),
      ...data,
    });
  });
});
