import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material.module';

import { AngularMapComponent } from './angular-map/angular-map.component';
import { MixedMapComponent } from './mixed-map/mixed-map.component';
import { MapComponent } from './map.component';
import { MapProfilesComponent } from './map-profiles/map.profiles.component';
import { FabricModule } from '../../fabric.module';
import { ReactComponentsModule } from '../../react-components/react-components.module';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

const components = [AngularMapComponent, MixedMapComponent, MapComponent, MapProfilesComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    FabricModule,
    MaterialModule,
    ReactComponentsModule,
    SharedModule,
    ComponentsModule,
  ],
  declarations: components,
  exports: components,
})
export class MapModule {}

export { AngularMapComponent, MixedMapComponent, MapComponent, MapProfilesComponent };
