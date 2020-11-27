import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BillService } from 'src/app/service/bill.service';
import { DataTableService } from 'src/app/service/data-table.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-travell-billing',
  templateUrl: './travell-billing.component.html',
  styleUrls: ['./travell-billing.component.scss']
})
export class TravellBillingComponent implements OnInit {

  state$: Observable<object>;

  // required variables
  loading;
  travellingBillList;

  travellBillingTabelColumns=[
    {title:'',data:'', orderable: false},
    {title:'',data:'', orderable: false},
    {title:'Company Name',data:'nameOfCompany'},
    {title:'GST',data:'gstNo'},
    // {title:'Cost center',data:'costCentre'},
    // {title:'Emp.No',data:'empNo'},
    // {title:'Emp.Name',data:'empName'},
    {title:'Travel Id',data:'travelId'},
    {title:'From Date',data:'fromDate'},
    {title:'To Date',data:'toDate'},
    // {title:'Type of Duty',data:'typeOfDuty'},
    // {title:'Vehicle Segment',data:'vehicleSeg'},
    // {title:'Vehicle Model',data:'vehicleType'},
    // {title:'Vehicle Number',data:'carNo'},
    // {title:'Per Kms Rate',data:'perKmRate'},
    {title:'Total Kms',data:'totalKm'},
    // {title:'Per hrs Rate',data:'perHrRate'},
    {title:'Total Hrs',data:'totalHr'},
    {title:'Total Amount',data:'totalHrAmt'},
    // {title:'Toll-park',data:'tolllPark'},
    // {title:'D.A+Night allowences',data:'naDa'},
    {title:'Grand Total',data:'totalTripBill'},
    {title:'Actions',data:'',orderable: false},
  ]

  travellBillingTabelColumnsDef= [
    {
      'targets': 0,
      'searchable': false,
      'orderable': false,
      'className': 'dt-body-center',
      'render': function (data, type, full, meta){
          return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
      }
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
          $(td).click(e => { console.log("Data ",rowData)})
      },
      "defaultContent": "<button class='btn btn-default btn-round' data-toggle='modal' data-target='#exampleModal'>Adjument</button>"
    }
  ]

  constructor(
    private loginService:LoginService,
    private billService: BillService,
    private dataTabelService: DataTableService,
    private activatedRoute:ActivatedRoute
  ) { this.loading=false;}

  ngOnInit(): void {
    this.loading=true;
    this.state$ = this.activatedRoute.paramMap.pipe(map(()=> window.history.state));
    this.state$.subscribe((data:any)=>{
      const { billList }= data ? data : ""
      if(billList != ""){
        this.loading=false;
        this.travellingBillList=billList
      }else{
        this.billService.getBillList(0,100,{})
        .subscribe(
          response=>{
            this.travellingBillList=response;
            var tabel = this.dataTabelService.dataTable("#travellBillingTabel", this.travellBillingTabelColumns, this.travellingBillList, this.travellBillingTabelColumnsDef);
            this.loading=false;
            this.listenClickEventListenerOnTabel("#travellBillingTabel",tabel);
          },error=>{ this.loading=false; console.error("Error ",error);}
        )
      }
    })
    // Add event listener for opening and closing details
    

      
  }

  ngAfterViewInit(): void {
    var tabel= this.dataTabelService.dataTable("#travellBillingTabel", this.travellBillingTabelColumns, this.travellingBillList, this.travellBillingTabelColumnsDef);
    this.listenClickEventListenerOnTabel("#travellBillingTabel",tabel);
  }

  listenClickEventListenerOnTabel(tabelId,table){
    var localThis=this;
    $(document).ready(function() {
      $(tabelId).on('click', 'td.details-control', function () {
        console.log("tabel",table)
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
           '<label>Cost Center: &nbsp;</label>'+
           '<label style="font-weight: bold;">'+rowData.costCentre+'</label>'+
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

}
