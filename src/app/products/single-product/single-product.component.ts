import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent {
  @Input() Title!: string;
  @Input() Price!: number;
  @Input() exists!: boolean;
}
