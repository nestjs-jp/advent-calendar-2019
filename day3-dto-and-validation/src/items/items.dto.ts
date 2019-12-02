import { IsNotEmpty } from 'class-validator';

export class CreateItemDTO {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  deletePassword: string;
}
