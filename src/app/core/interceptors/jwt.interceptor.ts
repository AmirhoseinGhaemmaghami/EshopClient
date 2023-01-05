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
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let jwtToken = this.cookieService.get('eshop-cookie');

    if (jwtToken) {
      let reqClone = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + jwtToken),
        //setHeaders: { Authorization: 'Bearer ' + jwtToken },//both are correct
      });

      return next.handle(reqClone);
    } else return next.handle(request);
  }
}
