import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { User } from '../types';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  findUserById(_id: string): User {
    // ...
    return { id: 'foo', hashedPassword: 'bar' };
  }

  getUserConfig(sessionToken: string) {
    const user = this.authService.getUser(sessionToken);

    return this.getConfig(user);
  }

  private getConfig(_user: User) {
    // ...

    return { name: 'alice' };
  }
}
