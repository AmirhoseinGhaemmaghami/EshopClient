import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Slider } from '../Models/Slider';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  constructor(private httclient: HttpClient) {}
  slider$: BehaviorSubject<Slider[]> = new BehaviorSubject<Slider[]>([]);

  public get sliderValue(): Slider[] {
    return this.slider$.value;
  }

  public getSliders(): Observable<Slider[]> {
    if (this.sliderValue.length == 0)
      this.httclient
        .get<Slider[]>(environment.BASE_URL + '/api/Slider')
        .subscribe({ next: (d) => this.slider$.next(d) });
    return this.slider$.asObservable();
  }
}
