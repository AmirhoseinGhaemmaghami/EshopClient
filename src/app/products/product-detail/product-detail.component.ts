import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/Models/Products/product';
import { ProductGallery } from 'src/app/shared/Models/Products/productGallery';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  thumbnalPicClick(url: string, i: number) {
    const temp = url;
    this.productGallery.imageUrls[i] = this.image['nativeElement']['src'];
    this.image['nativeElement']['src'] = temp;
  }
  id!: number;
  product!: Product;
  productGallery!: ProductGallery;
  @ViewChild('imageElement') image: any;
  relatedProducts$: Observable<Product[]> = new Observable<Product[]>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private ProductService: ProductService
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getProductWithId();
    this.getRelatedProducts();
  }

  getRelatedProducts() {
    this.relatedProducts$ = this.ProductService.getRelatedProducts(this.id);
  }

  getProductWithId() {
    this.ProductService.getProductWithDetailById(this.id).subscribe({
      next: (d) => {
        this.product = d.productResultDto;
        this.productGallery = d.productGalleryResultDto;
      },
      error: (err) => console.log(err),
    });
  }
}
