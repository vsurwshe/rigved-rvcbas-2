import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ExpenditureService } from 'src/app/service/expenditure.service';
import { FileService } from 'src/app/service/file.service';
import { LoginService } from 'src/app/service/login.service';
import { MasterDataService } from 'src/app/service/master-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-maintance-bill',
  templateUrl: './add-maintance-bill.component.html',
  styleUrls: ['./add-maintance-bill.component.scss']
})
export class AddMaintanceBillComponent implements OnInit {

  @ViewChild('drivernameinstance', {static: true}) drivernameinstance: NgbTypeahead;
  drivernamefocus$ = new Subject<string>();
  drivernameclick$ = new Subject<string>();

  // required variables
  loading;
  driverList;
  expenseForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private masterData:MasterDataService,
    private expenditureService:ExpenditureService,
    private loginService:LoginService,
    private fileService:FileService
  ) { this.loading=false;}

  formatMatchesByDriverName = (value: any) => value.firstName || '';

  ngOnInit(): void {
    let deriverSearch= this.masterData.getDriverSerach('');
    this.loading=true;
    forkJoin([deriverSearch])
    .subscribe(
      response=>{
        this.loading=false;
        this.driverList=response[0];
      }, error=>{ this.loading=false; console.error("Error ", error);}
    )

    this.expenseForm=this.formBuilder.group({
      'time': new FormControl(),
      'odoMeterReading': new FormControl(),
      'expenceType': new FormControl(""),
      'source':new FormControl("Admin"),
      'status':new FormControl("Approved"),
      'fileUrl': new FormControl(''),
      'driverAccountId': new FormControl(),
      'entryDate': new FormControl(),
      'vehicleNumber': new FormControl(),
      'fule': this.formBuilder.group({
        'perLtRate': new FormControl(),
        'totalLt': new FormControl(),
        'totalAmount': new FormControl(),
        'location': new FormControl() 
      }),
      'others': this.formBuilder.group({
        'description': new FormControl(),
        'totalAmount': new FormControl(),
        'location': new FormControl()
      })
    })
  }

  driverNameSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.drivernameclick$.pipe(filter(() => !this.drivernameinstance.isPopupOpen()));
    const inputFocus$ = this.drivernamefocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.driverList
        : this.driverList.filter(item => item.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  maintenanceReport(){
    this.router.navigateByUrl("/maintenanceReport");
  }

  // this method used for the uploading documents
  async Uploading(event,description, formControlName){
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      var reader = new FileReader();
      var fname = file.name.split(".");
      let contentTypeArray= file.type.split("/");
      let byteArray;
      reader.onload =async()=>{
        byteArray=reader.result.toString().split(",");
        let fileData={
          fileName:fname[0],
          content: byteArray[1],
          contentType: contentTypeArray[1],
          description
        }
        this.loading=true;
        await this.fileService.postFile([fileData])
        .subscribe(
          response=>{
            this.loading=false;
            this.expenseForm.get(formControlName).setValue(response[0]);
            this.loginService.successFullMessage("File is uploaded successfully...!");
          },error=>{ 
            this.loginService.errorMessage("Something went wrong file is not upload, Please try again...!");
            this.loading=false;
          }
        )
      };
      reader.onerror = function (error) { console.log('Error: ', error); };
      reader.readAsDataURL(file);
    }
  }

  saveExpense(){
    if(this.expenseForm.status=="VALID"){
      const { value }=this.expenseForm
      let modifyedPostData={
        'odoMeterReading':this.expenseForm.get("odoMeterReading").value,
        'expenceType':this.expenseForm.get("expenceType").value,
        'source':this.expenseForm.get("source").value,
        'status':this.expenseForm.get("status").value,
        'fileUrl':this.expenseForm.get("fileUrl").value,
        'driverAccountId':this.expenseForm.get("driverAccountId").value.accountId,
        'vehicleNumber': this.expenseForm.get("vehicleNumber").value,
        'entryDate':Number(moment(this.dateConvert(this.expenseForm.get("entryDate").value)).format('x')) 
      }
      if(this.getExpenseType==="Fuel"){
        modifyedPostData={
          ...modifyedPostData,
          ...this.expenseForm.get("fule").value
        }
      }else{
        modifyedPostData={
          ...modifyedPostData,
          ...this.expenseForm.get("others").value
        }
      }
      console.log("DATA ", modifyedPostData)
      this.loading=true;
      this.expenditureService.saveExpense(modifyedPostData)
      .subscribe(
        response=>{
          this.loading=false;
          this.loginService.successFullMessage("Your exepnse bill saved successfull..!");
          this.maintenanceReport();
        },error=>{
          this.loading=false;
          this.loginService.errorMessage("Soemthing went worng...,Please try again..!");
        }
      )
    }
  }

  get getExpenseType(){ return this.expenseForm.get("expenceType").value; }

  get getFileUrl(){ return this.expenseForm.get("fileUrl").value; } 

  // this method will used for the date conversion
  dateConvert(dateValue){
    const { year, month,day}= dateValue
    return year+"-"+month+"-"+day;
  }

}
