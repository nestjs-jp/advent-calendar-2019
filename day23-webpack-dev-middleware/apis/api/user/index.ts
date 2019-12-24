import { User } from '@/src/entities/User';
import { CreateUserDto } from '@/src/user/dto/createUserDto.dto';
export interface Methods {
  get: {
    response: Array<Omit<User, 'password'>>;
  };

  post: {
    data: CreateUserDto;
  };
}
