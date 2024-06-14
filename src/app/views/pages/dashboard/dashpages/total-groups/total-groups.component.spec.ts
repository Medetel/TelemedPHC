import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalGroupsComponent } from './total-groups.component';

describe('TotalGroupsComponent', () => {
  let component: TotalGroupsComponent;
  let fixture: ComponentFixture<TotalGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
