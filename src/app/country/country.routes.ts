import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/countryLayout/countryLayout.component';
import { ByCountrycomponent } from './pages/by-country-page/by-country.component';
import { ByRegioncomponent } from './pages/by-region-page/by-region.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path: 'by-country',
        component: ByCountrycomponent
      },
      {
        path: 'by-region',
        component: ByRegioncomponent
      },
      {
        path: 'by/:code',
        component: CountryPageComponent
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  }
];

export default countryRoutes;
