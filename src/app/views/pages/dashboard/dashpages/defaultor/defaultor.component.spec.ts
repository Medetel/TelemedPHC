import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultorComponent } from './defaultor.component';

describe('DefaultorComponent', () => {
  let component: DefaultorComponent;
  let fixture: ComponentFixture<DefaultorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
