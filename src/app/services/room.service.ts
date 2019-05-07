import {Injectable} from '@angular/core';
import {HttpService} from '../core/http.service';
import Room from '../models/room';
import Search from '../models/search';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  public search: Search;
  private rooms: Room[];

  constructor(private httpService: HttpService) { }

  private searchRooms(): void {
    this.search = {
      initDate: '2019-05-25T22:00:00',
      initialHour: 12,
      hours: 8,
      location: ''
    };
    this.rooms = [
      {
        nombreHotel: 'Ascot',
        fotoHabitacion: 'assets/images/rooms/png/singleRoomHotelAscotCopenhagen.png',
        codigoHabitacion: 'HA124',
        ubicacion: 'Montecarlo',
        tipoHabitacion: 'Single',
        precioHora: 12,
      },
      {
        nombreHotel: 'Carolina',
        fotoHabitacion: 'assets/images/rooms/png/singleRoomHotelCarolinaMontecarlo.png',
        codigoHabitacion: 'HC376',
        ubicacion: 'Montecarlo',
        tipoHabitacion: 'Single',
        precioHora: 10,
      },
      {
        nombreHotel: 'Mediodia',
        fotoHabitacion: 'assets/images/rooms/png/doubleRoomHotelMediodiaMadrid.png',
        codigoHabitacion: 'HM511',
        ubicacion: 'Madrid',
        tipoHabitacion: 'Double',
        precioHora: 19,
      },
      {
        nombreHotel: 'NotreDame',
        fotoHabitacion: 'assets/images/rooms/png/doubleRoomHotelNotreDameParis.png',
        codigoHabitacion: 'HN488',
        ubicacion: 'Paris',
        tipoHabitacion: 'Double',
        precioHora: 44,
      },
      {
        nombreHotel: 'Mondial',
        fotoHabitacion: 'assets/images/rooms/png/tripleRoomHotelMondialParis.png',
        codigoHabitacion: 'HM124',
        ubicacion: 'Paris',
        tipoHabitacion: 'Triple',
        precioHora: 88,
      },
      {
        nombreHotel: 'Opera',
        fotoHabitacion: 'assets/images/rooms/png/suiteRoomHotelOperaParis.png',
        codigoHabitacion: 'HO376',
        ubicacion: 'Paris',
        tipoHabitacion: 'Suite',
        precioHora: 190,
      },
    ];
  }

  public getRooms(): Room[] {
    this.searchRooms();
    return this.rooms;
  }

  roomsSearch(location: string, initDate: string, finalDate: string): Observable<any> {
    return this.httpService.post('/habitaciones/query', {
      ubicacion: location,
      fechaHoraReservaInicio: initDate,
      fechaHoraReservaFin: finalDate
    });
  }
}
