import {fakeAsync, TestBed} from '@angular/core/testing';
import {CountryService} from "./country.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {InterventionService} from "./intervention.service";
import {UserService} from "./user.service.";
import {WorkflowStatesService} from "./workflow-states.service";
import {HttpClient} from "@angular/common/http";
import {Intervention} from "../models/intervention";



describe('InterventionService', () => {
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let countryService: CountryService;
  let userService:UserService;
  let workflowStatesService:WorkflowStatesService;
  let service:InterventionService;
  let interventionsArray: Intervention[];
  let intervention:Intervention;
  let num:number;
  beforeEach(fakeAsync(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    countryService = new CountryService(httpSpy);
    userService = new UserService(httpSpy);
    workflowStatesService = new WorkflowStatesService(httpSpy);
    // service = new InterventionService(httpSpy, countryService, userService, workflowStatesService );
    // countryService = jasmine.createSpyObj('CountryService', ['getCountries']);
    // userService = jasmine.createSpyObj('UserService', ['getUsers']);
    // workflowStatesService = jasmine.createSpyObj('WorkflowStatesService', ['getAllWorkflowStates'])

    TestBed.configureTestingModule({
      providers:[InterventionService, UserService, CountryService, WorkflowStatesService],
      imports: [HttpClientTestingModule]
    });
    countryService = TestBed.inject(CountryService);
    userService = TestBed.inject(UserService);
    workflowStatesService = TestBed.inject(WorkflowStatesService);
    service = TestBed.inject(InterventionService)
  }));


  it('#getInterventions should return value from observable',
    fakeAsync((done: DoneFn) => {
      service.getInterventionById(num).subscribe(value => {
        expect(value).toBe(intervention);
        done();
      });
    }));


  it('#getInterventions', fakeAsync(function(done:DoneFn) {
    expect(service.getInterventions().subscribe(countries => {
      expect(countries).toBe(interventionsArray);
      done();
    }));
  }))
});
