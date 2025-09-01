import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadExcelService {

  private apiUrl = 'http://localhost:3000/importar-excel';

  constructor(private http: HttpClient) {}

  subirExcel(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    return this.http.post(this.apiUrl, formData);
  }
}
