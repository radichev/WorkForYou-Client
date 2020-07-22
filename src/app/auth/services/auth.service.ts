import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment"
import { Tokens } from '../models/tokens';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly LOGIN_URL = `${environment.apiUrl}/auth/sign-in`;
  private readonly REGISTER_URL = `${environment.apiUrl}/auth/sign-up`;
  private loggedUser: string;
  isLoggedIn$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());
  }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(this.LOGIN_URL, user)
      .pipe(
        tap(token => this.doLoginUser(user.username, token))
        );
  }

  register(user: { username: string, email: string, password: string }) {
    return this.http.post(this.REGISTER_URL, user)
    .pipe(
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    )
  }

  logout() {
    this.doLogoutUser();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.isLoggedIn$.next(true);
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.isLoggedIn$.next(false);
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
