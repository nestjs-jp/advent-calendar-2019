import { IsString, IsNotEmpty } from 'class-validator';

export class CreateItemDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  deletePassword: string;
}

export class DeleteItemDTO {
  @IsString()
  @IsNotEmpty()
  deletePassword: string;
}
