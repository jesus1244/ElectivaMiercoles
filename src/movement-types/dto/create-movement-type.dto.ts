/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovementTypeDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
