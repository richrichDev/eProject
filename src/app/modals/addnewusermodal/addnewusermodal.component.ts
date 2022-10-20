import { from } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersComponent } from 'src/app/customers/customers.component';
import { countries } from 'src/environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addnewusermodal',
  templateUrl: './addnewusermodal.component.html',
  styleUrls: ['./addnewusermodal.component.scss']
})
export class AddnewusermodalComponent implements OnInit {

  countries: any = countries;
  addForm!: FormGroup;
  operation: number = 0;

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CustomersComponent>,
    private formBuilder: FormBuilder,
  ) 
  {

  }

  ngOnInit(): void {
    //add new user
    if(JSON.stringify(this.data) == '{}')
    {
      this.operation = 0;
      this.addForm = this.formBuilder.group({
        firstname: [null, [Validators.required]],
        lastname: [null, Validators.required],
        street: [null],
        city: [null],
        country: [null]
      });
    }
    else // edit exiting user
    {
      this.operation = 1;
      let name = this.data.name.split(" ");
      this.addForm = this.formBuilder.group({
        firstname: [name[0], [Validators.required]],
        lastname: [name[1], Validators.required],
        street: [this.data.address.street],
        city: [this.data.address.city],
        country: [this.data.address.country]
      });
    }
  }

  cancel()
  {
    this.dialogRef.close();
  }

  confirm()
  {
    if(this.addForm.valid)
      this.dialogRef.close(this.addForm.value);
  }

}
