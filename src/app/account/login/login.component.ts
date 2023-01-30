import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { OrderService } from 'src/app/core/Services/order.service';
import { LoginInputDto } from 'src/app/shared/Models/Account/LoginInputDto';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  @ViewChild('mySwal') swal!: SwalComponent;
  retrunUrl: string = '';

  constructor(private service: AccountService, private router: Router, private orderService: OrderService, private activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });

    this.retrunUrl = activatedRoute.snapshot.queryParams['return-url']
  }

  loginSubmit() {
    let loginInputDto = new LoginInputDto(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    this.service.login(loginInputDto).subscribe({
      next: (d) => {
        if (d.isActivated) {
          this.orderService.getOrder()
            .subscribe({});
          this.router.navigateByUrl(this.retrunUrl);
        }
        else {
          this.swal.title = 'User Is Not Activated';
          this.swal.text = 'Please visit your email and confirm your account';
          this.swal.fire();
        }
      },
    });
  }
}
