import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ChartType, GoogleChartComponent } from 'angular-google-charts';


import * as d3 from 'd3';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { Router } from '@angular/router';
import { MatOption } from '@angular/material/core';
import { ReturnStatement } from '@angular/compiler';
import { BloodPressureComponent } from '../../appointment/add-appointment/appointment-patient/blood-pressure/blood-pressure.component';
import { BloodTestComponent } from '../../appointment/add-appointment/appointment-patient/blood-test/blood-test.component';
import { EcgMonitorComponent } from '../../appointment/add-appointment/appointment-patient/ecg-monitor/ecg-monitor.component';
import { HemoglobinTestComponent } from '../../appointment/add-appointment/appointment-patient/hemoglobin-test/hemoglobin-test.component';
import { PulseOximeterComponent } from '../../appointment/add-appointment/appointment-patient/pulse-oximeter/pulse-oximeter.component';
import { TempratureComponent } from '../../appointment/add-appointment/appointment-patient/temprature/temprature.component';
import { AppointmentService } from '../../appointment/appointment.service';
import { PreviousRecordsdialogComponent } from '../../previous-recordsdialog/previous-recordsdialog.component';

const websocketUrl = "ws://localhost:8444/bleWS/";
const websocketUrl2 = "ws://localhost:8444/paramWS/";


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class VitalsComponent implements OnInit {
  isChecked: boolean = false;
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



  constructor(private cdr: ChangeDetectorRef, private dialogRef: MatDialogRef<VitalsComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private _data: any =[],
    private service: AppointmentService,
    public api: ApiService, private _service: AppointmentService, private notif: Notification, private router: Router, public fb: FormBuilder) {
    // this.data = _data;
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

    });


   
  }
 

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

 

 
  fixappointment = new FormGroup({
    appt_PatientId_FK: new FormControl(''),
    lp_cons_id: new FormControl(''),
    appt_DateTime: new FormControl(''),
    pA_Hemoglobin: new FormControl('', [Validators.pattern("^\\S{0}.{0,10}\\S{1}$"), this.nameValidators]),
    tempInFahrenheit: new FormControl(''),
    pA_Height: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    pA_Weight: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    bmi: new FormControl(''),
    pA_TempInCelsius: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    pA_BloodPressure: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    pA_Sugar: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    pA_PulseRate: new FormControl('', [Validators.pattern(/^[1-9]\d*$/)]),
    pA_RespiratoryRate: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    pA_ECG: new FormControl(''),
    pA_OxygenSaturation: new FormControl('', [Validators.pattern(/^[1-9]\d*$/)]),
    bpmm: new FormControl('', [Validators.pattern(/^[1-9]\d*$/)]),
    bphg: new FormControl('', [Validators.pattern(/^[1-9]\d*$/)]),
    ECGLeads: new FormControl(''),
    lp_total_cholesterol: new FormControl('', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    lp_triglycerides: new FormControl('', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    lp_hdl_cholesterol: new FormControl('', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    lp_ldl: new FormControl('', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    lp_hiv_First: new FormControl(''), 
    lp_dengue: new FormControl(''), 
    lp_malaria: new FormControl(''),
    lp_pregnancy: new FormControl(''), 
    lp_syphilis: new FormControl(''), 
    lp_Tem_three: new FormControl(''),
    lp_Tem_forth: new FormControl(''),
    lp_tsh: new FormControl(''),
    lp_hiv_two: new FormControl(''),
    lp_hepatitis_c: new FormControl(''),
    lp_troponin_one: new FormControl(''),
    lp_leucocytes: new FormControl(''),
    lp_nitrite: new FormControl(''),
    lp_pH: new FormControl(''),
    lp_protein: new FormControl(''),
    lp_blood: new FormControl(''),
    lp_specific_gravity: new FormControl(''), 
    lp_ketone: new FormControl(''),
    lp_fev_one: new FormControl(''),
    lp_fvc: new FormControl(''),
    lp_tlc: new FormControl(''),
    lp_fvc_ratio: new FormControl(''),
    lp_pef: new FormControl(''),
    lp_fef_twentyfive: new FormControl(''),
    lp_fef_fifty: new FormControl(''),
    lp_fef_seventyfive: new FormControl(''),
    lp_tidalvolume: new FormControl(''),
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
        this.fixappointment.controls['pA_TempInCelsius'].setValue(this.api.temperature);
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
        this.fixappointment.controls['pA_OxygenSaturation'].setValue(this.spo2SaturationPercentage);

      }
      if (term2.test(msg)) {

        this.popupDeviceStatusLabel = 'Device  connected successfully';
        this.loading = false;

        var message = msg.replace("pulseRateForSpo2~", "");
        var messages = message.split('~');
        var data = JSON.parse(messages[0]);
        this.spo2PulseRate = data[1];
        console.log("Pulse Rate:", this.spo2PulseRate);
        this.fixappointment.controls['pA_PulseRate'].setValue(this.spo2PulseRate.toString());

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
        this.fixappointment.controls['pA_OxygenSaturation'].setValue(this.pulseOxyMeterData);
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
        this.fixappointment.controls['pA_Sugar'].setValue(this.glucose);

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
        this.fixappointment.controls['pA_Hemoglobin'].setValue(this.hemoglobin);

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

     
    }

  }

  patient = new FormGroup({

    PR_Id: new FormControl(''),
    doctor_Name: new FormControl(this._data.d.doctor_name),
    patientName: new FormControl(this._data.d.billing_name), 
    appt_DateTime: new FormControl(this._data.d.cons_date),
       
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

  package_desc1 = true;
  package_desc2 = true;
  package_desc3 = true;
  package_desc4 = true;
  package_desc5 = true;
  package_desc6 = true;

  ngOnInit(): void {
    if (this._data.d.serviceCode == 'PK0001') {
      this.package_desc1 = false
    }
    else if (this._data.d.serviceCode == 'PK0002') {
      this.package_desc1 = false
      this.package_desc2 = false
    }
    else if (this._data.d.serviceCode == 'PK0003') {
      this.package_desc1 = false
      this.package_desc2 = false
      this.package_desc3 = false
    }
    else if (this._data.d.serviceCode == 'PK0004') {
      this.package_desc1 = false
      this.package_desc2 = false
      this.package_desc3 = false
      this.package_desc4 = false
    }
    else if (this._data.d.serviceCode == 'PK0005') {
      this.package_desc1 = false
      this.package_desc2 = false
      this.package_desc3 = false
      this.package_desc4 = false
      this.package_desc5 = false
    }
    else if (this._data.d.serviceCode == 'PK0006') {
      this.package_desc1 = false
      this.package_desc2 = false
      this.package_desc3 = false
      this.package_desc4 = false
      this.package_desc5 = false
      this.package_desc6 = false
    }





    console.log("reaciving data", this._data.d.billing_name)
    //saheb
    var testValue: any;
    testValue = '128.7777';
    var decidata = parseFloat(testValue).toFixed(2);
    console.log('saheb: ' + decidata);


    // this.bind();
    this.disable();
    // this.get_patient();
    this.Get_Approval_detail();
   
    this.Image_Url = this._data.d.pR_Image;
    this.patient.controls['PR_Id'].setValue(this._data.d.cons_pr_id);
    this.patient.controls['patientName'].setValue(this._data.d.billing_name);
    this.patient.controls['doctor_Name'].setValue(this._data.d.doctor_name);
    if (this._data.d.cons_date.slice(0, 10) == '1990-01-01') {
      this.defDate = "";
    }
    else {
      this.defDate = this._data.d.cons_date.slice(0, 10);
    }
    this.patient.controls['appt_DateTime'].setValue(this.defDate);
    
  }

  bind() {

    // this.patient.controls['PR_Id'].setValue(this._data.d.cons_pr_id);
    // this.patient.controls['patientName'].setValue(this._data.d.billing_name);
    // this.patient.controls['doctor_Name'].setValue(this._data.d.doctor_name);

    // if (this._data.data[0].cons_date.slice(0, 10) == '1990-01-01') {
    //   this.defDate = "";
    // }
    // else {
    //   this.defDate = this._data.data[0].cons_date.slice(0, 10);
    // }
    // this.patient.controls['appt_DateTime'].setValue(this.defDate);

  }
  disable() {
    this.patient.controls['PR_PatientCode'].disable();
    this.patient.controls['patientName'].disable();
    this.patient.controls['appt_DateTime'].disable();
    this.patient.controls['doctor_Name'].disable();

  }

  Get_Approval_detail() {
    this._service.Get_Approval_detail()
      .subscribe((data) => {
        this._data = data
      })
  }
  //below for test code
  

 
  

  nameValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\s/g,''/a-zA-Z]/;
    // const spaceexp: RegExp =/[/\s/g, '']/

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
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
  markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      }
    });
  }

  toggleCheckbox() {
    this.isChecked = !this.isChecked; // Toggle isChecked value
    this.cdr.detectChanges();
  }


  updateform() {
    if (this.fixappointment.invalid) {
      this.markAllFieldsAsTouched(this.fixappointment);
      return;
    }
    this.fixappointment.value.pA_BloodPressure = this.fixappointment.value.bpmm + '/' + this.fixappointment.value.bphg;
    this.fixappointment.value.appt_PatientId_FK = this._data.d.cons_pr_id; 
    this.fixappointment.value.lp_cons_id = this._data.d.cons_id;
    this.fixappointment.value.appt_DateTime = '2002-01-02';
    this.fixappointment.value.ECGLeads = this.ECGLeads;

    this.fixappointment.value.is_active = this.isChecked;

    // console.log('V:', this.isChecked)
    var datePipe = new DatePipe('en-US');
    console.log("appointmnet data :", JSON.stringify(this.fixappointment.value))
    this.service.Post_Medicaltests(this.fixappointment.value)
      .subscribe(
        res => {
          this.notif.successmsg("Record saved successfully")
          this.dialogRef.close();
        },

        err => this.notif.errorsmsg("Error while saving"),
      )
    this.fixappointment.reset();
    window.location.reload();


  }

 
}

