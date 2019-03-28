import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  protected _timeSubject = new Subject();
  public timeEvent = this._timeSubject.asObservable();

  protected _newGameSubject = new Subject();
  public newGameEvent = this._newGameSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Get all characters from SWAPI
   */
  public getCharacters(): Observable<any> {
    return this.http.get(`${environment.url_swapi}/people`);
  }

  /**
   * Get a detail object (vehicle, planet, etc)
   * @param url Url of specific detail object
   */
  public getDetail(url: string): Observable<any> {
    return this.http.get(url);
  }

  /**
   * Simple Http Get Request changing the page
   * @param url Url of the next or previous page
   */
  public changePage(url: string): Observable<any> {
    return this.http.get(url);
  }

  /**
   * Emit an event saying that timer is over
   * Someone who's listening will be notified about
   */
  public emitTimesOver(): void {
    this._timeSubject.next();
  }

  /**
   * Emit an event saying that someone request a new game
   * Someone who's listening will be notified about
   */
  public emitNewGame(): void {
    this._newGameSubject.next();
  }
}
