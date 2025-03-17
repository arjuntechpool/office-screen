import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOfficeModalComponentComponent } from './view-office-modal-component.component';

describe('ViewOfficeModalComponentComponent', () => {
  let component: ViewOfficeModalComponentComponent;
  let fixture: ComponentFixture<ViewOfficeModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOfficeModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOfficeModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
