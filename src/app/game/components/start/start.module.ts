import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartRoutingModule } from './start-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';
import { TileComponent } from './list/tile/tile.component';
import { AnswerDialogComponent } from './list/tile/answer-dialog/answer-dialog.component';
import { TipDialogComponent } from './list/tile/tip-dialog/tip-dialog.component';
import { StartComponent } from './list/start.component';
import { PipeModule } from 'src/app/common/pipe/pipe.module';
import { AddDialogComponent } from './list/add-dialog/add-dialog.component';

@NgModule({
  declarations: [
    StartComponent,
    TileComponent,
    AnswerDialogComponent,
    TipDialogComponent,
    AddDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    StartRoutingModule,
    PipeModule
  ],
  entryComponents: [
    TileComponent,
    AnswerDialogComponent,
    TipDialogComponent,
    AddDialogComponent
  ]
})
export class StartModule { }
