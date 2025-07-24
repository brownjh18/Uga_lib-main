import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserLibraryDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  ebookId: number;
}
