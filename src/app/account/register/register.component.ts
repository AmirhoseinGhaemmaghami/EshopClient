import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2/public-api';
import { RegisterInputDto } from 'src/app/shared/Models/Account/RegisterInputDto';
import { RegisterResultDto } from 'src/app/shared/Models/Account/RegisterResultDto';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @ViewChild('mySwal') swal!: SwalComponent;
  name!: string;
  registerForm: FormGroup;
  constructor(private accountService: AccountService) {
    this.registerForm = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(100),
          Validators.email,
        ],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      address: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
    });
  }

  registerSubmit() {
    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.swal.text = 'passwords must be the same';
      this.swal.title = 'Passwords Error';
      this.swal.icon = 'info';
      this.swal.fire();
      return;
    }

    let temp: RegisterInputDto = new RegisterInputDto(
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.address
    );

    this.accountService.register(temp).subscribe({
      next: (d: RegisterResultDto) => {
        console.log(d);
        if (d.success) {
          this.registerForm.reset();
          this.swal.text = 'Go to your email to activate you account';
          this.swal.title = 'Registeration Success';
          this.swal.icon = 'info';
          this.swal.fire();
        } else {
          this.swal.text = 'User with the same email exists';
          this.swal.title = 'Registeration Error';
          this.swal.icon = 'error';
          this.swal.fire();
        }
      },
      error: (e) => {
        this.swal.text = 'Registeration Unsuccessfull';
        this.swal.title = 'Registeration Error';
        this.swal.icon = 'error';
        this.swal.fire();
      },
    });
  }
}
