import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, map, pairwise} from 'rxjs/operators';
import {RoomService} from 'src/app/services/room.service';
import Room from 'src/app/models/room';
import Search from 'src/app/models/search';
import {BookingService} from '../../services/booking.service';
import room from 'src/app/models/room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  private search: Search;
  public room: Room;
  public form: FormGroup;
  public initialDate: FormControl;
  public initialHour: FormControl;
  public hours: FormControl;

  constructor(private roomService: RoomService, private route: ActivatedRoute, private bookingService: BookingService,
              private router: Router) {
  }

  ngOnInit() {
    this.initRoom();
    this.initSearch();
    this.initForm();
  }

  private initRoom() {
    let roomId;
    this.route.paramMap.subscribe(params => roomId = parseInt(params.get('id'), 10));
    this.room = this.roomService.getRooms()[roomId];
  }

  private initSearch() {
    this.search = this.roomService.search;
  }

  private initForm() {
    this.initialDate = new FormControl({value: new Date(this.search.initDate).toLocaleDateString('es-Es'), disabled: true});
    this.initialHour = new FormControl(this.search.initialHour,
      [Validators.min(this.search.initialHour), Validators.max(this.search.initialHour)]);
    this.hours = new FormControl(this.search.hours, [Validators.min(1), Validators.max(this.search.hours)]);

    this.form = new FormGroup({
      initialDate: this.initialDate,
      initialHour: this.initialHour,
      hours: this.hours
    });
    this.manageMaxValues();
  }

  private manageMaxValues() {
    this.initialHour.valueChanges
      .subscribe((val: number) => {
        if (val > this.search.initialHour) {
          this.updateValidity(this.hours, 1, (this.hours.value + this.initialHour.value - val));
        }
      });

    this.form.controls.hours.valueChanges
      .pipe(pairwise())
      .subscribe(([prev, val]: [number, number]) => {
        if (val < this.search.hours) {
          this.updateValidity(this.initialHour, this.search.initialHour, (this.search.initialHour + prev - val));
        }
      });
  }

  private updateValidity(control: FormControl, minValue: number, maxValue: number) {
    control.setValidators([Validators.min(minValue), Validators.max(maxValue)]);
    control.updateValueAndValidity();
  }

  bookRoom() {
    this.bookingService.isValidBooking(
      this.room.codigoHabitacion,
      this.formatDate(this.initialDate.value, this.initialHour.value),
      this.formatDate(this.initialDate.value, this.initialHour.value + this.hours.value)
    ).toPromise()
      .then(() => {
          console.log('Se puede hacer la reserva');
          this.router.navigate(['./payment-gateway', {hours: this.hours.value}], {relativeTo: this.route});
        }
      )
      .catch(error => {
        if (error.error === 'BadRequestException') {
          console.log('BadRequestException: Si se manda mal el código de habitación acaba aki');
        } else if (error.error === 'ConflictException') {
          console.log('ConflictException: Si ya está hecha una reserva en esas fechas entra aki');
        }
      });
  }

  formatDate(date: string, hour: number): string {
    const str = date.split('/');
    let formated = str[2];
    if (parseInt(str[1], 10) < 10) {
      formated += '-0' + str[1];
    } else {
      formated += '-' + str[1];
    }
    if (parseInt(str[0], 10) < 10) {
      formated += '-0' + str[0];
    } else {
      formated += '-' + str[0];
    }
    if (hour > 24) {
      formated += ' ' + (hour - 24) + ':00';
    } else {
      formated += ' ' + hour + ':00';
    }
    return formated;
  }
}
