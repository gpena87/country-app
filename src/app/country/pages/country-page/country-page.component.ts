import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  countryService = inject(CountryService);
  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource<Country | undefined, { code: string }>({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      const code = params.code?.trim() ?? '';

      if (!code) return of(undefined);

      return this.countryService.searchCountryByAlphaCode(code);
    },
    defaultValue: undefined,
  });
}
