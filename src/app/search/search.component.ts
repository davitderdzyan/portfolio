import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {Country} from "../models/country";
import {CountryService} from "../services/country.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  countries: Country[];
  @Output() onReset = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<FormGroup>();
  searchForm: FormGroup;
  openClasses = {'is-visible':true, 'is-not-visible':false};
  h3Classes = {'open':false, 'close':true};
  constructor(private countryService:CountryService) {

    this.searchForm = new FormGroup({
      country: new FormControl('none'),
      keyword: new FormControl(),
      codeOfTheInter: new FormControl(),
      titleOfTheInter: new FormControl(),
      interShortName: new FormControl(),
      interDescription: new FormControl(),
      from: new FormControl(),
      to: new FormControl()
    })
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(countries => this.countries = countries);
  }

  onSubmit(searchForm:FormGroup) {
    this.searchChange.emit(searchForm);
  }

  reset():void {
    this.searchForm.patchValue({
      country:'none',
      keyword:'',
      codeOfTheInter:'',
      titleOfTheInter:'',
      interShortName:'',
      interDescription:'',
      from:'',
      to:''
    });
    this.onReset.emit();
  }

  closeAndOpen(a:HTMLAnchorElement ) :void { // add a type  object
    // if("innerText" in a && "classList" in a){
      if(this.openClasses['is-visible']){
        a.innerText = "Open"
        a.classList.remove('btn-close')
        a.classList.add('btn-open')

      // a.innerText = "Open"
      // a.classList.remove('btn-close')
      // a.classList.add('btn-open')
    }else {
      a.innerText = "Close"
      a.classList.remove('btn-open')
      a.classList.add('btn-close')
      }
      // a.innerText = "Close"
      // a.classList.remove('btn-open')
      // a.classList.add('btn-close')

    this.h3Classes['open'] = !this.h3Classes['open'];
    this.h3Classes['close'] = !this.h3Classes['close'];
    this.openClasses['is-visible'] = !this.openClasses['is-visible'];
    this.openClasses['is-not-visible'] = !this.openClasses['is-not-visible'];
  // }
}
}
