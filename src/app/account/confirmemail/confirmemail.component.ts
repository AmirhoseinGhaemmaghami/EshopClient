import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.scss'],
})
export class ConfirmemailComponent implements OnInit {
  userId: Number | undefined;
  code: string | undefined;
  activatationResult: boolean | undefined = undefined;
  @ViewChild('mySwal') swal!: SwalComponent;

  constructor(
    route: ActivatedRoute,
    private accountService: AccountService,
    private routerService: Router
  ) {
    this.userId = route.snapshot.queryParams['userId'];
    this.code = route.snapshot.queryParams['code'];
  }
  ngOnInit(): void {
    this.accountService
      .confirmEmail(this.userId as number, this.code as string)
      .subscribe({
        next: (c) => {
          this.activatationResult = c;
          if (c) {
            this.swal.title = 'Success';
            this.swal.text = 'Activated Successfully, Please Login';
            this.swal.fire();
            this.routerService.navigateByUrl('/account/login');
          }
        },
      });
  }
}
