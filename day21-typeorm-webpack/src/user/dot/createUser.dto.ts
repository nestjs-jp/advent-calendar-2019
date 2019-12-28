import { IsString, IsNotEmpty } from 'class-validator';

export abstract class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
