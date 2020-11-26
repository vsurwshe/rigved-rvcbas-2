import { Component, OnInit } from '@angular/core';
import { DataTableService } from 'src/app/service/data-table.service';
import { LoginService } from 'src/app/service/login.service';
import { MasterDataService } from 'src/app/service/master-data.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerList;
  loading;

  travllerListTabelColumns=[
    {title:'First Name',data:'firstName'},
    {title:'Last Name',data:'lastName'},
    {title:'Mobile Number',data:'mobileNumber'},
    {title:'Email',data:'employID'},
  ]
  travllerListTabelColumnsDef=[
   {
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "render": function ( data, type, row ) {
        if(data == null) {
          return null;
        }else{
          return data;
        }
      }
    },
  ]

  constructor(
    private masterData:MasterDataService,
    private loginService:LoginService,
    private dataTabelService:DataTableService
  ){
    this.loading=false;
   }

  ngOnInit(): void {
    this.loading=true;
    this.masterData.getCustomerList('')
    .subscribe(
      response=>{
        this.customerList=response;
        this.dataTabelService.dataTable("#travellerList", this.travllerListTabelColumns, this.customerList, this.travllerListTabelColumnsDef);
        this.loading=false;
      },
      error=>{ this.loading=false; console.error("Error ",error);
    })
  }

  ngAfterViewInit(): void {
    this.dataTabelService.dataTable("#travellerList", this.travllerListTabelColumns, this.customerList, this.travllerListTabelColumnsDef);
  }

}
