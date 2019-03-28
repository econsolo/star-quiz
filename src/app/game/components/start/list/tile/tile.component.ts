import { Component, OnInit, OnChanges, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImageService } from 'src/app/common/service/image.service';
import { MatDialog } from '@angular/material/dialog';
import { AnswerDialogComponent } from './answer-dialog/answer-dialog.component';
import { TipDialogComponent } from './tip-dialog/tip-dialog.component';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit, OnChanges {

  @Input() form: FormGroup;
  @Input() character: any;
  @Input() canPlay: boolean;

  constructor(private ref: ChangeDetectorRef,
    private imageService: ImageService,
    private dialog: MatDialog) { }

  ngOnInit() {
    // Here we have our character loaded, so call getImage
    this.getImage();
  }

  /**
   * Update bidirectional of Input properties like FormGroup
   */
  ngOnChanges(): void {
    this.ref.detectChanges();
  }

  /**
   * Open dialog for user answer this tile
   */
  public getAnswer(): void {
    this.dialog.open(AnswerDialogComponent, {
      data: { form: this.form }
    });
  }

  /**
   * Show tips of specific character and set your value to 5
   */
  public showTips(): void {
    this.form.controls.value.setValue(5);

    this.dialog.open(TipDialogComponent, {
      data: { character: this.character }
    });
  }

  /**
   * Do a Google Custom Search request findind the first thumbnail image
   */
  private getImage(): void {
    this.imageService.getImage(this.character.name).subscribe(img => {
      this.form.controls.image.setValue(img['items'][0]['link']);
    });
  }
}
