import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { OrderService } from 'src/app/core/Services/order.service';
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
  @ViewChild('mySwal') swal!: SwalComponent;
  relatedProducts$: Observable<Product[]> = new Observable<Product[]>();
  ProductComments: ProductCommentResultDto[] = [];
  commentsForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ProductService: ProductService,
    public accountService: AccountService,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {

    //this.id = activatedRoute.snapshot.params['id'];

    activatedRoute.paramMap.subscribe({
      next: d => {
        this.id = Number(d.get('id'));
        this.getProductWithId();
        this.getRelatedProducts();
        if (this.ProductComments.length > 0) this.getProductComments();
      }
    })

    this.commentsForm = new FormGroup({
      comment: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
    });
  }

  ngOnInit(): void {
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

  orderQty = 1;
  addProductToOrder() {
    this.orderService
      .addProductToorder({
        orderQty: this.orderQty,
        productId: this.id,
      })
      .subscribe({
        next: (d) => {
          this.swal.text = 'Added To Basket';
          this.swal.title = 'Basket';
          this.swal.icon = 'success';
          this.swal.fire();
        },
        error: (err) => {
          if (err.status == 401) this.toastr.error('Please Login First');
        },
      });
  }

  incOrderQty() {
    this.orderQty++;
  }

  decOrderQty() {
    if (this.orderQty > 1) this.orderQty--;
  }

  @ViewChild('orderQtyInput') orderQtyInput!: ElementRef;
  setOrderQty() {
    if (this.orderQty < 0) this.orderQty = 1;
  }
}
