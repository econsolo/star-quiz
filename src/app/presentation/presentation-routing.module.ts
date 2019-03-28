import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentationComponent } from './presentation.component';

const routes: Routes = [{
  path: '', component: PresentationComponent,
  children: [
    { path: 'guide', loadChildren: './components/guide/guide.module#GuideModule' },
    { path: '**', redirectTo: 'guide', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationRoutingModule { }
