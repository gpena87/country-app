import  { RESTCountry } from '../interfaces/rest-countries-arr.interface';
import { Country } from '../interfaces/country.interface';

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.uuid,
      flag: {
        emoji: restCountry.flag.emoji,
        url_svg: restCountry.flag.url_svg,
        url_png: restCountry.flag.url_png,
      },
      name: restCountry.names.common,
      capital: restCountry.capitals[0]?.name || 'N/A',
      population: restCountry.population,
    };
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map((restCountry) => this.mapRestCountryToCountry(restCountry));
  }
}
