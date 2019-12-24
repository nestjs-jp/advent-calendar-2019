import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dot/createUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async findById(id: number) {
        return await this.userRepository.findOne(id);
    }

    async create(createUserDto: CreateUserDto) {
        return this.userRepository.save(createUserDto);
    }
}
