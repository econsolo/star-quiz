import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationRoutingModule } from './presentation-routing.module';
import { PresentationComponent } from './presentation.component';
import { MaterialModule } from '../core/material.module';

@NgModule({
  declarations: [
    PresentationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PresentationRoutingModule
  ],
  bootstrap: [PresentationComponent]
})
export class PresentationModule { }
