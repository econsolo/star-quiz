import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { MaterialModule } from '../core/material.module';
import { PipeModule } from '../common/pipe/pipe.module';

@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GameRoutingModule,
    PipeModule
  ],
  bootstrap: [GameComponent]
})
export class GameModule { }
