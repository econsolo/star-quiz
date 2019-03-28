import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'game', loadChildren: './game/game.module#GameModule' },
  { path: 'presentation', loadChildren: './presentation/presentation.module#PresentationModule' },
  { path: '**', redirectTo: 'presentation', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
