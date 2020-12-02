import { Component, OnInit } from '@angular/core';
import { DataTableService } from 'src/app/service/data-table.service';
import { MasterDataService } from 'src/app/service/master-data.service';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.scss']
})
export class ClientManagementComponent implements OnInit {

  // required variables
  loading;
  clientListData;

  clientListTableColumns=[
    {title:'Client Name',data:'name'},
    {title:'Mobile Number',data:'mobileNumber'},
    {title:'Email',data:'emailId'},
    {title:'Action',data:'',orderable: false}, 
  ]
  clientListTableColumnsDef=[
    {
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
          $(td).click(e => { console.log("Data ",rowData) })
      },
      "defaultContent": "<button type='button' class='button-small'  uib-tooltip='appears with delay'><i class='fa fa-search-minus' aria-hidden='true'></i></button>"
    }
  ]
  constructor(private masterData: MasterDataService, private dataTableService:DataTableService) { this.loading=false; }

  ngOnInit(): void {
    this.loading=true;
    this.masterData.getPatnerList('')
    .subscribe(
      response=>{
        this.clientListData=response;
        this.loading=false;
        this.dataTableService.dataTable("#manageClientTable",this.clientListTableColumns,this.clientListData,this.clientListTableColumnsDef);
      },error=>{ this.loading=false; console.error("Error ",error);}
    )
  }

}
