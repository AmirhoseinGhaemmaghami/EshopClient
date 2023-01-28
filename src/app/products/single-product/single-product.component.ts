import { Component, Input, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/core/Services/order.service';
import { Product } from 'src/app/shared/Models/Products/product';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent {
  @Input() product!: Product;
  @ViewChild('mySwal') swal!: SwalComponent;

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  addProductToBasket() {
    this.orderService
      .addProductToorder({ orderQty: 1, productId: this.product.id })
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
}
