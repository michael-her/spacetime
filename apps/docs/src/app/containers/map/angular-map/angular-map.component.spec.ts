import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMapComponent } from './angular-map.component';
import { MaterialModule } from '../../../material.module';
import { ComponentsModule } from '../../../components/components.module';

describe('AngularMapComponent', () => {
  let component: AngularMapComponent;
  let fixture: ComponentFixture<AngularMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ComponentsModule],
      declarations: [AngularMapComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
