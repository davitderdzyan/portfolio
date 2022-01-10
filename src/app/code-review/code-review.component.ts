import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InterventionService} from "../services/intervention.service";
import {Intervention} from "../models/intervention";

@Component({
  selector: 'app-code-review',
  templateUrl: './code-review.component.html',
  styleUrls: ['./code-review.component.css']
})
export class CodeReviewComponent implements OnInit {

  intervention: Intervention;

  constructor(private route: ActivatedRoute, private interventionService: InterventionService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.interventionService.getInterventionById(id).subscribe(elem =>
      this.intervention = elem);
  }
}
