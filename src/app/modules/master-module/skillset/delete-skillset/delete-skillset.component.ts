import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { SkillsetService } from '../skillset.service';

@Component({
  selector: 'app-delete-skillset',
  templateUrl: './delete-skillset.component.html',
  styleUrls: ['./delete-skillset.component.scss']
})
export class DeleteSkillsetComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteSkillsetComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:SkillsetService,private notif:Notification) { }

  ngOnInit(): void {
  }
delete(){
  this.service.Delete_skillset(this._data.d.skillset_id)
  .subscribe((res)=>{
    this.notif.successmsg("Skillset deleted successfully")
    this.dialogRef.close();
    window.location.reload(); 
  })
}
}
