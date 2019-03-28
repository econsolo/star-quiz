import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/common/util/util.service';
import { StarWarsService } from 'src/app/common/service/star-wars.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  public form: FormGroup;
  public swapiResults: any;
  public canPlay = true;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private utilService: UtilService,
    private dialog: MatDialog,
    private starWarsService: StarWarsService) {

    this.form = new FormGroup({});
  }


  ngOnInit() {
    this.getCharacters();
    this.starWarsService.timeEvent.subscribe(() => {
      this.canPlay = false;
      this.calculatePoints();
    });
  }

  /**
   * Dispatched when user clicks in Next/Previous button at the bottom
   * @param url Url of Next or Previous page
   */
  public changePage(url: string): void {
    this.starWarsService.changePage(url).subscribe(res => {
      this.swapiResults = res;
      this.buildFormGroup(this.swapiResults.results);
    });
  }

  /**
   * 1) Transform FormGroup in object to access its properties and values
   * 2) Calculate user's points
   * 3) Request user's name and email to save in Rank through a dialog (modal)
   * 4) Redirect user to our Rank
   */
  private calculatePoints(): void {
    const formValue = this.form.value;
    let total = 0;

    for(let property of Object.getOwnPropertyNames(formValue)) {
      const obj = formValue[property];
      
      if (this.utilService.isCorrect(obj.name, obj.answer)) {
        total += obj.value;
      }

    }

    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { total: total }
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this.utilService.goTo(this.router, 'game/rank');
    });
  }

  /**
   * Get first characters of SWAPI and then start the countdown
   */
  private getCharacters(): void {
    this.starWarsService.getCharacters().subscribe(res => {
      this.swapiResults = res;
      this.buildFormGroup(this.swapiResults.results);
      this.starWarsService.emitNewGame();
    });
  }

  /**
   * Build the FormGroup to control all fields about the game
   * @param characters SWAPI characters
   */
  private buildFormGroup(characters: any[]): void {
    characters.forEach(c => {
      this.form.addControl(c.url, this.formBuilder.group({
        name: [c.name, []],
        answer: ['', [
          Validators.required,
          Validators.maxLength(20)
        ]],
        image: ['', []],
        value: [10, []]
      }));
    });
  }
}
