import { Injectable } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { Consts } from '../consts';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  constructor(private accountServie: AccountService, private orderService: OrderService) { }

  loadUser(): void {
    let token = localStorage.getItem(Consts.token);
    if (token) {
      this.accountServie.getCurrentUser(token).subscribe({
        next: (v) => {
          this.orderService.getOrder()
            .subscribe({});
        },
        error: () => localStorage.removeItem(Consts.token),
      });
    }
    else {
      this.accountServie.currentUserSubject.next(null);
    }
  }
}
