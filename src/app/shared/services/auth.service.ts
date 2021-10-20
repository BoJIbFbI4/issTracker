import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavigationPath } from '../../core/models/navigation.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly router: Router) {
    <boolean>JSON.parse(<string>localStorage.getItem('isAuthenticated'))
      ? this.isAuthenticated$.next(true)
      : this.isAuthenticated$.next(false);
  }

  login = () => this.router.navigate([NavigationPath.Login]);
  auth = () => {
    this.isAuthenticated$.next(true);
    localStorage.setItem('isAuthenticated', 'true');
    this.router.navigate([NavigationPath.Home]);
  };
  logout = () => {
    this.isAuthenticated$.next(false);
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigate([NavigationPath.Login]);
  };
}
