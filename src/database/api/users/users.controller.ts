import { Controller, Get, Post, Body, Patch, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidationPipe } from '../../../common/utils/responses/validations/JoinValidationPipe';
import {
  createUserSchema,
  UpdateUserSchema,
  UserSchemaById,
} from './users.schema.validation.pipe';
import { JwtAuthGuard } from '../../../auth/guard/jwt-auth.guard';
@UseGuards(JwtAuthGuard,)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body(new JoiValidationPipe(createUserSchema)) createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get('/collection')
  findAll() {
    return this.usersService.findAll();
  }

  @Get()
  findOne(@Query(new JoiValidationPipe(UserSchemaById)) params: {id: number}) {
    return this.usersService.findOne(+params.id);
  }

  @Patch()
  update(
    @Query(new JoiValidationPipe(UserSchemaById)) params: {id: number},
    @Body(new JoiValidationPipe(UpdateUserSchema)) updateUserDto: UpdateUserDto,
  ) {    
    return this.usersService.update(params.id, updateUserDto);
  }
}
