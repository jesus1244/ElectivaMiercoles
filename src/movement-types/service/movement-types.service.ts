/* eslint-disable prettier/prettier */
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementType } from '../entity/movement-type.entity';
import { CreateMovementTypeDto } from '../dto/create-movement-type.dto';

@Injectable()
export class MovementTypesService {
  constructor(
    @InjectRepository(MovementType)
    private movementTypeRepository: Repository<MovementType>,
  ) {}

  async create(createMovementTypeDto: CreateMovementTypeDto) {
    const { description } = createMovementTypeDto;

    const existingMovementType = await this.movementTypeRepository.findOne({where :{ description }});

    if (existingMovementType) {
      throw new ConflictException('El tipo de movimiento ya existe');
    }

    const movementType = this.movementTypeRepository.create(createMovementTypeDto);
    return this.movementTypeRepository.save(movementType);
  }

  async findAll() {
    return this.movementTypeRepository.find();
  }
}
