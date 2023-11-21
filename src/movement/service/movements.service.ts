/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movement } from '../entity/movement.entity';
import { CreateMovementDto } from '../dto/create-movement.dto';
import { ProductsService } from '../../product/service/products.service';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movement, 'default')
    private readonly movementRepository: Repository<Movement>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createMovementDto: CreateMovementDto) {
    const { product_id, movement_type_id, quantity } = createMovementDto;

    const product = await this.productsService.findOne(product_id);

    if (!product) {
      throw new NotFoundException('El producto no existe');
    }

    if (movement_type_id === 1) {
      // Ingreso
      product.quantity += quantity;
    } else if (movement_type_id === 2) {
      // Salida
      if (product.quantity < quantity) {
        throw new BadRequestException('No hay suficiente cantidad para la salida');
      }
      product.quantity -= quantity;
    } else {
      throw new BadRequestException('Tipo de movimiento no válido');
    }
    
    const movement = this.movementRepository.create(createMovementDto);
    return this.movementRepository.save(movement);
  }
}
