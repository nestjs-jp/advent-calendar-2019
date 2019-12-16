import { IsString, IsNotEmpty, IsEmpty, IsNumber } from 'class-validator';

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

  @IsEmpty()
  id: string;
}

export class DeleteItemDTO {
  @IsString()
  @IsNotEmpty()
  deletePassword: string;
}

export class CreateCommentDTO {
  @IsEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @IsString()
  @IsNotEmpty()
  body: string;
}
