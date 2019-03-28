import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UtilService } from './util.service';
import 'rxjs/add/operator/do';
import { HttpStatus } from './http.status';
import { catchError, finalize, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private httpStatus: HttpStatus,
        public utilService: UtilService) { }

    // intercet all http requests
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // flag to change showing state of loading animation
        this.httpStatus.setHttpStatus(true);

        // able to show friendly error when 
        // an error happen in every http request
        return next.handle(request).pipe(
            map(event => {
                return event;
            }),
            catchError(err => {
                const msg = 'Ocorreu um erro não esperado.';
                this.utilService.snackMsg(msg);
                return throwError(err);
            }),
            finalize(() => {
                // flag to change showing state of loading animation
                this.httpStatus.setHttpStatus(false);
            })
        );
    }
}