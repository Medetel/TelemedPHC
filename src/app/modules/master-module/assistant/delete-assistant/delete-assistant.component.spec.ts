import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAssistantComponent } from './delete-assistant.component';

describe('DeleteAssistantComponent', () => {
  let component: DeleteAssistantComponent;
  let fixture: ComponentFixture<DeleteAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAssistantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
