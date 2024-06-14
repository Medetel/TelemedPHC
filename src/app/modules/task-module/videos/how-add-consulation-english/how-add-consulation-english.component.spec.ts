import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowAddConsulationEnglishComponent } from './how-add-consulation-english.component';

describe('HowAddConsulationEnglishComponent', () => {
  let component: HowAddConsulationEnglishComponent;
  let fixture: ComponentFixture<HowAddConsulationEnglishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowAddConsulationEnglishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowAddConsulationEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
