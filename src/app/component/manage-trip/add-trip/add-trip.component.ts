import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCalendar, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge, forkJoin} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { MasterDataService } from 'src/app/service/master-data.service';
declare var $;
@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {

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

  loading;
  loadingLocations;
  noResults;
  // requiredVirable
  gstNum;
  costCen;
  minDate;
  companyNameArray;
  carTypeArray;
  carBrandArray;
  driverListArray;
  assignDriver;
  showDriverList;
  constructor(
    private masterData:MasterDataService,
    private calender: NgbCalendar
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
        this.carBrandArray=response[2].length>0 ? response[2].map(item=> item.name) :[] ;
        this.driverListArray=response[3].length>0 ? response[3].map(item=> item.firstName) :[] ;
        console.log("Res",response, this.driverListArray)
        this.loading=false;
      }
    )
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
      map(term => (term === '' ? this.driverListArray
        : this.driverListArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
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
  tripBooking(){
    console.log("Called Trip Bookeds",);
  }

}
