/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { MovementsService } from './service/movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementsService.create(createMovementDto);
  }
}
