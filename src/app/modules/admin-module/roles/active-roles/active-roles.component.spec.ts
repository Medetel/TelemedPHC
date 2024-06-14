import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRolesComponent } from './active-roles.component';

describe('ActiveRolesComponent', () => {
  let component: ActiveRolesComponent;
  let fixture: ComponentFixture<ActiveRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
