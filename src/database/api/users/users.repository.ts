import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequest } from '../../../common/utils/responses/error.helper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>){}
  async create(createUserDto: CreateUserDto) {
    try {
        return await this._userRepository.save(createUserDto);
    } catch (error) {
        throw BadRequest({message: 'Unable to create an User'})
    }
  }

  async findAll() {
    try {
        return await this._userRepository.find();
    } catch (error) {
        throw BadRequest({message: 'Unable to find an Users'})
    }
  }

  async findOne(id: number) {
    try {
        return await this._userRepository.find({where: { id}});
    } catch (error) {
        throw BadRequest({message: `Unable to find  User with id ${id}`})
    }
  }
  async findByParams(params: Partial<CreateUserDto>) {
    try {
        return await this._userRepository.find({where: { ...params}});
    } catch (error) {
        throw BadRequest({message: `Unable to find  User `})
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
        await this.findOne(id)
        const updateResult = await this._userRepository.update(id,updateUserDto);
        if(!updateResult.affected)  throw Error
        const userUpdate = await this.findOne(id)
        return {...updateResult, data: userUpdate}

    } catch (error) {
        throw BadRequest({message: `Unable to update User with id ${id}`})
    }
  }
}
