import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAuthorizeComponent } from './view-authorize.component';

describe('ViewAuthorizeComponent', () => {
  let component: ViewAuthorizeComponent;
  let fixture: ComponentFixture<ViewAuthorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAuthorizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
