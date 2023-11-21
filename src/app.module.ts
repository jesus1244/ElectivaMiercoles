import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ProductTypesController } from './product-types/product-types.controller';
import { ProductsController } from './product/product.controller';
import { MovementTypesController } from './movement-types/movement-types.controller';
import { MovementsController } from './movement/movement.controller';
import { MovementsService } from './movement/service/movements.service';
import { ProductsService } from './product/service/products.service';
import { Movement } from './movement/entity/movement.entity';
import { MovementType } from './movement-types/entity/movement-type.entity';
import { Product } from './product/entity/product.entity';
import { ProductType } from './product-types/entity/product-type.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'electivaprof',
      entities: [User, Movement, ProductType, Product, MovementType],
      synchronize: true,
    }),
  ],
  controllers: [
    AppController,
    ProductTypesController,
    ProductsController,
    MovementTypesController,
    MovementsController,
  ],
  providers: [AppService, MovementsService, ProductsService],
})
export class AppModule {}
