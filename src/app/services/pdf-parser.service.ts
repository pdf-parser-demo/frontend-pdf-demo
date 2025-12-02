import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfParserService {

  private apiURL = "insertar/api/url"

  constructor( private http: HttpClient) { }

  uploadPDF (file: File): Observable<any>{
    const formData = new FormData()
    formData.append('file', file)

    return this.http.post(this.apiURL, formData)
  }
}
