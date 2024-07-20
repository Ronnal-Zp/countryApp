import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private baseUrl: string = 'https://restcountries.com/v3.1';


  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.baseUrl}/capital/${term}`;
    return this.httpClient.get<Country[]>( url ).pipe(
      catchError(error => of([]))
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.baseUrl}/name/${term}`;
    return this.httpClient.get<Country[]>( url ).pipe(
      catchError(error => of([]))
    );
  }

  searchRegion(term: string ): Observable<Country[]> {
    const url = `${this.baseUrl}/region/${term}`
    return this.httpClient.get<Country[]>( url ).pipe(
      catchError(error => of([]))
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.baseUrl}/alpha/${code}`
    return this.httpClient.get<Country[]>( url )
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null))
      );
  }


}
