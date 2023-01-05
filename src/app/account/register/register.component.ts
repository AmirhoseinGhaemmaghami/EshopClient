import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { RegisterInputDto } from '../Models/RegisterInputDto';
import { RegisterResultDto } from '../Models/RegisterResultDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
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
    let temp: RegisterInputDto = new RegisterInputDto(
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.address
    );

    console.log(this.registerForm.controls['email'].errors?.['required']);

    // this.accountService.register(temp).subscribe({
    //   next: (d: RegisterResultDto) => {
    //     console.log(d);
    //     if (d.success) this.registerForm.reset();
    //   },
    //   error: (e) => console.log(e),
    // });
  }
}
