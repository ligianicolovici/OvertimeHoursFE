import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {DataStorageService} from '../../services/dataStorageService';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  displayValue: number;

  constructor(private bottomSheetRef: MatBottomSheetRef<PopUpComponent>, private service: DataStorageService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: number) {
    this.displayValue = data;
  }

  ngOnInit(): void {
    // this.totalHours = this.service.totalHours;
    // this.totalDays = this.service.totalDays;
    // console.log(this.totalDays);
    // console.log(this.totalHours);
  }
}
