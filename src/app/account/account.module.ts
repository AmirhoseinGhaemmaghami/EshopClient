import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ConfirmemailComponent, EditComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module,
  ],
})
export class AccountModule {}
