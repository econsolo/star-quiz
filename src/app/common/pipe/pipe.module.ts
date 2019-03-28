import { NgModule } from '@angular/core';
import { WatchPipe } from './watch.pipe';
import { MassPipe } from './mass.pipe';
import { HeightPipe } from './height.pipe';
import { HideMailPipe } from './hide-mail.pipe';

@NgModule({
  declarations: [
    WatchPipe,
    MassPipe,
    HeightPipe,
    HideMailPipe
  ],
  exports: [
    WatchPipe,
    MassPipe,
    HeightPipe,
    HideMailPipe
  ]
})
export class PipeModule {
}
