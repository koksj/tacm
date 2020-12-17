import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Farmer } from './farmer/famer';
import { environment } from "../environments/environment";
import { catchError, tap } from 'rxjs/operators';
import { Agent } from './agent/agent';
import { UUID } from './uuid';
import { Product } from './product/product';


@Injectable({
  providedIn: 'root'
})
export class DataService {
        
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) {

  }

  public addFarmer(farmer: Farmer): Observable<Farmer> {

    const url = environment.farmerApi + '/v1/farmer';
    return this.http.post<Farmer>(url, farmer, this.httpOptions).pipe(
      tap((newFarmer: Farmer) => this.log(`added farmer w/ id=${newFarmer.id}`)),
      catchError(this.handleError<Farmer>('addFarmer'))
    );
  }

  public getFarmer(id: string): Observable<Farmer> {

    const url = environment.farmerApi + '/v1/farmer/' + id;

    return this.http.get<Farmer>(url).pipe(
      tap(_ => this.log(`fetched farmer id=${id}`)),
      catchError(this.handleError<Farmer>(`getFarmer id=${id}`))
    );

  }

  public getFarmers(): any {

    const url = environment.farmerApi + '/v1/farmers';
    console.log("Get farmers api url:" + url);
    return this.http.get(url).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

  addAgent(agent: Agent): Observable<Agent> {

    const url = environment.farmerApi + '/v1/agent';

    return this.http.post<Agent>(url, agent, this.httpOptions).pipe(
      tap((newFarmer: Agent) => this.log(`added agent w/ id=${newFarmer.id}`)),
      catchError(this.handleError<Agent>('addAgent'))
    );

  }

  addProduct(product: Product): Observable<Product> {

    const url = environment.farmerApi + '/v1/product';

    return this.http.post<Product>(url, product, this.httpOptions).pipe(
      tap((newProduct: Product) => this.log(`added product w/ id=${newProduct.productCode}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
    
  }

  public getAgent(id: string): Observable<Agent> {

    const url = environment.farmerApi + '/v1/agent/' + id;

    return this.http.get<Agent>(url).pipe(
      tap(_ => this.log(`fetched agent id=${id}`)),
      catchError(this.handleError<Agent>(`getAgent id=${id}`))
    );

  }

  deleteAgent(id: string): Observable<Agent> {
    const url = environment.farmerApi + '/v1/agent/' + id;
    return this.http.delete<Agent>(url).pipe(
      tap(_ => this.log(`delete agent id=${id}`)),
      catchError(this.handleError<Agent>(`deleteAgent id=${id}`))
    );
  }

  deleteProduct(productCode: string): Observable<Product> {
    const url = environment.farmerApi + '/v1/product/' + productCode;
    return this.http.delete<Product>(url).pipe(
      tap(_ => this.log(`delete product id=${productCode}`)),
      catchError(this.handleError<Product>(`deleteProduct id=${productCode}`))
    );
  }

  getUUID(): Observable<UUID> {
    const url = environment.farmerApi + '/v1/uuid';
    return this.http.get<UUID>(url).pipe(
      tap(_ => this.log(`fetched uuid`)),
      catchError(this.handleError<UUID>(`getUUID`))
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
    console.log(message);
    //this.messageService.add(`HeroService: ${message}`);
  }

  /**Use the farmer Id to get tha agents he registered */
  getAgents(uid: any): Observable<Agent[]> {

    const url = environment.farmerApi + '/v1/agents/' + uid;

    return this.http.get<Agent[]>(url).pipe(
      tap(_ => this.log(`fetched agents for farmer id=${uid}`)),
      catchError(this.handleError<Agent[]>(`getAgents id=${uid}`))
    );
  }

  getProduct(productCode: string) {

    const url = environment.farmerApi + '/v1/product/' + productCode;

    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${productCode}`)),
      catchError(this.handleError<Product>(`getAgent id=${productCode}`))
    );

  }


  getProducts(uid: any): Observable<Product[]>  {
    const url = environment.farmerApi + '/v1/products/' + uid;

    return this.http.get<Product[]>(url).pipe(
      tap(_ => this.log(`fetched products for farmer id=${uid}`)),
      catchError(this.handleError<Product[]>(`getProducts id=${uid}`))
    );
   
  }

}
