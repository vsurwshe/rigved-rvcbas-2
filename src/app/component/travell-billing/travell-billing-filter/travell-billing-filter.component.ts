import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { BillService } from 'src/app/service/bill.service';
import { MasterDataService } from 'src/app/service/master-data.service';
declare var $;
@Component({
  selector: 'app-travell-billing-filter',
  templateUrl: './travell-billing-filter.component.html',
  styleUrls: ['./travell-billing-filter.component.scss']
})
export class TravellBillingFilterComponent implements OnInit {

  @ViewChild('companyinstance', {static: true}) companyinstance: NgbTypeahead;
  companyfocus$ = new Subject<string>();
  companyclick$ = new Subject<string>();

  @ViewChild('gstinstance', {static: true}) gstinstance: NgbTypeahead;
  gstfocus$ = new Subject<string>();
  gstclick$ = new Subject<string>();

  @ViewChild('costcenterinstance', {static: true}) costcenterinstance: NgbTypeahead;
  costcenterfocus$ = new Subject<string>();
  costcenterclick$ = new Subject<string>();

  @ViewChild('employeeidinstance', {static: true}) employeeidinstance: NgbTypeahead;
  employeeidfocus$ = new Subject<string>();
  employeeidclick$ = new Subject<string>();

  @ViewChild('travelidinstance', {static: true}) travelidinstance: NgbTypeahead;
  travelidfocus$ = new Subject<string>();
  travelidclick$ = new Subject<string>();

  @ViewChild('typeofdutyinstance', {static: true}) typeofdutyinstance: NgbTypeahead;
  typeofdutyfocus$ = new Subject<string>();
  typeofdutyclick$ = new Subject<string>();

  @ViewChild('vahicalsegmentinstance', {static: true}) vahicalsegmentinstance: NgbTypeahead;
  vahicalsegmentfocus$ = new Subject<string>();
  vahicalsegmentclick$ = new Subject<string>();

  @ViewChild('vahicalmodelinstance', {static: true}) vahicalmodelinstance: NgbTypeahead;
  vahicalmodelfocus$ = new Subject<string>();
  vahicalmodelclick$ = new Subject<string>();

  //required variables
  loading;
  profileData;

  companyList;
  companyArray;
  gstArray;
  costCenterList;
  costCenterArray;
  employeeIdList;
  employeeIdArray;
  travelIdList;
  tarvelIdArray;
  bookingIdList;
  bookingArray;
  carCategoryList;
  carCategoryArray;
  carBrandList;
  carBrandArray;

  filterForm: FormGroup;
  constructor(
    private billService:BillService, 
    private masterData:MasterDataService,
    private formBuilder:FormBuilder,
    private router:Router
  ) {
    this.loading=false;
    this.profileData={}
  }

  ngOnInit(): void {
    // for accordion
    $('.d-accordion').on('show.bs.collapse', function (n) {
      $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-chevron-up fa-chevron-down ');
    });
    $('.d-accordion').on('hide.bs.collapse', function (n) {
      $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-chevron-down fa-chevron-up ');
    });
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

    let companySerach=this.masterData.getCompanyDetails('');
    let costCenterSerach= this.masterData.getCostCenterSerach('');
    let empolyeeIdSerach= this.masterData.getCostEmpolyeeById('');
    let tarvelIdSerach= this.masterData.getTravelDataById('');
    let bookinSerach= this.masterData.getBookingSerach('');
    let carCategorySerach= this.masterData.getCarCategorySerach('');
    let carBrandSerach= this.masterData.getCarBrandSerach('');

    this.loading=true;
    forkJoin([
      companySerach,
      costCenterSerach,
      empolyeeIdSerach,
      tarvelIdSerach,
      bookinSerach,
      carCategorySerach,
      carBrandSerach
    ])
    .subscribe(
      response=>{
        this.companyArray= response[0].length>0 ? response[0].map(item=> item.companyName) :[] ;
        this.gstArray= response[0].length>0 ? response[0].map(item=> item.gstnumber) :[] ;
        this.companyList=response[0];
        this.costCenterList=response[1];
        this.costCenterArray=response[1].length>0 ? response[1].map(item=> item.name) :[] ;
        this.employeeIdList=response[2];
        this.employeeIdArray=response[2].length>0 ? response[2].map(item=> item.name) :[] ;
        this.travelIdList=response[3];
        this.tarvelIdArray=response[3].length>0 ? response[3].map(item=> item.name) :[] ;
        this.bookingIdList=response[4];
        this.bookingArray=response[4].length>0 ? response[4].map(item=> item.name) :[] ;
        this.carCategoryList=response[5];
        this.carCategoryArray=response[5].length>0 ? response[5].map(item=> item.name) :[] ;
        this.carBrandList=response[6];
        this.carBrandArray=response[6].length>0 ? response[6].map(item=> item.name) :[] ;
        this.loading=false;
      },error=>{ this.loading=false; console.error(error);
      }
    )

    this.filterForm=this.formBuilder.group({
      'startDate': new FormControl(),
      'endDate': new FormControl(),
      'companyNames': new FormControl(),
      'gstNumber': new FormControl(),
      'costCenter': new FormControl(),
      'employeeId': new FormControl(),
      'tarvelId': new FormControl(),
      'typeOfDuty': new FormControl(),
      'vahicalSegment': new FormControl(),
      'vahicalModel': new FormControl()
    })
  }

  companySearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.companyclick$.pipe(filter(() => !this.companyinstance.isPopupOpen()));
    const inputFocus$ = this.companyfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.companyArray
        : this.companyArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  gstNumberSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.gstclick$.pipe(filter(() => !this.gstinstance.isPopupOpen()));
    const inputFocus$ = this.gstfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.gstArray
        : this.gstArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  costCenterSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.costcenterclick$.pipe(filter(() => !this.costcenterinstance.isPopupOpen()));
    const inputFocus$ = this.costcenterfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.costCenterArray
        : this.costCenterArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  employeeIdSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.employeeidclick$.pipe(filter(() => !this.employeeidinstance.isPopupOpen()));
    const inputFocus$ = this.employeeidfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.employeeIdArray
        : this.employeeIdArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  travelIdSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.travelidclick$.pipe(filter(() => !this.travelidinstance.isPopupOpen()));
    const inputFocus$ = this.travelidfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.tarvelIdArray
        : this.tarvelIdArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  typeOfDutySearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.typeofdutyclick$.pipe(filter(() => !this.typeofdutyinstance.isPopupOpen()));
    const inputFocus$ = this.typeofdutyfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.bookingArray
        : this.bookingArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  vahicalSegmentSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.vahicalsegmentclick$.pipe(filter(() => !this.vahicalsegmentinstance.isPopupOpen()));
    const inputFocus$ = this.vahicalsegmentfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carCategoryArray
        : this.carCategoryArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  vahicalModelSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.vahicalmodelclick$.pipe(filter(() => !this.vahicalmodelinstance.isPopupOpen()));
    const inputFocus$ = this.vahicalmodelfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carBrandArray
        : this.carBrandArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  openProfile(evt, cityName) {
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

  filtersApply(){
    if(this.filterForm.status == "VALID"){
      const {  startDate, endDate, companyNames, gstNumber, costCenter, employeeId, tarvelId, typeOfDuty, vahicalSegment, vahicalModel}=this.filterForm.value
      let modifyStartDate=startDate && startDate.year+"-"+startDate.month+"-"+startDate.day;
      let modifyEndDate= endDate && endDate.year+"-"+endDate.month+"-"+endDate.day;
      let bodyData={
        "companyNames":companyNames ? [companyNames]: [],
        "gstNum":gstNumber ? [gstNumber]:[],
        'startDate': modifyStartDate,
        'endDate':modifyEndDate,
        "costCenter":costCenter ?[costCenter]:[],
        "employeeIds": employeeId ? [employeeId]:[],
        "travelIds": tarvelId ?[tarvelId]:[],
        "dutyTypes":typeOfDuty ? [typeOfDuty]: [],
        "vechicleSeg":vahicalSegment ? [vahicalSegment]:[],
        "vechicleType":vahicalModel ? [vahicalModel]:[]
      }
      this.loading=true;
      this.billService.getBillList(0,100,bodyData)
      .subscribe(
        response=>{
          this.loading=false;
          this.router.navigateByUrl("/travelBilling",{state:{'billList':response}})
        },error=>{
          this.loading=false;
          console.error("Error ",error);
        }
      )      
    }
  }

}
