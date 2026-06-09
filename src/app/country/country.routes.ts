import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page.component/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/countryLayout.component/countryLayout.component';
import { ByCountrycomponent } from './pages/by-country/by-country.component';
import { ByRegioncomponent } from './pages/by-region/by-region.component';
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
