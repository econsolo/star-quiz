import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankRoutingModule } from './rank-routing.module';
import { RankComponent } from './list/rank.component';
import { MaterialModule } from 'src/app/core/material.module';
import { PipeModule } from 'src/app/common/pipe/pipe.module';

@NgModule({
  declarations: [
    RankComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipeModule,
    RankRoutingModule
  ]
})
export class RankModule { }
