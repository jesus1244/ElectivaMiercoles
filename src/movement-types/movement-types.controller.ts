/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { MovementTypesService } from './service/movement-types.service';
import { CreateMovementTypeDto } from './dto/create-movement-type.dto';

@Controller('movement-types')
export class MovementTypesController {
  constructor(private readonly movementTypesService: MovementTypesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createMovementTypeDto: CreateMovementTypeDto) {
    return this.movementTypesService.create(createMovementTypeDto);
  }

  @Get()
  findAll() {
    return this.movementTypesService.findAll();
  }
}
