 import {NgModule} from '@angular/core';
 import {BrowserModule} from '@angular/platform-browser';
 import {AppComponent} from './app.component';
 import {SearchComponent} from './search/search.component';
 import {TableComponent} from './table/table.component';
 import {FormsModule, ReactiveFormsModule} from "@angular/forms";
 import {HttpClientModule} from "@angular/common/http";
 import {InterventionService} from "./services/intervention.service";
 import {CountryService} from "./services/country.service";
 import {UserService} from "./services/user.service.";
 import {WorkflowStatesService} from "./services/workflow-states.service";
 import {RouterModule, Routes} from "@angular/router";
import { ViewComponent } from './view/view.component';
import { CodeReviewComponent } from './code-review/code-review.component';

import {NgxPaginationModule} from "ngx-pagination";

 const routes:Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full'},
   { path:'home', component: ViewComponent},
   { path: 'code/:id', component: CodeReviewComponent }
 ];
 @NgModule({
   declarations: [
     AppComponent,
     SearchComponent,
     TableComponent,
     ViewComponent,
     CodeReviewComponent,
   ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule
  ],
  providers: [InterventionService, CountryService, UserService, WorkflowStatesService],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
