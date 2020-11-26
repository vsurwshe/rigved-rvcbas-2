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
    {title:'Company Name',data:'nameOfCompany'},
    {title:'GST',data:'gstNo'},
    {title:'Cost center',data:'costCentre'},
    {title:'Emp.No',data:'empNo'},
    {title:'Emp.Name',data:'empName'},
    {title:'Travel Id',data:'travelId'},
    {title:'From Date',data:'fromDate'},
    {title:'To Date',data:'toDate'},
    {title:'Type of Duty',data:'typeOfDuty'},
    {title:'Vehicle Segment',data:'vehicleSeg'},
    {title:'Vehicle Model',data:'vehicleType'},
    {title:'Vehicle Number',data:'carNo'},
    {title:'Per Kms Rate',data:'perKmRate'},
    {title:'Total Kms',data:'totalKm'},
    {title:'Per hrs Rate',data:'perHrRate'},
    {title:'Total Hrs',data:'totalHr'},
    {title:'Total Amount',data:'totalHrAmt'},
    {title:'Toll-park',data:'tolllPark'},
    {title:'D.A+Night allowences',data:'naDa'},
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
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
          $(td).click(e => { console.log("Data ",rowData)})
      },
      "defaultContent": "<button class='btn btn-default btn-round' data-toggle='modal' data-target='#exampleModal'>View</button>"
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
            this.dataTabelService.dataTable("#travellBillingTabel", this.travellBillingTabelColumns, this.travellingBillList, this.travellBillingTabelColumnsDef);
            this.loading=false;
          },error=>{ this.loading=false; console.error("Error ",error);}
        )
      }
    })
    
  }

  ngAfterViewInit(): void {
    this.dataTabelService.dataTable("#travellBillingTabel", this.travellBillingTabelColumns, this.travellingBillList, this.travellBillingTabelColumnsDef);
  }

}
