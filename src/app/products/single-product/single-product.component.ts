import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/Models/Products/product';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent {
  @Input() product!: Product;
}
