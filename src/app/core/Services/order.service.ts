import { HttpClient } from '@angular/common/http';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, empty, EMPTY, map, Observable } from 'rxjs';
import { OrderLineInputDto } from 'src/app/shared/Models/Order/orderLineInputDto';
import { OrderResultDto } from 'src/app/shared/Models/Order/orderResultDto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) { }
  private orderSubject: BehaviorSubject<OrderResultDto | null> = new BehaviorSubject<OrderResultDto | null>(null);


  public get basket$(): Observable<OrderResultDto | null> {
    return this.orderSubject.asObservable();
  }


  public get basketItemsCount$(): Observable<number> {
    return this.basket$
      .pipe(
        map(o => {
          if (!o) {
            return 0;
          }
          else {
            return o.orderLines.length;
          }
        })
      )
  }

  public get basketTotalPrice$(): Observable<number> {
    return this.basket$
      .pipe(
        map(o => {
          if (!o) {
            return 0;
          }
          else {
            return o?.orderLines.reduce<number>((tmp: number, cur) => { tmp += (cur.price * cur.orderQty); return tmp; }, 0);
          }
        })
      )
  }

  getOrder(): Observable<OrderResultDto> {
    return this.httpClient.get<OrderResultDto>('/api/Order')
      .pipe(
        map((o: OrderResultDto) => {
          this.orderSubject.next(o);
          return o;
        })
      );
  }

  createOrder(): Observable<OrderResultDto> {
    return this.httpClient.post<OrderResultDto>('/api/Order', null).pipe(
      map((o: OrderResultDto) => {
        this.orderSubject.next(o);
        return o;
      })
    );
  }

  addProductToorder(inp: OrderLineInputDto): Observable<OrderResultDto> {
    return this.httpClient.put<OrderResultDto>('/api/Order', inp).pipe(
      map((o: OrderResultDto) => {
        this.orderSubject.next(o);
        return o;
      })
    );
  }

  removeOrderLine(productId: number): Observable<OrderResultDto> {
    return this.httpClient.delete<OrderResultDto>("/api/Order/delete-item/" + productId)
      .pipe(map(
        o => {
          this.orderSubject.next(o);
          return o;
        }
      )
        , catchError(err => {
          this.orderSubject.next(null);
          return EMPTY;
        }));
  }
}
