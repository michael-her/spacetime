import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './containers/landing/landing.component';
import {
  PerformanceComponent,
  AngularPerfComponent,
  MixedPerfComponent,
  ProfilesComponent,
} from './containers/performance/performance.module';
import {
  MapComponent,
  AngularMapComponent,
  MixedMapComponent,
  MapProfilesComponent,
} from './containers/map/map.module';
import {
  ComponentDocsComponent,
  FabricComponent,
  SemanticUiComponent,
} from './containers/component-docs/component-docs.module';
import { DocsComponent, GettingStartedComponent, WrappersComponent } from './containers/docs/docs.module';

const routes: Routes = [
  { path: 'landing', redirectTo: '' },
  { path: '', component: LandingComponent },
  {
    path: 'map',
    component: MapComponent,
    children: [
      { path: '', redirectTo: 'angular-map', pathMatch: 'full' },
      { path: 'angular-map', component: AngularMapComponent },
      { path: 'mixed-map', component: MixedMapComponent },
      { path: 'map-profiles', component: MapProfilesComponent },
    ],
  },
  {
    path: 'performance',
    component: PerformanceComponent,
    children: [
      { path: '', redirectTo: 'angular-perf', pathMatch: 'full' },
      { path: 'angular-perf', component: AngularPerfComponent },
      { path: 'mixed-perf', component: MixedPerfComponent },
      { path: 'perf-profiles', component: ProfilesComponent },
    ],
  },
  {
    path: 'components',
    component: ComponentDocsComponent,
    children: [
      { path: '', redirectTo: 'fabric', pathMatch: 'full' },
      { path: 'fabric', component: FabricComponent },
      { path: 'semantic-ui', component: SemanticUiComponent },
    ],
  },
  {
    path: 'docs',
    component: DocsComponent,
    children: [
      { path: '', redirectTo: 'getting-started', pathMatch: 'full' },
      { path: 'getting-started', component: GettingStartedComponent },
      { path: 'wrappers', component: WrappersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
