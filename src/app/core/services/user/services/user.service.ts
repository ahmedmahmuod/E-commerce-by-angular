import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  // set user data
  setUserData(data: any): void {
    this.userDataSubject.next(data);
  }

  // get user data
  getUserData(): any {
    return this.userDataSubject.value;
  }
}
