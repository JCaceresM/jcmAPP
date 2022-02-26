import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor( 
    private _userRepository: UsersRepository
  ){}
  create(createUserDto: CreateUserDto) {
    return this._userRepository.create(createUserDto)
  }

  findAll() {
    return this._userRepository.findAll()
  }

  findOne(id: number) {
    return this._userRepository.findOne(id)
  }
  findByUsernane(username: string) {
    return this._userRepository.findByParams({username})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return  this._userRepository.update(id, updateUserDto)

  }
}
