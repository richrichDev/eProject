import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/services/api.service';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Customer } from '../objects/customer';
import { MatDialog } from '@angular/material/dialog';
import { AddnewusermodalComponent } from '../modals/addnewusermodal/addnewusermodal.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['select', 'id', 'name', 'address', 'edit', 'delete'];
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  selection = new SelectionModel<Customer>(true, []);

  allCustomers: any = []; 

  selectedCustomers: Customer[] = [];
  deleteAll: boolean = false;

  constructor
  (
    public apiService: ApiService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
  ) 
  { 

  }

  ngOnInit(): void {
    this.getCustomers();
  }

  ngAfterViewInit()
  {
    
  }

  getCustomers()
  {
    this.apiService.getCustomers().subscribe({
      next: (res) => {
        console.log(res);
        this.allCustomers = res;
        this.dataSource.data = this.allCustomers.slice();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => {
        alert("an error occured please refresh page");
      },
      complete: () => {}
    })
  }

  sortData(sort: Sort) {
    if (sort.direction) {
      this._liveAnnouncer.announce(`Sorted ${sort.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // check if all rows are selected or not
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectedCustomers = [];
      return;
    }

    this.selection.select(...this.dataSource.data);
    for(let i = 0 ; i < this.allCustomers.length ; i++)
    {
      this.selectedCustomers.push(this.allCustomers[i]);
    }
  }

  selectRow($event: any, dataSource: Customer) {
    if ($event.checked) {
      this.selectedCustomers.push(dataSource);
    }
    else
    {
      let index = this.selectedCustomers.findIndex((object: any) => {
        return object.id == dataSource.id;
      });
      this.selectedCustomers.splice(index, 1);
    }
  }

  deleteGroup()
  {
    if(this.selectedCustomers.length > 0)
    {
      for(let i = 0 ; i < this.selectedCustomers.length ; i++)
      {
        let index = this.allCustomers.findIndex((object: any) => {
          return object.id == this.selectedCustomers[i].id;
        });
        this.allCustomers.splice(index, 1);
      }

      if(this.allCustomers.length == 0)
        this.deleteAll = true;
      else
      this.deleteAll = false;

      this.dataSource.data = this.allCustomers.slice();
      this.selectedCustomers = [];
    }
    else
    {
      alert("Nothing is selected");
    }
  }

  deleteCustomer(selectedCustomer: Customer){
    let index = this.allCustomers.findIndex((object: any) => {
      return object.id == selectedCustomer.id;
    });
    this.allCustomers.splice(index, 1);
    this.dataSource.data = this.allCustomers.slice();
  }

  openAddDialog()
  {
    let dialogRef = this.dialog.open(AddnewusermodalComponent, {data: {}});

    dialogRef.afterClosed().subscribe( res => {
      if(res != undefined)
      {
        let maxid = 0 ;
        //get highest id
        for(let i = 0 ; i < this.allCustomers.length ; i++)
        {
          if(Number(this.allCustomers[i].id) > maxid)
            maxid = Number(this.allCustomers[i].id);
        }

        let newcustomer: Customer = {
          id: maxid + 1,
          name: res.firstname + " " + res.lastname,
          address: {
            street: res.street,
            city: res.city,
            country: res.country
          }
        }

        this.allCustomers.push(newcustomer);
        this.dataSource.data = this.allCustomers.slice();

        alert("Customer added successfully!");
      }
    });
  }

  openEditCustomerDialog(currentCustomer: Customer)
  {
    let dialogRef = this.dialog.open(AddnewusermodalComponent, {data: currentCustomer});

    dialogRef.afterClosed().subscribe( res => {
      if(res != undefined)
      {
        let index = this.allCustomers.findIndex((c: any) => {
          return c.id == currentCustomer.id;
        });

        this.allCustomers[index].name = res.firstname + " " + res.lastname;
        this.allCustomers[index].address.street = res.street;
        this.allCustomers[index].address.city = res.city;
        this.allCustomers[index].address.country = res.country;
      }
    });
  }



}
