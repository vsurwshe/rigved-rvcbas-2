import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  @Input() tripData;

  constructor() { }

  ngOnInit(): void {
    console.log("EWE ",this.tripData)
  }

}
