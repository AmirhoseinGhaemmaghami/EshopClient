import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurBrandsComponent } from './our-brands.component';

describe('OurBrandsComponent', () => {
  let component: OurBrandsComponent;
  let fixture: ComponentFixture<OurBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurBrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
