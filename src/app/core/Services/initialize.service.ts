import { Injectable } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { Consts } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  constructor(private accountServie: AccountService) {}

  loadUser(): void {
    let token = localStorage.getItem(Consts.token);
    if (token)
      this.accountServie.getCurrentUser(token).subscribe({
        next: (v) => {},
        error: () => localStorage.removeItem(Consts.token),
      });
  }
}
