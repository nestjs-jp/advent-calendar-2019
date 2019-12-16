import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  getUser(_sessionToken: string): User {
    // ...
    return { id: 'foo', hashedPassword: 'bar' };
  }

  login(userId, password) {
    const user = this.usersService.findUserById(userId);

    return this.authenticateUser(user, password);
  }

  private authenticateUser(_user: User, _password: string): string {
    // ...

   return 'hoge4js'
  }
}
