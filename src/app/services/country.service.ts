import {HttpClient} from "@angular/common/http";
import {Country} from "../models/country";
import {map, Observable} from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable()
export class CountryService {
  constructor(private http: HttpClient) {
  }

  getCountries():Observable<Country[]> {
    return this.http.get("/assets/data/Countries.json").pipe(
      map((info: { data: Country[] }) => {
        return info['data'].map(country => {
          return new Country(country['CountryId'], country['name']?.[3])
        })
      }))
  }
}
