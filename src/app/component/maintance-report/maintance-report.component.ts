import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ExpenditureService } from 'src/app/service/expenditure.service';
import { MasterDataService } from 'src/app/service/master-data.service';
import * as moment from 'moment';
import { DataTableService } from 'src/app/service/data-table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintance-report',
  templateUrl: './maintance-report.component.html',
  styleUrls: ['./maintance-report.component.scss']
})
export class MaintanceReportComponent implements OnInit {

  // required variables
  loading;
  approvedBillList;
  pendingBillList;

  appovedBillListTableColumns=[
    {title:'',data:''},
    {title:'',data:'driverAccountId',visible:false},
    {title:'Driver Name',data:'driverName'},
    {title:'Vehicle No',data:'carRegNo'},
    {title:'Total KM',data:'totalDist'},
    {title:'Total Fuel',data:'totalLt'},
    {title:'Average',data:'avg'},
    {title:'Service',data:'otherExpTotal'},
    {title:'Grand Total Amount',data:'totalAmt'},
    {title:'Action',data:'',orderable: false},
  ]

  appovedBillListTableColumnsDef=[
    {
      "targets":   0,
      "className": 'select-checkbox',
      "orderable": false,
      "data":null,
      "defaultContent": ''
    },
    {
      "targets": -6, // specifies the position of button(last but one) in the row
      "render": function ( data, type, row ) {
        if(row.totalDist && row.totalDist !== "" && row.totalDist !== null) {
          return Math.floor(Number(row.totalDist)* 100) / 100  + " KM"; 
        }else{ return "" }
      },
    },
    {
      "targets": -4, // specifies the position of button(last but one) in the row
      "render": function ( data, type, row ) {
        if(row.avg && row.avg !== "" && row.avg !== null && row.avg !== "NaN") {
          return  row.avg + " KM/L"; 
        }else{ return "" }
      },
    },
    {
      "targets": -3, // specifies the position of button(last but one) in the row
      "render": function ( data, type, row ) {
        if(row.otherExpTotal && row.otherExpTotal !== "" && row.otherExpTotal !== null) {
          return  "₹&nbsp;"+ row.otherExpTotal; 
        }else{ return "" }
      },
    },
    {
      "targets": -2, // specifies the position of button(last but one) in the row
      "render": function ( data, type, row ) {
        if(row.totalAmt && row.totalAmt !== "" && row.totalAmt !== null) {
          return  "₹&nbsp;"+ row.totalAmt; 
        }else{ return "" }
      },
    },
    {
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
        $(td).on('click',event=>{ this.showDirverByApprovedBill(rowData); })
      },
      "defaultContent": "<button class='btn ripple-infinite btn-round btn-primary'> View </button>"
    }
  ]

  pendingBillListTableColumns=[
    {title:'',data:''},
    {title:'',data:'driverAccountId',visible:false},
    {title:'Date',data:'entryDate'},
    {title:'Driver Name',data:'driverName'},
    {title:'Vehicle Number',data:'vehicleNumber'},
    {title:'Expenses Item',data:'description'},
    {title:'Expense Type',data:'expenceType'},
    {title:'Meter Reading',data:'odoMeterReading'},
    {title:'Amount',data:'totalAmount'},
    {title:'Action',data:'',orderable: false},
    {title:'',data:'',orderable: false},
    {title:'',data:'',orderable: false},
  ]

  pendingsBillListTableColumnsDef=[
    {
      "targets":   0,
      "className": 'select-checkbox',
      "orderable": false,
      "data":null,
      "defaultContent": ''
    },
    {
      "targets": -10, // specifies the position of button(last but one) in the row
      "render": function ( data, type, row ) {
        if(row.entryDate && row.entryDate !== "" && row.entryDate !== null) {
          return moment(row.entryDate).format('YYYY-MM-DD')
        }else{ return "" }
      },
    },
    {
      "targets": -4, // specifies the position of button(last but one) in the row
      "render": function ( data, type, row ) {
        if(row.totalAmount && row.totalAmount !== "" && row.totalAmount !== null) {
          return "₹&nbsp;"+ row.totalAmount; 
        }else{ return "" }
      },
    },
    {
      "targets": -3, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
          $(td).click(e => { console.log("Data ",rowData) })
      },
      "defaultContent": "<button class='btn ripple-infinite btn-round btn-secondary materialButtons'  data-toggle='modal' data-target='#invoiceImage'>Show</button>"
    },
    {
      "targets": -2, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
          $(td).click(e => { console.log("Data ",rowData) })
      },
      "defaultContent": "<button class='btn btn-round btn-primary materialButtons'> Approved </button>"
    },
    {
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
          $(td).click(e => { console.log("Data ",rowData) })
      },
      "defaultContent": "<button class='btn ripple-infinite btn-round btn-secondary materialButtons'>Rejected</button>"
    }
  ]

  constructor( 
    private expenditureService:ExpenditureService, 
    private masterData: MasterDataService,
    private dataTableServie:DataTableService,
    private router: Router 
  ) {this.loading=false;}

  ngOnInit(): void {
    document.getElementById("defaultOpen").click();
    let approvedBillsSerach= this.expenditureService.getExpenseListConsaliate(0,100,null,null);
    let pendingBillsSerach= this.expenditureService.getExpenseList(0,100,"Pending");
    this.loading=true;
    forkJoin([
      approvedBillsSerach,
      pendingBillsSerach
    ]).subscribe(
      response=>{
        this.loading=false;
        this.approvedBillList=response[0];
        this.pendingBillList=response[1];
        this.dataTableServie.dataTable("#approvedBillTabel",this.appovedBillListTableColumns,this.approvedBillList,  this.appovedBillListTableColumnsDef)
        this.dataTableServie.dataTable("#pendingBillTabel",this.pendingBillListTableColumns,this.pendingBillList,  this.pendingsBillListTableColumnsDef)
      },error=>{this.loading=false; console.error("Error ",error);}
    )
  }

  openTab(evt, cityName):void {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataTableServie.dataTable("#approvedBillTabel",this.appovedBillListTableColumns,this.approvedBillList,  this.appovedBillListTableColumnsDef)
    this.dataTableServie.dataTable("#pendingBillTabel",this.pendingBillListTableColumns,this.pendingBillList,  this.pendingsBillListTableColumnsDef)
  }

  showDirverByApprovedBill(data){
    const { endDate, startDate, driverAccountId }=data
    let newStartDate= startDate.split("IST");
    let newEndDate= endDate.split("IST");
    var modifyStartDate = moment(new Date(newStartDate[0]+newStartDate[1])).format("YYYY-MM-DD");
    var modifyEndDate = moment(new Date(newEndDate[0]+newEndDate[1])).format("YYYY-MM-DD");
    this.router.navigate(['/maintenanceDetaills',{driverAccountId,modifyStartDate,modifyEndDate}])
  }

}
