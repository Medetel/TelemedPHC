import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGramComponent } from './add-gram.component';

describe('AddGramComponent', () => {
  let component: AddGramComponent;
  let fixture: ComponentFixture<AddGramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
