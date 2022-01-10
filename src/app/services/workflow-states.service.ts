import {Injectable} from '@angular/core';
import {WorkFlowState} from "../models/workflowstate";
import {HttpClient} from "@angular/common/http";
import {map, shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkflowStatesService {
  // private wfStates$ = this.http.get("/assets/data/WorkflowStates.json").pipe(
  //   map((info: { data: WorkFlowState[] }) => {
  //     return info['data'].map(data => {
  //       return new WorkFlowState(data["WFSTATEID"],
  //         data['name'][3])
  //     })
  //   }),
  //   shareReplay({bufferSize: 1, refCount: true})
  // );
  constructor(private http: HttpClient) {}

  getAllWorkflowStates(): Observable<WorkFlowState[]> {
    return this.http.get("/assets/data/WorkflowStates.json").pipe(
      map((info: { data: WorkFlowState[] }) => {
          return info['data'].map(data => {
            return new WorkFlowState(data["WFSTATEID"],
              data['name'][3])
          })
        }
        ));
  }
}
