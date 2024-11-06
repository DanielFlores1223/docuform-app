import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { IApiResponse, IRegisterUserPayload, ITokenResponse } from 'global-interfaces';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthStatus } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _baseUrl: string = environment.apiUrl;
  private readonly _urlModule = 'auth';
  private readonly _http = inject(HttpClient);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  public authStatus = computed(() => this._authStatus());


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  public set tokenStore(value: string) {
    localStorage.setItem('token', value);
  }

  public get tokenStore(): string | null {
    return localStorage.getItem('token') || null;
  }

  public set urlStore(value: string) {
    localStorage.setItem('url', value);
  }

  public get urlStore(): string | null {
    return localStorage.getItem('url') || null;
  }

  private setAuthentication(token: string): boolean {
    this.tokenStore = token;
    this._authStatus.set(AuthStatus.authenticated);
    return true;
  }

  signup(payload: IRegisterUserPayload): Observable<IApiResponse<ITokenResponse>> {
    return this._http.post<IApiResponse<ITokenResponse>>(`${this._baseUrl}/${this._urlModule}/register`, payload)
    .pipe(
      tap((response) =>  {
        if(!response.result) return;
        this.setAuthentication(response.result!.token);
      })
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const token = this.tokenStore;

    if(!token) {
      this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false);
    };

    this._authStatus.set(AuthStatus.authenticated);
    return of(true);
  }

}
