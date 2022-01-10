import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {FormGroup} from "@angular/forms";
import {CountryService} from "../services/country.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let fg :FormGroup;
  let a = {classList:{
      remove :()=> {
      },
      add :()=> {
      },
      contains :()=> true
    }} ;
  let anchorElement:HTMLAnchorElement;
  let service:CountryService;
  let http:jasmine.SpyObj<HttpClient>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers:[CountryService],
      imports:[HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CountryService(http);
    service = TestBed.inject(CountryService);
    component = new SearchComponent(service);
  });

  it('#onSubmit', ()=> {
    expect(component.onSubmit(fg)).toBeUndefined();
  })

  it('#reset ', () => {
    expect(component.reset()).toBeUndefined();
  })

  // it('#closeAndOpen should be close or open search', () => {
  //   expect(component.closeAndOpen(fg,anchorElement)).toBeUndefined();
  // })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
