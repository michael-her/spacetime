import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularReactBrowserModule } from '@angular-react/core';

import { CesiumMapComponent } from './cesium-map.component';
import { ReactComponentsModule } from '../react-components.module';

describe('CesiumMapComponent', () => {
  let component: CesiumMapComponent;
  let fixture: ComponentFixture<CesiumMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularReactBrowserModule, ReactComponentsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CesiumMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
