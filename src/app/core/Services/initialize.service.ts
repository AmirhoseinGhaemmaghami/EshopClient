import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  constructor(
    private CookieService: CookieService,
    private accountServie: AccountService
  ) {}

  loadUser(): void {
    let token = this.CookieService.get('eshop-cookie');
    if (token)
      this.accountServie.getCurrentUser(token).subscribe({
        next: (v) => {},
      });
  }
}
