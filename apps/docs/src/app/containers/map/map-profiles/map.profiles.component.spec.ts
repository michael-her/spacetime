import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapProfilesComponent } from './map.profiles.component';
import { MaterialModule } from '../../../material.module';
import { ComponentsModule } from '../../../components/components.module';

describe('MapProfilesComponent', () => {
  let component: MapProfilesComponent;
  let fixture: ComponentFixture<MapProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ComponentsModule],
      declarations: [MapProfilesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
