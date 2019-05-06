import { Component, OnInit } from '@angular/core';
import Room from './../../models/room';
import { RoomService } from 'src/app/services/room.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.css']
})
export class RoomSearchComponent implements OnInit {

  public rooms: Room[];
  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
  }
}
