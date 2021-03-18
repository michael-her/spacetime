import { Component, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

import { TriangleComponent, DEFAULT_DOT_SIZE } from '../../../components/triangle/triangle.component';

@Component({
  selector: 'app-angular-map',
  templateUrl: './angular-map.component.html',
  styleUrls: ['./angular-map.component.scss'],
})
export class AngularMapComponent {
  DEFAULT_DOT_SIZE = DEFAULT_DOT_SIZE;

  @ViewChild(TriangleComponent, { static: true }) readonly triangle: TriangleComponent;

  get toggleTriangleLabel() {
    return this.triangle.isActive ? '정지' : '재개';
  }

  toggleTriangle() {
    this.triangle.toggle();
  }

  dotSizeChanged(ev: MatSliderChange) {
    this.triangle.start({ dotSize: ev.value, redraw: true });
  }
}
