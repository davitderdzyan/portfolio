import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {Intervention} from "../models/intervention";
import {Country} from "../models/country";
import {User} from "../models/User";
import {WorkFlowState} from "../models/workflowstate";
import {CountryService} from "./country.service";
import {UserService} from "./user.service.";
import {WorkflowStatesService} from "./workflow-states.service";
import {zip} from "rxjs";

@Injectable()
export class InterventionService {
  countries: Country[] = [];
  users: User[] = [];
  workFlowStates: WorkFlowState[] = [];

  constructor(private http: HttpClient, private countryService: CountryService,
              private userService: UserService,
              private workFlowStatesService: WorkflowStatesService) {
    userService.getUsers()
      .subscribe(users => this.users = users);
    countryService.getCountries()
      .subscribe(countries => this.countries = countries);
    workFlowStatesService.getAllWorkflowStates()
      .subscribe(workFlowStates => this.workFlowStates = workFlowStates);
  }

  getInterventions() {
    const users$ = this.userService.getUsers();
    const countries$ = this.countryService.getCountries();
    let workflowStates$ = this.workFlowStatesService.getAllWorkflowStates();
    let interventions$ = this.http.get("/assets/data/allInformation.json")

    return zip(users$, countries$, workflowStates$, interventions$)
      .pipe(map(([users, countries, workflowStates, interventions]) => {
        return interventions['data'].map((intervention: Intervention) => {
          const user = users.find(user => user.id === intervention['UpdatedUserID']);
          const workflowState = workflowStates.find(workflowState => workflowState.id === intervention['workflowStateId']);
          const country:Country = countries.find(country => country.id === intervention['InterventionCountryID']);

          return new Intervention(intervention['InterventionID'], intervention["InterventionCode"],
            intervention["ShortName"], intervention["Title"],
            country,
            workflowState,
            user,
            intervention['Description'], intervention['ActualStartDate'],
            intervention['ActualEndDate'], intervention["DateUpdated"])
        })
      }))
  }

  getInterventionById(id: number) {
    return this.getInterventions()
      .pipe(
        map(intervention => intervention.find(intervention => intervention.id === id))
      )
  }
}
