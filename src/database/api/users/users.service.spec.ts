import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
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
  const mockRepository = {
    find: jest.fn().mockImplementation((id) => [{ id: id }]),
    findAll: jest.fn().mockImplementation(() => [{ id: 1 }]),
    findOne: jest.fn().mockImplementation((id) => ({ id: id })),
    update: jest.fn().mockImplementation(() => data),
    create: jest.fn().mockImplementation((data) => data,),
    findByParams : jest.fn().mockImplementation(() => ({  ...data, id: 0, })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should get a user by id', async () => {
    expect(await service.findOne(1)).toStrictEqual({ id: expect.any(Number) });
  });
  it('should get all user ', async () => {
    expect(await service.findAll()).toStrictEqual(
      expect.arrayContaining([{ id: expect.any(Number) }]),
    );
  });
  it('should update an user by id ', async () => {
    expect(await service.update(1, data)).toStrictEqual({ id: 1, ...data });
  });
  it('should create an user ', async () => {
    expect(await service.create(data)).toBe(data)
  });
  it('should get an user by username ', async () => {
    expect(await service.findByUsernane('admin')).toStrictEqual({
      ...data,
    });
  });
});
