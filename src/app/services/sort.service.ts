import {Injectable} from '@angular/core';
import {Intervention} from "../models/intervention";

@Injectable({
  providedIn: 'root'
})
export class SortService {
  lastSortName: string;
  lastSortType: string;

  sortByColumn(fieldName: string, data:Intervention[], span:HTMLSpanElement):Intervention[]{
    if(fieldName === "lastUpdatedOn"){
      data = this.sortDate(data, span.classList[0]);
    } else if(fieldName === 'country' || fieldName ==="lastUpdatedBy" || fieldName ==="status"){
      data = this.sortByClassifier(data, fieldName, span.classList[0]);
    } else {
      data = this.sortBy(data, fieldName, span.classList[0]);
    }
    this.lastSortType = span.classList[0];
    this.lastSortName = fieldName;
    span.classList.toggle('arrow-up');
    span.classList.toggle('arrow-down');
    return data;
  }



  sortBy(data: Intervention[], sortName: string, sortType:string): Intervention[] {
    if (sortType === 'arrow-up') {
      data.sort((intervention1, intervention2) =>
        intervention1[sortName]?.localeCompare(intervention2[sortName]));
    } else {
      data.sort((intervention1, intervention2) =>
        intervention2[sortName]?.localeCompare(intervention1[sortName]));
    }
    return data;
  }

  sortByClassifier(data: Intervention[], sortName: string, type: string) {
    if (type ==='arrow-up') {
      data.sort((intervention1, intervention2) =>
        intervention1[sortName].name?.localeCompare(intervention2[sortName].name));
    } else {
      data.sort((intervention1, intervention2) =>
        intervention2[sortName].name?.localeCompare(intervention1[sortName].name));
    }
    return data;
  }


  sortDate(interventions: Intervention[], type:string): Intervention[] {
    if (type ==='arrow-up') {
      interventions.sort((intervention1, intervention2) =>
        intervention1['lastUpdatedOn'] - intervention2['lastUpdatedOn']);
    } else {
      interventions.sort((intervention1, intervention2) =>
        intervention2['lastUpdatedOn'] - intervention1['lastUpdatedOn']);
    }
    return interventions;
  }

  sortByLast(data: Intervention[]): Intervention[] {
      if (this.lastSortName === 'lastUpdatedOn') {
        return this.sortDate(data, this.lastSortType)
      } else if (this.lastSortName === 'country' || this.lastSortName === "lastUpdatedBy" || this.lastSortName === "status") {
        return this.sortByClassifier(data, this.lastSortName, this.lastSortType)
      } else {
        return this.sortBy(data, this.lastSortName, this.lastSortType)
      }
  }
}
