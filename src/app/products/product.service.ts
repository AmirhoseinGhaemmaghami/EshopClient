import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../shared/Models/Paging/pagination';
import { Product } from '../shared/Models/Products/product';
import { ProductInputWithSpec } from '../shared/Models/Products/productInputWithSpec';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(inp: ProductInputWithSpec): Observable<Pagination<Product>> {
    var params = new HttpParams();

    if (inp.EndPrice) params = params.set('EndPrice', inp.EndPrice);
    if (inp.PageId) params = params.set('PageId', inp.PageId);
    if (inp.PageSize) params = params.set('PageSize', inp.PageSize);
    if (inp.StartPrice) params = params.set('StartPrice', inp.StartPrice);
    if (inp.Title) params = params.set('Title', inp.Title);
    if (inp.categories) {
      for (const i of inp.categories) {
        params = params.append('CategoryIds', i);
      }
    }
    if (inp.SortColumn)
      if (inp.SortOrder) {
        params = params.set('SortColumn', inp.SortColumn);
        params = params.set('SortOrder', inp.SortOrder);
      }

    return this.httpClient.get<Pagination<Product>>('/api/product', {
      params: params,
    });
  }
}
