import { TestBed } from '@angular/core/testing';

import { EshopInterceptor } from './eshop.interceptor';

describe('EshopInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EshopInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EshopInterceptor = TestBed.inject(EshopInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
