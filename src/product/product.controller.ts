/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Put, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() createProductDto: CreateProductDto) {
    return this.productsService.update(id, createProductDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}
