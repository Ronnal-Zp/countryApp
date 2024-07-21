import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStorage } from '../interfaces/cache-storage.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadFromCache();
  }

  private baseUrl: string = 'https://restcountries.com/v3.1';
  public cacheStorage: CacheStorage = {
    byCapital: {
      countries: [],
      term: ''
    },
    byCountry: {
      countries: [],
      term: ''
    },
    byRegion: {
      countries: []
    }
  };

  private saveToLocalStorage() {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStorage))
  }

  private loadFromCache() {
    if(!localStorage.getItem('cacheStorage')) return;

    this.cacheStorage = JSON.parse(localStorage.getItem('cacheStorage')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>( url )
      .pipe(
        catchError(error => of([]))
      )
  }

  public searchCapital(term: string): Observable<Country[]> {
    const url = `${this.baseUrl}/capital/${term}`;
    return this.getCountriesRequest( url )
      .pipe(
        tap(countries => this.cacheStorage.byCapital = { countries, term }),
        tap(() => this.saveToLocalStorage())
      );
  }

  public searchCountry(term: string): Observable<Country[]> {
    const url = `${this.baseUrl}/name/${term}`;
    return this.getCountriesRequest( url )
      .pipe(
        tap(countries => this.cacheStorage.byCountry = { countries, term }),
        tap(() => this.saveToLocalStorage())
      );
  }

  public searchRegion(term: Region): Observable<Country[]> {
    const url = `${this.baseUrl}/region/${term}`
    return this.getCountriesRequest( url )
      .pipe(
        tap(countries => this.cacheStorage.byRegion = { countries, region: term }),
        tap(() => this.saveToLocalStorage())
      );
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.baseUrl}/alpha/${code}`

    return this.httpClient.get<Country[]>( url )
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null))
      );
  }


}
