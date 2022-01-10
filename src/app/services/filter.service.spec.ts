import { TestBed } from '@angular/core/testing';
import {FilterService} from "./filter.service";
import {Intervention} from "../models/intervention";
import {SortService} from "./sort.service";



describe('FilterService', () => {
  let sortService:SortService = new SortService()
  let service: FilterService = new FilterService(sortService);
  let status:string ='';
  let interventions: Intervention[] = [{id:1843,shortName:"dsfasfsa",country:{id:1130,name:'Belgium'}, status:{id:12,name:'Execution'}},
    {id:1843,shortName:"fdsfsd",country:{id:1,name:'Belgium3'}, status:{id:12,name:'Execution'}}];
  let resultInter:Intervention[] = [{id:1843,shortName:"dsfasfsa",country:{id:1130,name:'Belgium'}, status:{id:12,name:'Execution'}}];
  let fieldName:string;
  let type:string;
  let country:string = '1130';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[SortService,FilterService]
    });
  });


  it('#filterByStatus should return array of interventions',
    () => {
      expect(service.filterByStatus(status, interventions)).toEqual([])
    });


  it('#filterByDate should return array of interventions', () => {
    expect(service.filterByDate(fieldName, type, interventions)).toEqual([])
  })

  it('#filterByCountry should return array of interventions', () => {
    expect(service.filterByCountry(country, interventions)).toEqual(resultInter);
  })


});
