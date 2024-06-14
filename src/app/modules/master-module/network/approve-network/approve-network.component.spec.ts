import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveNetworkComponent } from './approve-network.component';

describe('ApproveNetworkComponent', () => {
  let component: ApproveNetworkComponent;
  let fixture: ComponentFixture<ApproveNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
