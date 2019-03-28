import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game.component';

const routes: Routes = [{
  path: '', component: GameComponent,
  children: [
    { path: 'start', loadChildren: './components/start/start.module#StartModule' },
    { path: 'rank', loadChildren: './components/rank/rank.module#RankModule' },
    { path: '**', redirectTo: 'start', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
