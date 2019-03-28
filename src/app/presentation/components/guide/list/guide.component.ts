import { Component } from '@angular/core';
import { UtilService } from 'src/app/common/util/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent {

  constructor(private router: Router,
    private utilService: UtilService) { }

  /**
   * Simply redirect to our game
   */
  public play(): void {
    this.utilService.goTo(this.router, 'game/start/');
  }

}
