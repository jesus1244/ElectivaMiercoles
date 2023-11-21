/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dto/create-product.dto';
import { ProductType } from 'src/product-types/entity/product-type.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productTypesRepository: Repository<ProductType>,
  ) {}

async create(createProductDto: CreateProductDto) {

    const { product_type_id, description } = createProductDto;

    if (!product_type_id || !description) {
        throw new BadRequestException('product_type_id y description son campos requeridos.');
      }

    const productType = await this.productRepository.findOne({ where: { productType: { id: product_type_id } } });

    if (!productType) {
        throw new NotFoundException('El product_type_id no existe en la tabla product_types');
    }

    const product = this.productRepository.create(createProductDto);
    product.productType = productType;
    return this.productRepository.save(product);
}

async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const { product_type_id, description } = updateProductDto;

    if (!product_type_id || !description) {
        throw new BadRequestException('product_type_id y description son campos requeridos.');
      }

    this.productRepository.merge(product, updateProductDto);

    // Guardar los cambios en la base de datos
    return this.productRepository.save(product);
  }

async findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
}
}
