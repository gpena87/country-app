import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page.component/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/countryLayout.component/countryLayout.component';

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
        path: '**',
        redirectTo: '',
      }
    ]
  }
];

export default countryRoutes;
