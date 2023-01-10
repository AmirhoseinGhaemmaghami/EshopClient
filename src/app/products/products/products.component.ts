import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/shared/Models/Products/product';
import { ProductInputWithSpec } from 'src/app/shared/Models/Products/productInputWithSpec';
import { ProductService } from '../product.service';

declare function jquerySlider(): void;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsToShow: Product[] = [];
  total: number = 0;
  inp = new ProductInputWithSpec(1, 5);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts(this.inp);
    jquerySlider();
  }

  getProducts(inp: ProductInputWithSpec) {
    this.productService.getProducts(inp).subscribe({
      next: (d) => {
        this.productsToShow = d.data;
        this.total = d.count;
      },
    });
  }

  handlePageEvent(event: PageEvent) {
    this.inp.PageId = event.pageIndex + 1;
    this.inp.PageSize = event.pageSize;
    this.getProducts(this.inp);
  }
}
