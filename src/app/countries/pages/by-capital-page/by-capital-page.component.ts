import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {

  constructor(
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStorage.byCapital.countries;
    this.term = this.countriesService.cacheStorage.byCapital.term;
  }

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public term: string = '';

  public searchByCapital(term: string): void {
    this.isLoading = true;

    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }

}
