import { Component, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

import { TriangleComponent, DEFAULT_DOT_SIZE } from '../../../components/triangle/triangle.component';

@Component({
  selector: 'app-mixed-map',
  templateUrl: './mixed-map.component.html',
  styleUrls: ['./mixed-map.component.scss'],
})
export class MixedMapComponent {
  DEFAULT_DOT_SIZE = DEFAULT_DOT_SIZE;

  @ViewChild(TriangleComponent, { static: true }) readonly triangle: TriangleComponent;

  projectAsAngular = true;
  contentCollapsed = true;

  get toggleTriangleLabel() {
    return this.triangle.isActive ? '정지' : '재개';
  }

  toggleTriangle() {
    this.triangle.toggle();
  }

  toggle() {
    this.projectAsAngular = !this.projectAsAngular;
  }

  dotSizeChanged(ev: MatSliderChange) {
    this.triangle.start({ dotSize: ev.value, redraw: true });
  }
}
