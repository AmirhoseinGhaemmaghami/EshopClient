import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Consts } from '../core/consts';
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

  public get User$(): Observable<LoginResultDto | null> {
    return this.currentUserSubject.asObservable();
  }

  public get UserValue(): LoginResultDto | null {
    return this.currentUserSubject.value;
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
          if (v.token) localStorage.setItem(Consts.token, v.token);
          return v;
        })
      );
  }

  getCurrentUser(token: string): Observable<LoginResultDto> {
    // let authHeader: { [key: string]: string } = {
    //   Authorization: 'Bearer ' + token,
    // };
    return this.httpclient.get<LoginResultDto>('/api/account').pipe(
      map((v) => {
        this.currentUserSubject.next(v);
        if (v.token) {
          localStorage.setItem(Consts.token, v.token);
        }
        return v;
      })
    );
  }

  signOut(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem(Consts.token);
  }
}
