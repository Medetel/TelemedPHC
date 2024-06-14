import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssistantComponent } from './view-assistant.component';

describe('ViewAssistantComponent', () => {
  let component: ViewAssistantComponent;
  let fixture: ComponentFixture<ViewAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssistantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
