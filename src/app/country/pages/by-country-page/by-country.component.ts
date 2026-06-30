import { Component, inject, signal, resource } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',
})
export class ByCountrycomponent {

  countryService = inject(CountryService);
  query = signal('');

  // countryResource = resource<Country[], { query: string }>({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     const query = params.query?.trim() ?? '';

  //     if (!query) return [];

  //     return await firstValueFrom(this.countryService.searchByCountry(query));
  //   },
  //   defaultValue: [],
  // });

  countryResource = rxResource<Country[], { query: string }>({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      const query = params.query?.trim() ?? '';

      if (!query) return of([]);

      return this.countryService.searchByCountry(query);
    },
    defaultValue: [],
  });
}
