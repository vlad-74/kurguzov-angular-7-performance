import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from './modules/material.module';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SecondComponent } from './components/second/second.component';
import { TooltipComponent } from './components/main/tooltip/tooltip.component';
import { WorkerComponent } from './components/worker/worker.component';

const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: 'second', component: SecondComponent},
  { path: 'worker', component: WorkerComponent},
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    MainComponent,
    SecondComponent,
    TooltipComponent,
    WorkerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
