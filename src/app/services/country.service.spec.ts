import {fakeAsync, TestBed} from '@angular/core/testing';
import {CountryService} from "./country.service";
import {Country} from "../models/country";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";



describe('CountryService', () => {
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let service: CountryService;
  let countriesArray: Country[];

  beforeEach(fakeAsync(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CountryService(httpSpy);
    TestBed.configureTestingModule({
      providers:[CountryService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CountryService);
  }));


  it('#getObservableValue should return value from observable',
    fakeAsync((done: DoneFn) => {
      service.getCountries().subscribe(value => {
        expect(value).toBe(countriesArray);
        done();
      });
    }));


  it('#getCountry', fakeAsync(function(done:DoneFn) {
    expect(service.getCountries().subscribe(countries => {
      expect(countries).toBe(countriesArray);
      done();
    }));
  }))
});
