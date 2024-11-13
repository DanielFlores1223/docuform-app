import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { IApiResponse, ICreateDynamicFormPayload } from 'global-interfaces';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  private readonly _baseUrl: string = environment.apiUrl;
  private readonly _urlModule = 'dynamic-form';
  private readonly _http = inject(HttpClient);
  private readonly _authService = inject(AuthService);

  public create(payload: ICreateDynamicFormPayload) {
    const headers = this._authService.getAuthorizationHeader();
    const url = `${this._baseUrl}/${this._urlModule}`;

    return this._http.post<IApiResponse<null>>(url, payload, { headers })
      .pipe(
        catchError(({ error }) => throwError(() => error as IApiResponse<null>))
      )
  }

}
