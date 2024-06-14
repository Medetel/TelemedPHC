import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGramComponent } from './edit-gram.component';

describe('EditGramComponent', () => {
  let component: EditGramComponent;
  let fixture: ComponentFixture<EditGramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
