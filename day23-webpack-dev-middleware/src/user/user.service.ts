import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAllUser() {
    return (await this.userRepository.find()).map(user => {
      const { password, ...u } = user;
      return u;
    });
  }
  async findById(id: number) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      const { password, ...u } = user;
      return u;
    } else {
      return { id: null, name: null };
    }
  }

  create(user: CreateUserDto) {
    return this.userRepository.save(user);
  }
}
