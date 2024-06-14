import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-group',
  templateUrl: './upcoming-group.component.html',
  styleUrls: ['./upcoming-group.component.scss']
})
export class UpcomingGroupComponent implements OnInit {
  dtOptions = {};
  constructor() { }
data=[
  {Slno:'1',Group:'ewrer',Value:'12000',Commencement:'11-12-2021',Closure:'11-12-2022',EMI:'1000',Tickets:'1',Status:'1'},
  {Slno:'2',Group:'ewrer',Value:'12000',Commencement:'11-12-2021',Closure:'11-12-2022',EMI:'1000',Tickets:'1',Status:'1'},
  {Slno:'3',Group:'ewrer',Value:'12000',Commencement:'11-12-2021',Closure:'11-12-2022',EMI:'1000',Tickets:'1',Status:'1'},
  {Slno:'4',Group:'ewrer',Value:'12000',Commencement:'11-12-2021',Closure:'11-12-2022',EMI:'1000',Tickets:'1',Status:'1'},
  {Slno:'5',Group:'ewrer',Value:'12000',Commencement:'11-12-2021',Closure:'11-12-2022',EMI:'1000',Tickets:'1',Status:'1'},
  {Slno:'6',Group:'ewrer',Value:'12000',Commencement:'11-12-2021',Closure:'11-12-2022',EMI:'1000',Tickets:'1',Status:'1'},
  {Slno:'7',Group:'ewrer',Value:'12000',Commencement:'11-12-2021',Closure:'11-12-2022',EMI:'1000',Tickets:'1',Status:'1'},
  {Slno:'8',Group:'ewrer',Value:'12000',Commencement:'11-12-2021',Closure:'11-12-2022',EMI:'1000',Tickets:'1',Status:'1'},
]
  ngOnInit(): void {
    this.dtOptions = {
      dom: 'lBfrtip',
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
      scroll: "250px",
      select: true,
      buttons: [
        {
          extend: 'collection',
          className:'btn-primary',
          text: 'Export',
          buttons: [
            {extend:'copy',className:'btn-primary'},
            {extend:'csv',className:'btn-primary'},
            {extend:'excel',className:'btn-primary'},
            {extend:'pdf',className:'btn-primary'},
            {extend:'print',className:'btn-primary'},
            ]   
        },
        {extend:'colvis',
          className:'btn-primary',
          text:'Column Visibility',
         },
      ],
    }
  }
}
