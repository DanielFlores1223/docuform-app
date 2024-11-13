import { Injectable } from '@angular/core';
import { IApiResponse } from 'global-interfaces';
import Swal from 'sweetalert2';
import { ToastAlertOptions } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private toastConfig = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });


  public errorApi(apiResponse: IApiResponse<null>) {
    const { message = '', error = '' } = apiResponse;
    const messageIsArray = Array.isArray(message);

    if(!messageIsArray) {
      Swal.fire({
        icon: 'error',
        title: message,
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

  public async toastAlert(options: ToastAlertOptions) {;
    await this.toastConfig.fire({
      icon: options.icon,
      title: options.title
    });
  }
}
