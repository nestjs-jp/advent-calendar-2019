import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export interface UserInterface {
  id: number;
  displayId: string;
  name: string;
  profileText?: string;
  createdAt?: number;
  updatedAt?: number;
}

export abstract class AbstractUser implements UserInterface {
  id: number;
  displayId: string;
  name: string;
  profileText?: string;
  createdAt?: number;
  updatedAt?: number;

  constructor({
    id,
    displayId,
    name,
    profileText,
    createdAt,
    updatedAt,
  }: UserInterface) {
    this.id = id;
    this.displayId = displayId;
    this.name = name;
    this.profileText = profileText;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toObject(): UserInterface {
    return {
      id: this.id,
      displayId: this.displayId,
      name: this.name,
      profileText: this.profileText,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export abstract class ValidatableUser extends AbstractUser {
  id!: number;

  @IsNotEmpty()
  @MaxLength(16)
  displayId!: string;

  @IsNotEmpty()
  @MaxLength(16)
  name!: string;

  @MaxLength(140)
  profileText?: string;

  createdAt?: number;
  updatedAt?: number;
}

export class User extends ValidatableUser {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'alice07' })
  displayId!: string;

  @ApiProperty({ example: 'alice' })
  name!: string;

  @ApiProperty({ example: `Hello, I'm NestJS Programmer!` })
  profileText?: string;

  toObject() {
    return {
      id: this.id,
      displayId: this.displayId,
      name: this.name,
      profileText: this.profileText,
    };
  }
}

export class UserEntity extends ValidatableUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  displayId!: string;

  @Column()
  name!: string;

  @Column('text')
  profileText?: string;

  @Column()
  createdAt?: number;

  @Column()
  updatedAt?: number;
}
