import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RESTCountry } from '../interfaces/rest-countries-arr.interface';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = '/restcountries/countries/v5';
const API_TOKEN = 'rc_live_d51b562e37de411a853e0acdfc2822c1'; // Replace with your RestCountries v5 API key

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    const normalizedQuery = query.trim().toLowerCase();
    const options = {
      headers: new HttpHeaders({ Authorization: `Bearer ${API_TOKEN}` }),
    };

    return this.http
      .get<{ data: { objects: RESTCountry[] } }>(`${API_URL}/capitals/${normalizedQuery}`, options)
      .pipe(map((response) => CountryMapper.mapRestCountryArrayToCountryArray(response.data.objects)));
  }
}
