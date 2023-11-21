/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMovementDto {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  movement_type_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
