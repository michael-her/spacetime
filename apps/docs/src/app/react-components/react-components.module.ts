import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { registerElement } from '@angular-react/core';
import { ReactDotComponent, ReactDot } from './react-dot/react-dot.component';
import { CesiumMapComponent, CesiumMap } from './cesium-map/cesium-map.component';

const components = [ReactDotComponent, CesiumMapComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class ReactComponentsModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('ReactDot', () => ReactDot);
    registerElement('CesiumMap', () => CesiumMap);
  }
}

export { ReactDotComponent, CesiumMapComponent };
