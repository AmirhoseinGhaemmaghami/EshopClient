import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { ProductCommentInputDto } from 'src/app/shared/Models/ProductComment/productCommentInputDto';
import { ProductCommentResultDto } from 'src/app/shared/Models/ProductComment/ProductCommentResultDto';
import { Product } from 'src/app/shared/Models/Products/product';
import { ProductGallery } from 'src/app/shared/Models/Products/productGallery';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  id!: number;
  product!: Product;
  productGallery!: ProductGallery;
  @ViewChild('imageElement') image: any;
  relatedProducts$: Observable<Product[]> = new Observable<Product[]>();
  ProductComments: ProductCommentResultDto[] = [];
  commentsForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ProductService: ProductService,
    public accountService: AccountService
  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.commentsForm = new FormGroup({
      comment: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
    });
  }

  ngOnInit(): void {
    this.getProductWithId();
    this.getRelatedProducts();
  }

  thumbnalPicClick(url: string, i: number) {
    const temp = url;
    this.productGallery.imageUrls[i] = this.image['nativeElement']['src'];
    this.image['nativeElement']['src'] = temp;
  }

  getProductComments() {
    this.ProductService.getProductComments(this.id).subscribe({
      next: (d) => (this.ProductComments = d),
    });
  }

  commentsClick() {
    if (this.ProductComments.length == 0) this.getProductComments();
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

  onCommentsSubmit() {
    const inp = new ProductCommentInputDto(
      this.id,
      this.commentsForm.value['comment']
    );
    this.ProductService.AddProductComment(
      new ProductCommentInputDto(this.id, this.commentsForm.value.comment)
    ).subscribe({
      next: (d) => {
        if (d) {
          this.commentsForm.controls['comment'].reset();
          this.getProductComments();
        }
      },
    });
  }
}
