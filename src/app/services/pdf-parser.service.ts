import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfParserService {

  private apiURL = environment.apiBaseUrl

  constructor( private http: HttpClient) { }

  uploadPDF (file: File): Observable<any>{
    const formData = new FormData()
    formData.append('file', file)

    return this.http.post(`${this.apiURL}/upload`, formData)
  }
}
