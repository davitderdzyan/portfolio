import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Intervention} from "../models/intervention";
import {InterventionService} from "../services/intervention.service";
import {WorkflowStatesService} from "../services/workflow-states.service";
import {FilterService} from "../services/filter.service";
import {SortService} from "../services/sort.service";
import {WorkFlowState} from "../models/workflowstate";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  //TODO change variable names please
  interventionsCount: number = 3;
  currentPage: number = 1;
  currentInterventions: Intervention[] = [];
  workFlowStates: WorkFlowState[];
  interventions: Intervention[] = [];
  @Input() search: FormGroup;
  statusId: string = "none";

  constructor(private interventionService: InterventionService,
              private  workFlowStatesService: WorkflowStatesService,
              private filterService: FilterService,
              private sortService: SortService) {
  }

  ngOnInit(): void {
    this.interventionService.getInterventions().subscribe(interventions => {
      this.currentInterventions = [...interventions];
      this.interventions = interventions;
    });
    this.workFlowStatesService.getAllWorkflowStates().subscribe(wfStates => this.workFlowStates = wfStates);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.search) {
      this.resetSearch();
    } else {
      this.currentInterventions = this.filterService.filter(this.search, this.interventions);
    }
    this.currentInterventions = this.filterService.filterByStatus(this.statusId, this.currentInterventions);
  }

  filterByWfState(status: string): void {
    this.statusId = status;
    this.currentPage = 1;
    this.currentInterventions = this.filterService.filterByStatus(status, this.interventions);
  }

  sortBy(fieldName: string, span: HTMLSpanElement): void {
    this.sortService.sortByColumn(fieldName, this.currentInterventions, span)

  }

  resetSearch(): void {
    this.currentInterventions = [...this.interventions];
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage >= (this.currentInterventions.length / this.interventionsCount);
  }

  nextPage(): void {
    this.currentPage++;
  }

  previousPage(): void {
    this.currentPage--;
  }
}
