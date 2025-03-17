import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewOfficeModalComponentComponent } from '../view-office-modal-component/view-office-modal-component.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

interface Office {
  Office_Name: string;
  Office_code: string;
  Employee: string;
  emp_code: number;
}

interface Employee {
  name: string;
  code: string;
}

interface TableData {
  slNo: number;
  office: string;
  officeCode: string;
  employee: string;
  employeeCode: string;
  weight: number;
}

@Component({
  selector: 'app-office-cadre',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './office-cadre.component.html',
  styleUrls: ['./office-cadre.component.css']
})
export class OfficeCadreComponent implements AfterViewInit {
  model = {
    office: '',
    officeCode: '',
    mgr: '', // Employee Name
  };

  officers: any[] = [];
  displayedColumns: string[] = ['slNo', 'office', 'officeCode', 'employee', 'employeeCode', 'weight'];
  dataSource = new MatTableDataSource<TableData>([]);

  // Predefined Employees based on Office Code
  employeeData: { [key: string]: Employee[] } = {
    '998': [
      { name: 'General Manager', code: 'EMP001' },
      { name: 'Assistant Manager', code: 'EMP002' },
      { name: 'Senior Manager', code: 'EMP003' }
    ],
    '999': [
      { name: 'Deputy Manager', code: 'EMP004' },
      { name: 'Manager Gr.III', code: 'EMP005' },
      { name: 'Driver', code: 'EMP006' }
    ],
    '1000': [
      { name: 'Senior Manager', code: 'EMP007' },
      { name: 'Manager Gr.IV', code: 'EMP008' },
      { name: 'PTS', code: 'EMP009' }
    ]
  };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  selectText(event: Event): void {
    const dialogRef = this.dialog.open(ViewOfficeModalComponentComponent, {
      width: '800px',
      maxHeight: '80vh',
    });

    dialogRef.afterClosed().subscribe((selectedOffice: Office | undefined) => {
      if (selectedOffice) {
        this.model.office = selectedOffice.Office_Name;
        this.model.officeCode = selectedOffice.Office_code;
        this.officers = this.employeeData[this.model.officeCode] || [];
      }
    });
  }

  search(): void {
    if (this.model.office && this.model.mgr) {
      const employees = this.employeeData[this.model.officeCode] || [];
      const selectedEmployee = employees.find(emp => emp.name === this.model.mgr);

      const newEntry: TableData = {
        slNo: this.dataSource.data.length + 1,
        office: this.model.office,
        officeCode: this.model.officeCode,
        employee: this.model.mgr, // Now it's just a string
        employeeCode: selectedEmployee ? selectedEmployee.code : 'N/A', // Correct lookup
        weight: Math.floor(Math.random() * 100),
      };

      this.dataSource.data = [...this.dataSource.data, newEntry];
      this.dataSource.paginator = this.paginator;
    }
  }

}
