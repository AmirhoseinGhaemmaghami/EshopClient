import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ProductsComponent, SingleProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
})
export class ProductsModule {}
