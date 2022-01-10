import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  formData: FormGroup;
  reset(): void {
    this.formData = null
  }

  onSearch(searchForm: FormGroup): void {
    this.formData = searchForm;
  }
}
