import { Component } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region.component.html',
})
export class ByRegioncomponent {}
