import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthtomarsPageComponent } from './ethtomars-page.component';

describe('EthtomarsPageComponent', () => {
  let component: EthtomarsPageComponent;
  let fixture: ComponentFixture<EthtomarsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthtomarsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EthtomarsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
