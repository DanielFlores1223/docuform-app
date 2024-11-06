import { Injectable } from '@angular/core';
import { IApiResponse } from 'global-interfaces';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  public errorApi(apiResponse: IApiResponse<null>) {
    const { message = '', error = '' } = apiResponse;
    const messageIsArray = Array.isArray(message);

    if(!messageIsArray) {
      Swal.fire({
        icon: 'error',
        title: error,
        text: message
      });

      return;
    }

    const html = `
      <ul>
        ${message.map(m => `<li>${m}</li>`)}
      </ul>
    `;

    Swal.fire({
      icon: 'error',
      title: error,
      html,
    });

    return;
  }
}
