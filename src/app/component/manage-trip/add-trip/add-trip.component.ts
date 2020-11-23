import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NgbCalendar, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge, forkJoin} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { MasterDataService } from 'src/app/service/master-data.service';
declare var $;
import * as moment from 'moment'
import { ManageTripService } from 'src/app/service/manage-trip.service';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  // declare the child compoent
  @ViewChild('carsegmentinstance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @ViewChild('carnameinstance', {static: true}) carnameinstance: NgbTypeahead;
  carnamefocus$ = new Subject<string>();
  carnameclick$ = new Subject<string>();
  @ViewChild('companyinstance', {static: true}) companyinstance: NgbTypeahead;
  companyfocus$ = new Subject<string>();
  companyclick$ = new Subject<string>();
  @ViewChild('driverinstance', {static: true}) driverinstance: NgbTypeahead;
  drivernamefocus$ = new Subject<string>();
  drivernameclick$ = new Subject<string>();

  // declare the from group
  tirpForm: FormGroup;

  // requiredVirable
  loading;
  loadingLocations;
  noResults;
  minDate;
  companyNameArray;
  carTypeArray;
  carTypeList;
  carBrandArray;
  carBrandList;
  driverList;
  driverArray;
  assignDriver;
  showDriverList;
  pickUpTime;

  constructor(
    private masterData:MasterDataService,
    private calender: NgbCalendar,
    private formBuilder: FormBuilder,
    private tripService:ManageTripService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loading=false;
    this.loadingLocations=false;
    this.noResults=false;
    this.minDate=calender.getToday();
    this.assignDriver=false;
    this.showDriverList=false;
  }

  ngOnInit(): void {
    let carSegmentType= this.masterData.getCarCategorySerach('');
    let carBrandSerach= this.masterData.getCarBrandSerach('');
    let companySerach = this.masterData.getCompanyDetails('');
    let driverSerach= this.masterData.getDriverSerach('');
    this.loading=true;
    $(document).ready(function(){
      $('#timepicker').mdtimepicker({format: 'hh:mm'}); //Initializes the time picker and uses the specified format (i.e. 23:30)
      $('#timepicker1').mdtimepicker({format: 'hh:mm'}); //Initializes the time picker and uses the specified format (i.e. 23:30)
    });
    forkJoin([
      companySerach,
      carSegmentType,
      carBrandSerach,
      driverSerach
    ]).subscribe(
      response=>{
        this.companyNameArray= response[0].length>0 ? response[0].map(item=> item.companyName) :[] ;
        this.carTypeArray=response[1].length>0 ? response[1].map(item=> item.name) :[] ;
        this.carTypeList=response[1];
        this.carBrandArray=response[2].length>0 ? response[2].map(item=> item.name) :[] ;
        this.carBrandList=response[2];
        this.driverArray=response[3].length>0 ? response[3].map(item=> item.firstName) :[] ;
        this.driverList=response[3];
        this.loading=false;
      }
    )
    this.tirpForm= this.formBuilder.group({
      'costCenter': new FormControl(),
      'travelId': new FormControl(),
      'carHire': new FormControl(),
      'carUse': new FormControl(),
      'driverAccountId': new FormControl(),
      'dropDate': new FormControl(),
      'dropTime': new FormControl(),
      'instruction': new FormControl(),
      'pickUpAddress': new FormControl(),
      'pickUpCity': new FormControl(),
      'pickUpDate': new FormControl(),
      'pickUpLocation': new FormControl(),
      'pickUpTime': new FormControl(),
      'releaseAddress': new FormControl(),
      'releaseLocation': new FormControl(),
      'companyDetailDto': this.formBuilder.group({
        'companyName': new FormControl(),
        'gstnumber': new FormControl(),
        'traveldeskname': new FormControl(),
        'emailId':new FormControl()
      }),
      'travelerDetailDto': this.formBuilder.group({
        'employeeId': new FormControl(),
        'firstName': new FormControl(),
        'lastName': new FormControl(),
        'mobileNumber': new FormControl()
      }),
      'sysCarCategoryDto': new FormControl(),
      'sysBookingRequestTypeDto': new FormControl()
    })
  
  }

  companySearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.companyclick$.pipe(filter(() => !this.companyinstance.isPopupOpen()));
    const inputFocus$ = this.companyfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.companyNameArray
        : this.companyNameArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  carSegmentSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carTypeArray
        : this.carTypeArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  carBrandSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.carnameclick$.pipe(filter(() => !this.carnameinstance.isPopupOpen()));
    const inputFocus$ = this.carnamefocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carBrandArray
        : this.carBrandArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  driverSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.drivernameclick$.pipe(filter(() => !this.driverinstance.isPopupOpen()));
    const inputFocus$ = this.drivernamefocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.driverArray
        : this.driverArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  
  toggle(){
    if(this.assignDriver){
      this.showDriverList=false;
    }else{
      this.showDriverList=true;
    }
  }
  // Trip Booking
  async tripBooking(){
    let carSegmentDto = this.carTypeList.length >0 ? this.carTypeList.filter(item=> item.name === this.tirpForm.value.sysBookingRequestTypeDto): []
    let carBrandDto = this.carBrandList.length >0 ? this.carBrandList.filter(item=> item.name === this.tirpForm.value.sysCarCategoryDto): []
    let driverData= this.driverList.length >0 ? this.driverList.filter(item=> item.firstName === this.tirpForm.value.driverAccountId): []
    let modifyPickUpDate=this.tirpForm.value.pickUpDate && moment(this.tirpForm.value.pickUpDate).format('x');
    let modifyDropDate=this.tirpForm.value.dropDate && moment(this.tirpForm.value.dropDate).format('x')
    let modifyPickupTime= this.tirpForm.value.pickUpTime && moment(this.tirpForm.value.pickUpTime).format('x');
    let modifyDropTime= this.tirpForm.value.dropTime && moment(this.tirpForm.value.dropTime).format('x');
    var formData= {
      ...this.tirpForm.value, 
      "dropTime":modifyDropTime,
      "pickUpTime":modifyPickupTime,
      "dropDate": modifyDropDate,
      "pickUpDate":modifyPickUpDate,
      "driverAccountId":driverData.length>0 && driverData[0].accountId,
      "sysBookingRequestTypeDto": carSegmentDto,
      "sysCarCategoryDto":carBrandDto,
      "tripStatus": 0
    };
    console.log("From Data", formData)
    this.loading=true;
    this.tripService.saveTrip(formData)
    .subscribe(
      response=>{ 
        console.log("Data ", response)
        this.loginService.successFullMessage("Your Trip Registerd Successfully...!");
        setTimeout(()=>{
          this.router.navigateByUrl("/managetrip");
          this.loading=false;
        },500)
      },
      error=> { 
        console.error("Error ",error)
        this.loginService.errorMessage("Something went worng..., Please try again....!");
        this.loading=false;
      });
  }

}
