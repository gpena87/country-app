import { Component, computed, inject, signal, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page.component',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource<Country[], { query: string }>({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      const query = params.query?.trim() ?? '';

      if (!query) return [];

      return await firstValueFrom(this.countryService.searchByCapital(query));
    },
    defaultValue: [],
  });

  // isLoading = computed(() => this.countryResource.status() === 'loading');
  // isError = computed(() => {
  //   const error = this.countryResource.error();
  //   return error instanceof Error ? error.message : null;
  // });
  // countries = computed(() => this.countryResource.value() ?? []);

  // onSearch(query: string): void {
  //   this.query.set(query);
  // }
}
