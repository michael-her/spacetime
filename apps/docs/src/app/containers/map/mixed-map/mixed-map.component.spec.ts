import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularReactBrowserModule } from '@angular-react/core';

import { MaterialModule } from '../../../material.module';
import { ComponentsModule } from '../../../components/components.module';
import { ReactComponentsModule } from '../../../react-components/react-components.module';

import { MixedMapComponent } from './mixed-map.component';

describe('MixedMapComponent', () => {
  let component: MixedMapComponent;
  let fixture: ComponentFixture<MixedMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MixedMapComponent],
      imports: [AngularReactBrowserModule, MaterialModule, ComponentsModule, ReactComponentsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixedMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
