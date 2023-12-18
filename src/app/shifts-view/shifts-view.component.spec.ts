import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsViewComponent } from './shifts-view.component';

describe('ShiftsViewComponent', () => {
  let component: ShiftsViewComponent;
  let fixture: ComponentFixture<ShiftsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
