import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Slider } from '../../Models/Slider';
import { SliderService } from '../../services/slider.service';

declare function homeSlider(): any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, AfterViewInit {
  constructor(private sliderService: SliderService) {}
  ngAfterViewInit(): void {
    setInterval(() => homeSlider(), 1000);
  }

  sliders$: Observable<Slider[]> = new Observable<Slider[]>();

  ngOnInit(): void {
    this.sliders$ = this.sliderService.getSliders();
  }
}
