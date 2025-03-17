import { MatInputModule } from '@angular/material/input';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Office {
  Office_code: string;
  Office_id: string;
  Office_Name: string;
}

@Component({
  selector: 'app-view-office-modal-component',
  templateUrl: './view-office-modal-component.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  styleUrls: ['./view-office-modal-component.component.css']
})
export class ViewOfficeModalComponentComponent implements OnInit {
  displayedColumns: string[] = ['Office_id', 'Office_code', 'Office_Name', 'action'];
  dataSource = new MatTableDataSource<Office>();
  searchQuery: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  offices: Office[] = [
    { Office_id: '658', Office_code: '998', Office_Name: 'Tvm Main' },
    { Office_id: '659', Office_code: '999', Office_Name: 'Kollam Main' },
    { Office_id: '700', Office_code: '1000', Office_Name: 'Thrissur H.O' },
    // Add more offices as needed
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewOfficeModalComponentComponent>
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.offices;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }

  selectOffice(office: Office): void {
    this.dialogRef.close(office);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
