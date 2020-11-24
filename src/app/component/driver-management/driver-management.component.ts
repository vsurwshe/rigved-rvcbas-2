import { Component, OnInit } from '@angular/core';
import { DataTableService } from 'src/app/service/data-table.service';
import { MasterDataService } from 'src/app/service/master-data.service';

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.scss']
})
export class DriverManagementComponent implements OnInit {
  // required variables
  loading
  driverList

  driverListTableColumns=[
    {title:'Name',data:'firstName'},
    {title:'Mobile Number',data:'mobileNumber'},
    {title:'Email',data:'emailId'},
    {title:'Car Brand/Model',data:'carDetailDto.subType.name'},
    {title:'Action',data:'',orderable: false}, 
  ]

  driverListTabelColumnsDef=[
    {
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
          $(td).click(e => { console.log("Data ",rowData) })
      },
      "defaultContent": "<button type='button' class='button-small'  uib-tooltip='appears with delay'><i class='fa fa-search-minus' aria-hidden='true'></i></button>"
    }
   ]

  constructor(
    private masterData: MasterDataService,
    private dataTableService: DataTableService
  ) { this.loading=false;}

  ngOnInit(): void {
    this.loading=true;
    this.masterData.getDriverSerach('')
    .subscribe(
      response=>{
        this.driverList=response;
        this.loading=false;
        this.dataTableService.dataTable("#driverManagmentList", this.driverListTableColumns, this.driverList, this.driverListTabelColumnsDef)
      },error=>{ this.loading=false; console.error("Error: ",error)}
    )
  }

}
