import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../services/room.service';
import Search from '../../models/search';
import Room from '../../models/room';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html'
})
export class PaymentGatewayComponent implements OnInit {

  private search: Search;
  public room: Room;
  private hours: number;

  constructor(private roomService: RoomService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initRoom();
    this.initSearch();
  }

  private initRoom() {
    let roomId;
    this.route.paramMap.subscribe(params => roomId = parseInt(params.get('id'), 10));
    this.route.paramMap.subscribe(params => this.hours = parseInt(params.get('hours'), 10));
    this.room = this.roomService.getRooms()[roomId];
  }

  private initSearch() {
    this.search = this.roomService.search;
  }
}
