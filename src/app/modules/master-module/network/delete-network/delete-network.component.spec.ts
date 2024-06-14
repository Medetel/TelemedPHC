import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNetworkComponent } from './delete-network.component';

describe('DeleteNetworkComponent', () => {
  let component: DeleteNetworkComponent;
  let fixture: ComponentFixture<DeleteNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
