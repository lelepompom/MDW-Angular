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
    this.rooms = this.roomService.getRooms();
    this.initForm();
  }

  private initForm() {
    this.initDate = new FormControl(this.roomService.search.initDate);
    this.initialHour = new FormControl(this.roomService.search.initialHour);
    this.hours = new FormControl(this.roomService.search.hours);
    this.location = new FormControl(this.roomService.search.location);
    this.searchForm = new FormGroup({
      initDate: this.initDate,
      initialHour: this.initialHour,
      hours: this.hours,
      location: this.location
    });
  }
}
