import { OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CounsultationService } from '../../counsultation.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
@Component({
  selector: 'app-compliants',
  templateUrl: './compliants.component.html',
  styleUrls: ['./compliants.component.scss']
})
export class CompliantsComponent implements OnInit {

  complaint: any;
  Diseases: any;
  symptoms: any;
  allergy: any;
  appoinmt: any;
  appoi_id: any;
  consult_id: any;
  medication: any;
  // underSugarMedication: any;
  // underBPMedication: any;
  complaintselected: any;
  symptomsselected: any;
  diseasesselected: any;
  allergysignsselected: any;
  diseases: any;
  medicationsselected: any;
  constructor(private service: CounsultationService, private route: ActivatedRoute, private notif: Notification,) { }
  complaints = new FormGroup({
    coN_Id: new FormControl(this.route.snapshot.params['id']),
    dis_Desc: new FormControl(''),
    al_Desc: new FormControl(''),
    consult_Complaint_DTL: new FormControl('', [Validators.required]),
    consult_Diseases_DTL: new FormControl(''),
    consult_Symptoms_DTL: new FormControl('', [Validators.required]),
    consult_AllergySigns_DTL: new FormControl(''),
    consult_UnderMedication: new FormControl('', [Validators.required]),
    // underSugarMedication: new FormControl('', [Validators.required]),
    // underBPMedication: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.Get_complaint();
    this.Get_symptoms();
    this.Get_Diseases();
    this.Get_Allergy();
    this.Get_medication();
    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      this.consult_id = id;
    });

    this.Get_appoinments(this.consult_id);
    this.complaintselected = this.complaints.value.consult_Complaint_DTL
    this.symptomsselected = this.complaints.value.consult_Symptoms_DTL
    // this.diseasesselected = this.complaints.value.consult_Diseases_DTL
    this.allergysignsselected = this.complaints.value.consult_AllergySigns_DTL
    this.medicationsselected = this.complaints.value.consult_UnderMedication
    // this.complaints.controls['dis_Desc'].setValue(this.complaints.value.dis_Desc);
    // this.doctor.controls['DO_LastName'].setValue(this._data.d.dO_LastName);
    console.log("date:", this.complaints.value )

  }
  public objectComparisonFunctioncomplaint = function (option, value): boolean {
    return option.cmst_Id === value.cmst_Id;
  }
  public objectComparisonFunctionsymptoms = function (option, value): boolean {
    return option.smst_Id === value.smst_Id;
  }
  public objectComparisonFunctionPresentIlleness = function (option, value): boolean {
    return option.id === value.id;
  }
  public objectComparisonFunctionallergysigns = function (option, value): boolean {
    return option.al_Id === value.al_Id;
  }
  public objectComparisonFunctionmedications = function (option, value): boolean {
    return option.medic_id === value.medic_id;
  }
  onToppingRemovedcomplaint(topping: string) {
    const toppings = this.complaints.value.consult_Complaint_DTL;
    this.removeFirst(toppings, topping);
    this.complaints.controls['consult_Complaint_DTL'].setValue(toppings);
  }
  onToppingRemovedsymptoms(topping: string) {
    const toppings = this.complaints.value.consult_Symptoms_DTL;
    this.removeFirst(toppings, topping);
    this.complaints.controls['consult_Symptoms_DTL'].setValue(toppings);
  }
  onToppingRemoveddiseases(topping: string) {
    const toppings = this.complaints.value.consult_Diseases_DTL;
    this.removeFirst(toppings, topping);
    this.complaints.controls['consult_Diseases_DTL'].setValue(toppings);
  }
  onToppingRemovedallergysigns(topping: string) {
    const toppings = this.complaints.value.consult_AllergySigns_DTL;
    this.removeFirst(toppings, topping);
    this.complaints.controls['consult_AllergySigns_DTL'].setValue(toppings);
  }
  onToppingRemovedm(topping: string) {
    const toppings = this.complaints.value.consult_UnderMedication;
    this.removeFirst(toppings, topping);
    this.complaints.controls['consult_UnderMedication'].setValue(toppings); // To trigger change detection
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  Get_Diseases() {
    this.service.Get_Diseases()
      .subscribe((data) => {
        this.diseases = data
      })
  }
  Get_complaint() {
    this.service.Get_Compliant()
      .subscribe((data) => {
        this.complaint = data
      })
  }
  Get_symptoms() {
    this.service.Get_Symptoms()
      .subscribe((data) => {
        this.symptoms = data
      })
  }
  Get_Allergy() {
    this.service.Get_Allergy()
      .subscribe((data) => {
        this.allergy = data
      })
  }
  Get_medication() {
    this.service.Get_Medication()
      .subscribe((data) => {
        this.medication = data
      })
  }

  onAllergySelectionChange(): void {
    const selectedOption = this.complaints.value.consult_AllergySigns_DTL;


    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.al_Name === "Others");

    if (noneOptionSelected) {
      //this.fixappointment.get('allergySigns_DTL').setValue(['None']);
      this.isOptionDisabled(noneOptionSelected);
    }
  }

  isOptionDisabled(option: any): boolean {
    const selectedOption = this.complaints.value.consult_AllergySigns_DTL;
    if (selectedOption == '') {
      return;
    }
    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.al_Name === "Others");
    if (noneOptionSelected) {
      return option.al_Name != "Others" && noneOptionSelected;
    }
    else {
      return option.al_Name == "Others"
    }


  }
  onMedicationSelectionChange(): void {
    const selectedOption = this.complaints.value.consult_UnderMedication;


    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.medic_name === "Other than Listed");

    if (noneOptionSelected) {
      //this.fixappointment.get('allergySigns_DTL').setValue(['None']);
      this.isOptionDisabledm(noneOptionSelected);
    }
  }

  isOptionDisabledm(option: any): boolean {
    const selectedOption = this.complaints.value.consult_UnderMedication;
    if (selectedOption == '') {
      return;
    }
    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.medic_name === "Other than Listed");
    if (noneOptionSelected) {
      return option.medic_name != "Other than Listed" && noneOptionSelected;
    }
    else {
      return option.medic_name == "Other than Listed"
    }


  }


  onComplaintsSelectionChange(): void {
    const selectedOption = this.complaints.value.consult_Complaint_DTL;


    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.cmst_Name === "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)");

    if (noneOptionSelected) {
      //this.fixappointment.get('allergySigns_DTL').setValue(['None']);
      this.isOptionDisabled3(noneOptionSelected);
    }
  }

  isOptionDisabled3(option: any): boolean {
    const selectedOption = this.complaints.value.consult_Complaint_DTL;
    if (selectedOption == '') {
      return;
    }
    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.cmst_Name === "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)");
    if (noneOptionSelected) {
      return option.cmst_Name != "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)" && noneOptionSelected;
    }
    else {
      return option.cmst_Name == "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)"
    }


  }


  onSymptomsSelectionChange(): void {
    const selectedOption = this.complaints.value.consult_Symptoms_DTL;


    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.smst_Name === "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)");

    if (noneOptionSelected) {
      //this.fixappointment.get('allergySigns_DTL').setValue(['None']);
      this.isOptionDisabled2(noneOptionSelected);
    }
  }


  isOptionDisabled2(option: any): boolean {
    const selectedOption = this.complaints.value.consult_Symptoms_DTL;
    if (selectedOption == '') {
      return;
    }
    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.smst_Name === "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)");
    if (noneOptionSelected) {
      return option.smst_Name != "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)" && noneOptionSelected;
    }
    else {
      return option.smst_Name == "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)"
    }


  }

  onIllnessSelectionChange(): void {
    const selectedOption = this.complaints.value.consult_Diseases_DTL;


    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.diseases_Name === "Other than Listed");

    if (noneOptionSelected) {
      //this.fixappointment.get('allergySigns_DTL').setValue(['None']);
      this.isOptionDisabled1(noneOptionSelected);
    }
  }

  isOptionDisabled1(option: any): boolean {
    const selectedOption = this.complaints.value.consult_Diseases_DTL;
    if (selectedOption == '') {
      return;
    }
    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.diseases_Name === "Other than Listed");
    if (noneOptionSelected) {
      return option.diseases_Name != "Other than Listed" && noneOptionSelected;
    }
    else {
      return option.diseases_Name == "Other than Listed"
    }


  }

  markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      }
    });
  }

  saveform() {
    if (this.complaints.invalid) {
      // Mark all form controls as touched to trigger the validation errors
      this.markAllFieldsAsTouched(this.complaints);
      return;
    }
    if (!this.complaints.value.consult_Diseases_DTL || this.complaints.value.consult_Diseases_DTL.length === 0) {
      this.complaints.value.consult_Diseases_DTL = [{ diseases_Id: 0, diseases_Name: 'Default Present Illness' }];
    }
    const formData = new FormData();
    formData.append('consult_Complaint_DTL', this.complaints.value.consult_Complaint_DTL);
    formData.append('dis_Desc', this.complaints.value.dis_Desc);
    formData.append('consult_Symptoms_DTL', this.complaints.value.consult_Symptoms_DTL);
    formData.append('consult_AllergySigns_DTL', this.complaints.value.consult_AllergySigns_DTL);
    formData.append('consult_UnderMedication', this.complaints.value.consult_UnderMedication);
    // formData.append('underSugarMedication', this.complaints.value.underSugarMedication);
    // formData.append('underBPMedication', this.complaints.value.underBPMedication);
    formData.append('coN_Id', this.complaints.value.coN_Id);
    this.service.Put_otherinfo(this.complaints.value)
      .subscribe((res) => {
        this.notif.successmsg("Clinical Notes Updated Successfully")
      })
  }



  Get_appoinments(consult_id) {
    this.service.Get_Consultation_id(consult_id)
      .subscribe((data) => {
        this.appoinmt = data
        this.complaints.patchValue({
          consult_Complaint_DTL: this.appoinmt.complaintslist,
          consult_Symptoms_DTL: this.appoinmt.symptomslist,
          consult_Diseases_DTL: this.appoinmt.diseaseslist,
          consult_AllergySigns_DTL: this.appoinmt.allergylist,
          consult_UnderMedication: this.appoinmt.medicationlist,
          dis_Desc: this.appoinmt.dis_Desc,
          // this.complaints.controls['dis_Desc'].setValue(this.complaints.value.dis_Desc);
          // underBPMedication:this.appoinmt.underBPMedication,
          appt_Id: this.appoinmt.appt_Id,
        })

      })
  }


}