import { Location } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/service/booking.service';
import { ManageTripService } from 'src/app/service/manage-trip.service';
declare var $;

@Component({
  selector: 'app-manage-trip',
  templateUrl: './manage-trip.component.html',
  styleUrls: ['./manage-trip.component.scss']
})
export class ManageTripComponent implements OnInit {
  loading;
  upcomeingRidesList;
  pastRides;
  ridesDetails;
  view;
  feedback;
  accept;
  online;
  feedbackModel;
  feedbackMessage;
  starReatings: number;

  upComeingTabelColumns=[
    {title:'Traveller Name',data:'travellerName'},
    {title:'Mobile Number',data:'travellerMobile'},
    {title:'Pickup-Time',data:'pickUpDate'},
    {title:'Pickup-Location',data:'pickUpLocation'},
    {title:'Status',data:'changedStatus'},
    {title:'',data:'',orderable: false},
    {title:'',data:'',orderable: false},
    {title:'',data:'changedStatus',orderable: false},
  ]
  upComeingTabelColumnsDef= [
    {
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "render": function ( data, type, row ) {
        if(row.status !== 0 && row.status !== 1 && row.status !== 3) {
          return "<button class='btn btn-primary btn-round' disabled>Reassign</button>"
        }else{
          return "<button class=' btn btn-primary btn-round' data-toggle='modal' data-target='#exampleModal1'>Reassign</button>"
        }
      },
      "createdCell": (td, cellData, rowData, row, col) => {
        $(td).click(e => { this.getBookingDetailsById(rowData,2); })
      }
    },
    {
      "targets": -2, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
          $(td).click(e => { this.getBookingDetailsById(rowData,2); })
      },
      "defaultContent": "<button class='btn btn-success btn-round' data-toggle='modal' data-target='#exampleModal'>Accept</button>"
    },
    {
      "targets": -3, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
          $(td).click(e => { this.getBookingDetailsById(rowData,2); })
      },
      "defaultContent": "<button class='btn btn-default btn-round' data-toggle='modal' data-target='#exampleModal'>View</button>"
    }
  ]

  pastRidesTabelColumns=[
    {title:'Traveller Name',data:'travellerName'},
    {title:'Mobile Number',data:'travellerMobile'},
    {title:'Pickup-Time',data:'pickUpDate'},
    {title:'Pickup-Location',data:'pickUpLocation'},
    {title:'Status',data:'changedStatus'},
    {title:'',data:'',orderable: false},
  ]

  pastRidesTabelColumnsDef=[
    {
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
        $(td).click(e => { this.getBookingDetailsById(rowData,1); })
      },
      "defaultContent": "<button class='btn btn-default btn-round' ng-click='getDetails(item,2)' data-toggle='modal' data-target='#exampleModal'>View</button>"
    }
  ]

  constructor(
    private mangeTripService:ManageTripService,
    private router:Router,
    private bookingService:BookingService
  ) 
  { 
    this.loading=false;
    this.view=false;
    this.feedback=false;
    this.accept=false;
    this.online=false;
    this.feedbackModel=false;
  }

  ngOnInit(): void {
    document.getElementById("defaultOpen").click();
    this.getManageTrip();
    this.getFinishedTrips();
  }

  ngAfterViewInit(): void {
    this.loadTable("#upComeingDataTable", this.upComeingTabelColumns, this.upcomeingRidesList, this.upComeingTabelColumnsDef); 
    this.loadTable("#pastRidesDataTable", this.pastRidesTabelColumns, this.pastRides, this.pastRidesTabelColumnsDef);
  }

  getManageTrip(){
    this.loading=true;
    this.mangeTripService.loadTrips(0,10)
    .subscribe(
      response=>{ 
        var tempData= (response.length >0 ) && response.map((item)=>{ 
          switch (item.status) {
            case 0:
              return {...item, changedStatus:"Driver Not Available"}
            case 1:
              return {...item, changedStatus:"Ride Expired"}
            case 2:
              return {...item, changedStatus:"Ride Assigned"}
            case 3:
              return {...item, changedStatus:"Ride Accepted"}
            case 4:
              return {...item, changedStatus:"Ride Started"}
            case 5:
              return {...item, changedStatus:"Ride Completed"}
            case 6:
              return {...item, changedStatus:"Declined"}
            case 7:
              return {...item, changedStatus:"Expired"}
            default:
              return {...item,changedStatus:""}
          }
        })
        this.upcomeingRidesList=tempData;
        this.loading=false;
        this.loadTable("#upComeingDataTable", this.upComeingTabelColumns, this.upcomeingRidesList, this.upComeingTabelColumnsDef);
      },
      error=>{ this.loading=false; console.log("error ",error)}
    )
  }

  getFinishedTrips(){
    this.loading=true;
    this.mangeTripService.getFinishedTrip(0,10)
    .subscribe(
      response=>{ 
        var tempData= (response.length >0 ) && response.map((item)=>{ 
          switch (item.status) {
            case 0:
              return {...item, changedStatus:"Driver Not Available"}
            case 1:
              return {...item, changedStatus:"Ride Expired"}
            case 2:
              return {...item, changedStatus:"Ride Assigned"}
            case 3:
              return {...item, changedStatus:"Ride Accepted"}
            case 4:
              return {...item, changedStatus:"Ride Started"}
            case 5:
              return {...item, changedStatus:"Ride Completed"}
            case 6:
              return {...item, changedStatus:"Declined"}
            case 7:
              return {...item, changedStatus:"Expired"}
            case 8:
                return {...item, changedStatus:"Ride Billed"}
            default:
              return {...item,changedStatus:""}
          }
        })
        this.pastRides=tempData;
        this.loading=false;
        this.loadTable("#pastRidesDataTable", this.pastRidesTabelColumns, this.pastRides, this.pastRidesTabelColumnsDef);
      },
      error=>{ this.loading=false; console.log("error ",error)}
    )
  }

  loadTable(tableId,colunm, data, colunmDefs){
    if ($.fn.DataTable.isDataTable($(tableId))) {
      //This line clears the previous datatable for every show entries and pagination changes
     $(tableId).DataTable().clear().destroy();
    }
    $(tableId).DataTable({
      retrieve: true,
      data: data, // This is the billData provided to show in data Table
      columns:colunm , // This is list of column names provided to display in data Table
      "deferRender": true,
      /* 2nd sub-array defines the values to be displayed in select(entries) to the user
      1st sub-array defines the no.of records to show as per user selection based on 2nd sub-array values */
      "lengthMenu": [[3, 5, 10, 50, -1], [3, 5, 10, 50, "All"]],
      "pageLength": 3, // This is the no of default rows/entries shown in datatable
      "pagingType": "full_numbers", // This shows pagination list
      // These are pagination style settings of datatable
      "oLanguage": {
          "oPaginate": {
              "sPrevious": "<<  Previous",
              "sNext": "Next >>",
              "sFirst": "First",
              "sLast": "Last"
          }
      },
      columnDefs:colunmDefs
    })
  }

  openTab(evt, cityName):void {
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

  goToAddTrip(){
      this.router.navigateByUrl("/addtrip");
  }

  getBookingDetailsById(data,boolean){
    if (boolean == 1) {
      this.view = true;
      this.feedback = true;
      this.accept = false;
    } else if (boolean == 2) {
        this.accept = true;
        this.view = false;
        this.feedback = false;
    }
    this.loading=true;
    this.bookingService.getBookingDetailsById(data.id).subscribe(
      response=> { 
        let tempData;
        switch (response.tripStatus) {
          case 0:
            tempData= {...response, changedStatus:"Driver Not Available"}
            break;
          case 1:
            tempData= {...response, changedStatus:"Ride Expired"}
            break;
          case 2:
            tempData= {...response, changedStatus:"Ride Assigned"}
            break;
          case 3:
            tempData= {...response, changedStatus:"Ride Accepted"}
            break;
          case 4:
            tempData= {...response, changedStatus:"Ride Started"}
            break;
          case 5:
            tempData= {...response, changedStatus:"Ride Completed"}
            break;
          case 6:
            tempData= {...response, changedStatus:"Declined"}
            break;
          case 7:
            tempData= {...response, changedStatus:"Expired"}
            break;
          case 8:
            tempData= {...response, changedStatus:"Ride Billed"}
            break;
          default:
            tempData= {...response, changedStatus:""}
        }
        this.ridesDetails=tempData;
        this.loading=false;
      },
      error=>{ this.loading=false; console.log("Error ",error)}
    )
  }

  viewTripDetails(rideData){
    console.log("Ride ",rideData)
  }

  viewFeedback(rideData){
    const { tripId } = rideData
    if (tripId) {
      this.feedbackModel=true;
      this.loading=true;
      this.mangeTripService.getFeedbackOfTrip(tripId)
        .subscribe(
          response=>{ 
            console.log("Data ",response)
            const { feedBack, rating } = (response && response.data) ? response.data : "";
            this.feedbackMessage="There is no feedback for this trip";
            this.starReatings=Math.round(rating);
            this.loading=false;
          },
          error=>{ this.loading=false; console.error("Error ",error);
          }
        )
    } else {
        this.starReatings=0;
        this.feedbackMessage="There is no feedback for this trip";
    }
   
  }

  reAssignRide(data){
    console.log("Reassign Data", data)
  }

  ToggleOnline(data){
    console.log("Data ",data);
  }

}
