import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataTableService } from 'src/app/service/data-table.service';
import { ExpenditureService } from 'src/app/service/expenditure.service';
import { MasterDataService } from 'src/app/service/master-data.service';

@Component({
  selector: 'app-maintance-details',
  templateUrl: './maintance-details.component.html',
  styleUrls: ['./maintance-details.component.scss']
})
export class MaintanceDetailsComponent implements OnInit {

  state$: Observable<object>;

  // required variables
  loading;
  driverAccountId;
  startDate;
  endDate;

  driverDataList;
  driverDetails;

  driverDetailsListTableColumns=[
    {title:'',data:''},
    {title:'Date',data:'entryDate'},
    {title:'Expenses Item',data:'description'},
    {title:'Expense Type',data:'expenceType'},
    {title:'Meter Reading',data:'odoMeterReading'},
    {title:'Amount',data:'totalAmount'},
  ]

  driverDetailsListTableColumnsDef=[
    {
      "targets":   0,
      "className": 'select-checkbox',
      "orderable": false,
      "data":null,
      "defaultContent": ''
    },
    {
      "targets": -1, // specifies the position of button(last but one) in the row
      "render": function ( data, type, row ) {
        if(row.totalAmount && row.totalAmount !== "" && row.totalAmount !== null) {
          return  "₹&nbsp;"+ row.totalAmount; 
        }else{ return "" }
      },
    }
  ]

  constructor(
    private activatedRouter:ActivatedRoute,
    private router:Router,
    private expenditureService: ExpenditureService,
    private masterData: MasterDataService,
    private dataTableService: DataTableService
  ) { this.loading=false;}

  ngOnInit(): void {
    this.state$ = this.activatedRouter.paramMap.pipe(map(()=> window.history.state));
    this.state$.subscribe((data:any)=>{
      const { driverAccountId, modifyStartDate, modifyEndDate }= data
      if(driverAccountId && modifyStartDate && modifyEndDate){
        this.driverAccountId=driverAccountId;
        this.startDate=modifyStartDate;
        this.endDate=modifyEndDate;
        this.loading=true;
        let expenditureDriverSerach=this.expenditureService.getExpenseListByDriver(0,100,this.driverAccountId,this.startDate,this.endDate);
        let driverDetailsSerach= this.masterData.getDriverSerach(this.driverAccountId);
        forkJoin([expenditureDriverSerach,driverDetailsSerach])
        .subscribe(
          response=>{
            this.loading=false;
            this.driverDataList=response[0];
            this.driverDetails=response[1].length>=0 && response[1][0];
            this.dataTableService.dataTable("#driverDetailsTabel",this.driverDetailsListTableColumns,this.driverDataList,this.driverDetailsListTableColumnsDef);
          },error=>{ this.loading=false; console.error("Error ",error);})
      }
    })
  }

  backToNavigate(){
    this.router.navigateByUrl("/maintenanceReport");
  }

}
