import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Journey} from "../../../models/journey";

@Component({
  selector: 'app-journey-details',
  templateUrl: './journey-details.component.html',
  styleUrls: ['./journey-details.component.css']
})
export class JourneyDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<JourneyDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public journey: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
