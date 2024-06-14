import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAssistantComponent } from './approve-assistant.component';

describe('ApproveAssistantComponent', () => {
  let component: ApproveAssistantComponent;
  let fixture: ComponentFixture<ApproveAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAssistantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
