import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../common/util/util.service';
import { environment } from 'src/environments/environment';
import { StarWarsService } from '../common/service/star-wars.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public menus: any[] = [];
  public timeRemaining: number;
  private interval: any;

  constructor(private router: Router,
    private utilService: UtilService,
    private starWarsService: StarWarsService) { }

  ngOnInit() {
    this.getMenus();

    // Listening an event when someone request a 'new game'
    this.starWarsService.newGameEvent.subscribe(() => this.newGame());

    // Listening an event when someone left the game page
    this.starWarsService.destroyTimerEvent.subscribe(() => {
      this.timeRemaining = 0;
      clearInterval(this.interval);
    });
  }

  /**
   * Navigate to another route
   * @param path route of a component to go in through Stacks
   */
  public goTo(path): void {
    this.utilService.goTo(this.router, path);
  }

  /**
   * Stars a new game, renewing the timer
   */
  private newGame(): void {
    clearInterval(this.interval);
    this.timeRemaining = environment.quiz_time;
    this.buildTimer();
  }

  /**
   * Build the timer when start a new game
   * Also finish the timer when time's over
   */
  private buildTimer(): void {
    this.interval = setInterval(() => {

      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.timesOver();
      }

    }, 1000);
  }

  /**
   * 1) Clear the interval of our timer
   * 2) Emit an event when the time's over for anyone listening
   */
  private timesOver(): void {
    clearInterval(this.interval);
    this.starWarsService.emitTimesOver();
  }

  /**
   * Configure docked sidemenu
   */
  private getMenus() {
    this.menus = [
      {
        icon: 'help',
        path: 'presentation/guide/',
        label: 'Help Page'
      },
      {
        icon: 'videogame_asset',
        path: 'game/start/',
        label: 'New Game'
      },
      {
        icon: 'people',
        path: 'game/rank/',
        label: 'Best Players'
      }
    ];
  }
}
