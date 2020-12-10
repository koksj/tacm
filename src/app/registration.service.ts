import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Registration } from './registration';
import { environment } from "./../environments/environment";
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {

  }

  public addRegistration(registration: Registration): Observable<Registration> {

    const url = environment.farmerApi + '/v1/registration';

    return this.http.post<Registration>(url, registration, this.httpOptions).pipe(
      tap((newRegistration: Registration) => this.log(`added registration w/ id=${newRegistration.id}`)),
      catchError(this.handleError<Registration>('addRegistration'))
    );

  }

  public getRegistration(id: string): Observable<Registration> {
    
    const url = environment.farmerApi + '/v1/registration/'+ id;

    return this.http.get<Registration>(url).pipe(
      tap(_ => this.log(`fetched registration id=${id}`)),
      catchError(this.handleError<Registration>(`getRegistration id=${id}`))
    );
   
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //console.log(message);
  }

}
