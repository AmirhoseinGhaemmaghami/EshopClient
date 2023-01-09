import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyFlag: number = 0;
  constructor(private spinner: NgxSpinnerService) {}

  busy(): void {
    this.busyFlag++;
    this.spinner.show();
  }

  free(): void {
    this.busyFlag--;
    if (this.busyFlag <= 0) {
      this.busyFlag = 0;
      this.spinner.hide();
    }
  }
}
