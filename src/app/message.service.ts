import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MenuItem } from './menu-item';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();

  constructor() { }


  sendMessage(menuItems: MenuItem[]) {

    this.subject.next(menuItems);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
