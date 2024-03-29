import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TubeServiceService {

  // baseUrl="https://tubeload-api.herokuapp.com/"

  baseUrl="http://127.0.0.1:4000/"

  httpOptions={
    headers:new HttpHeaders({
    'Content-Type':'application/json',
  })
};

  constructor(private http:HttpClient) { }

  getDownloadLink(data):Observable<any>{
    let url=`${this.baseUrl}download`
    return this.http.post(url,data)
  }

  isVideoPresent(data):Observable<any>{
    let url=`${this.baseUrl}getVideo`
    return this.http.post(url,data)
  }
}
