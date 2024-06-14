import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { SpecilizationService } from '../specilization.service';

@Component({
  selector: 'app-delete-specilization',
  templateUrl: './delete-specilization.component.html',
  styleUrls: ['./delete-specilization.component.scss']
})
export class DeleteSpecilizationComponent implements OnInit {
  public get data(): any {
    return this._data;
  }
  public set data(value: any) {
    this._data = value;
  }

  constructor(private dialogRef: MatDialogRef<DeleteSpecilizationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private service: SpecilizationService, private notif: Notification) { }

  ngOnInit(): void {
  }
  delete() {
    this.service.Delete_specilization(this._data.d.sP_Id)
      .subscribe((res) => {
        this.notif.successmsg("Specialization deleted successfully")
        this.dialogRef.close();
        window.location.reload(); 
      })
  }
}
