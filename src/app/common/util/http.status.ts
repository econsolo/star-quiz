import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpStatus {

  private requestInFlight$: BehaviorSubject<boolean>;

  constructor() {
    // initialize the loading animation with 'hide' status
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  /**
   * Emit an event for all listeners hear 
   * what happened with loading animation
   * @param inFlight Showing status of loading animation
   */
  public setHttpStatus(inFlight: boolean): void {
    this.requestInFlight$.next(inFlight);
  }

  /**
   * Method able to stay listening any change of showing
   * state of loading animation
   */
  public getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}
