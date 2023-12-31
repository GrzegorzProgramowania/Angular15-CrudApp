import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
// import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmationDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: 'Czy na pewno chcesz usunąć tego pracownika?',
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          // Jeśli użytkownik potwierdzi, usuń pracownika
          this._empService.deleteEmployee(id).subscribe({
            next: (res) => {
              this._coreService.openSnackBar('Employee deleted!', 'done');
              this.getEmployeeList();
            },
            error: console.log,
          });
        }
      },
    });
  }

  //działa
  // deleteEmployee(id: number) {
  //   const userConfirmed = window.confirm(
  //     'Czy na pewno chcesz usunąć tego pracownika?'
  //   );
  //   if (userConfirmed) {
  //     this._empService.deleteEmployee(id).subscribe({
  //       next: (res) => {
  //         this._coreService.openSnackBar('Employee deleted!', 'done');
  //         this.getEmployeeList();
  //       },
  //       error: console.log,
  //     });
  //   }
  // }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data: data,
      //data:data === data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
}
