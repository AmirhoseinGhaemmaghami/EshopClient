import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from '../core/guards/user-auth.guard';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirmEmail', component: ConfirmemailComponent },
  { path: 'edit', component: EditComponent, canActivate: [UserAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
