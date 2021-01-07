import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbCalendar, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge, forkJoin} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
declare var $;
import * as moment from 'moment';
import { MasterDataService } from 'src/app/service/master-data.service';
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
  @ViewChild('foruseinstance', {static: true}) foruseinstance: NgbTypeahead;
  forusefocus$ = new Subject<string>();
  foruseclick$ = new Subject<string>();

  // declare the from group
  tirpForm: FormGroup;

  // requiredVirable
  loading;
  loadingLocations;
  noResults;
  minDate;
  companyNameArray;
  companyList;
  companyId;
  carTypeArray;
  carTypeList;
  carBrandArray;
  carBrandList;
  driverList;
  driverArray;
  bookingArray;
  bookingList;
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
    let bookingSerach= this.masterData.getBookingSerach('');
    this.loading=true;
    $(document).ready(function(){
      $('#timepicker').mdtimepicker({format: 'hh:mm'}); //Initializes the time picker and uses the specified format (i.e. 23:30)
      $('#timepicker1').mdtimepicker({format: 'hh:mm'}); //Initializes the time picker and uses the specified format (i.e. 23:30)
    });
    forkJoin([
      companySerach,
      carSegmentType,
      carBrandSerach,
      driverSerach,
      bookingSerach
    ]).subscribe(
      response=>{
        this.companyNameArray= response[0].length>0 ? response[0].map(item=> item.companyName) :[] ;
        this.companyList=response[0];
        this.carTypeArray=response[1].length>0 ? response[1].map(item=> item.name) :[] ;
        this.carTypeList=response[1];
        this.carBrandArray=response[2].length>0 ? response[2].map(item=> item.name) :[] ;
        this.carBrandList=response[2];
        this.driverArray=response[3].length>0 ? response[3].map(item=> item.firstName) :[] ;
        this.driverList=response[3];
        this.bookingArray=response[4].length>0 ? response[4].map(item=> item.name) :[] ;
        this.bookingList=response[4];
        this.loading=false;
      }
    )
    this.tirpForm= this.formBuilder.group({
      'costCenter': new FormControl(),
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
      'sysCarCategoryDto': new FormControl(),
      'sysBookingRequestTypeDto': new FormControl(),
      'companyDetailDto': this.formBuilder.group({
        'companyName': new FormControl(),
        'gstnumber': new FormControl(),
      }),
      'travelId': new FormControl(),
      "traveldeskEmailId":new FormControl(),
      'traveldeskname': new FormControl(),
      'travelerDetailDto': this.formBuilder.group({
        'employeeId': new FormControl(),
        'firstName': new FormControl(),
        'lastName': new FormControl(),
        'mobileNumber': new FormControl()
      }),
     
    })
    this.tirpForm.get("companyDetailDto.companyName").valueChanges.subscribe(data=>{
      let companyData= this.companyList.length >0 && this.companyList.filter(item=> item.companyName=== data);
      this.tirpForm.get("companyDetailDto.gstnumber").setValue(companyData.length >0 ? companyData[0].gstnumber :"");
      this.companyId=companyData.length >0 ? companyData[0].id :"";
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

  forUseSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.foruseclick$.pipe(filter(() => !this.foruseinstance.isPopupOpen()));
    const inputFocus$ = this.forusefocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.bookingArray
        : this.bookingArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
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
    let tripPickUpDate=this.tirpForm.value.pickUpDate && this.tirpForm.value.pickUpDate.month+"/"+this.tirpForm.value.pickUpDate.day+"/"+this.tirpForm.value.pickUpDate.year;
    let tripDropDate=this.tirpForm.value.dropDate && this.tirpForm.value.dropDate.month+"/"+this.tirpForm.value.dropDate.day+"/"+this.tirpForm.value.dropDate.year
    let carSegmentDto = this.carTypeList.length >0 ? this.carTypeList.filter(item=> item.name === this.tirpForm.value.sysBookingRequestTypeDto): []
    let carBrandDto = this.carBrandList.length >0 ? this.carBrandList.filter(item=> item.name === this.tirpForm.value.sysCarCategoryDto): []
    let requestTypeDto= this.bookingList.length >0 ? this.bookingList.filter(item=> item.name === this.tirpForm.value.carUse) :[]
    let driverData= this.driverList.length >0 ? this.driverList.filter(item=> item.firstName === this.tirpForm.value.driverAccountId): []
    let modifyPickUpDate=Number(moment(tripPickUpDate).format('x'));
    let modifyDropDate= Number(moment(tripDropDate).format('x'));
    let modifyPickupTime= this.tirpForm.value.pickUpTime && Number(moment(this.tirpForm.value.pickUpTime).format('x'));
    let modifyDropTime= this.tirpForm.value.dropTime && Number(moment(this.tirpForm.value.dropTime).format('x'));
    var formData= {
      ...this.tirpForm.value, 
      "companyDetailDto": { "id": this.companyId },
      "dropTime":modifyDropTime,
      "pickUpTime":modifyPickupTime,
      "dropDate": modifyDropDate,
      "pickUpDate":modifyPickUpDate,
      "driverAccountId":driverData.length>0 && driverData[0].accountId,
      "sysCarCategoryDto": carSegmentDto.length > 0 && { "id": carSegmentDto[0].id},
      "sysCarMasterDto":carBrandDto.length>0 && { "id": carBrandDto[0].id},
      "sysBookingRequestTypeDto": requestTypeDto.length > 0 && { "id": requestTypeDto[0].id},
      "tripStatus": "0"
    };
    this.loading=true;
    this.tripService.saveTrip(formData)
    .subscribe(
      response=>{ 
        this.loginService.successFullMessage("Trip Booked Successfully ..!");
        setTimeout(()=>{
          this.router.navigateByUrl("/managetrip");
          this.loading=false;
        },500)
      },
      error=> { 
        this.loginService.errorMessage("Something went worng..., Please try again....!");
        this.loading=false;
    });
  }
}
