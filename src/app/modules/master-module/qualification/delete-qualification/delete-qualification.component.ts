import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { QualificationService } from '../qualification.service';

@Component({
  selector: 'app-delete-qualification',
  templateUrl: './delete-qualification.component.html',
  styleUrls: ['./delete-qualification.component.scss']
})
export class DeleteQualificationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteQualificationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private service: QualificationService, private notif: Notification) { }

  ngOnInit(): void {
  }
  delete() {
    this.service.Delete_qualification(this._data.d.qualification_id)
      .subscribe((res) => {
        this.notif.successmsg("Qualification deleted successfully")
        this.dialogRef.close();
        window.location.reload(); 
      })
  }
}
