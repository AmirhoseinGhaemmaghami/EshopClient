import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { LoginResultDto } from 'src/app/shared/Models/Account/LoginResultDto';
import { OrderResultDto } from 'src/app/shared/Models/Order/orderResultDto';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentUser$: Observable<LoginResultDto | null>;
  basket$: Observable<OrderResultDto | null>;
  total$: Observable<number | null>;
  basketItems$: Observable<number | null>;

  constructor(private accountService: AccountService, public orderService: OrderService) {
    this.currentUser$ = accountService.User$;
    this.basket$ = orderService.basket$;
    this.total$ = orderService.basketTotalPrice$;
    this.basketItems$ = orderService.basketItemsCount$;
  }

  signOutClick() {
    this.accountService.signOut();
  }

  removeOrderLine(productId: number) {
    this.orderService.removeOrderLine(productId)
      .subscribe({
      })
  }
}
