import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './Components/slider/slider.component';
import { SpecialProductsComponent } from './special-products/special-products.component';
import { NewProductsComponent } from './Components/new-products/new-products.component';
import { FavoriteProductsComponent } from './Components/favorite-products/favorite-products.component';
import { LatestNewsComponent } from './Components/latest-news/latest-news.component';
import { OurBrandsComponent } from './Components/our-brands/our-brands.component';

@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    SpecialProductsComponent,
    NewProductsComponent,
    FavoriteProductsComponent,
    LatestNewsComponent,
    OurBrandsComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
