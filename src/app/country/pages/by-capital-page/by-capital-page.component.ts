import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries-arr.interface';
import { Country } from '../../interfaces/country.interface';
@Component({
  selector: 'app-by-capital-page.component',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch( query: string ): void {
    if (this.isLoading()) return;

    this.isLoading.set( true );
    this.isError.set( null );

    this.countryService.searchByCapital(query).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.countries.set(response);
      },
      error: (error) => {
        console.log(error);
        this.isLoading.set(false);
        this.isError.set(error);
        this.countries.set([]);
      }
    });
  };
}
