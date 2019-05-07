import {Injectable} from '@angular/core';
import {HttpService} from '../core/http.service';
import {Observable} from 'rxjs';

@Injectable()
export class BookingService {

  public static BOOKING = '/booking';
  public static VALIDATE_BOOKING = BookingService.BOOKING + '/room';

  constructor(private httpService: HttpService) {
  }

  isValidBooking(codigoHabitacion: string, fechaHoraReservaInicio: string, fechaHoraReservaFin: string): Observable<any> {
    return this.httpService.param('fechaHoraReservaInicio', fechaHoraReservaInicio).param('fechaHoraReservaFin', fechaHoraReservaFin)
      .get(BookingService.VALIDATE_BOOKING + '/' + codigoHabitacion);
  }
}
