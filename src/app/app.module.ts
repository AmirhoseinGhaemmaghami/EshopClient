import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EshopInterceptor } from './core/interceptors/eshop.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: EshopInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
