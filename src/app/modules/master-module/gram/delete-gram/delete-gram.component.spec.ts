import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGramComponent } from './delete-gram.component';

describe('DeleteGramComponent', () => {
  let component: DeleteGramComponent;
  let fixture: ComponentFixture<DeleteGramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
