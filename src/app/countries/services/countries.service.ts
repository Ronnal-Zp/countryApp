import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private baseUrl: string = 'https://restcountries.com/v3.1';

}
