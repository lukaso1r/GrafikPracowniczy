import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesseageMenuComponent } from './messeage-menu.component';

describe('MesseageMenuComponent', () => {
  let component: MesseageMenuComponent;
  let fixture: ComponentFixture<MesseageMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesseageMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesseageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
