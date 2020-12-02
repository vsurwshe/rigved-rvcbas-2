import { Component, OnInit } from '@angular/core';
import { DataTableService } from 'src/app/service/data-table.service';
import { MasterDataService } from 'src/app/service/master-data.service';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.scss']
})
export class VendorManagementComponent implements OnInit {

  // required variables
  loading;
  vendorListData;

  vendorListTableColumns=[
    {title:'Vendor Name',data:'companyName'},
    {title:'Contact Person',data:'contactPersonDtoList'},
    {title:'Mobile Number',data:'contactPersonDtoList'},
    {title:'GST',data:'gstnumber'},
    {title:'Action',data:'',orderable: false}, 
  ]
  vendorListTableColumnsDef=[
    {
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
          $(td).click(e => { console.log("Data ",rowData) })
      },
      "defaultContent": "<button type='button' class='button-small'  uib-tooltip='appears with delay'><i class='fa fa-search-minus' aria-hidden='true'></i></button>"
    },
    {
      "targets": -3, // specifies the position of button(last but one) in the row
      "render": function ( data, type, row ) {
        if(row.contactPersonDtoList && row.contactPersonDtoList.length >0) {
          return row.contactPersonDtoList[0].firstName;
        }else{
          return ""
        }
      },
    },
    {
      "targets": -4, // specifies the position of button(last but one) in the row
      "render": function ( data, type, row ) {
        if(row.contactPersonDtoList && row.contactPersonDtoList.length >0) {
          return row.contactPersonDtoList[0].mobileNumber;
        }else{
          return ""
        }
      },
    }
  ]

  constructor(private masterData: MasterDataService, private dataTableService:DataTableService) { this.loading=false;}

  ngOnInit(): void {
    this.loading=true;
    this.masterData.getCompanyDetails('')
    .subscribe(
      response=>{
        this.vendorListData=response;
        this.loading=false;
        this.dataTableService.dataTable("#manageVendorTable", this.vendorListTableColumns, this.vendorListData, this.vendorListTableColumnsDef)
      },error=>{ this.loading=false; console.error("Error ",error);}
    )
  }

}
