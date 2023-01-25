import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../shared/Models/Paging/pagination';
import { ProductCommentInputDto } from '../shared/Models/ProductComment/productCommentInputDto';
import { ProductCommentResultDto } from '../shared/Models/ProductComment/ProductCommentResultDto';
import { Product } from '../shared/Models/Products/product';
import { ProductInputWithSpec } from '../shared/Models/Products/productInputWithSpec';
import { ProductWithDetailsResultDto } from '../shared/Models/Products/productWithDetailsResultDto';

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

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>('/api/product' + id.toString());
  }

  getProductWithDetailById(
    id: number
  ): Observable<ProductWithDetailsResultDto> {
    return this.httpClient.get<ProductWithDetailsResultDto>(
      '/api/product/ProductWithAllDetails/' + id.toString()
    );
  }

  getRelatedProducts(productId: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/product/Related/' + productId);
  }

  getProductComments(productId: number): Observable<ProductCommentResultDto[]> {
    return this.httpClient.get<ProductCommentResultDto[]>(
      '/api/product/Comments/' + productId
    );
  }

  AddProductComment(inp: ProductCommentInputDto): Observable<boolean> {
    return this.httpClient.post<boolean>('/api/product/comments', inp);
  }
}
