import { Module } from '@nestjs/common';
import { SalesProductController } from './sales.controller';
import { CreateSalesProductService } from './services/createSalesProduct.service';
import { SalesProductFactory } from '../domain/salesProduct/salesProduct.factory';
import { RandomService } from '../../infrastructure/random/random.service';
import { RandomModule } from '../../infrastructure/random/random.module';
import { TransactionModule } from '../../infrastructure/transaction/transaction.module';
import { SALES_PRODUCT_REPOSITORY } from './shared/constants';
import { InMemorySalesProductRepository } from './repositories/InMemorySalesProduct.repository';

@Module({
  imports: [RandomModule, TransactionModule],
  controllers: [SalesProductController],
  providers: [
    CreateSalesProductService,
    {
      provide: SalesProductFactory,
      useFactory: (random: RandomService): SalesProductFactory =>
        new SalesProductFactory({ random }),
      inject: [RandomService],
    },
    {
      provide: SALES_PRODUCT_REPOSITORY,
      useClass: InMemorySalesProductRepository,
    },
  ],
})
export class SalesModule {}
