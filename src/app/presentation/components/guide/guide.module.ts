import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideRoutingModule } from './guide-routing.module';
import { GuideComponent } from './list/guide.component';
import { MaterialModule } from 'src/app/core/material.module';

@NgModule({
  declarations: [
    GuideComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GuideRoutingModule
  ]
})
export class GuideModule { }
