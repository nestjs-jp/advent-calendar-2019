import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

const SALT = '12345';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private createPasswordDigest(password: string) {
    return crypto
      .createHash('sha256')
      .update(SALT + '/' + password)
      .digest('hex');
  }

  async findUserByScreenName(screenName: string): Promise<boolean> {
    return !!(await this.userRepository.findOne({ where: { screenName } }));
  }

  async register(userData: Partial<User>) {
    await this.userRepository.insert({
      ...userData,
      password: this.createPasswordDigest(userData.password),
    });
  }

  async loginUser(screenName: string, password: string) {
    return await this.userRepository.findOne({
      where: {
        screenName,
        password: this.createPasswordDigest(password),
      },
    });
  }
}
