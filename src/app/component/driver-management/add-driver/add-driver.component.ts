import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable, Subject,merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { LoginService } from 'src/app/service/login.service';
import { MasterDataService } from 'src/app/service/master-data.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  // declare the child compoent
  @ViewChild('carcategoryinstance', {static: true}) carcategoryinstance: NgbTypeahead;
  carcategoryfocus$ = new Subject<string>();
  carcategoryclick$ = new Subject<string>();
  @ViewChild('carbrandinstance', {static: true}) carbrandinstance: NgbTypeahead;
  carbrandfocus$ = new Subject<string>();
  carbrandclick$ = new Subject<string>();
  @ViewChild('carmodelinstance', {static: true}) carmodelinstance: NgbTypeahead;
  carmodelfocus$ = new Subject<string>();
  carmodelclick$ = new Subject<string>();

  // required variables
  loading;
  driverManagementForm: FormGroup;
  carCategoryArray;
  carCategoryList;
  carBrandArray;
  carBrandList;
  carModelArray;
  carModelList;

  constructor(
    private formBuilder: FormBuilder,
    private loginService:LoginService,
    private masterData: MasterDataService
  ) {  this.loading=false; }

  ngOnInit(): void {
    let carCategoerySerach= this.masterData.getCarCategorySerach('');
    let carBrandSerach= this.masterData.getCarBrandSerach('');
    this.loading=true;
    forkJoin([
      carCategoerySerach,
      carBrandSerach
    ])
    .subscribe(
      response=>{
        this.carCategoryArray= response[0].length>0 ? response[0].map(item=> item.name) :[] ;
        this.carCategoryList=response[0];
        this.carBrandArray=response[1].length>0 ? response[1].map(item=> item.name) :[] ;
        this.carBrandList=response[1];
        this.loading=false;
      }
    )

    this.driverManagementForm= this.formBuilder.group({
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'mobileNumber': new FormControl(),
      'secMobileNumber': new FormControl(),
      'emailId': new FormControl(),
      'carDetailDto': this.formBuilder.group({
        'carCategory': new FormControl(),
        'type': new FormControl({value: '', disabled: true}),
        'subType': new FormControl(),
      })
    })
  this.driverManagementForm.get("carDetailDto.carCategory").valueChanges.subscribe(data=>{
      let carBrandData= this.carBrandList.length >0 && this.carBrandList.filter(item=> item.name=== data);
      if(carBrandData.length>0){
        this.loading=true;
        this.masterData.getCarSubTypeBrandSerach(carBrandData[0].id)
        .subscribe(
          response=>{
            this.carModelArray= response.length>0 ? response.map(item=> item.name) :[] ;
            this.carModelList=response;
            this.driverManagementForm.get("carDetailDto.type").enable();
            this.loading=false;
          },error=>{ this.loading=false; console.error("Error ",error);
          }
        )
      }
    })
  }

  carCategorySearchMethod = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.carcategoryclick$.pipe(filter(() => !this.carcategoryinstance.isPopupOpen()));
    const inputFocus$ = this.carcategoryfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carCategoryArray
        : this.carCategoryArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  carBrandSearchMethod = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.carbrandclick$.pipe(filter(() => !this.carbrandinstance.isPopupOpen()));
    const inputFocus$ = this.carbrandfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carBrandArray
        : this.carBrandArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  carModelSearchMethod = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.carmodelclick$.pipe(filter(() => !this.carmodelinstance.isPopupOpen()));
    const inputFocus$ = this.carmodelfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carModelArray
        : this.carModelArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }



  driverRegistration(){
    console.log("Data ", this.driverManagementForm)
  }

}
