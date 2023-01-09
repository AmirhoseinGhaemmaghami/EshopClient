import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/Models/Products/product';
import { ProductInputWithSpec } from 'src/app/shared/Models/Products/productInputWithSpec';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsToShow: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    let inp = new ProductInputWithSpec(1, 10);
    this.getProducts(inp);
  }

  getProducts(inp: ProductInputWithSpec) {
    this.productService.getProducts(inp).subscribe({
      next: (d) => {
        this.productsToShow = d.data;
      },
    });
  }
}
