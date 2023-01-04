import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterInputDto } from './Models/RegisterInputDto';
import { RegisterResultDto } from './Models/RegisterResultDto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpclient: HttpClient) {}

  register(registerinput: RegisterInputDto): Observable<RegisterResultDto> {
    return this.httpclient.post<RegisterResultDto>(
      '/api/account/register',
      registerinput
    );
  }
}
