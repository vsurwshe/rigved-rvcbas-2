import { Component } from '@angular/core';

import '@fortawesome/fontawesome-free/js/all.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RV Cabs Rental';
  loading= false;
}
