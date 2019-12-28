import { Controller, Get, Param, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dot/createUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async findUserById(@Param('id') id: string) {
        return this.userService.findById(parseInt(id, 10));
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
}
