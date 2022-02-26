import { getRepository } from 'typeorm';
import { UpdateUserDto } from '../database/api/users/dto/update-user.dto';
import { UserEntity } from '../database/api/users/entities/user.entity';
import { AppConfigService } from '../confing/app/config.service';

const setDefaultUser = async (
  config: AppConfigService,
) => {
  const UsersRepository = getRepository<UpdateUserDto>(UserEntity);

  const users = await UsersRepository.find();

  if (!users.length) {
    const defaultUser = UsersRepository.create({
      username: config.get('DEFAULT_USERNAME'),
      password: config.get('DEFAULT_PASSWORD'),
      name: config.get('DEFAULT_NAME'),
      lastName: config.get('DEFAULT_LASTNAME'),
      email: config.get('DEFAULT_EMAIL'),
    });
    await UsersRepository.save(defaultUser);
  }
};

export default setDefaultUser;
