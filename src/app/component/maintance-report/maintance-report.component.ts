import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ExpenditureService } from 'src/app/service/expenditure.service';
import * as moment from 'moment';
import { DataTableService } from 'src/app/service/data-table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FileService } from 'src/app/service/file.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-maintance-report',
  templateUrl: './maintance-report.component.html',
  styleUrls: ['./maintance-report.component.scss']
})
export class MaintanceReportComponent implements OnInit {

  @ViewChild('approvedclose') approvedclose: ElementRef;

  // required variables
  loading;
  approvedBillList;
  pendingBillList;
  imageData;
  selectedModel;
  selectedData;
  // we used for the check passed data form other compoent
  state$: Observable<object>;

  // this array used approved bills tabel columns
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

  // this array used approved bills tabel columns definations
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

  // this array used pending bills tabel columns
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

  // this array used pending bills tabel columns definations
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
          $(td).on('click',event=>{ this.showInvoiceImage(rowData); })
      },
      "defaultContent": "<button class='btn btn-round btn-primary'  data-toggle='modal' data-target='#invoiceImage'>Show</button>"
    },
    {
      "targets": -2, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
        $(td).on('click',event=>{ this.selectedData=rowData; this.selectedModel="approvedBill"; })
      },
      "defaultContent": "<button class='btn btn-round btn-success' data-toggle='modal'  data-target='#approvedInvoice'> Approve </button>"
    },
    {
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
        $(td).on('click',event=>{ this.selectedData=rowData; this.selectedModel="pendingBill"; })
      },
      "defaultContent": "<button class='btn btn-round btn-danger' data-toggle='modal' data-target='#approvedInvoice'>Reject</button>"
    }
  ]

  constructor( 
    private expenditureService:ExpenditureService, 
    private dataTableServie:DataTableService,
    private router: Router,
    private activatedRoute:ActivatedRoute ,
    private filesService: FileService,
    private loginService:LoginService
  ) {this.loading=false;}

  ngOnInit(): void {
    this.loading=true;
    this.getBillData();
  }

  getBillData(){
    let approvedBillsSerach, pendingBillsSerach;
    // we will initlizes the state variable to map the state variables
    this.state$ = this.activatedRoute.paramMap.pipe(map(()=> window.history.state));
    this.state$.subscribe((data:any)=>{
      const { startDate, endDate }= data 
      // this condtion checks if passed start and dates
      if (startDate && endDate ) {
        approvedBillsSerach=this.expenditureService.getExpenseListConsaliate(0,100,startDate,endDate);
        pendingBillsSerach=this.expenditureService.getExpenseList(0,100,"Pending")
      } else { 
        approvedBillsSerach= this.expenditureService.getExpenseListConsaliate(0,100,null,null);
        pendingBillsSerach= this.expenditureService.getExpenseList(0,100,"Pending");  }
    })
    // we execute the paralle query 
    forkJoin([
      approvedBillsSerach,
      pendingBillsSerach
    ]).subscribe(
      response=>{
        this.loading=false;
        this.approvedBillList=response[0];
        this.pendingBillList=response[1];
        this.showTabelData();
      },error=>{this.loading=false; console.error("Error ",error);}
    )
  }

  // this method used to initlize the tabels
  showTabelData(){
    this.dataTableServie.dataTable("#approvedBillTabel",this.appovedBillListTableColumns,this.approvedBillList,  this.appovedBillListTableColumnsDef)
    this.dataTableServie.dataTable("#pendingBillTabel",this.pendingBillListTableColumns,this.pendingBillList,  this.pendingsBillListTableColumnsDef)
    let element:HTMLElement= document.getElementById("defaultOpen") as HTMLElement;
    element.click();
  }

  // this method handel the tabs opening in component
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

  // this will handel the approved bills table view button action
  showDirverByApprovedBill(data){
    const { endDate, startDate, driverAccountId }=data
    let newStartDate= startDate.split("IST");
    let newEndDate= endDate.split("IST");
    var modifyStartDate = moment(new Date(newStartDate[0]+newStartDate[1])).format("YYYY-MM-DD");
    var modifyEndDate = moment(new Date(newEndDate[0]+newEndDate[1])).format("YYYY-MM-DD");
    this.router.navigateByUrl("/maintenanceDetaills",{state:{driverAccountId,modifyStartDate,modifyEndDate}})
  }

  showInvoiceImage(data){
    const { fileUrl }=data
    console.log("Data ",data)
    if(fileUrl != "" && fileUrl != null){
      let newUrl= fileUrl.replace(' ', '');
      newUrl= newUrl.replace(/\\/g, '/');
      this.loading=true;
      this.filesService.getfile(newUrl)
      .subscribe(
        response=>{
         this.imageData=URL.createObjectURL(response);
         this.loading=false;
        },error=>{ this.loading=false; console.error("Error ",error);}
      )
    } 
  }

  udpateStatus(status){
    console.log("Data ",this.selectedData,status)
    this.loading= true;
    this.expenditureService.updateBillStatus(this.selectedData.id,status)
    .subscribe(
      response=>{
        this.loading=false;
        this.loginService.successFullMessage("Youe bill status updated successfully");
        this.approvedclose.nativeElement.click();
        this.getBillData();
      },error=>{
        this.loading=false;
        this.loginService.errorMessage("Something went worng...,Please try again....!");
      })
  }

}
