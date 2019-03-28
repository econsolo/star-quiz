import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  /**
   * Get an image from Google Custom Search API
   * @param name Keyword to find an image
   */
  public getImage(name: string): Observable<any> {
    return this.http.get(`${environment.url_imagem}${name}`);
  }
}
