import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { LoginResultDto } from 'src/app/shared/Models/Account/LoginResultDto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentUser$: Observable<LoginResultDto | null>;

  constructor(private accountService: AccountService) {
    this.currentUser$ = accountService.User$;
  }

  signOutClick() {
    this.accountService.signOut();
  }
}
