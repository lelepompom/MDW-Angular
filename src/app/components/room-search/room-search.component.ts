import { Component, OnInit } from '@angular/core';
import Room from './../../models/room';
import { RoomService } from 'src/app/services/room.service';
import Search from '../../models/search';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {pairwise} from 'rxjs/operators';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.css']
})
export class RoomSearchComponent implements OnInit {

  public rooms: Room[];
  public searchForm: FormGroup;
  public initDate: FormControl;
  public initialHour: FormControl;
  public hours: FormControl;
  public location: FormControl;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.initDate = new FormControl();
    this.initialHour = new FormControl();
    this.hours = new FormControl();
    this.location = new FormControl();
    this.searchForm = new FormGroup({
      initDate: this.initDate,
      initialHour: this.initialHour,
      hours: this.hours,
      location: this.location
    });
  }

  private searchRooms() {
      this.roomService.roomsSearch(this.location.value, this.initDate.value, this.initDate.value).toPromise()
      .then(data => {
          console.log('Se puede hacer la reserva');
          this.rooms = data;
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
