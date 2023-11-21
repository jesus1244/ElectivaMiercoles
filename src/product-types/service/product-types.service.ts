/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from '../entity/product-type.entity';
import { CreateProductTypeDto, UpdateProductTypeDto } from '../dto/create-product-type.dto';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

async create(createProductTypeDto: CreateProductTypeDto) {
    const { description } = createProductTypeDto;

    const existingProductType = await this.productTypeRepository.findOne({ where: { description } });

    if (existingProductType) {
        throw new ConflictException('La descripción ya existe en la tabla de product_types');
    }

    const productType = this.productTypeRepository.create(createProductTypeDto);
    return this.productTypeRepository.save(productType);
}

  async findAll() {
    return this.productTypeRepository.find();
  }

  async findOne(id: number) {
    return this.productTypeRepository.findOne({ where: {id} });
  }

  async update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    const productType = await this.productTypeRepository.findOne({ where: {id} });

    if (!productType) {
      throw new NotFoundException('Tipo de producto no encontrado');
    }

    this.productTypeRepository.merge(productType, updateProductTypeDto);
    return this.productTypeRepository.save(productType);
  }

  async remove(id: number) {
    const productType = await this.productTypeRepository.findOne({ where: {id} });

    if (!productType) {
      throw new NotFoundException('Tipo de producto no encontrado');
    }

    return this.productTypeRepository.remove(productType);
  }
}
