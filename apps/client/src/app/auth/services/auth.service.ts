import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { IApiResponse, IRegisterUserPayload, ITokenResponse } from 'global-interfaces';
import { Observable, tap } from 'rxjs';
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

  private setAuthentication(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }

  signup(payload: IRegisterUserPayload): Observable<IApiResponse<ITokenResponse>> {
    return this._http.post<IApiResponse<ITokenResponse>>(`${this._baseUrl}/${this._urlModule}/register`, payload)
    .pipe(
      tap((response) =>  {
        if(!response.result) return;
        this.setAuthentication(response.result?.token);
      })
    );
  }

}
