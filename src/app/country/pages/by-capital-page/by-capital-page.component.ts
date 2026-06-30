import { Component, computed, inject, signal, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page.component',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  // countryResource = resource<Country[], { query: string }>({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     const query = params.query?.trim() ?? '';

  //     if (!query) return [];

  //     return await firstValueFrom(this.countryService.searchByCapital(query));
  //   },
  //   defaultValue: [],
  // });

  countryResource = rxResource<Country[], { query: string }>({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      const query = params.query?.trim() ?? '';

      if (!query) return of([]);

      return this.countryService.searchByCapital(query);
    },
    defaultValue: [],
  });
}
