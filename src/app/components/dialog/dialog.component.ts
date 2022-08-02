import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) 
   {}

  ngOnInit(): void {
  }

  opendialog() {

    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { title: 'Hola mundo!' }
    });

    dialogRef.afterClosed().subscribe(
      res => console.log(res),
      error => console.log(error)

    )
  }



  confirmarEliminar() {
    console.log('confirmarEliminar')
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { title: 'Eliminar registro' }
    });

    dialogRef.afterClosed().subscribe(
      res => console.log(res),
      error => console.log(error)

    )
  }

}
