import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BillService } from 'src/app/service/bill.service';
import { DataTableService } from 'src/app/service/data-table.service';
import { LoginService } from 'src/app/service/login.service';

declare var $;
import jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-travell-billing',
  templateUrl: './travell-billing.component.html',
  styleUrls: ['./travell-billing.component.scss']
})
export class TravellBillingComponent implements OnInit {

  @ViewChild('savebuttonmodel') savebuttonmodel: ElementRef;
  @ViewChild('invoicemodel') invoicemodel: ElementRef;

  state$: Observable<object>;

  // required variables
  loading;
  travellingBillList;
  adjustTime:{ hour: number, minute: number};;
  totalKm;
  adjustSign;
  invoiceId;
  tabel:any;
  selectedIds:Array<any>;
  invoiceViewData;

  travellBillingTabelColumns=[
    {title:'',data:'', orderable: false},
    {title:'',data:'', orderable: false},
    {title:'Company Name',data:'nameOfCompany'},
    {title:'GST',data:'gstNo',visible:false},
    {title:'Cost center',data:'costCentre',visible:false},
    {title:'Emp.No',data:'empNo',visible:false},
    {title:'Emp.Name',data:'empName',visible:false},
    {title:'Travel Id',data:'travelId'},
    {title:'From Date',data:'fromDate'},
    {title:'To Date',data:'toDate'},
    {title:'Type of Duty',data:'typeOfDuty',visible:false},
    {title:'Vehicle Segment',data:'vehicleSeg',visible:false},
    {title:'Vehicle Model',data:'vehicleType',visible:false},
    {title:'Vehicle Number',data:'carNo',visible:false},
    {title:'Per Kms Rate',data:'perKmRate',visible:false},
    {title:'Total Kms',data:'totalKm'},
    {title:'Per hrs Rate',data:'perHrRate',visible:false},
    {title:'Total Hrs',data:'totalHr'},
    {title:'Total Amount',data:'totalHrAmt'},
    {title:'Toll-park',data:'tolllPark',visible:false},
    {title:'D.A+Night allowences',data:'naDa',visible:false},
    {title:'Grand Total',data:'totalTripBill'},
    {title:'Actions',data:'',orderable: false},
  ]

  travellBillingTabelColumnsDef= [
    {
      "targets":   0,
      "className": 'select-checkbox',
      "orderable": false,
      "data":null,
      "defaultContent": ''
    },
    {
      "targets": 1,
      "className":      'details-control',
      "orderable":      false,
      "data":           null,
      "defaultContent": ''
    },
    {
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
        $(td).on('click',event=>{
          const { totalHr, totalKm, id}=rowData
          let filterTime= totalHr.split(":");
          this.adjustTime = {
            hour: Number(filterTime[0]),
            minute: Number(filterTime[1]) 
          };
          this.totalKm=totalKm;
          this.invoiceId=id;
        })
      },
      "defaultContent": "<button class='btn btn-success btn-round' data-toggle='modal' data-target='#adjustmentModel'>ADJUSTMENT</button>"
    }
  ]

  travellBillingTabelButtons=[
    {
      extend: 'excelHtml5',
      className: 'excleExport',
      text: "Export Excel",
      exportOptions: {
        columns: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
      }
    },
    {
      extend: 'pdfHtml5',
      orientation: 'landscape',
      pageSize: 'LEGAL',
      text:'Export PDF',
      exportOptions: {
        columns: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
      }
    },
    {
      text: 'Generate Invoice',
      className: 'genInv'
    }
  ]

  constructor(
    private loginService:LoginService,
    private billService: BillService,
    private dataTabelService: DataTableService,
    private activatedRoute:ActivatedRoute
  ) { 
    this.loading=false;
    this.selectedIds=[];
  }

  ngOnInit(): void {
    this.loading=true;
    this.state$ = this.activatedRoute.paramMap.pipe(map(()=> window.history.state));
    this.state$.subscribe((data:any)=>{
      const { billList }= data ? data : ""
      if(billList != ""){
        this.loading=false;
        this.travellingBillList=billList
      }else{ this.getBillList() }
    })
  }

  getBillList(){
    this.billService.getBillList(0,100,{})
    .subscribe(
      response=>{
        this.travellingBillList=response;
        this.tabel = this.dataTabelService.dataTableWithButtons("#travellBillingTabel", this.travellBillingTabelColumns, this.travellingBillList, this.travellBillingTabelColumnsDef,this.travellBillingTabelButtons,true);
        this.loading=false;
        this.listenClickEventListenerOnTabel("#travellBillingTabel",this.tabel);
        this.listenSelectEvent(this.tabel,this.selectedIds);
      },error=>{ this.loading=false; console.error("Error ",error);}
    )
  }

  ngAfterViewInit(): void {
    this.tabel= this.dataTabelService.dataTableWithButtons("#travellBillingTabel", this.travellBillingTabelColumns, this.travellingBillList, this.travellBillingTabelColumnsDef,this.travellBillingTabelButtons,true);
    // showing details pan
    this.listenClickEventListenerOnTabel("#travellBillingTabel",this.tabel);
    // cathing select event
    this.listenSelectEvent(this.tabel,this.selectedIds);
  }

  listenSelectEvent(table,selectedIds){
    var localThis=this;
    $(document).ready(function() {
      $('.genInv').click( function () {
        if(table.rows('.selected').data().length >0){
          var rowData = table.rows('.selected').data().toArray().map(item=>item.id);
          localThis.loading=true;
          localThis.billService.genratetBillInvoice(rowData)
          .subscribe(
            response=>{
            localThis.invoiceViewData=response;
            localThis.invoicemodel.nativeElement.click();
            localThis.loading=false;
            localThis.loginService.successFullMessage("Your selected data Invoice Created Successfully!")
          },error=>{
            localThis.loading=false; 
            console.error("Error ",error);
            localThis.loginService.errorMessage("Something went wrong...Please try again...!");
          })
        }else{
          localThis.loginService.errorMessage("Please select at least one row form tabel");
        }
      });
    })
   
  }

  downloadInvoicePdf(){
    var data = document.getElementById('invoiceViewData');  //Id of the table
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 208;   
      let pageHeight = 295;    
      let imgHeight = canvas.height * imgWidth / canvas.width;  
      let heightLeft = imgHeight;  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 2;  
      pdf.addImage(contentDataURL, 'PNG', 2, position, imgWidth, imgHeight)  
      pdf.save('RV-CabsInvoice.pdf'); // Generated PDF   
    });
  }

  listenClickEventListenerOnTabel(tabelId,table){
    var localThis=this;
    $(document).ready(function() {
      $(tabelId).on('click', 'td.details-control', function () {
          var tr = $(this).closest('tr');
          var row = table.row(tr);
          if ( row.child.isShown() ) {
              // This row is already open - close it
              row.child.hide();
              tr.removeClass('shown');
          }
          else {
              // Open this row
              row.child( localThis.format(row.data()) ).show();
              tr.addClass('shown');
          }
      });
    })
  }

  /* Formatting function for row details - modify as you need */
  format ( rowData ) {
    // `rowData` is the original data object for the row
    return '<div class="card">'+
        '<div class="card-body row">'+
            '<div class="col-sm-3">'+
            '<label>Company GST Number: &nbsp;</label>'+
            '<label style="font-weight: bold;">'+rowData.gstNo+'</label>'+
            '</div>'+
            '<div class="col-sm-3">'+
            '<label>Empolyee Number: &nbsp;</label>'+
            '<label style="font-weight: bold;">'+rowData.empNo+'</label>'+
            '</div>'+
            '<div class="col-sm-3">'+
            '<label>Empolyee Name: &nbsp;</label>'+
            '<label style="font-weight: bold;">'+rowData.empName+'</label>'+
            '</div>'+
            '<div class="col-sm-3">'+
            '<label>Type of Duty: &nbsp;</label>'+
            '<label style="font-weight: bold;">'+rowData.typeOfDuty+'</label>'+
            '</div>'+
            '<div class="col-sm-3">'+
            '<label>Cost Center: &nbsp;</label>'+
            '<label style="font-weight: bold;">'+rowData.costCentre+'</label>'+
            '</div>'+
            '<div class="col-sm-3">'+
            '<label>Vehicle Segment: &nbsp;</label>'+
            '<label style="font-weight: bold;">'+rowData.vehicleSeg+'</label>'+
            '</div>'+
            '<div class="col-sm-3">'+
            '<label>Vehicle Model: &nbsp;</label>'+
            '<label style="font-weight: bold;">'+rowData.vehicleType+'</label>'+
            '</div>'+
            '<div class="col-sm-3">'+
            '<label>Vehicle Number: &nbsp;</label>'+
            '<label style="font-weight: bold;">'+rowData.carNo+'</label>'+
            '</div>'+
            '<div class="col-sm-3">'+
            '<label>Per KMS Rate: &nbsp;</label>'+
            '<label style="font-weight: bold;">'+rowData.perKmRate+'</label>'+
            '</div>'+
            '<div class="col-sm-3">'+
            '<label>Toll Park: &nbsp;</label>'+
            '<label style="font-weight: bold;">'+rowData.tolllPark+'</label>'+
            '</div>'+
            '<div class="col-sm-3">'+
            '<label>D.A+Night allowences: &nbsp;</label>'+
            '<label style="font-weight: bold;">'+rowData.naDa+'</label>'+
            '</div>'+
        '</div>'+
    '</div>';
  }

  submitAdjustment(){
    if(this.adjustSign != undefined && this.adjustSign !=""){ 
      var totalHourConverted= this.adjustTime.hour >0 && this.adjustTime.hour *60;
      var totalTime= totalHourConverted+ this.adjustTime.minute;
      var withSignTime= this.adjustSign == "-" ? this.adjustSign+totalTime : totalTime;
      let url= "bill/adjustInvoice/"+this.invoiceId+"/"+this.totalKm+"/"+withSignTime;
      this.loading=true;
      this.billService.getAdjustBill(url)
      .subscribe(
        response=>{
          this.savebuttonmodel.nativeElement.click();
          this.loginService.successFullMessage("Successfully updated the adjustment...!");
          this.getBillList();
        },error=>{ this.loading=false; this.loginService.errorMessage("Something went worng..., Please try again...!")}
      )
    }else{
      this.loginService.errorMessage("Please check the values");
    }
  }
}
