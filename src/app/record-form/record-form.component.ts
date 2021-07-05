import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {DataStorageService} from '../services/dataStorageService';
import {RecordHours} from '../models/record';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit, OnDestroy {

  isEdit: boolean;
  subscriptions = new Subscription();
  recordForm = new FormGroup({
    overtime: new FormControl('', [Validators.max(13), Validators.min(9), Validators.pattern('^(?!0$)\\d+(?:[,.][05])?$'), Validators.required]),
    break: new FormControl('', [Validators.required, Validators.max(2)]),
    date: new FormControl(null, Validators.required)
  });
  formTitle: string;
  recordToUpdate: RecordHours;

  constructor(private route: ActivatedRoute, private service: DataStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.route.params.subscribe(params => {
      if (params['mode'] === 'edit') {
        this.isEdit = true;
        this.formTitle = 'Update Record';
        this.recordToUpdate = this.service.existingRecord;
        const entryDate = this.recordToUpdate.date.split('.');
        this.recordForm.setValue({
          overtime: this.recordToUpdate.dailyHours,
          break: this.recordToUpdate.daybreak,
          date: new Date(entryDate[1] + '/' + entryDate[0] + '/' + entryDate[2])
        });
      } else {
        this.isEdit = false;
        this.formTitle = 'Create Record';
        this.onClear();
      }
    }));
    this.recordForm.get('break').valueChanges.subscribe(() => {
      console.log(this.recordForm.get('overtime'));
    });
  }


  onSubmit(form: FormGroup): void {
    console.log('Valid?', form.valid); // true or false
    console.log('Overtime hours', form.value.overtime);
    console.log('Break', form.value.break);
    console.log('Date', formatDate(form.value.date, 'dd.MM.yyyy', 'en-US'));

    const recordFromForm: RecordHours = {
      date: formatDate(form.value.date, 'dd.MM.yyyy', 'en-US'),
      dailyHours: form.value.overtime,
      daybreak: form.value.break,
    };
    if (this.isEdit) {
      this.service.updateRecord(recordFromForm);
    } else {
      this.service.addRecord(recordFromForm);
    }
    //this.router.navigate(['/overview']);

  }

  onClear(): void {
    if (this.isEdit) {
      this.recordForm = new FormGroup({
        overtime: new FormControl(''),
        break: new FormControl('')
      });
    } else {
      this.recordForm.reset({emitEvent:false});
    }
    this.recordForm.get('overtime').markAsUntouched();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
