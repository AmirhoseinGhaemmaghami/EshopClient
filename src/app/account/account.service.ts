import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { LoginInputDto } from '../shared/Models/Account/LoginInputDto';
import { LoginResultDto } from '../shared/Models/Account/LoginResultDto';
import { RegisterInputDto } from '../shared/Models/Account/RegisterInputDto';
import { RegisterResultDto } from '../shared/Models/Account/RegisterResultDto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSubject: BehaviorSubject<LoginResultDto | null> =
    new BehaviorSubject<LoginResultDto | null>(null);

  constructor(private httpclient: HttpClient) {}

  public get currentUser$(): Observable<LoginResultDto | null> {
    return this.currentUserSubject.asObservable();
  }

  register(registerinput: RegisterInputDto): Observable<RegisterResultDto> {
    return this.httpclient.post<RegisterResultDto>(
      '/api/account/register',
      registerinput
    );
  }

  login(logininput: LoginInputDto): Observable<LoginResultDto> {
    return this.httpclient
      .post<LoginResultDto>('/api/account/login', logininput)
      .pipe(
        map((v: LoginResultDto) => {
          this.currentUserSubject.next(v);
          return v;
        })
      );
  }
}
