import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UtilService } from 'src/app/common/util/util.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  public dsRank: MatTableDataSource<any>;

  constructor(private utilService: UtilService) {
    this.dsRank = new MatTableDataSource();
  }

  ngOnInit() {
    this.getRanks();
  }

  /**
   * 1) Get all users presents in localStorage
   * 2) Order users by total points desc
   */
  private getRanks(): void {
    this.dsRank.data = this.utilService.get().sort((a: any, b: any) => {
      return b.total - a.total;
    });
  }

}
