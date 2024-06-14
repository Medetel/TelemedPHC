import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-pulse-oximeter',
  templateUrl: './pulse-oximeter.component.html',
  styleUrls: ['./pulse-oximeter.component.scss']
})
export class PulseOximeterComponent implements OnInit {

  pulseType = ChartType.LineChart;

  pulseOxyMeterData: any;
  spo2SaturationPercentage: any;
  spo2PulseRate: any;

  pulseoptions = {
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'Saturation'
    }
  };

  constructor(private dialogRef: MatDialogRef<PulseOximeterComponent>, @Inject(MAT_DIALOG_DATA) private _data: any,) { }

  ngOnInit(): void {
    //console.log('Data Dialog',this._data);
    this.spo2SaturationPercentage=this._data.spo2SaturationPercentage
    this.spo2PulseRate=this._data.spo2PulseRate
    //this.pulseOxyMeterData=Object.assign([], this._data.pulseOxyMeterData);
    this.pulseOxyMeterData=this._data.pulseOxyMeterData;
    //this.pulseOxyMeterData= Object.assign([], [90.52943791310608, 90.3192790652921, 90.15700469756632, 90.04822453918793, 89.98582638653909, 89.95775362881092, 89.95174270796716, 89.95769124692178, 89.96842392726863, 90.02566083744733, 90.2336027359687, 90.61568766020943, 91.10517679528087, 91.69555997822428, 92.36501773423493, 93.04209576627932, 93.69024582841078, 94.25069924146229, 94.6646034655992, 94.930056414259, 95.07351591743722, 95.13050536963055, 95.1344516880763, 95.1115825411182, 95.12587700206706, 95.24807486737643, 95.44692391852688, 95.6467779005751, 95.81024762254681, 95.92565850872158, 95.99613702270304, 96.03151204275711, 96.04309508123168, 95.99470774417019, 95.83349141859117, 95.60040141215575, 95.37497449812815, 95.19491378585943, 95.07039082734465, 94.99615988966704, 94.96036081097638, 94.95006889488783, 94.95422085204845, 94.96471033376179, 94.97638109282599, 94.98647924595718, 94.99394058823917, 94.99872829401626, 94.95518580856749, 94.80364511274541]);
  }

}

