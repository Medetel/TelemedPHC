import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CounsultationService } from '../../counsultation.service';

@Component({
  selector: 'app-present-illeness',
  templateUrl: './present-illeness.component.html',
  styleUrls: ['./present-illeness.component.scss']
})
export class PresentIllenessComponent implements OnInit {
  Diseases: any;

  constructor(private service:CounsultationService) {}
  diseases = new FormGroup({
    diseasesDtl:new FormControl(''),
  })

  ngOnInit(): void {
    this.Get_Diseases();
  }
  onToppingRemoved(topping: string) {
    const toppings = this.diseases.value.diseasesDtl;
    this.removeFirst(toppings, topping);
    this.diseases.controls['diseasesDtl'].setValue(toppings); // To trigger change detection
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  Get_Diseases(){
    this.service.Get_Diseases()
    .subscribe((data)=>{
        this.Diseases = data
    })
  }
  
}

