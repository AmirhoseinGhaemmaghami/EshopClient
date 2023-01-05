import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { Consts } from '../consts';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let jwtToken = localStorage.getItem(Consts.token);
    if (jwtToken) {
      let reqClone = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + jwtToken),
        //setHeaders: { Authorization: 'Bearer ' + jwtToken },//both are correct
      });

      return next.handle(reqClone);
    } else return next.handle(request);
  }
}
