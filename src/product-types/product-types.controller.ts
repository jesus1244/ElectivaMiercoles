/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductTypesService } from './service/product-types.service';
import { CreateProductTypeDto, UpdateProductTypeDto } from './dto/create-product-type.dto';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Post()
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypesService.create(createProductTypeDto);
  }

  @Get()
  findAll() {
    return this.productTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productTypesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductTypeDto: UpdateProductTypeDto) {
    return this.productTypesService.update(id, updateProductTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productTypesService.remove(id);
  }
}
