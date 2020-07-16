import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TubeServiceService {

  baseUrl=environment.url;

  httpOptions={
    headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
};

  constructor(private http:HttpClient) { }

  getDownloadLink(data):Observable<any>{
    let url=`${this.baseUrl}download`
    return this.http.post(url,data)
  }
}
