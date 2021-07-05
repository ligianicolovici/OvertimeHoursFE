import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../models/record';
import {DataStorageService} from '../services/dataStorageService';
import {Router} from '@angular/router';


@Component({
  selector: 'app-update-record-dialog',
  templateUrl: './update-record-dialog.component.html',
  styleUrls: ['./update-record-dialog.component.css']
})
export class UpdateRecordDialogComponent implements OnInit {
  selectedDate: string;
  availableDates: string[];

  constructor(public dialogRef: MatDialogRef<UpdateRecordDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private service: DataStorageService, private route: Router) {
  }

  ngOnInit(): void {
    this.availableDates = this.service.allAvailableDates;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSelect(value: any): void {
    console.log(value);
    this.service.fetchRecordByDate(value);

  }

  onSubmit(): void {
    console.log(this.service.existingRecord);
    this.route.navigate(['/record', 'edit']);
  }
}
