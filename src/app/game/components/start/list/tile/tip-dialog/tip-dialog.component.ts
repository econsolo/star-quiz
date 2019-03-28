import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StarWarsService } from 'src/app/common/service/star-wars.service';

@Component({
  selector: 'app-tip-dialog',
  templateUrl: './tip-dialog.component.html',
  styleUrls: ['./tip-dialog.component.css']
})
export class TipDialogComponent implements OnInit {

  public character: any;
  public species: string[] = [];
  public planet: string[] = [];
  public movies: string[] = [];
  public vehicles: string[] = [];

  constructor(public dialogRef: MatDialogRef<TipDialogComponent>,
    private starWarsService: StarWarsService,
    @Inject(MAT_DIALOG_DATA) private data: any) {

    // receiving our character passed in dialogRef at the component caller
    this.character = data.character;
  }

  ngOnInit() {
    this.getSpecie();
    this.getPlanet();
    this.getMovies();
    this.getVehicles();
  }

  /**
   * Convert string[] in string joined with comma
   * @param type string[]
   */
  public getInfo(type: string[]) {
    if (type.length) {
      return type.join(', ');
    }
    return 'N/a';
  }

  /**
   * Do some requests getting all species from our character
   */
  private getSpecie(): void {
    for (let s of this.character.species) {
      this.starWarsService.getDetail(s).subscribe(res => {
        this.species.push(res.name);
      });
    }
  }

  /**
   * Do a request getting the planet of our character
   */
  private getPlanet(): void {
    this.starWarsService.getDetail(this.character.homeworld).subscribe(res => {
      this.planet.push(res.name);
    });
  }

  /**
   * Do some requests getting the movies of our character
   */
  private getMovies(): void {
    for (let f of this.character.films) {
      this.starWarsService.getDetail(f).subscribe(res => {
        this.movies.push(res.title);
      });
    }
  }

  /**
   * Do some requests getting the vehicles of our character
   */
  private getVehicles(): void {
    for (let v of this.character.vehicles) {
      this.starWarsService.getDetail(v).subscribe(res => {
        this.vehicles.push(res.name);
      });
    }
  }

}
