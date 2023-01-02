import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Slider } from '../../Models/Slider';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  constructor(private sliderService: SliderService) {}

  sliders$: Observable<Slider[]> = new Observable<Slider[]>();

  ngOnInit(): void {
    this.sliders$ = this.sliderService.getSliders();
  }
}
