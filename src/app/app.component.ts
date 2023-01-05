import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { InitializeService } from './core/Services/initialize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'eshop-pro';

  constructor(private initializeService: InitializeService) {}

  ngOnInit(): void {
    this.initializeService.loadUser();
  }
}
