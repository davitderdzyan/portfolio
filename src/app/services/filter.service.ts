import {Injectable} from '@angular/core';
import {Intervention} from "../models/intervention";
import {FormGroup} from "@angular/forms";
import {SortService} from "./sort.service";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(public sortService:SortService) {
  }
  filter(search: FormGroup, interventions: Intervention[]): Intervention[] {

    if (search) {
      interventions = this.filterByCountry(search['country'], interventions)
      if (search['keyword']) {
        let searchByKeyword = new Set();
        if (search['codeOfTheInter'])
          this.filterByKeywordField(search['keyword'], interventions,"codeOfTheInter" ).forEach(elem => searchByKeyword.add(elem))
        if (search['interShortName'])
          this.filterByKeywordField(search['keyword'], interventions, "interShortName").forEach(elem => searchByKeyword.add(elem))
        if (search['titleOfTheInter'])
          this.filterByKeywordField(search['keyword'], interventions, "titleOfTheInter").forEach(elem => searchByKeyword.add(elem))
        if (search['interDescription'])
          this.filterByKeywordField(search['keyword'], interventions, "interDescription").forEach(elem => searchByKeyword.add(elem))
        if (searchByKeyword.size) {
          interventions = [...searchByKeyword];
        }
      }

      if (search['from'])
        interventions = this.filterByDate(search['from'],'from', interventions);
      if (search['to'])
        interventions = this.filterByDate(search['to'],'to', interventions);
    }

    return interventions;
  }


  filterByStatus(status: string, interventions: Intervention[]): Intervention[] {
    interventions = this.sortService.sortByLast(interventions);

    if (status !== "none") {
      interventions =  interventions.filter(intervention => intervention.status.id === +status);
    }
    return interventions;

  }

  filterByCountry(country: string, data: Intervention[]): Intervention[] {
    if(country === "none"){
      return data;
    }else {
      return data.filter(inter => inter['country']?.id === +country)
    }
  }

  filterByKeywordField(keyword: string, data: Intervention[], fieldName:string):Intervention[]{
    return data.filter(data => data[fieldName].includes(keyword))
  }

  filterByDate(fieldName:string,type:string, data: Intervention[]){
    if(type ==="from"){
      return data.filter(data => new Date(data[type]).getTime() >= new Date(fieldName).getTime())
    }else {
      return data.filter(data => new Date(data[type]).getTime() <= new Date(fieldName).getTime())
    }
  }

}
