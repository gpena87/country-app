import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, delay, tap } from 'rxjs/operators';
import { RESTCountry } from '../interfaces/rest-countries-arr.interface';
import { Observable, throwError } from 'rxjs';
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
      .pipe(
        map((response) => CountryMapper.mapRestCountryArrayToCountryArray(response.data.objects)),
        catchError((error) => {
          console.error('Error fetching countries by capital:', error);
          return throwError(() => new Error(`No se pudo encontrar países para la capital especificada ${normalizedQuery}`));
        })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const normalizedQuery = query.trim().toLowerCase();
    const options = {
      headers: new HttpHeaders({ Authorization: `Bearer ${API_TOKEN}` }),
    };

    return this.http
      .get<{ data: { objects: RESTCountry[] } }>(`${API_URL}/names.common/${normalizedQuery}`, options)
      .pipe(
        tap((x) => console.log('Response from searchCountryByAlphaCode:', x)),
        map((response) => CountryMapper.mapRestCountryArrayToCountryArray(response.data.objects)),
        tap((x => console.log('Response from searchByCountry:', x))),
        catchError((error) => {
          console.error('Error fetching countries by country name:', error);
          return throwError(() => new Error(`No se pudo encontrar países para el nombre especificado ${normalizedQuery}`));
        })
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    const normalizedQuery = code.trim().toLowerCase();
    const options = {
      headers: new HttpHeaders({ Authorization: `Bearer ${API_TOKEN}` }),
    };

    return this.http
      .get<{ data: { objects: RESTCountry[] } }>(`${API_URL}/code?q=${normalizedQuery}`, options)
      .pipe(
        map((response) => CountryMapper.mapRestCountryArrayToCountryArray(response.data.objects)),
        // tap((countries) => console.log('Response from searchCountryByAlphaCode:', countries)),
        map((countries) => countries.at(0)), // Return only the first country if it exists
        catchError((error) => {
          console.error('Error fetching countries by country name:', error);
          return throwError(() => new Error(`No se pudo encontrar países para ese codigo ${normalizedQuery}`));
        })
    );
  }
}
