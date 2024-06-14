import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AppointmentService } from '../../appointment.service';
import { BloodPressureComponent } from './blood-pressure/blood-pressure.component';
import { BloodTestComponent } from './blood-test/blood-test.component';
import { EcgMonitorComponent } from './ecg-monitor/ecg-monitor.component';
import { HemoglobinTestComponent } from './hemoglobin-test/hemoglobin-test.component';
import { PulseOximeterComponent } from './pulse-oximeter/pulse-oximeter.component';
import { TempratureComponent } from './temprature/temprature.component';
import { ChartType, GoogleChartComponent } from 'angular-google-charts';


import * as d3 from 'd3';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PreviousRecordsdialogComponent } from '../../../previous-recordsdialog/previous-recordsdialog.component';
import { Router } from '@angular/router';
import { MatOption } from '@angular/material/core';
import { ReturnStatement } from '@angular/compiler';
import { MatSelectChange } from '@angular/material/select';

const websocketUrl = "ws://localhost:8444/bleWS/";
const websocketUrl2 = "ws://localhost:8444/paramWS/";


@Component({
  selector: 'app-appointment-patient',
  templateUrl: './appointment-patient.component.html',
  styleUrls: ['./appointment-patient.component.scss']
})
export class AppointmentPatientComponent implements OnInit {
  includeSpecialization: boolean = false;
  hideFields = true;
  hideFieldsGen = true;
  hideFieldsHos = true;
  showVitalSigns = false;
  doctordd: any;
  Image_Url;
  minDate: any = new Date();
  defDate: any;

  // Code from BWS

  connectionEstablish: string = "";
  deviceConnected: string = "";
  thermoScan: string = "";
  ecgData: any = [];
  spo2SaturationPercentage: any;
  spo2PulseRate: any;
  spo2Graph: any;
  bloodPressure: any = [];
  bloodPressureSystolic: any;
  bloodPressureDiastolic: any;
  bloodPressurePulse: any;
  // loading = false;
  glucose: any;
  hemoglobin: any;
  data = 1;
  popupDeviceStatusLabel: any;
  batteryPower = 0;

  private subject!: AnonymousSubject<MessageEvent>;
  private subjectParamWS!: AnonymousSubject<MessageEvent>;
  public messages!: Subject<any>;
  messages2!: Subject<any>;

  webSocketSource = 'localhost';
  isBLEDeviceConnected = false;
  loading = false;
  BPoptions = {
    min: 0,
    max: 300,
    // width: 400, height: 120,
    greenFrom: 90, greenTo: 120,
    redFrom: 200, redTo: 280,
    yellowFrom: 121, yellowTo: 180,
    minorTicks: 5
  };
  chartType = ChartType.Gauge;

  pulseType = ChartType.LineChart;

  pulseOxyMeterData: any = [];

  pulseoptions = {
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'Saturation'
    }
  };

  dataToBePassed = 1
  today = new Date();
  Diseases: any = [];
  Diseases1: any = [];
  complaint: any = [];
  complaint1: any = [];
  symptoms: any = [];
  symptoms1: any = [];
  medication: any = [];
  medication1: any = [];
  Allergy: Object;

  ECGLeads = {
    Lead_1: [0],
    Lead_2: [0],
    Lead_3: [0],
    AVR: [0],
    AVL: [0],
    AVF: [0],
    V_1: [0],
    V_2: [0],
    V_3: [0],
    V_4: [0],
    V_5: [0],
    V_6: [0],
    PulseOfECG: 0,
  }
  lipid: any;
  //saheb
  total_cholesterol: any;
  hdl_cholesterol: any;
  triglycerides: any;
  ldl: any;

  // fixappointment:FormGroup;



  constructor(private cdr: ChangeDetectorRef, private dialogRef: MatDialogRef<AppointmentPatientComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private _data: any,
    private service: AppointmentService,
    public api: ApiService, private _service: AppointmentService, private notif: Notification, private router: Router, public fb: FormBuilder) {
    this.establishConnection();

    this.messages.subscribe((msg: string) => {
      console.log("BOOL:", this.isBLEDeviceConnected);
      if (this.isBLEDeviceConnected == false) {
        this.processAfterBLEConnection(msg);
      }
      else {
        this.processData(msg);
      }
    });

    this.messages2.subscribe((msg: string) => {
      console.log("BOOL:", this.isBLEDeviceConnected);
      if (this.isBLEDeviceConnected == false) {
        this.processAfterBLEConnection2(msg);
      }
      else {
        this.processData(msg);
      }

      // if(msg == 'kitStatusCheck~1001')
      // this.sentRequestToServerToGetData()
      // this.processData(msg);
    });


    // this.fixappointment=this.fb.group({
    // 'appt_PatientId_FK': [''],
    // 'appt_DateTime': [''],
    // 'select_toTime': [''],
    // 'appt_DO_Id_FK':[''],
    // 'select_FrmTime': [''],
    // 'select_day': [''],
    // 'complaint': ['',[Validators.required]],
    // 'allergySigns_DTL': [''],
    // 'underBPMedication': [''],
    // 'underSugarMedication': [''],
    // 'diseasesDtl': [''],
    // 'symptoms': [''],
    // 'height': [''],
    // 'weight': [''],
    // 'hemoglobin': [''],
    // 'tempInFahrenheit': [''],
    // 'tempInCelsius': [''],
    // 'bloodPressure': [''],
    // 'sugar': [''],
    // 'pulseRate': [''],
    // 'respiratoryRate': [''],
    // 'ecg': [''],
    // 'oxygenSaturation': [''],
    // 'bpmm': [''],
    // 'bphg': [''],
    // 'ECGLeads':[''],
    // 'lp_total_cholesterol': [''],
    // 'lp_triglycerides': [''],
    // 'lp_hdl_cholesterol': [''],
    // 'lp_ldl': [''],
    //   })
  }
  @ViewChild('multiUserSearch') multiUserSearchInput: ElementRef;
  @ViewChild('multiUserSearch1') multiUserSearchInput1: ElementRef;
  @ViewChild('multiUserSearch2') multiUserSearchInput2: ElementRef;
  @ViewChild('multiUserSearch3') multiUserSearchInput3: ElementRef;

  establishConnection() {
    this.messages = <Subject<any>>this.connect(websocketUrl).pipe(
      map(
        (response: MessageEvent): any => {
          let data = response.data;
          return data;
        }
      )
    );
    this.messages2 = <Subject<any>>this.connect2(websocketUrl2).pipe(
      map(
        (response: MessageEvent): any => {
          let data = response.data;
          return data;
        }
      )
    );
  }

  selectedOption: string = 'selectSupport';
  select_dd(e: any) {
    console.log(e.target.value)
    this.selectedOption = e.target.value
    if (this.selectedOption == 'hideFieldsGen') {
      this.hideFieldsGen = false
    }
    else if (this.selectedOption == 'hideFields') {
      this.hideFields = false
    }
    else if (this.selectedOption == 'hideFieldsHos') {
      this.hideFieldsHos = false
    }
  }

  onCheckboxChange(event: any) {
    this.hideFields = !this.hideFields;
    if (this.hideFields) {
      this.fixappointment.get('Sp_Id')?.reset();
    }
    this.fixappointment.get('select_toTime')?.reset();
    this.fixappointment.get('appt_DO_Id_FK')?.reset();
    this.doctordd = [];
    this.fixappointment.get('hos_Id')?.reset();
    if (!this.hideFields) {
      this.fixappointment.get('appt_DO_Id_FK').setValidators([Validators.required]);
      this.fixappointment.get('Sp_Id').setValidators([Validators.required]);
      this.fixappointment.get('hos_Id').clearValidators();
    }
    this.fixappointment.get('hos_Id').updateValueAndValidity();
    this.fixappointment.get('appt_DO_Id_FK').updateValueAndValidity();
    this.fixappointment.get('Sp_Id').updateValueAndValidity();
    this.fixappointment.get('hos_Id')?.reset();
    this.cdr.detectChanges();
  }

  onCheckboxChangeGen(event: any) {
    this.hideFieldsGen = !this.hideFieldsGen;
    this.fixappointment.get('select_toTime')?.reset();
    this.fixappointment.get('Sp_Id')?.reset();
    this.fixappointment.get('appt_DO_Id_FK')?.reset();
    this.fixappointment.get('hos_Id')?.reset();
    if (!this.hideFieldsGen) {
      this.fixappointment.get('appt_DO_Id_FK').setValidators([Validators.required]);
      this.fixappointment.get('Sp_Id').clearValidators();
      this.fixappointment.get('hos_Id').clearValidators();
    }
    this.fixappointment.get('Sp_Id').updateValueAndValidity();
    this.fixappointment.get('hos_Id').updateValueAndValidity();
    this.fixappointment.get('appt_DO_Id_FK').updateValueAndValidity();
    this.cdr.detectChanges();
  }

  onCheckboxChangeHos(event: any) {
    this.hideFieldsHos = !this.hideFieldsHos;
    if (!this.hideFieldsHos) {
      this.fixappointment.get('hos_Id')?.setValidators([Validators.required]);
      this.fixappointment.get('Sp_Id')?.clearValidators();
      this.fixappointment.get('appt_DO_Id_FK')?.clearValidators();
    }
    this.fixappointment.get('Sp_Id')?.updateValueAndValidity();
    this.fixappointment.get('appt_DO_Id_FK')?.updateValueAndValidity();
    this.fixappointment.get('Sp_Id')?.reset();
    this.fixappointment.get('appt_DO_Id_FK')?.reset();
    this.cdr.detectChanges();
  }

  toggleVitalSigns() {
    this.showVitalSigns = !this.showVitalSigns;
    // Manually trigger change detection to update the view
    this.cdr.detectChanges();
  }

  getPatientDetailsClass() {
    return this.showVitalSigns ? '' : 'patient-details-hidden';
  }

  fixappointment = new FormGroup({
    // SpeGen: new FormControl(''),

    hos_Id: new FormControl(''),
    appt_PatientId_FK: new FormControl(''),
    appt_DateTime: new FormControl(''),
    select_toTime: new FormControl('', [Validators.required]),
    appt_DO_Id_FK: new FormControl(''),
    select_FrmTime: new FormControl('', [Validators.required]),
    select_day: new FormControl('', [Validators.required]),
    complaint: new FormControl('', [Validators.required]),
    allergySigns_DTL: new FormControl('', [Validators.required]),
    underMedication: new FormControl('', [Validators.required]),
    // underBPMedication: new FormControl('',[Validators.required]),
    // underSugarMedication: new FormControl('',[Validators.required]),
    diseasesDtl: new FormControl(''),
    symptoms: new FormControl(''),
    height: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    weight: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    bmi: new FormControl(''),
    hemoglobin: new FormControl('', [Validators.pattern("^\\S{0}.{0,10}\\S{1}$"), this.nameValidators]),
    tempInFahrenheit: new FormControl(''),
    tempInCelsius: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    bloodPressure: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    sugar: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    pulseRate: new FormControl('', [Validators.pattern(/^[1-9]\d*$/)]),
    respiratoryRate: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    ecg: new FormControl(''),
    oxygenSaturation: new FormControl('', [Validators.pattern(/^[1-9]\d*$/)]),
    bpmm: new FormControl('', [Validators.pattern(/^[1-9]\d*$/)]),
    bphg: new FormControl('', [Validators.pattern(/^[1-9]\d*$/)]),
    ECGLeads: new FormControl(''),
    lp_total_cholesterol: new FormControl('', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    lp_triglycerides: new FormControl('', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    lp_hdl_cholesterol: new FormControl('', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    lp_ldl: new FormControl('', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    Sp_Id: new FormControl(''),

    // lp_triglycerides: new FormControl(''),
    // lp_hdl_cholesterol: new FormControl(''),
    // lp_ldl: new FormControl(''),
  })


  //For Dongale WS Communications
  public connect(url: any): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  //For USB WS Communications
  public connect2(url: any): AnonymousSubject<MessageEvent> {
    if (!this.subjectParamWS) {
      this.subjectParamWS = this.createParamWS(url);
    }
    return this.subjectParamWS;
  }

  //For Dongale WS Communications 
  private create(url: any): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer: any = {
      error: null,
      complete: null,
      next: (data: any) => {
        console.log('Message sent to websocket: ', data);
        console.log("RS:", ws.readyState);
        console.log("WS:", WebSocket.OPEN);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data.content);
        }
      }
    };
    return new AnonymousSubject<any>(observer, observable);
  }

  nameValidators(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?/\s/g,''/a-zA-Z]/;
    // const spaceexp: RegExp =/[/\s/g, '']/

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

  // numberValidators(control: any): { [key: string]: boolean } {
  //   const numberRegexp: RegExp = /^(?:\d*\.\d{1,2}|\d+)$/
  //   // const spaceexp: RegExp =/[/\s/g, '']/

  //   if (control.value && numberRegexp.test(control.value)) {
  //     return { invalidName: true };
  //   }
  // }


  //For USB WS Communications
  private createParamWS(url: any): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer: any = {
      error: null,
      complete: null,
      next: (data: any) => {
        console.log('Message sent to websocket: ', data);
        console.log("RS:", ws.readyState);
        console.log("WS:", WebSocket.OPEN);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data.content);
        }
      }
    };
    return new AnonymousSubject<any>(observer, observable);
  }
  //For Dongale Device
  checkBLEDeviceConnected() {

    this.batteryPower = 0;
    this.ecgData = [];
    this.api.temperature = 0;
    this.pulseOxyMeterData = [];
    this.spo2SaturationPercentage = 0;
    this.spo2PulseRate = 0;
    this.bloodPressure = [];
    this.bloodPressureSystolic = 0;
    this.bloodPressureDiastolic = 0;
    this.bloodPressurePulse = 0;
    this.glucose = 0;
    this.hemoglobin = 0;
    //saheb
    this.total_cholesterol = 0;
    this.hdl_cholesterol = 0;
    this.triglycerides = 0;
    this.ldl = 0;

    this.isBLEDeviceConnected = false;
    this.loading = true;
    this.popupDeviceStatusLabel = 'Connecting to BLE Device. Please wait...';

    let message = {
      source: this.webSocketSource,
      content: 'BleAppletInit'
    };
    this.messages.next(message);

  }
  //For USB Devices
  checkParamWS() {

    this.isBLEDeviceConnected = false;
    this.loading = true;

    let message2 = {
      source: this.webSocketSource,
      content: 'connectKitFirstTime'
    };
    this.messages2.next(message2);
  }

  processAfterBLEConnection(msg: any) {
    var term = new RegExp("msgFromBLEApplet~");

    if (term.test(msg)) {
      var message = msg.replace("msgFromBLEApplet~", "");
      var messages = message.split('~');

      var connectionStatus = messages[0];
      console.log("connectionStatus", connectionStatus);
      if (connectionStatus == 'true') {
        this.isBLEDeviceConnected = true;
        this.popupDeviceStatusLabel = 'BLE Device connected. Please connect the device';
        this.sentRequestToServerToGetData();
      }
      else {
        this.popupDeviceStatusLabel = 'BLE Device not connected. Please wait';
      }
    }
  }

  processAfterBLEConnection2(msg: any) {
    console.log("MSG:", msg);

    var term = new RegExp("kitStatusCheck~");

    if (term.test(msg)) {
      var message = msg.replace("kitStatusCheck~", "");
      var messages = message.split('~');

      var connectionStatus = messages[0];
      console.log("connectionStatus2", connectionStatus);
      if (connectionStatus == '1001') {
        this.isBLEDeviceConnected = true;
        this.popupDeviceStatusLabel = 'Please connect the device';
        this.sentRequestToServerToGetData();
      }
      else {
        this.popupDeviceStatusLabel = 'Device not connected. Please wait';
      }
    }
  }
  batchHGB = "424";
  sentRequestToServerToGetData() {

    this.batteryPower = 0;
    this.ecgData = [];
    this.api.temperature = 0;
    this.pulseOxyMeterData = [];
    this.spo2SaturationPercentage = 0;
    this.spo2PulseRate = 0;
    this.bloodPressure = [];
    this.bloodPressureSystolic = 0;
    this.bloodPressureDiastolic = 0;
    this.bloodPressurePulse = 0;
    this.glucose = 0;
    this.hemoglobin = 0;
    this.lipid = 0;
    //saheb
    this.total_cholesterol = 0;
    this.hdl_cholesterol = 0;
    this.triglycerides = 0;
    this.ldl = 0;

    if (this.deviceConnected == 'ecg') {

      let message = {
        source: this.webSocketSource,
        content: 'startScanFromHtml~10'
      };
      this.messages.next(message);
    }

    if (this.deviceConnected == 'thermometer') {

      let message = {
        source: this.webSocketSource,
        content: 'startScanFromHtml~40'
      };
      this.messages.next(message);
    }

    if (this.deviceConnected == 'pulseOximeter') {

      let message = {
        source: this.webSocketSource,
        content: 'startScanFromHtml~50'
      };
      this.messages.next(message);
    }

    if (this.deviceConnected == 'bloodPressure') {

      let message = {
        source: this.webSocketSource,
        content: 'startScanFromHtml~30'
      };
      this.messages.next(message);

    }

    if (this.deviceConnected == 'glucometer') {

      this.isBLEDeviceConnected = true;
      this.loading = true;
      this.popupDeviceStatusLabel = 'Please wait...';

      let message = {
        source: this.webSocketSource,
        content: 'ReadGlucoseORLipidValue~glucose'
      };
      this.messages2.next(message);

    }

    if (this.deviceConnected == 'hemoglobin') {

      this.isBLEDeviceConnected = true;
      this.loading = true;
      this.popupDeviceStatusLabel = 'Please wait...';

      var content = "ReadHemoglobinValue~" + this.batchHGB;
      let message = {
        source: this.webSocketSource,
        content: content
      };
      this.messages2.next(message);

    }
    if (this.deviceConnected == 'lipid') {

      this.isBLEDeviceConnected = true;
      this.loading = true;
      this.popupDeviceStatusLabel = 'Please wait...';

      let message = {
        source: this.webSocketSource,
        content: 'ReadGlucoseORLipidValue~Lipid'
      };
      this.messages2.next(message);

    }
  }

  processData(msg: any) {

    console.log("MSG:", msg);
    var read = msg.split('~');
    console.log('Read data', msg);
    console.log('Read data 1', msg.split('~'));
    console.log('Read data 2', read[0]);

    var termBattery = new RegExp("changeBatteryStatus~");
    if (termBattery.test(msg)) {

      var message = msg.replace("changeBatteryStatus~", "");
      var messages = message.split('~');
      var data = messages[0];
      this.batteryPower = Number(data);
    }

    if (this.deviceConnected == 'ecg') {

      var term = new RegExp("setEcgLead~");
      this.ECGLeads.PulseOfECG = read[0] == "pulseOfECG" ? read[1] : 0;
      if (term.test(msg)) {

        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;

        var message = msg.replace("setEcgLead~", "");
        var messages = message.split('~');
        console.log("messages:", messages);
        var data = JSON.parse(messages[0]);
        var keyString = messages[1];
        console.log("KEY:", keyString)

        var dic: any = {};

        dic[keyString] = data;

        this.ecgData.push(dic);
        this.api.ecgDataSubject.next(this.ecgData);
        console.log('Read', read);


      }



      if (read[0] === "ReadingCompleted") {
        console.log('ECG Lead Test', this.ecgData[0].Lead_1);
        this.ECGLeads.Lead_1 = this.ecgData[0].Lead_1;
        this.ECGLeads.Lead_2 = this.ecgData[1].Lead_2;
        this.ECGLeads.Lead_3 = this.ecgData[2].Lead_3;
        this.ECGLeads.AVR = this.ecgData[3].AVR;
        this.ECGLeads.AVL = this.ecgData[4].AVL;
        this.ECGLeads.AVF = this.ecgData[5].AVF;
        this.ECGLeads.V_1 = this.ecgData[6].V_1;
        this.ECGLeads.V_2 = this.ecgData[7].V_2;
        this.ECGLeads.V_3 = this.ecgData[8].V_3;
        this.ECGLeads.V_4 = this.ecgData[9].V_4;
        this.ECGLeads.V_5 = this.ecgData[10].V_5;
        this.ECGLeads.V_6 = this.ecgData[11].V_6;
      }
      console.log('ECGLeads', this.ECGLeads);
    }
    if (this.deviceConnected == 'thermometer') {
      var term = new RegExp("setTemperature~");
      if (term.test(msg)) {

        this.loading = false;
        this.popupDeviceStatusLabel = 'Device  connected successfully';
        var message = msg.replace("setTemperature~", "");
        var messages = message.split('~');
        var data = messages[0];
        this.api.temperature = data;
        // this.api.temperature = (data - 32.0) * 5.0 / 9.0;    

        this.api.temperature1.next(this.api.temperature);
        this.fixappointment.controls['tempInCelsius'].setValue(this.api.temperature);
      }
    }

    if (this.deviceConnected == 'pulseOximeter') {
      var term1 = new RegExp("setCurrentSpo2~");
      var term2 = new RegExp("pulseRateForSpo2~");
      var term3 = new RegExp("plotSpo2Graph~");
      if (term1.test(msg)) {
        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;

        var message = msg.replace("setCurrentSpo2~", "");
        var messages = message.split('~');
        var data = messages[0];
        this.spo2SaturationPercentage = data;

        if (data == '255') {
          this.popupDeviceStatusLabel = 'Finger not present';
        }
        else if (data == '256') {
          this.popupDeviceStatusLabel = 'Dead object detected';
        }
        else if (data == '257') {
          this.popupDeviceStatusLabel = 'Sensor switched off! Please take reading again';
        }
        console.log("SaturationPercent:", this.spo2SaturationPercentage);
        this.fixappointment.controls['oxygenSaturation'].setValue(this.spo2SaturationPercentage);

      }
      if (term2.test(msg)) {

        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;

        var message = msg.replace("pulseRateForSpo2~", "");
        var messages = message.split('~');
        var data = JSON.parse(messages[0]);
        this.spo2PulseRate = data[1];
        console.log("Pulse Rate:", this.spo2PulseRate);
        this.fixappointment.controls['pulseRate'].setValue(this.spo2PulseRate.toString());

      }
      if (term3.test(msg)) {

        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;

        //var messages = msg.split('~');
        var message = msg.replace("plotSpo2Graph~", "");
        var messages = message.split('~');
        var data = JSON.parse(messages[0]);

        this.pulseOxyMeterData = [];
        // this.api.spo2Graph = data        // console.log("this.api.spo2Graph",this.api.spo2Graph);
        for (let i = 0; i < data.length; i++) {
          this.pulseOxyMeterData.push([i, data[i]]);
        }

        console.log(this.pulseOxyMeterData);

        this.pulseOxyMeterData = Object.assign([], this.pulseOxyMeterData);
        this.fixappointment.controls['oxygenSaturation'].setValue(this.pulseOxyMeterData);
      }
    }

    if (this.deviceConnected == 'bloodPressure') {
      var term = new RegExp("finalBPReading~");
      if (term.test(msg)) {

        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;

        var message = msg.replace("finalBPReading~", "");
        var messages = message.split('~');
        var data = JSON.parse(messages[0]);
        console.log("bp test data" + data)

        this.bloodPressureSystolic = data[1];
        this.bloodPressureDiastolic = data[2];
        this.bloodPressurePulse = data[3];

        this.fixappointment.controls['bpmm'].setValue(this.bloodPressureSystolic);
        this.fixappointment.controls['bphg'].setValue(this.bloodPressureDiastolic);
      }

      var term2 = new RegExp("setBPPressure~");
      if (term2.test(msg)) {

        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;


        var message = msg.replace("setBPPressure~", "");
        var messages = message.split('~');
        var data = messages[0];

        // this.api.bloodPressure.push(Number(data));
        this.bloodPressure = [
          ['Pressure', Number(data)],
        ];
      }

      var term3 = new RegExp("errorLableUpdate~");
      if (term3.test(msg)) {

        var message = msg.replace("errorLableUpdate~", "");
        var messages = message.split('~');
        var data = messages[0];

        if (data == 'E01') {
          this.loading = false;
          this.popupDeviceStatusLabel = 'Cuff is not connected';
        }
        else if (data == 'E02') {
          this.loading = false;
          this.popupDeviceStatusLabel = 'Inflation Error';
        }
        else if (data == 'E03') {
          this.loading = false;
          this.popupDeviceStatusLabel = 'Deflation Error';
        }
        else if (data == 'E04') {
          this.loading = false;
          this.popupDeviceStatusLabel = 'Overpressure Error';
        }
        else if (data == 'E06') {
          this.loading = false;
          this.popupDeviceStatusLabel = 'Very high pressure';
        }
        else if (data == 'E07') {
          this.loading = false;
          this.popupDeviceStatusLabel = 'Too low pressure';
        }
        else if (data == 'E08') {
          this.loading = false;
          this.popupDeviceStatusLabel = 'Pulse rate Error';
        }
        else if (data == 'E09') {
          this.loading = false;
          this.popupDeviceStatusLabel = 'Measurement Error';
        }

      }
    }

    if (this.deviceConnected == 'glucometer') {
      var term = new RegExp("otherResult~");
      if (term.test(msg)) {

        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;

        var message = msg.replace("otherResult~", "");
        var messages = message.split('~');
        var data = messages[0];
        this.glucose = data;
        this.fixappointment.controls['sugar'].setValue(this.glucose);

        let messageToClose = {
          source: this.webSocketSource,
          content: 'closeGlucoseLipidPort'
        };
        this.messages2.next(messageToClose);

      }
    }

    if (this.deviceConnected == 'hemoglobin') {
      console.log("Haemoglobin");
      var term = new RegExp("hemoglobinResult~");
      if (term.test(msg)) {

        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;

        var message = msg.replace("hemoglobinResult~", "");
        var messages = message.split('~');
        var data = messages[0];
        this.hemoglobin = data;
        this.fixappointment.controls['hemoglobin'].setValue(this.hemoglobin);

        console.log("this.hemoglobin", msg);
        console.log("this.hemoglobin", this.hemoglobin)

        let messageToClose = {
          source: this.webSocketSource,
          content: 'turnOFFHb'
        };
        this.messages2.next(messageToClose);
      }
    }

    if (this.deviceConnected == 'lipid') {
      console.log("lipid hit");

      var term = new RegExp("LipidResult~");
      if (term.test(msg)) {
        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;
        var messages = msg.split('~');
        var lipidData = messages[1];
        var fdata = lipidData.toString().replace('[', '');
        fdata = fdata.toString().replace(']', '');
        var arrResult = fdata.toString().split(',');
        console.log('main data :' + arrResult);

        this.total_cholesterol = arrResult[0].toString().trim();
        this.total_cholesterol = parseFloat(this.total_cholesterol).toFixed(2);

        this.triglycerides = arrResult[1].toString().trim();
        this.triglycerides = parseFloat(this.triglycerides).toFixed(2);

        this.hdl_cholesterol = arrResult[2].toString().trim();
        this.hdl_cholesterol = parseFloat(this.hdl_cholesterol).toFixed(2);

        this.ldl = arrResult[3].toString().trim();
        this.ldl = parseFloat(this.ldl).toFixed(2);

        this.lipid = lipidData; // no data found
        this.fixappointment.controls['lp_total_cholesterol'].setValue(this.total_cholesterol);
        this.fixappointment.controls['lp_triglycerides'].setValue(this.triglycerides);
        this.fixappointment.controls['lp_hdl_cholesterol'].setValue(this.hdl_cholesterol);
        this.fixappointment.controls['lp_ldl'].setValue(this.ldl);

        let messageToClose = {
          source: this.webSocketSource,
          content: 'turnOFFHb'
        };
        this.messages2.next(messageToClose);
      }


      var term1 = new RegExp("resultUpdate~");
      if (term1.test(msg)) {
        var checkMsg = msg.replace("resultUpdate~", "");
        var checkData = checkMsg.split('~');
        if (checkData == 'error1008') {
          this.popupDeviceStatusLabel = 'Device is not connected.';
          this.loading = false;
        }
        else if (checkData == 'Device is incompitable') {
          this.popupDeviceStatusLabel = 'Device temperature is high.';
          this.loading = false;
        }

        else if (checkData == 'Please TURN ON the device') {
          this.popupDeviceStatusLabel = 'Please TURN ON the device.';
          this.loading = false;
        }
        else {
          this.popupDeviceStatusLabel = 'Device  connected successfully';
          this.loading = false;
          let messageToClose = {
            source: this.webSocketSource,
            content: 'turnOFFHb'
          };
          this.messages2.next(messageToClose);

          this.lipid = 'Record not found.'; // no data found              

        }


      }

      /*
      var term = new RegExp("otherResult~");
      var terms = new RegExp("resultUpdate~Record not found.")
      if (term.test(msg)) {

        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;

        var message = msg.replace("otherResult~", "");
        var messages = message.split('~');
        var data = messages[0];
        this.lipid = data;
        this.fixappointment.controls['lipid'].setValue(this.lipid);

        console.log("this.lipid", msg);
        console.log("this.lipid", this.lipid)

        let messageToClose = {
          source: this.webSocketSource,
          content: 'turnOFFHb'
        };
        this.messages2.next(messageToClose);
      }
      else if(terms.test(msg)){
        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;

        var message = msg.replace("otherResult~", "");
        var messages = message.split('~');
        var data = messages[1];
        this.lipid = data;      

        console.log("this.lipid", msg);
        console.log("this.lipid", this.lipid)

        let messageToClose = {
          source: this.webSocketSource,
          content: 'turnOFFHb'
        };
        this.messages2.next(messageToClose);
      }
      */
    }

  }

  patient = new FormGroup({

    PR_Id: new FormControl(''),
    // PR_Photo: new FormControl(''),
    PR_PatientCode: new FormControl(''),
    doctor_Name: new FormControl(''),
    patientName: new FormControl(''),
    appt_DateTime: new FormControl(''),
    // PR_DOB: new FormControl(''),
    // PR_Age: new FormControl(''),
    // PR_Gender: new FormControl(''),
    // PR_MobileNumber: new FormControl(''),
    // PR_Alternative_No: new FormControl(''),
    // PR_LandlineNo: new FormControl(''),
    // PR_Email: new FormControl(''),
    // PR_Address: new FormControl(''),
    // PR_MaritalStatus: new FormControl(''),
    // PR_FatherName: new FormControl(''),
    // PR_Religion: new FormControl(''),
    // PR_Nationality: new FormControl(''),
    // PR_Caste: new FormControl(''),
    // PR_BloodGroup: new FormControl(''),
    // PR_MotherTongue: new FormControl(''),
    // PR_Occupation: new FormControl(''),
    // PR_Income: new FormControl(''),
    // PR_Insurance: new FormControl(''),
    // PR_PassportNo: new FormControl(''),
    // PR_Country: new FormControl('India'),
    // PR_S_Id_FK: new FormControl(''),
    // PR_D_Id_FK: new FormControl(''),
    // PR_Taluk: new FormControl(''),
    // PR_Village: new FormControl(''),
    // PR_Postalcode: new FormControl(''),

    // code from bws     
  })
  temprature() {
    const dialogRef = this.dialog.open(TempratureComponent,
      {
        height: '80%',
        width: '60%',
        hasBackdrop: true,
        // data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  bp() {
    const dialogRef = this.dialog.open(BloodPressureComponent,
      {
        height: '80%',
        width: '60%',
        hasBackdrop: true,
        // data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  bloodtest() {
    const dialogRef = this.dialog.open(BloodTestComponent,
      {
        height: '80%',
        width: '60%',
        hasBackdrop: true,
        // data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ecgDisplay(d: any) {
    this.api.ecgDataSubject.next(this.ecgData);
    console.log('ECG Data Dialog box', this.ecgData);
    const dialogRef = this.dialog.open(EcgMonitorComponent,
      {
        height: '88%',
        width: '58%',
        hasBackdrop: true,
        data: {
          d: 2, ecg: this.ECGLeads
        }

      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  hemo() {
    const dialogRef = this.dialog.open(HemoglobinTestComponent,
      {
        height: '80%',
        width: '60%',
        hasBackdrop: true,
        // data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  pulseOximeterDisplay() {
    const dialogRef = this.dialog.open(PulseOximeterComponent,
      {
        height: '88%',
        width: '58%',
        hasBackdrop: true,
        data: {
          spo2SaturationPercentage: this.spo2SaturationPercentage,
          spo2PulseRate: this.spo2PulseRate,
          pulseOxyMeterData: this.pulseOxyMeterData
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
    //saheb
    var testValue: any;
    testValue = '128.7777';
    var decidata = parseFloat(testValue).toFixed(2);
    console.log('saheb: ' + decidata);


    this.bind();
    this.disable();
    // this.get_patient();
    this.Get_Approval_detail();
    //this.Get_Doctor();
    this.Get_complaint();
    this.Get_symptoms();
    this.Get_Diseases();
    //this.Get_hospital();
    this.Get_allergy();
    this.Get_medication();
    this.Get_specialization();
    this.Get_hospital();
    this.Image_Url = this._data.d.pR_Image;
    // this.fixappointment.controls['select_FrmTime'].setValidators([this.timeValidator()]);
    this.fixappointment.controls['select_toTime'].setValidators([this.timeValidator()]);
    this.fixappointment.controls['select_FrmTime'].valueChanges.subscribe(() => {
      this.fixappointment.controls['select_toTime'].reset();
      this.fixappointment.controls['select_toTime'].updateValueAndValidity();
    });
    this.fixappointment.controls['select_toTime'].valueChanges.subscribe(() => {
      this.doctordd = [];
    });
  }


  timeValidator() {
    return (control: any) => {
      const fromTime = this.fixappointment.controls['select_FrmTime'].value;
      const toTime = this.fixappointment.controls['select_toTime'].value;

      if (fromTime && toTime && fromTime > toTime) {
        return { timeError: true };
      }

      return null;
    };
  }

  onInputChange() {
    console.log(this.multiUserSearchInput.nativeElement.value);
    const searchInput = this.multiUserSearchInput.nativeElement.value ?
      this.multiUserSearchInput.nativeElement.value.toLowerCase() : '';
    this.complaint = this.complaint1.filter(c => {
      const name: string = c.cmst_Name.toLowerCase();
      return name.indexOf(searchInput) > -1;

    });
  }

  onInputChange1() {
    console.log(this.multiUserSearchInput1.nativeElement.value);
    const searchInput1 = this.multiUserSearchInput1.nativeElement.value ?
      this.multiUserSearchInput1.nativeElement.value.toLowerCase() : '';
    this.symptoms = this.symptoms1.filter(c => {
      const name: string = c.smst_Name.toLowerCase();
      return name.indexOf(searchInput1) > -1;

    });
  }

  onInputChange2() {
    console.log(this.multiUserSearchInput2.nativeElement.value);
    const searchInput2 = this.multiUserSearchInput2.nativeElement.value ?
      this.multiUserSearchInput2.nativeElement.value.toLowerCase() : '';
    this.Diseases = this.Diseases1.filter(c => {
      const name: string = c.diseases_Name.toLowerCase();
      return name.indexOf(searchInput2) > -1;

    });
  }

  onInputChange3() {
    console.log(this.multiUserSearchInput3.nativeElement.value);
    const searchInput3 = this.multiUserSearchInput3.nativeElement.value ?
      this.multiUserSearchInput3.nativeElement.value.toLowerCase() : '';
    this.medication = this.medication1.filter(c => {
      const name: string = c.medic_name.toLowerCase();
      return name.indexOf(searchInput3) > -1;

    });
  }
  resetSearchInput(inputElement: ElementRef<HTMLInputElement>) {
    inputElement.nativeElement.value = '';
  }

  resetComplaintSearchInput() {
    this.resetSearchInput(this.multiUserSearchInput);
    this.complaint = this.complaint1; // Reset the filtered complaint list to the original list
  }

  resetSymptomsSearchInput() {
    this.resetSearchInput(this.multiUserSearchInput1);
    this.symptoms = this.symptoms1; // Reset the filtered symptoms list to the original list
  }

  resetDiseasesSearchInput() {
    this.resetSearchInput(this.multiUserSearchInput2);
    this.Diseases = this.Diseases1; // Reset the filtered present illnesses list to the original list
  }

  resetMedicationSearchInput() {
    this.resetSearchInput(this.multiUserSearchInput3);
    this.medication = this.medication1; // Reset the filtered medication list to the original list
  }
  bind() {
    this.patient.controls['PR_Id'].setValue(this._data.d.pR_Id);
    this.patient.controls['PR_PatientCode'].setValue(this._data.d.pR_PatientCode);
    this.patient.controls['patientName'].setValue(this._data.d.patientName);
    this.patient.controls['doctor_Name'].setValue(this._data.d.doctor_Name);
    if (this._data.d.appt_DateTime.slice(0, 10) == '1990-01-01') {
      this.defDate = "";
    }
    else {
      this.defDate = this._data.d.appt_DateTime.slice(0, 10);
    }
    this.patient.controls['appt_DateTime'].setValue(this.defDate);

  }
  disable() {
    this.patient.controls['PR_PatientCode'].disable();
    this.patient.controls['patientName'].disable();
    this.patient.controls['appt_DateTime'].disable();
    this.patient.controls['doctor_Name'].disable();

  }

  onSpecializationChange(event: MatSelectChange): void {
    const selectDay = this.fixappointment.value.select_day;
    const selectFrmTime = this.fixappointment.value.select_FrmTime;
    const selectToTime = this.fixappointment.value.select_toTime;
    const sp_id = this.fixappointment.value.Sp_Id;
    this.fixappointment.get('appt_DO_Id_FK')?.reset();
    this.doctordd = [];
    

    if (!this.hideFields) {
      this.fixappointment.get('Sp_Id')?.setValidators([Validators.required]);
    } else {
      this.fixappointment.get('Sp_Id')?.clearValidators();
    }

    // Trigger validation update
    this.fixappointment.get('Sp_Id')?.updateValueAndValidity();

    if (selectDay && selectFrmTime && selectToTime) {
      if (!this.hideFields) {
        this.Get_Doctor(selectDay, selectFrmTime, selectToTime, sp_id);
      } else {
        this.Get_Doctor(selectDay, selectFrmTime, selectToTime, 0);
      }
    }
  }

  Get_Approval_detail() {
    this._service.Get_Approval_detail()
      .subscribe((data) => {
        this._data = data
      })
  }
  //below for test code
  change_totime(fday: any, ffrom: any, event: any) {
    var datePipe = new DatePipe('en-US');
    fday = datePipe.transform(fday, 'dd/MM/yyyy');
    //alert(fday+"---"+ffrom+"---"+event.target.value)
  }

  // select_totime: any;
  Get_Doctor(selectDay: any, selectFrmTime: any, selectToTime: any, sp_id: any) {
    if (selectDay == null || selectDay == '') {
      this.notif.errorsmsg('Please enter date')
      return;
    }
    if (selectFrmTime == null || selectFrmTime == '') {
      this.notif.errorsmsg('Please enter from time')
      return;
    }
    if (!this.hideFieldsHos) {
      // If "Need Hospital" is selected, set values accordingly
      this.fixappointment.controls['appt_DO_Id_FK'].setValue(0);
    }

    // this.select_totime = event.target.value;
    var datePipe = new DatePipe('en-US');
    selectDay = datePipe.transform(selectDay, 'dd/MM/yyyy');
    console.log("selectday", selectDay)
    this.service.Get_Doctor(selectDay, selectFrmTime, selectToTime, sp_id)
      .subscribe((data:any) => {
        if (!this.hideFieldsGen) {
          this.doctordd = data.filter((doctor: any) => doctor.dO_Spc_Id_FK == 1);
        }
        else {
          this.doctordd = data
        }
        console.log("availavle docor :" + this.doctordd)
      })
    
    // if (!this.hideFieldsGen) {
    //   this.service.Get_Doctor(selectDay, selectFrmTime, selectToTime, sp_id)
    //     .subscribe((data: any) => {
    //       this.doctordd = data.filter((doctor: any) => doctor.dO_NE_Id == 56);
    //       console.log(" docor :" + this.doctordd)
    //     });
    // } else {
    //   this.service.Get_Doctor(selectDay, selectFrmTime, selectToTime, sp_id)
    //     .subscribe((data) => {
    //       this.doctordd = data
    //       console.log("availavle docor :" + this.doctordd)
    //     })
    // }
  }
  select_weight: any;
  bmi: any;
  Get_bmi(select_height: any, event: any) {
    this.select_weight = event.target.value;
    this.bmi = this.select_weight / Math.pow(select_height / 100, 2);
    this.bmi = parseFloat(this.bmi).toFixed(2);
    console.log("BMI value is ", this.bmi);
    this.fixappointment.controls['bmi'].setValue(this.bmi);


  }
  Get_Diseases() {
    this.service.Get_Diseases()
      .subscribe((data) => {
        this.Diseases = data
        this.Diseases1 = data
      })
  }
  Get_complaint() {
    this.service.Get_Compliant()
      .subscribe((data) => {
        this.complaint = data
        this.complaint1 = data
      })
  }
  Get_symptoms() {
    this.service.Get_Symptoms()
      .subscribe((data) => {
        this.symptoms = data
        this.symptoms1 = data
      })
  }
  Get_allergy() {
    this.service.Get_allergy()
      .subscribe((data) => {
        this.Allergy = data
      })
  }

  Get_medication() {
    this.service.Get_Medication()
      .subscribe((data) => {
        this.medication = data
        this.medication1 = data
      })
  }
  special: any;
  Get_specialization() {
    this.service.Get_specialization()
      .subscribe((data) => {
        this.special = data
      })
  }
  hospitaldd: any;

  Get_hospital() {
    this.service.Get_sephospital()
      .subscribe((data) => {
        this.hospitaldd = data
        if (!this.fixappointment.value.hos_Id) {
          this.fixappointment.controls['hos_Id'].setValue(null);
        }
      })
  }


  //'None' inclusion in the allergy dropdown
  onAllergySelectionChange(): void {
    const selectedOption = this.fixappointment.value.allergySigns_DTL;


    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.al_Name === "Others");

    if (noneOptionSelected) {
      //this.fixappointment.get('allergySigns_DTL').setValue(['None']);
      this.isOptionDisabled(noneOptionSelected);
    }
  }

  isOptionDisabled(option: any): boolean {
    const selectedOption = this.fixappointment.value.allergySigns_DTL;
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
  isOptionDisabled1(option: any): boolean {
    const selectedOption = this.fixappointment.value.diseasesDtl;
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

  isOptionDisabled2(option: any): boolean {
    const selectedOption = this.fixappointment.value.symptoms;
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

  isOptionDisabled3(option: any): boolean {
    const selectedOption = this.fixappointment.value.complaint;
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

  isOptionDisabledm(option: any): boolean {
    const selectedOption = this.fixappointment.value.underMedication;
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

  nameValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\s/g,''/a-zA-Z]/;
    // const spaceexp: RegExp =/[/\s/g, '']/

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }


  onToppingRemoved(topping: string) {
    const toppings = this.fixappointment.value.complaint;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['complaint'].setValue(toppings); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  onToppingRemoveds(topping: string) {
    const toppings = this.fixappointment.value.symptoms;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['symptoms'].setValue(toppings); // To trigger change detection
  }
  onToppingRemovedd(topping: string) {
    const toppings = this.fixappointment.value.diseasesDtl;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['diseasesDtl'].setValue(toppings); // To trigger change detection
  }

  onToppingRemoval(topping: string) {
    const toppings = this.fixappointment.value.allergySigns_DTL;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['allergySigns_DTL'].setValue(toppings); // To trigger change detection
  }

  onToppingRemovedm(topping: string) {
    const toppings = this.fixappointment.value.underMedication;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['underMedication'].setValue(toppings); // To trigger change detection
  }
  openDialog() {

    const dialogRef = this.dialog.open(PreviousRecordsdialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.router.navigate(['/base/task/appointment/previous-record/' + this.patient.value.PR_Id]);
      }
      else {
        // console.log("No Previous Record");
        this.router.navigate(['/base/task/appointment']);
        window.location.reload();
      }
    });

  }

  markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      }
    });
  }

  updateform() { 
    // if (this.fixappointment.invalid) {
    //   this.markAllFieldsAsTouched(this.fixappointment);
    //   return;
    // } 
    if (this.fixappointment.value.appt_DO_Id_FK == null || this.fixappointment.value.appt_DO_Id_FK == "" || this.fixappointment.invalid) {
      //  && this.fixappointment.value.hos_Id == null
      this.notif.errorsmsg("Please select at least one Checkbox");
      this.markAllFieldsAsTouched(this.fixappointment);
      return;
    }

    if (!this.fixappointment.value.diseasesDtl || this.fixappointment.value.diseasesDtl.length === 0) {
      this.fixappointment.value.diseasesDtl = [{ diseases_Id: 0, diseases_Name: 'Default Present Illness' }];
    }
    if (!this.fixappointment.value.symptoms || this.fixappointment.value.symptoms.length === 0) {
      this.fixappointment.value.symptoms = [{ symptoms_Id: 0, symptoms_Name: 'Default symptoms' }];
    }
    //let ECG=this.ECGValue();
    this.fixappointment.value.bloodPressure = this.fixappointment.value.bpmm + '/' + this.fixappointment.value.bphg;
    this.fixappointment.value.appt_PatientId_FK = this.patient.value.PR_Id;
    this.fixappointment.value.appt_DateTime = '2002-01-02';
    this.fixappointment.value.ECGLeads = this.ECGLeads;
    //this.fixappointment.value.ecg=ECG;
    //console.log("BP",this.fixappointment.value.bloodPressure)

    //new
    var datePipe = new DatePipe('en-US');
    this.fixappointment.value.select_day = datePipe.transform(this.fixappointment.value.select_day, 'yyyy-MM-dd');
    //alert("App Details"+ JSON.stringify(this.fixappointment.value))
    console.log("appointmnet data :", JSON.stringify(this.fixappointment.value))
    this.service.Post_Appointment(this.fixappointment.value)
      .subscribe(
        res => {
          this.notif.successmsg("Record saved successfully")
          this.dialogRef.close();
          this.openDialog();
        },

        err => this.notif.errorsmsg("Error while saving"),
      )
    this.fixappointment.reset();


  }

  // onKey(value){
  //   this.fixappointment.value.complaint=this.search(value);
  // }

  // search(value:string){
  //   let filter=value.toLowerCase();
  //   return this.complaint.filter(option => option.toLowerCase().startsWith(filter));

  // }


}
