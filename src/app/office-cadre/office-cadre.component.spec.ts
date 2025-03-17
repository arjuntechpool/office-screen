import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeCadreComponent } from './office-cadre.component';

describe('OfficeCadreComponent', () => {
  let component: OfficeCadreComponent;
  let fixture: ComponentFixture<OfficeCadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeCadreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeCadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
