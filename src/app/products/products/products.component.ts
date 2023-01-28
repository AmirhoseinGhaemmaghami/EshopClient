import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSliderDragEvent } from '@angular/material/slider';
import { CategoryService } from 'src/app/core/Services/category.service';
import { Product } from 'src/app/shared/Models/Products/product';
import { ProductCategory } from 'src/app/shared/Models/Products/productCategory';
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
  categoriesToshow: ProductCategory[] = [];

  total: number = 0;
  inp = new ProductInputWithSpec(1, 5);

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.inp.categories = [];
    this.inp.SortColumn = 'Price';
    this.inp.SortOrder = 'Asc';
  }

  ngOnInit(): void {
    this.getProducts(this.inp);
    this.getCategories();
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

  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (d) => {
        this.categoriesToshow = d;
      },
    });
  }

  handlePageEvent(event: PageEvent) {
    this.inp.PageId = event.pageIndex + 1;
    this.inp.PageSize = event.pageSize;
    this.getProducts(this.inp);
  }

  clickCategory(event: any, catId: number) {
    let i = this.inp.categories?.findIndex(
      (v) => v == Number(event.target.value)
    );
    if (event.target.checked) {
      if ((i as number) < 0)
        this.inp.categories?.push(Number(event.target.value));
    } else {
      if ((i as number) >= 0) this.inp.categories?.splice(i as number, 1);
    }

    this.inp.PageId = 1;
    this.getProducts(this.inp);
  }

  sortChanged(ev: any) {
    switch (ev.target.value) {
      case 'PriceAsc':
        this.inp.SortColumn = 'Price';
        this.inp.SortOrder = 'Asc';
        break;
      case 'PriceDesc':
        this.inp.SortColumn = 'Price';
        this.inp.SortOrder = 'Desc';
        break;

      default:
        break;
    }

    this.getProducts(this.inp);
  }

  priceStartSliderChange(ev: MatSliderDragEvent) {
    this.inp.StartPrice = Number(ev.value);
    this.getProducts(this.inp);
  }

  priceEndSliderChange(ev: MatSliderDragEvent) {
    this.inp.EndPrice = Number(ev.value);
    this.getProducts(this.inp);
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
