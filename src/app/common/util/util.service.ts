import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStack } from '../model/route-stack';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

declare var swal: any;

/**
 * Injectable Service with common and helper methods
 */
@Injectable()
export class UtilService {

  constructor(private snackBar: MatSnackBar) {
  }

  private routeStack = [] as RouteStack[];

  /**
   * Validate equality of two strings
   * @param originalName First string
   * @param guessedName Second string
   */
  public isCorrect(originalName: string, guessedName: string): boolean {
    // simplify strings
    originalName = originalName.trim().toLowerCase();
    guessedName = guessedName.trim().toLowerCase();

    // remove dashes
    originalName = originalName.replace(new RegExp('-', 'g'), '');
    guessedName = guessedName.replace(new RegExp('-', 'g'), '');

    return originalName === guessedName;
  }

  /**
   * Get users from localStorage if there is, otherwise create one
   * Add new user to users and set the new values to localStorage 
   * @param user Object with name and email
   */
  public save(user: any): void {
    let users = JSON.parse(localStorage.getItem('users')) as any[];
    
    if (!users) {
      users = [];
    }
    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
  }

  /**
   * Return user[] from localStorage as Json Object
   */
  public get(): any[] {
    return JSON.parse(localStorage.getItem('users'));
  }

  /**
   * Simulate a user's 'touch' in every AbstractControl of the FormGroup,
   * Showing friendly field errors
   * @param form FormGroup
   */
  public showErrors(form: any): void {
    if (!form) {
      throw new Error('[showErrors] O FormGroup não deve estar nulo!');
    }
    Object.keys(form.controls).forEach(key => {
      const field = form.get(key);

      // if the FormGroup has another FormGroup inside, instead of AbstractControl
      if (field['controls']) { 
        this.showErrors(field);
      } else {
        field.markAsTouched();
      }
    });
  }

  /**
   * Show an error Dialog to user
   * @param msg Message to show friendly
   * @param callback Callback when user clicks in the button
   */
  public errorDialog(msg: string = 'Ocorreu um erro não esperado :(',
    callback: Function = () => {
    }): void {
    swal({
      title: 'Erro',
      text: msg,
      icon: 'error',
      button: 'Roger that',
    }).then(callback);
  }

  /**
   * Show a success Dialog to user
   * @param msg Message to show friendly
   * @param callback Callback when user clicks in the button
   */
  public successDialog(msg: string, callback: Function = () => {
  }): void {
    this.validateMsg(msg);
    swal({
      title: 'Success!',
      text: msg,
      icon: 'success',
      button: 'Done',
    }).then(callback);
  }
  
  /**
   * Show a prompt Dialog to user
   * @param msg Message to show friendly
   * @param title Title of the dialog
   * @param callback Callback when user clicks in the button
   */
  public promptDialog(msg: string, title: string, callback: Function = () => {
  }): void {
    this.validateMsg(msg);
    swal({
      title: title,
      text: msg,
      icon: 'success',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'E-mail address',
          type: 'email',
        },
      },
      button: 'Done',
    }).then(callback);
  }

  /**
   * Show a simple snack message to user
   * @param msg Message to show friendly
   */
  public snackMsg(msg: string): Observable<MatSnackBarDismiss> {
    this.validateMsg(msg);
    const sb = this.snackBar.open(msg, null, {
      duration: 3000
    });
    return sb.afterDismissed();
  }

  /**
   * Show a confirm Dialog to user
   * @param msg Message to show friendly
   * @param title Title of the dialog
   * @param callback Callback when user clicks in the button
   */
  public confirmDialog(msg: string, title: string, callback: Function): void {
    this.validateMsg(msg);
    this.validarCallback(callback);
    swal({
      title: title,
      text: msg,
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'Cancel',
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: 'Roger that',
          value: true,
          visible: true,
          closeModal: true
        }
      }
    }).then(callback);
  }

  /**
   * Avoid developer errors
   * @param msg Message to show friendly
   */
  private validateMsg(msg: string): void {
    if (!msg) {
      throw new Error('É obrigatório definir uma mensagem');
    }
  }

  /**
   * Avoid developer errors
   * @param callback Some callback function
   */
  private validarCallback(callback: Function): void {
    if (!callback) {
      throw new Error('É obrigatório definir um callback');
    }
  }

  /**
   * This method navigate to another route setting it in a Stack
   * @param router Router object injected
   * @param route Path to go in
   * @param params Params to pass in route to go in
   */
  public goTo(router: Router, route: string, ...params: any[]): void {
    if (params && params.length) {
      router.navigate(this.separateArray(route, params));
    } else {
      router.navigate([route]);
    }
    this.routeStack.push({
      route: route,
      caller: router.url,
      params: params ? params : []
    } as RouteStack);
  }

  /**
   * Helper method to navigate with Stacks
   * @param route Path to go in
   * @param params Params to pass in route to go in
   */
  private separateArray(route: string, params): string[] {
    const array = [];

    array.push(route);

    if (typeof params === 'string') {
      array.push(params);
      return array;
    }

    for (let i = 0; i < params.length; i++) {
      array.push(params[i]);
    }

    return array;
  }

  /**
   * Unstack the routes, allowing dinamically returns
   * @param router Router object injected 
   * @param defaultBackRoute Default path (route) to back in case of refreshed page
   */
  public backToCaller(router: Router, defaultBackRoute: any[]): void {
    if (!this.isStackEmpty()) {
      const unstacked = this.routeStack.pop();
      router.navigate([decodeURI(unstacked.caller)]);
    } else {
      router.navigate(defaultBackRoute);
    }
  }

  /**
   * Helper method of Stack navigation
   */
  private isStackEmpty(): boolean {
    return !this.routeStack || !this.routeStack.length;
  }

}
